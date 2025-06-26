'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Users, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import ExpertCard from "@/components/custom/common/ExpertCard"
import { fetchConsultations, Consultation as ApiConsultation } from "@/lib/api"

interface Consultation {
  id: number;
  badge?: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  rating: number;
  reviews: number;
  rate: string;
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  icon: string;
  consultation_category: string;
}

// Transform API consultation data to match ExpertCard expected format
function transformConsultationData(apiConsultation: ApiConsultation): Consultation {
  // Extract pricing information from hourly rate
  const hourlyRate = apiConsultation.hourly_rate || 0;
  const currency = apiConsultation.currency || 'INR';

  // Create skills array from specialization, tags, and features
  const skills = [
    // apiConsultation.specialization,
    ...apiConsultation.tags.slice(0, 3),
    // ...(apiConsultation.features?.slice(0, 2).map(f => f.title) || [])
  ].filter(Boolean).slice(0, 5);

  // Generate a numeric ID from MongoDB ObjectId
  const numericId = parseInt(apiConsultation._id.slice(-8), 16);

  // Calculate average rating from testimonials
  const avgRating = apiConsultation.testimonials?.length > 0 
    ? apiConsultation.testimonials.reduce((sum, t) => sum + t.rating, 0) / apiConsultation.testimonials.length
    : 4.8;

  return {
    id: numericId,
    badge: apiConsultation.badges || apiConsultation.consultation_category || 'Expert',
    name: apiConsultation.name,
    avatar: apiConsultation.profile_image ? 
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${apiConsultation.profile_image}` : 
      '/placeholder-user.jpg',
    bio: apiConsultation.about || '',
    skills: skills,
    rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
    reviews: apiConsultation.testimonials?.length || Math.floor(Math.random() * 50) + 10,
    rate: hourlyRate > 0 ? `${currency} ${hourlyRate}/hour` : 'Contact for pricing',
    title: `${apiConsultation.name} - ${apiConsultation.specialization}`,
    consultation_category: apiConsultation.consultation_category,
    description: apiConsultation.about || '',
    image: apiConsultation.profile_image ? 
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${apiConsultation.profile_image}` : 
      '/placeholder.jpg',
    price: hourlyRate > 0 ? `${currency} ${hourlyRate}/hr` : 'Contact for pricing',
    features: apiConsultation.features?.map(f => f.title) || [],
    icon: '/placeholder.svg'
  };
}

export default function ConsultationSection() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch consultations from API
        const apiConsultations = await fetchConsultations('India', {
          per_page: 8, // Limit to 8 consultations for the section
        });

        // Filter only active consultations and transform data
        const activeConsultations = apiConsultations
          .filter(consultation => consultation.is_active)
          .map(transformConsultationData);

        setConsultations(activeConsultations);
      } catch (error) {
        console.error('Failed to fetch consultations:', error);
        
        // Fallback to static JSON data if API fails
        try {
          const cRes = await fetch("/data/consultations.json");
          const fallbackData = await cRes.json();
          // setConsultations(fallbackData);
        } catch (fallbackError) {
          console.error('Failed to fetch fallback consultations:', fallbackError);
          setConsultations([]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <section id="consultation" className="w-full py-12 relative overflow-hidden container mx-auto px-4 rounded-md">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-200 to-purple-100 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 dark:backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4 md:px-6 relative z-10"
      >
        {/* Header section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge 
              variant="outline" 
              className="bg-primary/5 dark:bg-primary/10 text-primary dark:text-blue-400 border-primary/20 dark:border-primary/30 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-300"
            >
              Expert Consultation
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-blue-400 dark:to-blue-300 dark:drop-shadow-sm">
              Professional Consultation Services
            </h2>
            <p className="max-w-[900px] text-muted-foreground dark:text-gray-300/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose from our range of expert consultation packages designed to address your specific business needs
              and challenges.
            </p>
          </div>
        </div>
        
        {/* Loading state */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
              </div>
            ))}
          </div>
        ) : consultations.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-muted-foreground dark:text-gray-400">
              No consultations available at the moment.
            </p>
          </div>
        ) : (
          // Swiper section
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
            navigation={true}
          >
            {consultations.map((expert, index) => (
              <SwiperSlide key={expert.id} className="h-full">
                <ExpertCard expert={expert} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Trust indicators */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-gray-300/90 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300">
              <Award className="h-5 w-5 text-primary dark:text-blue-400" />
              <span>20+ Years Experience</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-gray-300/90 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300">
              <Users className="h-5 w-5 text-primary dark:text-blue-400" />
              <span>500+ Successful Projects</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-gray-300/90 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-primary dark:text-blue-400" />
              <span>Industry Certified Experts</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-gray-300/90 hover:text-primary dark:hover:text-blue-400 transition-colors duration-300">
              <Star className="h-5 w-5 text-primary dark:text-blue-400" />
              <span>98% Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center mt-8">
          <Link href="/consultation">
            <Button 
              variant="outline" 
              size="lg" 
              className="dark:border-slate-600/50 dark:text-gray-200 dark:hover:bg-slate-800/80 dark:hover:border-slate-500 dark:hover:shadow-lg dark:hover:shadow-slate-900/20 transition-all duration-300"
            >
              View All Consultation
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
} 