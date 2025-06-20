"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, Filter, Star, Search, Tag, BarChart3, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type Product, type DynamicFilter, type DynamicFilterSection, type DetailedProduct, fetchPublicProducts } from "@/lib/api"

// Plan types for "Plan type" filter
const planTypes = [
  { name: "All", value: "all" },
  { name: "Lifetime deal", value: "lifetime" },
  { name: "Annual", value: "annual" },
  { name: "Freebie", value: "freebie" },
  { name: "Subscription", value: "subscription" },
  { name: "Digital download", value: "digital" },
]

interface ProductsClientProps {
  products: Product[];
  categories: string[];
  dynamicFilters: DynamicFilter[];
}

export default function ProductsClient({ products: initialProducts, categories, dynamicFilters }: ProductsClientProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Debug when products change
  useEffect(() => {
    console.log('📊 Products state changed:', {
      count: products.length,
      productNames: products.slice(0, 3).map(p => p.name),
      timestamp: new Date().toISOString()
    });
  }, [products]);

  // Debug logging for dynamic filters
  useEffect(() => {
    console.log('ProductsClient received dynamicFilters:', {
      length: dynamicFilters?.length || 0,
      isArray: Array.isArray(dynamicFilters),
      data: dynamicFilters
    });
  }, [dynamicFilters]);

  const [priceRange, setPriceRange] = useState([0, 200])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceInputError, setPriceInputError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPlanType, setSelectedPlanType] = useState("all")
  const [selectedDynamicFilters, setSelectedDynamicFilters] = useState<Record<string, string[]>>({})
  const [minPrice, maxPrice] = priceRange

  const MIN_PRICE = 0
  const MAX_PRICE = 1000

  // Transform DetailedProduct to Product interface
  const transformDetailedProductToProduct = (detailedProduct: DetailedProduct): Product | null => {
    console.log('🔄 Transforming product:', detailedProduct?._id || 'unknown', detailedProduct?.product_name || 'no name');

    if (!detailedProduct) {
      console.warn('❌ Invalid detailed product:', detailedProduct);
      return null;
    }

    if (!detailedProduct._id) {
      console.warn('❌ Product missing _id:', detailedProduct);
      return null;
    }

    const mostPopularPlan = detailedProduct.product_features_and_offers?.find(plan => plan?.is_most_popular);
    const firstPlan = detailedProduct.product_features_and_offers?.[0];
    const selectedPlan = mostPopularPlan || firstPlan;

    const price = selectedPlan?.country_price?.[0]?.monthly_price || 0;

    const transformedProduct = {
      id: detailedProduct.id || parseInt(detailedProduct._id.slice(-8), 16),
      name: detailedProduct.product_name || 'Unknown Product',
      seller: "Starmoon",
      rating: 4.5, // Default rating
      reviews: Math.floor(Math.random() * 100) + 10, // Random reviews count
      price: price,
      image: detailedProduct.product_thumb_image?.startsWith('http')
        ? detailedProduct.product_thumb_image
        : `${process.env.NEXT_PUBLIC_DOMAIN_URL || ''}${detailedProduct.product_thumb_image || '/placeholder.svg'}`,
      category: detailedProduct.product_category || 'Uncategorized',
      type: "Software",
      downloads: Math.floor(Math.random() * 1000) + 100, // Random downloads
      sale: selectedPlan?.is_most_popular || false,
    };

    console.log('✅ Product transformed successfully:', transformedProduct.name, 'ID:', transformedProduct.id);
    return transformedProduct;
  };

  // Fetch products with filters
  const fetchFilteredProducts = useCallback(async (filterName?: string, filterValue?: string) => {
    console.log('🔍 Starting fetchFilteredProducts with:', { filterName, filterValue });
    setIsLoading(true);

    try {
      const params: any = {};

      if (filterName && filterValue) {
        params.filter_name = filterName;
        params.filter_value = filterValue;
        console.log('📡 API params being sent:', params);
      }

      console.log('🌐 Making API call to fetchPublicProducts...');
      const detailedProducts = await fetchPublicProducts('India', params);

      console.log('📦 Raw API response:', {
        isArray: Array.isArray(detailedProducts),
        length: detailedProducts?.length || 0,
        firstItem: detailedProducts?.[0] ? Object.keys(detailedProducts[0]) : 'No items',
        data: detailedProducts
      });

      if (detailedProducts && Array.isArray(detailedProducts) && detailedProducts.length > 0) {
        const activeProducts = detailedProducts.filter(product => product?.is_active);
        console.log('✅ Active products found:', activeProducts.length);

        const transformedProducts = activeProducts
          .map(transformDetailedProductToProduct)
          .filter((product): product is Product => product !== null);

        console.log('🔄 Transformed products:', transformedProducts.length);
        console.log('🔄 Sample transformed product:', transformedProducts[0]);

        setProducts(transformedProducts);
        console.log('✅ Products state updated with', transformedProducts.length, 'items');
      } else {
        // If filtering and no results found, show empty state
        if (filterName && filterValue) {
          console.log('🔍 Filter applied but no products found - showing empty state');
          setProducts([]);
        } else {
          // If no filter applied and no products, reset to initial products
          console.log('⚠️ No filter applied and no products found, resetting to initial products');
          setProducts(initialProducts);
        }
      }
    } catch (error) {
      console.error('❌ Failed to fetch filtered products:', error);
      setProducts(initialProducts);
    } finally {
      setIsLoading(false);
      console.log('🏁 fetchFilteredProducts completed');
    }
  }, [initialProducts]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    console.log('🌍 Environment check:', {
      DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
      NODE_ENV: process.env.NODE_ENV,
      initialProductsCount: initialProducts.length
    });
  }, []);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
  ]

  // Helper function to toggle dynamic filter values
  const toggleDynamicFilter = (filterName: string, value: string) => {
    console.log('🎯 toggleDynamicFilter called with:', { filterName, value });

    setSelectedDynamicFilters(prev => {
      const currentValues = prev[filterName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      console.log('🔄 Filter state changing:', {
        filterName,
        previousValues: currentValues,
        newValues,
        action: currentValues.includes(value) ? 'REMOVE' : 'ADD'
      });

      const updatedFilters = {
        ...prev,
        [filterName]: newValues
      };

      // Trigger API call with the selected filter
      if (newValues.length > 0) {
        // Use the first selected value for the API call
        console.log('🚀 Triggering API call with filter:', filterName, newValues[0]);
        fetchFilteredProducts(filterName, newValues[0]);
      } else {
        // If no filters selected, fetch all products
        console.log('🔄 No filters selected, fetching all products');
        fetchFilteredProducts();
      }

      return updatedFilters;
    });
  };

  const handlePriceInputChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    setPriceInputError(null)

    if (type === 'min') {
      if (numValue > priceRange[1]) {
        setPriceInputError('Minimum price cannot be greater than maximum price')
        return
      }
      if (numValue < MIN_PRICE) {
        setPriceInputError(`Minimum price cannot be less than $${MIN_PRICE}`)
        return
      }
      setPriceRange([numValue, priceRange[1]])
    } else {
      if (numValue < priceRange[0]) {
        setPriceInputError('Maximum price cannot be less than minimum price')
        return
      }
      if (numValue > MAX_PRICE) {
        setPriceInputError(`Maximum price cannot be greater than $${MAX_PRICE}`)
        return
      }
      setPriceRange([priceRange[0], numValue])
    }
  }

  const toggleCategory = (cat: string) =>
    setSelectedCategories(cats =>
      cats.includes(cat) ? cats.filter(c => c !== cat) : [...cats, cat]
    )

  const resetFilters = () => {
    console.log('🔄 Resetting all filters');
    setSelectedCategories([])
    setSelectedDynamicFilters({})
    setSelectedPlanType("all")
    setPriceRange([MIN_PRICE, MAX_PRICE])
    setSearchTerm("")
    setPriceInputError(null)

    // Reset products to initial state immediately for better UX
    setProducts(initialProducts)
    console.log('✅ Filters reset, showing', initialProducts.length, 'initial products');
  }

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    if (!product) return false;

    const matchesSearch = product.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product.seller?.toLowerCase().includes(searchTerm?.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice

    // Check dynamic filters - this would need to be matched against product properties
    // For now, we'll assume all products match dynamic filters since we don't have 
    // the product's dynamic filter values in the Product interface
    const matchesDynamicFilters = true;

    return matchesSearch && matchesCategory && matchesPrice && matchesDynamicFilters
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Products</h1>
          <p className="text-gray-600">Discover amazing products from our marketplace</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Price Range</Label>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={MAX_PRICE}
                      min={MIN_PRICE}
                      step={10}
                      className="mb-4"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => handlePriceInputChange('min', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => handlePriceInputChange('max', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  {priceInputError && (
                    <p className="text-red-500 text-xs mt-1">{priceInputError}</p>
                  )}
                </div>

                {/* Filters Accordion */}
                <Accordion type="multiple" defaultValue={["categories"]} className="w-full">
                  {/* Categories */}
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-sm font-medium">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label
                              htmlFor={category}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Dynamic Filters */}
                  {dynamicFilters && dynamicFilters.length > 0 &&
                    dynamicFilters.map((filterGroup) =>
                      filterGroup.sections.map((section: DynamicFilterSection) => (
                        <AccordionItem key={section._id} value={section._id}>
                          <AccordionTrigger className="text-sm font-medium">
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {section.options.map((option) => (
                                <div key={option._id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${section.title}-${option.label}`}
                                    checked={selectedDynamicFilters[section.title]?.includes(option.label) || false}
                                    onCheckedChange={() => toggleDynamicFilter(section.title, option.label)}
                                  />
                                  <Label
                                    htmlFor={`${section.title}-${option.label}`}
                                    className="text-sm font-normal cursor-pointer"
                                  >
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    )
                  }

                  {/* Plan Type - Hidden for now as commented out */}
                  {/* <AccordionItem value="plan-type">
                    <AccordionTrigger className="text-sm font-medium">
                      Plan Type
                    </AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup value={selectedPlanType} onValueChange={setSelectedPlanType}>
                        {planTypes.map((type) => (
                          <div key={type.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={type.value} id={type.value} />
                            <Label htmlFor={type.value} className="text-sm font-normal cursor-pointer">
                              {type.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem> */}
                </Accordion>


              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort" className="text-sm font-medium">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Filtering products...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Card
                      className="overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white border border-gray-200 rounded-xl"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      <CardHeader className="p-0">
                        {/* Product Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.sale && (
                            <Badge className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                              Sale
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-5">
                        {/* Category and Rating Row */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 px-2 py-1">
                            {product.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Product Title */}
                        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() => router.push(`/products/${product.id}`)}>
                          {product.name}
                        </h3>

                        {/* Seller */}
                        <p className="text-sm text-gray-500 mb-4">{product.seller}</p>

                        {/* Price and Downloads Row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold text-primary">
                              ${product.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.downloads} downloads
                            </span>
                          </div>
                          {/* Add to Cart Button */}
                          <Button
                            className="w-fit bg-primary hover:bg-primary/80 text-white rounded-lg py-2.5 font-medium transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to cart functionality here
                              console.log('Added to cart:', product.name);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>

                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found matching your criteria</p>
                <Button onClick={resetFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 