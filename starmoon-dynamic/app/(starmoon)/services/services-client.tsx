"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Star, Clock, DollarSign, Settings, Shield, Code, BarChart3, Lightbulb, Globe, Zap, Target, Search, Tag, XCircle, CheckCircle, Filter, FilterIcon, ShoppingCart } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Service, DynamicFilter, ServiceCategory, ServiceListingParams, fetchServices } from "@/lib/api"

// Define a transformed Service type for UI
type TransformedService = {
    id: string
    title: string
    description: string
    category: string
    price: number
    duration: string
    rating: number
    reviews: number
    image: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    tags: string[]
    level: string
    popular: boolean
    originalPrice?: number
    available: boolean
    bestFor: string[]
    features: string[]
    planType: string
}

interface ServicesClientProps {
    initialServices: Service[]
    dynamicFilters: DynamicFilter[]
    serviceCategories: ServiceCategory[]
}

const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "title", label: "Title A-Z" },
]

// Helper function to extract price from service data
const extractPrice = (service: Service): { price: number; originalPrice?: number } => {
    if (service.service_features_and_offers.length > 0) {
        // Find the most popular plan or first plan
        const mostPopular = service.service_features_and_offers.find(plan => plan.is_most_popular);
        const selectedPlan = mostPopular || service.service_features_and_offers[0];

        if (selectedPlan.country_price.length > 0) {
            const indiaPrice = selectedPlan.country_price.find(p => p.country === 'India') || selectedPlan.country_price[0];
            return {
                price: indiaPrice.monthly_price,
                originalPrice: indiaPrice.yearly_price > indiaPrice.monthly_price * 10 ? indiaPrice.yearly_price / 12 : undefined
            };
        }
    }

    // Fallback pricing
    return { price: 1000 };
};

// Helper function to generate rating
const generateRating = (service: Service): { rating: number; reviews: number } => {
    // Generate consistent rating based on service ID
    const id = service._id;
    const hash = id.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);

    const rating = 3.5 + (Math.abs(hash) % 15) / 10; // Rating between 3.5 and 5.0
    const reviews = 50 + (Math.abs(hash) % 200); // Reviews between 50 and 250

    return { rating: Math.round(rating * 10) / 10, reviews };
};

// Helper function to determine service level
const getServiceLevel = (service: Service): string => {
    const hasEnterpriseFeatures = service.service_features_and_offers.some(plan =>
        plan.features.some(feature =>
            feature.name.toLowerCase().includes('enterprise') ||
            feature.name.toLowerCase().includes('advanced')
        )
    );

    if (hasEnterpriseFeatures) return 'Enterprise';

    const priceInfo = extractPrice(service);
    return priceInfo.price > 3000 ? 'Enterprise' : 'Professional';
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('automation')) return Settings;
    if (categoryLower.includes('security')) return Shield;
    if (categoryLower.includes('development')) return Code;
    if (categoryLower.includes('analytics')) return BarChart3;
    if (categoryLower.includes('consulting')) return Lightbulb;
    if (categoryLower.includes('cloud')) return Globe;
    if (categoryLower.includes('ai') || categoryLower.includes('ml')) return Zap;
    return Target;
};

// Transform API service data to UI format
const transformServiceData = (service: Service): TransformedService => {
    const priceInfo = extractPrice(service);
    const ratingInfo = generateRating(service);
    const level = getServiceLevel(service);

    // Get duration from dynamic filters or default
    const duration = service.dynamic_filters.find(f => f.filter_name === 'duration')?.filter_value || '4-6 weeks';

    // Extract best for from dynamic filters
    const bestFor = service.dynamic_filters
        .filter(f => f.filter_name === 'best_for')
        .map(f => f.filter_value);

    // Extract features from service features and offers
    const features = service.service_features_and_offers.flatMap(plan =>
        plan.features.filter(f => f.is_included).map(f => f.name)
    );

    // Determine plan type
    const planType = service.is_pay_as_you_go ? 'subscription' : 'annual';

    return {
        id: service._id,
        title: service.service_name,
        description: service.service_description,
        category: service.service_category,
        price: priceInfo.price,
        originalPrice: priceInfo.originalPrice,
        duration,
        rating: ratingInfo.rating,
        reviews: ratingInfo.reviews,
        image: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${service.service_thumb_image}`,
        icon: getCategoryIcon(service.service_category),
        tags: service.tags,
        level,
        popular: service.badges?.toLowerCase().includes('popular') || false,
        available: service.is_active,
        bestFor: bestFor.length > 0 ? bestFor : ['Small businesses', 'Startups'],
        features: features.slice(0, 3), // Limit to 3 features
        planType
    };
};

// Helper function to count active filters
const getActiveFilterCount = (selectedFilters: Record<string, string[]>, priceRange: [number, number], search: string, defaultPriceRange: [number, number]): number => {
    let count = 0;

    // Count dynamic filters
    Object.values(selectedFilters).forEach(filterValues => {
        count += filterValues.length;
    });

    // Count price filter if changed from default
    if (priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) {
        count += 1;
    }

    // Count search filter
    if (search.trim() !== '') {
        count += 1;
    }

    return count;
};

export default function ServicesClient({ initialServices, dynamicFilters, serviceCategories }: ServicesClientProps) {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>(initialServices);
    const [loading, setLoading] = useState(false);

    // Extract filter options from dynamic filters and service categories
    const filterSections = useMemo(() => {
        const sections: Record<string, { title: string; options: { label: string; _id: string }[] }> = {};

        // Add service categories as a filter section
        if (serviceCategories.length > 0) {
            sections['service_category'] = {
                title: 'Service Category',
                options: serviceCategories
                    .filter(cat => cat.is_active)
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map(cat => ({
                        label: cat.service_category_name,
                        _id: cat.id.toString()
                    }))
            };
        }

        // Add dynamic filters
        dynamicFilters.forEach(filter => {
            filter.sections.forEach(section => {
                const sectionKey = section.title.toLowerCase().replace(/\s+/g, '_');
                sections[sectionKey] = {
                    title: section.title,
                    options: section.options
                };
            });
        });

        return sections;
    }, [dynamicFilters, serviceCategories]);

    // Calculate default price range from initial services
    const defaultPriceRange = useMemo(() => {
        const prices = initialServices
            .filter(service => service.is_active)
            .map(service => extractPrice(service).price);
        return [
            Math.min(...prices, 500),
            Math.max(...prices, 10000)
        ] as [number, number];
    }, [initialServices]);

    // Filter states
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [priceFilterRange, setPriceFilterRange] = useState<[number, number]>(defaultPriceRange);
    const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
    const [search, setSearch] = useState<string>("");

    // Initialize dynamic filters
    useEffect(() => {
        const initialFilters: Record<string, string[]> = {};
        Object.keys(filterSections).forEach(sectionKey => {
            initialFilters[sectionKey] = [];
        });
        setSelectedFilters(initialFilters);
    }, [filterSections]);

    // Transform services for UI
    const transformedServices = useMemo(() => {
        return services.filter(service => service.is_active).map(transformServiceData);
    }, [services]);

    // Build API parameters from current filter state
    const buildApiParams = useCallback((): ServiceListingParams => {
        const params: ServiceListingParams = {};

        // Search parameter
        if (search.trim()) {
            params.search = search.trim();
        }

        // Price range parameters
        if (priceFilterRange[0] !== defaultPriceRange[0] || priceFilterRange[1] !== defaultPriceRange[1]) {
            params.min_price = priceFilterRange[0];
            params.max_price = priceFilterRange[1];
        }

        // Category filter
        if (selectedFilters.service_category?.length > 0) {
            params.service_category = selectedFilters.service_category.join(',');
        }

        // Tags filter
        const tagsFilter = selectedFilters.tags || [];
        if (tagsFilter.length > 0) {
            params.tags = tagsFilter.join(',');
        }

        // Badges filter
        const badges = [];
        if (selectedFilters.badges?.length > 0) {
            badges.push(...selectedFilters.badges);
        }
        // Add popular badge if any filter contains "popular"
        Object.values(selectedFilters).forEach(values => {
            values.forEach(value => {
                if (value.toLowerCase().includes('popular')) {
                    badges.push('Popular');
                }
            });
        });
        if (badges.length > 0) {
            params.badges = badges.join(',');
        }

        // Dynamic filters - use filter_name and filter_value for the API
        const dynamicFilterEntries = Object.entries(selectedFilters).filter(([key, values]) => 
            values.length > 0 && !['service_category', 'tags', 'badges'].includes(key)
        );

        if (dynamicFilterEntries.length > 0) {
            // For multiple dynamic filters, we'll use the first one as primary
            // The API might need to be enhanced to handle multiple filter_name/filter_value pairs
            const [filterName, filterValues] = dynamicFilterEntries[0];
            params.filter_name = filterName;
            params.filter_value = filterValues.join(',');
        }

        return params;
    }, [selectedFilters, priceFilterRange, search, defaultPriceRange]);

    // Fetch services with current filters
    const fetchFilteredServices = useCallback(async () => {
        setLoading(true);
        try {
            const apiParams = buildApiParams();
            const fetchedServices = await fetchServices('India', apiParams);
            setServices(fetchedServices);
        } catch (error) {
            console.error('Error fetching filtered services:', error);
            // Keep existing services on error
        } finally {
            setLoading(false);
        }
    }, [buildApiParams]);

    // Debounced effect to fetch services when filters change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchFilteredServices();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [fetchFilteredServices]);

    // Sort services client-side (this could also be moved to API in the future)
    const sortedServices = useMemo(() => {
        return [...transformedServices].sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                case "title":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
    }, [transformedServices, sortBy]);

    // Dynamic filter handlers
    const toggleDynamicFilter = (filterKey: string, value: string) => {
        setSelectedFilters(prev => {
            const currentValues = prev[filterKey] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [filterKey]: newValues
            };
        });
    };

    const resetFilters = () => {
        const emptyFilters: Record<string, string[]> = {};
        Object.keys(filterSections).forEach(sectionKey => {
            emptyFilters[sectionKey] = [];
        });
        setSelectedFilters(emptyFilters);
        setPriceFilterRange(defaultPriceRange);
        setSearch("");
    };

    const activeFilterCount = getActiveFilterCount(selectedFilters, priceFilterRange, search, defaultPriceRange);

    return (
        <div className="grid grid-cols-[1fr_3.5fr] gap-8">
            {/* Filters Sidebar */}
            <motion.aside
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full min-h-screen"
            >
                <ScrollArea className="flex flex-col gap-5 bg-none">
                    {/* Block 1 - Main Filters */}
                    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-primary/10 dark:border-slate-700 p-4 flex flex-col gap-5 mb-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FilterIcon className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-primary text-lg">Filters</h3>
                                {activeFilterCount > 0 && (
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                        {activeFilterCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                onClick={resetFilters}
                            >
                                Clear all
                            </Button>
                        </div>

                        {/* Search */}
                        <div>
                            <Input
                                placeholder="Search services..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="mb-2"
                            />
                        </div>

                        {/* Price Range */}
                        <Accordion type="single" defaultValue="price" className="space-y-4">
                            <AccordionItem value="price">
                                <AccordionTrigger className="flex items-center justify-between">
                                    <span className="font-semibold">Price Range</span>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 w-full">
                                        <Input
                                            type="number"
                                            value={priceFilterRange[0]}
                                            onChange={(e) => setPriceFilterRange([parseInt(e.target.value) || defaultPriceRange[0], priceFilterRange[1]])}
                                            className="w-full"
                                            min={defaultPriceRange[0]}
                                            max={defaultPriceRange[1]}
                                        />
                                        <span className="text-gray-400">–</span>
                                        <Input
                                            type="number"
                                            value={priceFilterRange[1]}
                                            onChange={(e) => setPriceFilterRange([priceFilterRange[0], parseInt(e.target.value) || defaultPriceRange[1]])}
                                            className="w-full"
                                            min={defaultPriceRange[0]}
                                            max={defaultPriceRange[1]}
                                        />
                                    </div>
                                    <Slider
                                        defaultValue={defaultPriceRange}
                                        min={defaultPriceRange[0]}
                                        max={defaultPriceRange[1]}
                                        step={100}
                                        value={priceFilterRange}
                                        onValueChange={(value) => setPriceFilterRange([value[0], value[1]])}
                                        className="w-full mt-4"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Block 2 - All Dynamic Filters from API */}
                    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-primary/10 dark:border-slate-700 p-6 mt-2">
                        <Accordion type="multiple">
                            {/* Render all dynamic filter sections */}
                            {Object.entries(filterSections).map(([sectionKey, section]) => {
                                return (
                                    <AccordionItem key={sectionKey} value={sectionKey}>
                                        <AccordionTrigger>
                                            <span className="font-semibold">{section.title}</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3">
                                                {section.options.map(option => (
                                                    <label
                                                        key={option._id}
                                                        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Checkbox
                                                                checked={selectedFilters[sectionKey]?.includes(option.label)}
                                                                onCheckedChange={() => toggleDynamicFilter(sectionKey, option.label)}
                                                            />
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                                {option.label}
                                                            </span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </ScrollArea>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg dark:text-white">{sortedServices.length} Services Found</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-300">Sort by:</span>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-44 border rounded px-2 py-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                <AnimatePresence>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {sortedServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ delay: idx * 0.07, duration: 0.5, type: "spring" }}
                                className="h-full"
                            >
                                <Card
                                    onClick={() => router.push(`/service/${service.id}`)}
                                    className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800 border dark:border dark:border-slate-700 overflow-hidden cursor-pointer relative h-full flex flex-col"
                                >
                                    {service.popular && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">Popular</Badge>
                                        </div>
                                    )}
                                    <div className="relative">
                                        <img
                                            src={service.image || "/placeholder.svg"}
                                            alt={service.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent dark:from-black/70 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                                                <service.icon className="w-4 h-4" />
                                                <span className="font-medium">{service.category}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {service.level}
                                            </Badge>
                                        </div>

                                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{service.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>{service.rating}</span>
                                                <span className="text-gray-400">({service.reviews})</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {service.features.slice(0, 2).map((feature, featureIdx) => (
                                                <Badge key={featureIdx} variant="secondary" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                                    {feature}
                                                </Badge>
                                            ))}
                                            {service.features.length > 2 && (
                                                <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                    +{service.features.length - 2} more
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        ₹{service.price.toLocaleString()}
                                                    </span>
                                                    {service.originalPrice && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ₹{service.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        <ShoppingCart className="w-4 h-4 mr-1" />
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {!loading && sortedServices.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-gray-400 dark:text-gray-500 mb-4">
                            <Search className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No services found</h3>
                            <p>Try adjusting your filters or search terms</p>
                        </div>
                        <Button 
                            onClick={resetFilters}
                            variant="outline"
                            className="mt-4"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
} 