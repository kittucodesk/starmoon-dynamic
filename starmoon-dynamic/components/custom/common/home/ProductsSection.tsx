'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import ProductCard from "@/components/custom/common/ProductCard"
import { fetchProductCategories, fetchPublicProducts, ProductCategory, DetailedProduct, ProductListingParams } from "@/lib/api"

interface ProductPricing {
  monthly: string;
  yearly: string;
  currency: string;
  discount?: string;
  original_yearly?: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  badge?: string;
  ribbon?: string;
  pricing: ProductPricing;
}

// Helper function to transform API product data to ProductCard format
const transformProductData = (apiProduct: DetailedProduct): Product => {
  // Ensure apiProduct exists and has required fields
  if (!apiProduct || !apiProduct._id || !apiProduct.product_name) {
    console.warn('Invalid product data:', apiProduct);
    return {
      id: 0,
      title: 'Unknown Product',
      category: 'Unknown',
      description: 'No description available',
      image: '/placeholder.svg',
      features: [],
      badge: undefined,
      ribbon: undefined,
      pricing: {
        monthly: 'Contact Us',
        yearly: 'Contact Us',
        currency: 'USD',
        discount: undefined,
        original_yearly: undefined,
      }
    };
  }

  // Get the most popular plan or first plan for pricing
  const mostPopularPlan = apiProduct.product_features_and_offers?.find(plan => plan?.is_most_popular);
  const firstPlan = apiProduct.product_features_and_offers?.[0];
  const selectedPlan = mostPopularPlan || firstPlan;
  
  // Transform features from plan features and tags
  const transformFeatures = (): string[] => {
    const features: string[] = [];
    
    // Add tags as features (with safety checks)
    if (apiProduct.tags && Array.isArray(apiProduct.tags)) {
      const validTags = apiProduct.tags
        .filter(tag => tag && typeof tag === 'string')
        .slice(0, 2);
      features.push(...validTags);
    }
    
    // Add plan features if available (with safety checks)
    if (selectedPlan?.features && Array.isArray(selectedPlan.features)) {
      const planFeatures = selectedPlan.features
        .filter(feature => feature && feature.name && feature.value)
        .slice(0, 2)
        .map(feature => `${feature.name}: ${feature.value}`)
        .filter(Boolean);
      features.push(...planFeatures);
    }
    
    return features.slice(0, 3);
  };

  // Extract pricing information
  const getPricing = () => {
    if (!selectedPlan) {
      return {
        monthly: 'Contact Us',
        yearly: 'Contact Us',
        currency: 'USD',
        discount: undefined,
        original_yearly: undefined,
      };
    }

    const countryPrice = selectedPlan.country_price?.[0];
    if (!countryPrice || typeof countryPrice.monthly_price !== 'number' || typeof countryPrice.yearly_price !== 'number') {
      return {
        monthly: 'Contact Us',
        yearly: 'Contact Us',
        currency: 'USD',
        discount: undefined,
        original_yearly: undefined,
      };
    }

    const monthlyPrice = countryPrice.monthly_price;
    const yearlyPrice = countryPrice.yearly_price;
    const currency = countryPrice.currency || 'USD';
    
    // Calculate discount if yearly price is less than 12 months of monthly
    const yearlyFromMonthly = monthlyPrice * 12;
    const hasDiscount = yearlyPrice < yearlyFromMonthly;
    const discountPercent = hasDiscount ? Math.round(((yearlyFromMonthly - yearlyPrice) / yearlyFromMonthly) * 100) : 0;

    return {
      monthly: `${currency} ${monthlyPrice}/month`,
      yearly: `${currency} ${yearlyPrice}/year`,
      currency,
      discount: hasDiscount ? `${discountPercent}% OFF` : undefined,
      original_yearly: hasDiscount ? `${currency} ${yearlyFromMonthly}/year` : undefined,
    };
  };

  // Generate a numeric ID from the MongoDB ObjectId
  const generateNumericId = (objectId: string): number => {
    if (!objectId || typeof objectId !== 'string' || objectId.length < 8) {
      return Math.floor(Math.random() * 1000000); // Fallback random ID
    }
    return parseInt(objectId.slice(-8), 16);
  };

  // Safe image URL handling
  const getImageUrl = (): string => {
    if (!apiProduct.product_thumb_image) {
      return '/placeholder.svg';
    }
    
    if (apiProduct.product_thumb_image.startsWith('http')) {
      return apiProduct.product_thumb_image;
    }
    
     
    return `${process.env.NEXT_PUBLIC_DOMAIN_URL}${apiProduct.product_thumb_image}`;
  };

  // Safe ribbon detection
  const getRibbon = (): string | undefined => {
    if (!apiProduct.tags || !Array.isArray(apiProduct.tags)) {
      return undefined;
    }
    
    return apiProduct.tags.find(tag => 
      tag && 
      typeof tag === 'string' && 
      (tag.toLowerCase().includes('popular') || tag.toLowerCase().includes('bestseller'))
    );
  };

  return {
    id: apiProduct.id || generateNumericId(apiProduct._id),
    title: apiProduct.product_name || 'Unknown Product',
    category: apiProduct.product_category || 'Unknown',
    description: apiProduct.product_description || 'No description available',
    image: getImageUrl(),
    features: transformFeatures(),
    badge: (typeof apiProduct.badges === 'string' && apiProduct.badges) ? apiProduct.badges : undefined,
    ribbon: getRibbon(),
    pricing: getPricing()
  };
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Top Products"]);
  const [selectedCategory, setSelectedCategory] = useState("Top Products")
  const [loading, setLoading] = useState(false)

  // Function to fetch products based on category selection
  const fetchProducts = async (category: string) => {
    setLoading(true)
    try {
      const params: ProductListingParams = {}
      
      if (category === "Top Products") {
        params.badges = "Top Pick"
      } else {
        params.product_category = category
      }

      const apiProducts = await fetchPublicProducts('India', params)
      
      // Ensure apiProducts is an array
      if (!Array.isArray(apiProducts)) {
        console.warn('API returned non-array data:', apiProducts);
        setProducts([]);
        return;
      }

      const transformedProducts = apiProducts
        .filter(product => product && product.is_active)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map(product => {
          try {
            return transformProductData(product);
          } catch (error) {
            console.error('Error transforming product:', product, error);
            return null;
          }
        })
        .filter(Boolean) as Product[]; // Remove null values
      
      setProducts(transformedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to empty array
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product categories from API
        const categoriesData = await fetchProductCategories('India')
        
        // Ensure categoriesData is an array
        if (!Array.isArray(categoriesData)) {
          console.warn('Categories API returned non-array data:', categoriesData);
          setCategories(["Top Products", "CRM", "Automation", "Marketing", "Communication"]);
          return;
        }

        const activeCategories = categoriesData
          .filter(cat => cat && cat.is_active && cat.product_category_name)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map(cat => cat.product_category_name)
          .filter(Boolean); // Remove any falsy values
        
        // Combine "Top Products" with API categories
        setCategories(["Top Products", ...activeCategories])
        
        // Fetch initial products for "Top Products"
        await fetchProducts("Top Products")
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to default categories
        setCategories(["Top Products", "CRM", "Automation", "Marketing", "Communication"])
        setProducts([])
      }
    }
    
    // Only run on client side to prevent server-side rendering issues
    if (typeof window !== 'undefined') {
      fetchData()
    }
  }, []);

  // Handle category change
  useEffect(() => {
    // Only run on client side and if category is valid
    if (typeof window !== 'undefined' && selectedCategory) {
      fetchProducts(selectedCategory)
    }
  }, [selectedCategory]);

  // No need to filter products since we're fetching them based on category selection
  const filteredProducts = products

  return (
    <section id="products" className="w-full py-12 relative overflow-hidden container mx-auto px-4 rounded-md">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-200 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4 md:px-6 relative z-10"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-blue-400 dark:to-blue-300">
              Innovative Products for Modern Business
            </h2>
            <p className="max-w-[900px] text-muted-foreground dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our range of cutting-edge products designed to streamline operations and boost productivity.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mt-8 border-b dark:border-slate-700">
          <Tabs defaultValue="Top Products" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="border-b-0 bg-transparent p-0 h-12">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary/10 dark:data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-blue-400 rounded-full px-6 h-10 text-base dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            size="sm"
            variant="outline"
            className="-mt-1 hover:bg-primary hover:text-white dark:border-slate-600 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-white transition-colors rounded-full"
            onClick={() => window.location.href = "/products"}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-blue-400"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            navigation={true}
            className="!py-8"
          >
            {filteredProducts.map((product, i) => (
              <SwiperSlide key={product.id} className="h-full">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground dark:text-gray-300 text-lg">
              No products found for {selectedCategory}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
} 