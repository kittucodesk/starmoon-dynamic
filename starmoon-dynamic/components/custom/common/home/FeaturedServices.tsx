'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import ServiceCard from "@/components/custom/common/ServiceCard"
import { fetchServices, Service as ApiService, ServiceListingParams } from "@/lib/api"

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  icon: string;
}

// Helper function to transform API service data to ServiceCard format
const transformServiceData = (apiService: ApiService): Service => {
  // Get the most popular plan or first plan for pricing
  const mostPopularPlan = apiService.service_features_and_offers?.find(plan => plan.is_most_popular);
  const firstPlan = apiService.service_features_and_offers?.[0];
  const selectedPlan = mostPopularPlan || firstPlan;
  
  // Extract price from the selected plan
  const getPrice = () => {
    if (!selectedPlan) return 'Contact Us';
    const countryPrice = selectedPlan.country_price?.[0];
    if (!countryPrice) return 'Contact Us';
    
    const monthlyPrice = countryPrice.monthly_price;
    const currency = countryPrice.currency || 'USD';
    return `${currency} ${monthlyPrice}/month`;
  };

  // Extract features from tags or service features
  const getFeatures = (): string[] => {
    const features: string[] = [];
    
    // Add tags as features
    if (apiService.tags && Array.isArray(apiService.tags)) {
      features.push(...apiService.tags.slice(0, 3));
    }
    
    // Add plan features if available
    if (selectedPlan?.features && Array.isArray(selectedPlan.features)) {
      const planFeatures = selectedPlan.features
        .slice(0, 2)
        .map(feature => feature.name || String(feature))
        .filter(Boolean);
      features.push(...planFeatures);
    }
    
    return features.slice(0, 3);
  };

  // Generate a numeric ID from the MongoDB ObjectId
  const generateNumericId = (objectId: string): number => {
    // Take the last 8 characters of the ObjectId and convert to base 16
    return parseInt(objectId.slice(-8), 16);
  };

  return {
    id: apiService.id || generateNumericId(apiService._id),
    title: apiService.service_name,
    description: apiService.service_description,
    image: apiService.service_thumb_image.startsWith('http') 
      ? apiService.service_thumb_image 
      : `${process.env.NEXT_PUBLIC_DOMAIN_URL}${apiService.service_thumb_image}`,
    price: getPrice(),
    features: getFeatures(),
    icon: apiService.service_category.toLowerCase().replace(/\s+/g, '-') // Generate icon based on category
  };
};

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch services from API
        const apiServices = await fetchServices('India', { per_page: 8 }); // Limit to 8 services for featured section
        const transformedServices = apiServices
          .filter(service => service.is_active)
          .map(transformServiceData);
        
        setServices(transformedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to static data if API fails
        try {
          const sRes = await fetch("/data/services.json");
          const fallbackServices = await sRes.json();
          setServices(fallbackServices);
        } catch (fallbackError) {
          console.error('Error fetching fallback services:', fallbackError);
          setServices([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full py-16 relative overflow-hidden container mx-auto px-4 rounded-md">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-200 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4 md:px-6 relative z-10"
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 dark:border-primary/40 text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-primary/10 dark:bg-slate-800/50">Our Services</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-secondary dark:from-blue-400 dark:via-blue-300 dark:to-purple-400">
            Featured Services
          </h2>
          <p className="text-muted-foreground dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your business with our specialized services tailored for success
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-blue-400"></div>
            </div>
          ) : services.length > 0 ? (
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
              className="!py-8"
            >
              {services.map((service, index) => (
                <SwiperSlide key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground dark:text-gray-300 text-lg">
                No services available at the moment
              </p>
            </div>
          )}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link href="/services" className="group">
            <Button
              variant="outline"
              className="border-2 border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 font-medium text-lg px-8 shadow-lg shadow-primary/5 dark:shadow-primary/10 hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-300 dark:text-gray-200 dark:hover:text-white"
            >
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
} 