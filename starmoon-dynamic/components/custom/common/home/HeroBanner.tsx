'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { type Banner } from "@/lib/api"

interface HeroBannerProps {
  bannerData?: Banner[]
}

// Fallback data in case API fails
const fallbackBannerSlides: Banner[] = [
  {
    id: "1",
    title: "Transform Your Business with Premium Software Solutions",
    subtitle: "Powerful CRM & Business Management Tools",
    description: "Get started with industry-leading software solutions. Special offer: 30% off on annual plans + Free consultation worth $499",
    primaryButtonText: "Start Free Trial",
    primaryButtonLink: "/trial",
    secondaryButtonText: "Schedule Demo",
    secondaryButtonLink: "/demo",
    background: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-blue-800 to-purple-900",
    image: "https://placehold.co/1200x800/4F46E5/ffffff?text=CRM+Dashboard",
    badge: "30% OFF",
    sort_order: 1,
    is_active: true,
    country: "India",
  },
  // {
  //   id: "2",
  //   title: "Automate & Scale Your Marketing",
  //   subtitle: "AI-Powered Marketing Automation Suite",
  //   description: "Launch campaigns, analyze data, and boost ROI with our marketing tools. Limited time: Get 3 months free on yearly subscription",
  //   primaryButtonText: "Get Started",
  //   primaryButtonLink: "/marketing",
  //   secondaryButtonText: "View Features",
  //   secondaryButtonLink: "/features",
  //   background: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-teal-600 to-cyan-700",
  //   image: "https://placehold.co/1200x800/059669/ffffff?text=Marketing+Automation",
  //   badge: "3 MONTHS FREE",
  //   sort_order: 2,
  //   is_active: true,
  //   country: "India",
  // },
  // {
  //   id: "3",
  //   title: "Expert Business Consultation",
  //   subtitle: "Strategic Growth & Digital Transformation",
  //   description: "Book a session with our industry experts. First consultation free + Comprehensive business analysis report worth $999",
  //   primaryButtonText: "Book Consultation",
  //   primaryButtonLink: "/consultation",
  //   secondaryButtonText: "Meet Experts",
  //   secondaryButtonLink: "/experts",
  //   background: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-red-600 to-rose-700",
  //   image: "https://placehold.co/1200x800/EA580C/ffffff?text=Business+Consulting",
  //   badge: "FREE SESSION",
  //   sort_order: 3,
  //   is_active: true,
  //   country: "India",
  // },
  // {
  //   id: "4",
  //   title: "All-in-One Communication Suite",
  //   subtitle: "Unified Business Communication Platform",
  //   description: "Chat, call, video conference, and collaborate. Bundle offer: Save 40% + Get premium support package free",
  //   primaryButtonText: "Try It Free",
  //   primaryButtonLink: "/communication",
  //   secondaryButtonText: "Compare Plans",
  //   secondaryButtonLink: "/plans",
  //   background: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-600 to-pink-700",
  //   image: "https://placehold.co/1200x800/6D28D9/ffffff?text=Communication+Suite",
  //   badge: "40% OFF",
  //   sort_order: 4,
  //   is_active: true,
  //   country: "India",
  // },
]

export default function HeroBanner({ bannerData }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Use API data if available, otherwise fallback to default
  const bannerSlides = bannerData && bannerData.length > 0
    ? bannerData
      .filter(banner => banner.is_active)
      .sort((a, b) => a.sort_order - b.sort_order)
    : fallbackBannerSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [bannerSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
        >
          <div className={`h-full ${slide.background} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent dark:from-slate-900/70 dark:via-slate-800/50 dark:to-transparent z-10" />
            <div className="container mx-auto px-4 h-full relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  {slide.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-block"
                    >
                      <span className="px-4 py-1.5 bg-white/90 dark:bg-slate-800/90 text-primary dark:text-blue-400 font-semibold rounded-full text-sm tracking-wide border border-white/20 dark:border-slate-700">
                        {slide.badge}
                      </span>
                    </motion.div>
                  )}
                  <div className="space-y-6">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-4xl xl:text-5xl font-bold leading-[1.1] font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 dark:from-gray-100 dark:to-gray-300"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-xl xl:text-2xl font-medium text-white/90 dark:text-gray-200 font-display tracking-wide"
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-base xl:text-lg text-white/80 dark:text-gray-300 max-w-lg font-light leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Link href={slide.primaryButtonLink || "#"}>
                      <Button size="lg" className="text-base px-8 py-6 bg-white dark:bg-slate-100 text-primary dark:text-slate-900 hover:bg-white/90 dark:hover:bg-slate-200 rounded-full font-medium shadow-lg shadow-black/10 dark:shadow-black/20">
                        {slide.primaryButtonText || "Get Started"}
                      </Button>
                    </Link>
                    <Link href={slide.secondaryButtonLink || "#"}>
                      <Button
                        size="lg"
                        className="text-base px-8 py-6 border-white dark:border-gray-300 text-white dark:text-gray-200 hover:bg-white/20 dark:hover:bg-slate-800/30 rounded-full font-medium"
                      >
                        {slide.secondaryButtonText || "Learn More"}
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="hidden lg:block relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-slate-900/40 dark:to-transparent rounded-2xl" />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${slide.image}`}
                    alt={slide.title}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl object-cover w-full aspect-[4/3] shadow-black/20"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 dark:bg-slate-800/30 hover:bg-white/20 dark:hover:bg-slate-700/50 text-white dark:text-gray-200 p-2 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20 dark:border-slate-600"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 dark:bg-slate-800/30 hover:bg-white/20 dark:hover:bg-slate-700/50 text-white dark:text-gray-200 p-2 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20 dark:border-slate-600"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide
                ? "bg-white dark:bg-gray-200 scale-125"
                : "bg-white/50 dark:bg-gray-400/50 hover:bg-white/70 dark:hover:bg-gray-300/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
} 