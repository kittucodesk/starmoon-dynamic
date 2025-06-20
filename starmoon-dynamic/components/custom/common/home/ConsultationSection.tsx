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
}

export default function ConsultationSection() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cRes = await fetch("/data/consultations.json")
      setConsultations(await cRes.json())
    }
    fetchData()
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
              className="bg-primary/5 dark:bg-primary/10 text-primary dark:text-blue-400 border-primary/20 dark:border-primary/30 dark:bg-slate-800/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-300"
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
        
        {/* Swiper section */}
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
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {consultations?.map((expert, index) => (
            <SwiperSlide key={index} className="h-full">
              <ExpertCard key={index} expert={expert} />
            </SwiperSlide>
          ))}
        </Swiper>

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
          <Link href="/browse">
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