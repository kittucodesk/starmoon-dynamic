"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { type Testimonial } from "@/lib/api"

interface TestimonialSectionProps {
  testimonialData?: Testimonial[]
}

// Fallback data in case API fails
const fallbackTestimonials = [
    {
        id: "1",
        name: "Rajesh Kumar",
        designation: "CEO",
        company: "TechVision Solutions",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        testimonial: "Starmoon Consulting has been instrumental in transforming our business processes. Their team is highly responsive and always ready to assist with any queries. The quality of their products and services is top-notch.",
        category: "business transformation",
        color: "from-blue-500 to-purple-600",
        bgPattern: "dots",
        country: "India",
        is_active: true,
        sort_order: 1,
    },
    {
        id: "2",
        name: "Anjali Mehta",
        designation: "CTO",
        company: "Digital Dynamics",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        testimonial: "We partnered with Starmoon for our digitalization needs, and the results have been outstanding. Their expertise in CAD software and cloud solutions has significantly improved our operational efficiency.",
        category: "digitalization excellence",
        color: "from-green-500 to-teal-600",
        bgPattern: "waves",
        country: "India",
        is_active: true,
        sort_order: 2,
    },
    {
        id: "3",
        name: "Vikram Singh",
        designation: "Head of Operations",
        company: "InnovateCorp",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        testimonial: "Starmoon's corporate training programs are excellent. Our team has greatly benefited from their training sessions on the latest technologies. Their professional approach and reliable support make them a trusted partner.",
        category: "corporate training",
        color: "from-orange-500 to-red-600",
        bgPattern: "circles",
        country: "India",
        is_active: true,
        sort_order: 3,
    },
    {
        id: "4",
        name: "Priya Sharma",
        designation: "Director",
        company: "FutureTech Labs",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        testimonial: "The automation solutions provided by Starmoon have revolutionized our workflow. We've seen a 40% increase in productivity and significant cost savings. Highly recommended!",
        category: "workflow automation",
        color: "from-pink-500 to-rose-600",
        bgPattern: "triangles",
        country: "India",
        is_active: true,
        sort_order: 4,
    },
    {
        id: "5",
        name: "Arjun Patel",
        designation: "Founder",
        company: "StartupHub",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        testimonial: "As a startup, we needed scalable solutions that could grow with us. Starmoon delivered exactly that. Their strategic planning and implementation have been game-changing for our business.",
        category: "scalable solutions",
        color: "from-indigo-500 to-blue-600",
        bgPattern: "hexagons",
        country: "India",
        is_active: true,
        sort_order: 5,
    },
]

// Helper function to assign colors to testimonials
const getTestimonialColor = (index: number) => {
    const colors = [
        "from-blue-500 to-purple-600",
        "from-green-500 to-teal-600", 
        "from-orange-500 to-red-600",
        "from-pink-500 to-rose-600",
        "from-indigo-500 to-blue-600",
        "from-cyan-500 to-blue-600",
        "from-purple-500 to-pink-600",
        "from-amber-500 to-orange-600"
    ];
    return colors[index % colors.length];
}

// Transform API data to component format
const transformTestimonialData = (apiData: Testimonial[]) => {
    return apiData
        .filter(testimonial => testimonial.is_active)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((testimonial, index) => ({
            id: testimonial.id,
            name: testimonial.name,
            role: testimonial.designation,
            company: testimonial.company,
            image: testimonial.avatar,
            rating: testimonial.rating,
            text: testimonial.testimonial,
            highlight: testimonial.category || "customer success",
            color: getTestimonialColor(index),
            bgPattern: "dots",
        }));
}

const FloatingElement = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
    <div
        className="absolute opacity-20 animate-bounce"
        style={{
            animationDelay: `${delay}s`,
            animationDuration: "3s",
        }}
    >
        {children}
    </div>
)

export default function TestimonialSection({ testimonialData }: TestimonialSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    // Use API data if available, otherwise fallback to default
    const testimonials = testimonialData && testimonialData.length > 0 
        ? transformTestimonialData(testimonialData)
        : fallbackTestimonials.map((testimonial, index) => ({
            id: testimonial.id,
            name: testimonial.name,
            role: testimonial.designation,
            company: testimonial.company,
            image: testimonial.avatar,
            rating: testimonial.rating,
            text: testimonial.testimonial,
            highlight: testimonial.category,
            color: testimonial.color,
            bgPattern: testimonial.bgPattern,
        }));

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, testimonials.length])

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const getVisibleTestimonials = () => {
        const visible = []
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length
            visible.push({ ...testimonials[index], position: i })
        }
        return visible
    }

    return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
            {/* Floating Background Elements */}
            <FloatingElement delay={0}>
                <div className="w-20 h-20 bg-blue-200 dark:bg-blue-800/30 rounded-full blur-xl"></div>
            </FloatingElement>
            <FloatingElement delay={1}>
                <div className="w-16 h-16 bg-purple-200 dark:bg-purple-800/30 rounded-full blur-lg" style={{ left: "80%", top: "20%" }}></div>
            </FloatingElement>
            <FloatingElement delay={2}>
                <div className="w-12 h-12 bg-green-200 dark:bg-green-800/30 rounded-full blur-lg" style={{ left: "10%", top: "70%" }}></div>
            </FloatingElement>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center space-x-2 mb-4">
                    {/* <Star className="w-6 h-6 text-yellow-500 fill-current" /> */}
                    <Badge variant="outline" className="text-sm font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm dark:border-slate-600 dark:text-gray-200">
                        Customer Stories
                    </Badge>
                    {/* <Star className="w-6 h-6 text-yellow-500 fill-current" /> */}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    Why people love{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Starmoon</span> ?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We continuously improve our services based on the opinion of our users
                </p>
            </div>

            {/* Main Testimonial Carousel */}
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {getVisibleTestimonials().map((testimonial, index) => (
                        <Card
                            key={`${testimonial.id}-${currentIndex}`}
                            className={`relative overflow-hidden transition-all duration-700 transform hover:scale-105 cursor-pointer dark:bg-slate-800 dark:border-slate-700 ${index === 1 ? "md:scale-110 z-20 shadow-2xl" : "md:scale-95 z-10"
                                } ${hoveredCard === Number(testimonial.id) ? "shadow-2xl" : "shadow-lg"}`}
                            onMouseEnter={() => setHoveredCard(Number(testimonial.id))}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Background Pattern */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-5 dark:opacity-10`}></div>

                            {/* Floating Quote */}
                            <div className="absolute top-4 right-4 opacity-10 dark:opacity-20">
                                <Quote className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                            </div>

                            <CardContent className="p-8 relative z-10">
                                {/* Rating Stars */}
                                <div className="flex space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</blockquote>

                                {/* Highlight Badge */}
                                <Badge className={`mb-4 bg-gradient-to-r ${testimonial.color} text-white border-none`}>
                                    {testimonial.highlight}
                                </Badge>

                                {/* Author Info */}
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <img
                                            src={testimonial.image?.startsWith('/api/') 
                                                ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${testimonial.image}`
                                                : testimonial.image || "/placeholder.svg"
                                            }
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-600 shadow-lg"
                                        />
                                        <div
                                            className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r ${testimonial.color} rounded-full border-2 border-white dark:border-slate-800`}
                                        ></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Hover Effect Overlay */}
                            {hoveredCard === Number(testimonial.id) && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 dark:from-slate-700/20 to-transparent pointer-events-none"></div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center items-center space-x-6">
                    <button
                        onClick={prevTestimonial}
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 dark:border dark:border-slate-700"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-500 dark:bg-blue-400 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 dark:border dark:border-slate-700"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Auto-play Toggle */}
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 dark:border dark:border-slate-700"
                    >
                        {isAutoPlaying ? <Pause className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : <Play className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                    </button>
                </div>

                {/* Stats Section */}
                {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: "500+", label: "Happy Clients" },
                        { number: "98%", label: "Satisfaction Rate" },
                        { number: "50+", label: "Projects Completed" },
                        { number: "24/7", label: "Support Available" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div> */}
            </div>
        </motion.div>
    )
}
