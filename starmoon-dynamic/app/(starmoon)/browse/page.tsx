"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Search, MapPin, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header-wrapper"

const services = [
  {
    id: 1,
    title: "Professional Web Development",
    provider: "TechCraft Solutions",
    rating: 4.9,
    reviews: 127,
    price: 500,
    priceType: "starting at",
    image: "/placeholder.svg?height=200&width=300",
    category: "Web Development",
    location: "Remote",
    description:
      "Custom web development services including responsive design, e-commerce solutions, and modern frameworks.",
    tags: ["React", "Next.js", "E-commerce", "Responsive"],
  },
  {
    id: 2,
    title: "Logo & Brand Identity Design",
    provider: "Creative Studio Pro",
    rating: 4.8,
    reviews: 89,
    price: 150,
    priceType: "starting at",
    image: "/placeholder.svg?height=200&width=300",
    category: "Design",
    location: "New York, NY",
    description: "Complete brand identity packages including logo design, color schemes, and brand guidelines.",
    tags: ["Logo Design", "Branding", "Print Design", "Digital"],
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    provider: "Growth Marketing Co",
    rating: 4.9,
    reviews: 156,
    price: 300,
    priceType: "starting at",
    image: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    location: "Remote",
    description: "Comprehensive digital marketing strategies to grow your business online.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
  },
  {
    id: 4,
    title: "Home Cleaning Service",
    provider: "Sparkle Clean",
    rating: 4.7,
    reviews: 234,
    price: 80,
    priceType: "per session",
    image: "/placeholder.svg?height=200&width=300",
    category: "Home Services",
    location: "Los Angeles, CA",
    description: "Professional home cleaning services with eco-friendly products and flexible scheduling.",
    tags: ["Deep Cleaning", "Eco-Friendly", "Flexible", "Insured"],
  },
  {
    id: 5,
    title: "Business Consulting",
    provider: "Strategic Advisors",
    rating: 4.8,
    reviews: 67,
    price: 200,
    priceType: "per hour",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
    location: "Chicago, IL",
    description: "Expert business consulting to help optimize operations and drive growth.",
    tags: ["Strategy", "Operations", "Growth", "Analysis"],
  },
  {
    id: 6,
    title: "Photography Services",
    provider: "Lens Masters",
    rating: 4.9,
    reviews: 145,
    price: 250,
    priceType: "per session",
    image: "/placeholder.svg?height=200&width=300",
    category: "Photography",
    location: "Miami, FL",
    description: "Professional photography for events, portraits, and commercial projects.",
    tags: ["Events", "Portraits", "Commercial", "Editing"],
  },
]

const categories = [
  "Web Development",
  "Design",
  "Marketing",
  "Home Services",
  "Business",
  "Photography",
  "Writing",
  "Tutoring",
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !location || service.location.toLowerCase().includes(location.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category)
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1]

    return matchesSearch && matchesLocation && matchesCategory && matchesPrice
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search Services</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="What are you looking for?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <Label>Categories</Label>
                  <div className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <Label htmlFor={category} className="text-sm font-normal">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <div className="mt-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={50} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar & Controls */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Browse Services</h1>
                  <p className="text-gray-600">{filteredServices.length} services found</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredServices.map((service) => (
                <Link key={service.id} href={`/service/${service.id}`}>
                  <Card
                    className={`hover:shadow-lg transition-shadow cursor-pointer h-full ${viewMode === "list" ? "flex" : ""}`}
                  >
                    <div className={viewMode === "list" ? "flex w-full" : ""}>
                      <div className={viewMode === "list" ? "w-48 flex-shrink-0" : "relative"}>
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          width={300}
                          height={200}
                          className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48 rounded-t-lg"}`}
                        />
                        <Badge className={`absolute top-2 left-2 bg-white text-gray-800`}>{service.category}</Badge>
                      </div>

                      <div className={viewMode === "list" ? "flex-1 p-6" : ""}>
                        <CardHeader className={viewMode === "list" ? "p-0 pb-4" : "pb-2"}>
                          <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                          <CardDescription className="text-sm">{service.provider}</CardDescription>
                        </CardHeader>

                        <CardContent className={viewMode === "list" ? "p-0" : ""}>
                          {viewMode === "list" && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                          )}

                          <div className="flex flex-wrap gap-1 mb-3">
                            {service.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{service.rating}</span>
                              <span className="text-sm text-gray-500">({service.reviews})</span>
                            </div>
                            <div className="text-sm font-semibold text-primary">
                              ${service.price} {service.priceType}
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {service.location}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
