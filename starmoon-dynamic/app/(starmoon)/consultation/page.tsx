"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Filter, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { fetchConsultationCategories, fetchConsultations, ConsultationCategory, Consultation, ConsultationListingParams } from "@/lib/api"

// Helper function to get image URL
const getImageUrl = (imagePath: string) => {
    const baseUrl = "https://atapp.ecom.ind.in"
    if (!imagePath) return "/placeholder.svg"
    return imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`
}

export default function ConsultantsListingPage() {
    const router = useRouter()
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    
    // Loading states
    const [isLoading, setIsLoading] = useState(true)
    const [categoriesLoader, setCategoriesLoader] = useState(true)
    
    // Data states
    const [consultations, setConsultations] = useState<Consultation[]>([])
    const [categories, setCategories] = useState<ConsultationCategory[]>([])

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
    const [selectedBadges, setSelectedBadges] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 500])
    const [selectedExperience, setSelectedExperience] = useState<string[]>([])

    // Fetch categories on component mount
    useEffect(() => {
        const loadCategories = async () => {
            setCategoriesLoader(true)
            try {
                const categoriesData = await fetchConsultationCategories('India')
                setCategories(categoriesData.filter(cat => cat.is_active))
            } catch (error) {
                console.error('Failed to load categories:', error)
            } finally {
                setCategoriesLoader(false)
            }
        }
        loadCategories()
    }, [])

    // Fetch consultations with filters
    useEffect(() => {
        const loadConsultations = async () => {
            setIsLoading(true)
            try {
                const params: ConsultationListingParams = {
                    per_page: 50,
                    page_no: 1,
                    ...(searchQuery && { search: searchQuery }),
                    ...(selectedCategories.length > 0 && { consultation_category: selectedCategories.join(',') }),
                    ...(selectedBadges.length > 0 && { badges: selectedBadges.join(',') }),
                    ...(priceRange[0] > 0 && { min_price: priceRange[0] }),
                    ...(priceRange[1] < 500 && { max_price: priceRange[1] }),
                }
                
                const consultationsData = await fetchConsultations('India', params)
                setConsultations(consultationsData.filter(consultation => consultation.is_active))
            } catch (error) {
                console.error('Failed to load consultations:', error)
                setConsultations([])
            } finally {
                setIsLoading(false)
            }
        }
        
        // Debounce the API call
        const debounceTimer = setTimeout(loadConsultations, 500)
        return () => clearTimeout(debounceTimer)
    }, [searchQuery, selectedCategories, selectedBadges, priceRange])

    // Get unique values for filters from API data
    const specializations = useMemo(() => {
        const allSpecs = consultations.flatMap((c) => 
            typeof c.specialization === 'string' ? [c.specialization] : c.specialization || []
        )
        return [...new Set(allSpecs)]
    }, [consultations])
    
    const badges = useMemo(() => {
        const allBadges = consultations.flatMap((c) => 
            typeof c.badges === 'string' ? c.badges.split(',').map(b => b.trim()) : []
        )
        return [...new Set(allBadges)]
    }, [consultations])
    
    const experienceLevels = useMemo(() => {
        return [...new Set(consultations.map((c) => c.experience))]
    }, [consultations])

    // Filter consultations based on client-side filters (for filters not handled by API)
    const filteredConsultations = useMemo(() => {
        return consultations.filter((consultant) => {
            // Specialization filter (client-side)
            if (selectedSpecializations.length > 0) {
                const consultantSpecs = typeof consultant.specialization === 'string' 
                    ? [consultant.specialization] 
                    : consultant.specialization || []
                if (!consultantSpecs.some((spec) => selectedSpecializations.includes(spec))) {
                    return false
                }
            }

            // Experience filter (client-side)
            if (selectedExperience.length > 0 && !selectedExperience.includes(consultant.experience)) {
                return false
            }

            return true
        })
    }, [consultations, selectedSpecializations, selectedExperience])

    const handleViewDetails = (consultantId: string) => {
        router.push(`/consultant/${consultantId}`)
    }

    const clearAllFilters = () => {
        setSearchQuery("")
        setSelectedCategories([])
        setSelectedSpecializations([])
        setSelectedBadges([])
        setPriceRange([0, 500])
        setSelectedExperience([])
    }

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        }
    }

    const handleSpecializationChange = (specialization: string, checked: boolean) => {
        if (checked) {
            setSelectedSpecializations([...selectedSpecializations, specialization])
        } else {
            setSelectedSpecializations(selectedSpecializations.filter((s) => s !== specialization))
        }
    }

    const handleBadgeChange = (badge: string, checked: boolean) => {
        if (checked) {
            setSelectedBadges([...selectedBadges, badge])
        } else {
            setSelectedBadges(selectedBadges.filter((b) => b !== badge))
        }
    }

    const handleExperienceChange = (experience: string, checked: boolean) => {
        if (checked) {
            setSelectedExperience([...selectedExperience, experience])
        } else {
            setSelectedExperience(selectedExperience.filter((e) => e !== experience))
        }
    }

    return (
        <div className="min-h-screen py-12">
            {/* Header */}
            {/* <div className="bg-white shadow-sm border rounded-2xl">
                <div className="px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Consultant</h1>
                    <p className="text-gray-600 mt-2">Connect with expert consultants across various industries</p>
                </div>
            </div> */}

            <div className="container">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="hidden lg:block w-80 flex-shrink-0 border rounded-2xl">
                        <div className="rounded-lg shadow-sm p-6 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    Filters
                                </h2>
                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                    Clear All
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Search */}
                                <div>
                                    <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                                        Search
                                    </Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="search"
                                            placeholder="Search consultants..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Category</Label>
                                    {categoriesLoader ? (
                                        <div className="text-sm text-gray-500">Loading categories...</div>
                                    ) : (
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`category-${category.consultation_category_name}`}
                                                        checked={selectedCategories.includes(category.consultation_category_name)}
                                                        onCheckedChange={(checked) => handleCategoryChange(category.consultation_category_name, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`category-${category.consultation_category_name}`} className="text-sm cursor-pointer">
                                                        {category.consultation_category_name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
                                    </Label>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={500}
                                        min={0}
                                        step={25}
                                        className="w-full"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Experience</Label>
                                    <div className="space-y-2">
                                        {experienceLevels.map((experience) => (
                                            <div key={experience} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`experience-${experience}`}
                                                    checked={selectedExperience.includes(experience)}
                                                    onCheckedChange={(checked) => handleExperienceChange(experience, checked as boolean)}
                                                />
                                                <Label htmlFor={`experience-${experience}`} className="text-sm cursor-pointer">
                                                    {experience}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Specialization</Label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {specializations.map((specialization) => (
                                            <div key={specialization} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`spec-${specialization}`}
                                                    checked={selectedSpecializations.includes(specialization)}
                                                    onCheckedChange={(checked) => handleSpecializationChange(specialization, checked as boolean)}
                                                />
                                                <Label htmlFor={`spec-${specialization}`} className="text-sm cursor-pointer">
                                                    {specialization}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Badges */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Badges</Label>
                                    <div className="space-y-2">
                                        {badges.map((badge) => (
                                            <div key={badge} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`badge-${badge}`}
                                                    checked={selectedBadges.includes(badge)}
                                                    onCheckedChange={(checked) => handleBadgeChange(badge, checked as boolean)}
                                                />
                                                <Label htmlFor={`badge-${badge}`} className="text-sm cursor-pointer">
                                                    {badge}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden fixed bottom-4 right-4 z-50">
                        <Button onClick={() => setShowMobileFilters(true)} className="rounded-full w-14 h-14 shadow-lg">
                            <Filter className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                {isLoading ? (
                                    "Loading consultants..."
                                ) : (
                                    `Showing ${filteredConsultations.length} of ${consultations.length} consultants`
                                )}
                            </p>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <Card key={index} className="animate-pulse">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                                                <div className="h-8 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Consultants Grid */}
                        {!isLoading && (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredConsultations.map((consultant) => (
                                <Card key={consultant._id} className="hover:shadow-lg transition-shadow duration-200">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center mb-4">
                                            <img
                                                src={getImageUrl(consultant.profile_image) || "/placeholder.svg"}
                                                alt={consultant.name}
                                                className="w-24 h-24 rounded-full object-cover mb-4"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                                                }}
                                            />
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {consultant.badges && typeof consultant.badges === 'string' && consultant.badges.split(',').map((badge, index) => (
                                                    <Badge key={index} className="text-xs">
                                                        {badge.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
                                            <p className="text-blue-600 font-medium mb-2">{consultant.consultation_category}</p>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {(() => {
                                                    const specs = typeof consultant.specialization === 'string' 
                                                        ? [consultant.specialization] 
                                                        : consultant.specialization || []
                                                    return specs.slice(0, 2).map((spec, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {spec}
                                                        </Badge>
                                                    ))
                                                })()}
                                                {(() => {
                                                    const specs = typeof consultant.specialization === 'string' 
                                                        ? [consultant.specialization] 
                                                        : consultant.specialization || []
                                                    return specs.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{specs.length - 2}
                                                        </Badge>
                                                    )
                                                })()}
                                            </div>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Experience:</span>
                                                <span className="font-medium">{consultant.experience}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 text-sm">Rate:</span>
                                                <span className="text-lg font-bold text-green-600">
                                                    ${consultant.hourly_rate}/{consultant.currency === "USD" ? "hr" : consultant.currency}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full mt-6"
                                            onClick={() => handleViewDetails(consultant?.id?.toString())}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {!isLoading && filteredConsultations.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg mb-4">No consultants found matching your criteria</p>
                                <Button variant="outline" onClick={clearAllFilters}>
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {showMobileFilters && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    Filters
                                </h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Search */}
                                <div>
                                    <Label htmlFor="mobile-search" className="text-sm font-medium mb-2 block">
                                        Search
                                    </Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="mobile-search"
                                            placeholder="Search consultants..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Category</Label>
                                    {categoriesLoader ? (
                                        <div className="text-sm text-gray-500">Loading categories...</div>
                                    ) : (
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`mobile-category-${category.consultation_category_name}`}
                                                        checked={selectedCategories.includes(category.consultation_category_name)}
                                                        onCheckedChange={(checked) => handleCategoryChange(category.consultation_category_name, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`mobile-category-${category.consultation_category_name}`} className="text-sm cursor-pointer">
                                                        {category.consultation_category_name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
                                    </Label>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={500}
                                        min={0}
                                        step={25}
                                        className="w-full"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Experience</Label>
                                    <div className="space-y-2">
                                        {experienceLevels.map((experience) => (
                                            <div key={experience} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`mobile-experience-${experience}`}
                                                    checked={selectedExperience.includes(experience)}
                                                    onCheckedChange={(checked) => handleExperienceChange(experience, checked as boolean)}
                                                />
                                                <Label htmlFor={`mobile-experience-${experience}`} className="text-sm cursor-pointer">
                                                    {experience}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Specialization</Label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {specializations.map((specialization) => (
                                            <div key={specialization} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`mobile-spec-${specialization}`}
                                                    checked={selectedSpecializations.includes(specialization)}
                                                    onCheckedChange={(checked) => handleSpecializationChange(specialization, checked as boolean)}
                                                />
                                                <Label htmlFor={`mobile-spec-${specialization}`} className="text-sm cursor-pointer">
                                                    {specialization}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Badges */}
                                <div>
                                    <Label className="text-sm font-medium mb-3 block">Badges</Label>
                                    <div className="space-y-2">
                                        {badges.map((badge) => (
                                            <div key={badge} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`mobile-badge-${badge}`}
                                                    checked={selectedBadges.includes(badge)}
                                                    onCheckedChange={(checked) => handleBadgeChange(badge, checked as boolean)}
                                                />
                                                <Label htmlFor={`mobile-badge-${badge}`} className="text-sm cursor-pointer">
                                                    {badge}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t flex gap-3">
                                <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                                    Clear All
                                </Button>
                                <Button onClick={() => setShowMobileFilters(false)} className="flex-1">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
