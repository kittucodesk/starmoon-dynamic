"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Target, 
  Lightbulb, 
  Heart, 
  Users, 
  Settings, 
  BarChart3, 
  ArrowRight, 
  Rocket,
  Shield,
  Sparkles,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  Award
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { type AboutUs } from "@/lib/api"

interface AboutProps {
  aboutUsData?: AboutUs
}

const features = [
    {
        title: "Global Reach",
        description: "Serving clients worldwide with innovative solutions",
        icon: Globe,
        color: "from-blue-500 to-cyan-500",
        delay: 0.1
    },
    {
        title: "Expert Team",
        description: "Highly skilled professionals at your service",
        icon: Users,
        color: "from-purple-500 to-pink-500",
        delay: 0.2
    },
    {
        title: "Fast Delivery",
        description: "Quick implementation and deployment",
        icon: Zap,
        color: "from-amber-500 to-orange-500",
        delay: 0.3
    },
    {
        title: "24/7 Support",
        description: "Round-the-clock 24/7 assistance for your needs",
        icon: Clock,
        color: "from-green-500 to-emerald-500",
        delay: 0.4
    }
]

// Fallback data in case API fails
const fallbackData = {
    title: "Your Trusted Partner in Business Growth",
    short_description: "At Starmoon, we're dedicated to helping businesses thrive in the digital age. With our comprehensive suite of services and solutions, we empower organizations to achieve their goals and drive sustainable growth.",
    image: "/Banner/corporate.jpeg",
    client_count: 500,
    year_experience: 15,
    success_rate: 98,
    mission: "To help companies reduce operational costs through innovative technology solutions and expert implementation.",
    vision: "To become the leading technology consulting firm that transforms businesses through innovative automation solutions.",
    values: "Innovation, reliability, and customer success drive everything we do. We believe in building long-term partnerships."
}

// Helper function to parse HTML description and extract mission, vision, values
const parseDescription = (htmlDescription: string) => {
    // Remove HTML tags and split by paragraphs
    const plainText = htmlDescription.replace(/<[^>]*>/g, '');
    const paragraphs = plainText.split('.').filter(p => p.trim().length > 0);
    
    return {
        mission: paragraphs[0]?.trim() + '.' || fallbackData.mission,
        vision: paragraphs[1]?.trim() + '.' || fallbackData.vision,
        values: paragraphs[2]?.trim() + '.' || fallbackData.values
    };
}

export default function About({ aboutUsData }: AboutProps) {
    // Use API data if available, otherwise fallback to default
    const data = aboutUsData || fallbackData;
    const { mission, vision, values } = aboutUsData 
        ? parseDescription(aboutUsData.description) 
        : fallbackData;

    const achievements = [
        {
            number: `${data.client_count}+`,
            label: "Clients Worldwide",
            icon: Users,
            color: "from-blue-500 to-cyan-500"
        },
        {
            number: `${data.year_experience}+`,
            label: "Years Experience",
            icon: Award,
            color: "from-purple-500 to-pink-500"
        },
        {
            number: `${data.success_rate}%`,
            label: "Success Rate",
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500"
        }
    ]

    return (
        <section className="w-full py-20 relative overflow-hidden container px-4 rounded-md">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.08] dark:from-primary/[0.12] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-slate-400/[0.03] bg-[size:20px_20px]" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="px-4 md:px-6 relative z-10"
            >
                {/* Header Section */}
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-primary/30 dark:border-primary/40 text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-primary/10 dark:bg-slate-800/50">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Our Story
                    </Badge>
                    <h2 className="text-3xl xl:text-4xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-secondary dark:from-blue-400 dark:via-blue-300 dark:to-purple-400">
                        About Starmoon
                    </h2>
                    <p className="text-muted-foreground dark:text-gray-300 text-base xl:text-lg max-w-2xl mx-auto">
                        Empowering businesses with innovative solutions and exceptional service
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
                    {/* Left Side - Image with Stats */}
                    <div className="relative">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={aboutUsData?.image ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${aboutUsData.image}` : data.image}
                                alt="About Starmoon"
                                width={600}
                                height={600}
                                className="object-cover w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-slate-900/80 dark:via-slate-800/30 dark:to-transparent" />
                            
                            {/* Floating Stats */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-3 gap-4">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 text-white dark:text-gray-100 text-center border border-white/20 dark:border-slate-600/30"
                                    >
                                        <achievement.icon className="w-6 h-6 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">{achievement.number}</div>
                                        <div className="text-sm opacity-90">{achievement.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 dark:bg-primary/15 rounded-full blur-xl" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 dark:bg-secondary/15 rounded-full blur-xl" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl xl:text-3xl font-bold bg-clip-text text-primary dark:text-blue-400">
                                {data.title}
                            </h3>
                            <p className="text-muted-foreground dark:text-gray-300 text-base xl:text-xl leading-relaxed">
                                {data.short_description}
                            </p>
                            <div className="flex items-center gap-4">
                                <Button className="rounded-full dark:bg-primary dark:hover:bg-primary/90">
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="outline" className="rounded-full dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-800">
                                    Contact Us
                                </Button>
                            </div>
                        </motion.div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: feature.delay }}
                                    className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 xl:p-4 shadow-sm border dark:border-slate-700 min-w-[210px] xl:min-w-[230px]"
                                >
                                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} mb-3`}>
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-lg font-semibold mb-1 dark:text-white">{feature.title}</h4>
                                    <p className="text-muted-foreground dark:text-gray-300 text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission, Vision, Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-600/30 dark:to-cyan-600/30 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
                        <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 dark:border dark:border-slate-700">
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Rocket className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Our Mission</h3>
                                <p className="text-muted-foreground dark:text-gray-300">
                                    {mission}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-600/30 dark:to-pink-600/30 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
                        <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 dark:border dark:border-slate-700">
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Our Vision</h3>
                                <p className="text-muted-foreground dark:text-gray-300">
                                    {vision}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 dark:from-amber-600/30 dark:to-orange-600/30 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
                        <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 dark:border dark:border-slate-700">
                            <CardContent className="p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Our Values</h3>
                                <p className="text-muted-foreground dark:text-gray-300">
                                    {values}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
