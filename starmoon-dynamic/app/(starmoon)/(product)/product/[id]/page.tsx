"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Play, Check, Star, Users, Zap, Shield, ArrowRight, ChevronDown, ChevronUp, Video, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchProductById, type DetailedProduct } from "@/lib/api"

export default function ProductDetailPage() {
    const params = useParams()
    const productId = params.id as string

    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const [product, setProduct] = useState<DetailedProduct | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // const ProductShowcase = ({ product }) => {
    //     const [showFull, setShowFull] = useState(false);

    // Fetch product data from API
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return

            try {
                setIsLoading(true)
                setError(null)
                console.log('🔍 Fetching product with ID:', productId)

                const productData = await fetchProductById(productId)
                console.log('📦 Product data received:', productData)

                setProduct(productData)
            } catch (err) {
                console.error('❌ Error fetching product:', err)
                setError(err instanceof Error ? err.message : 'Failed to fetch product')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    // Transform product data for display
    const getProductPrice = () => {
        if (!product) return { price: 0, currency: 'INR' }

        if (product.is_pay_as_you_go && product.pay_as_you_go_price?.[0]) {
            return {
                price: product.pay_as_you_go_price[0].selling_price || product.pay_as_you_go_price[0].listing_price,
                currency: 'INR'
            }
        } else if (product.is_product_features_and_offers && product.product_features_and_offers?.[0]) {
            const plan = product.product_features_and_offers[0]
            return {
                price: plan.country_price?.[0]?.monthly_price || 0,
                currency: plan.country_price?.[0]?.currency || 'INR'
            }
        }
        return { price: 0, currency: 'INR' }
    }

    const getProductImage = () => {
        if (!product?.product_thumb_image) return '/placeholder.svg'
        return product.product_thumb_image.startsWith('http')
            ? product.product_thumb_image
            : `${process.env.NEXT_PUBLIC_DOMAIN_URL}${product.product_thumb_image}`
    }

    // Convert YouTube URL to embeddable format
    const getEmbedUrl = (url: string) => {
        if (!url || typeof url !== 'string') return null

        try {
            // Handle different YouTube URL formats
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
            const match = url.match(youtubeRegex)

            if (match && match[1]) {
                return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0&modestbranding=1&controls=1`
            }

            // If it's already an embed URL, return as is
            if (url.includes('youtube.com/embed/')) {
                return url
            }

            return null
        } catch (error) {
            console.error('Error processing YouTube URL:', error)
            return null
        }
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <h2 className="text-xl font-semibold mb-2">Loading Product Details</h2>
                    <p className="text-muted-foreground">Please wait while we fetch the product information...</p>
                </div>
            </div>
        )
    }

    // Show error state
    if (error || !product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 text-2xl">!</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
                    <p className="text-muted-foreground mb-6">
                        {error || 'The product you are looking for could not be found or may have been removed.'}
                    </p>
                    <Button onClick={() => window.history.back()} variant="outline">
                        Go Back
                    </Button>
                </div>
            </div>
        )
    }

    const productPrice = getProductPrice()

    // Get features from API data with fallback images
    const getFeatures = () => {
        if (product?.features && product.features.length > 0) {
            return product.features.map((feature, index) => ({
                title: feature.title.trim(),
                description: feature.description.trim(),
                image: feature.image && feature.image.trim()
                    ? `https://atapp.ecom.ind.in${feature.image}`
                    : getDefaultFeatureImage(index)
            }))
        }

        // Fallback static features if API doesn't have features
        return [
            {
                title: "Advanced Project Analytics",
                description: "Get deep insights into your project performance with real-time analytics and customizable dashboards.",
                image: "/Products/projectmanagement2.jpg",
            },
            {
                title: "Team Collaboration Hub",
                description: "Streamline communication with integrated chat, file sharing, and collaborative workspaces.",
                image: "/Products/collaboration.jpg",
            },
            {
                title: "Automated Workflow Engine",
                description: "Create custom workflows that automate repetitive tasks and boost team productivity.",
                image: "/Products/projectmanagement3.jpg",
            },
        ]
    }

    // Helper function to get default feature images when API doesn't provide them
    const getDefaultFeatureImage = (index: number) => {
        const defaultImages = [
            "/Products/projectmanagement2.jpg",
            "/Products/collaboration.jpg",
            "/Products/projectmanagement3.jpg",
            "/Products/workflow.jpg",
            "/Products/analytics.gif"
        ]
        return defaultImages[index % defaultImages.length]
    }

    const features = getFeatures()

    // Get benefits from API data with fallback icons
    const getBenefits = () => {
        if (product?.benefits && product.benefits.length > 0) {
            return product.benefits.map((benefit, index) => ({
                icon: getDefaultBenefitIcon(index),
                title: benefit.title.trim(),
                description: benefit.description.trim(),
            }))
        }

        // Fallback static benefits if API doesn't have benefits
        return [
            {
                icon: Zap,
                title: "50% Faster Delivery",
                description: "Accelerate project completion with streamlined processes",
            },
            {
                icon: Users,
                title: "Enhanced Collaboration",
                description: "Improve team coordination and communication"
            },
            {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with SOC 2 compliance"
            },
        ]
    }

    // Helper function to get default benefit icons when API doesn't provide them
    const getDefaultBenefitIcon = (index: number) => {
        const defaultIcons = [Zap, Users, Shield, Star, ArrowRight]
        return defaultIcons[index % defaultIcons.length]
    }

    const benefits = getBenefits()

    // Get testimonials from API data with fallback data
    const getTestimonials = () => {
        if (product?.testimonials && product.testimonials.length > 0) {
            return product.testimonials.map((testimonial) => ({
                name: testimonial.name,
                role: testimonial.role,
                company: testimonial.company,
                content: testimonial.description,
                rating: testimonial.rating,
                avatar: testimonial.image ? `https://atapp.ecom.ind.in${testimonial.image}` : "/Consultants/Bassam.png",
            }))
        }

        // Fallback static testimonials if API doesn't have testimonials
        return [
            {
                name: "Sarah Chen",
                role: "CTO at TechFlow",
                company: "TechFlow Solutions",
                content: "This platform transformed how we manage projects. Our delivery time improved by 40% in just 3 months.",
                rating: 5,
                avatar: "/Consultants/Bassam.png/",
            },
            {
                name: "Michael Rodriguez",
                role: "Project Manager",
                company: "InnovateCorp",
                content: "The automation features are game-changing. We've eliminated hours of manual work every week.",
                rating: 5,
                avatar: "/Consultants/Farzana.png/",
            },
            {
                name: "Emily Watson",
                role: "Operations Director",
                company: "ScaleUp Inc",
                content: "Best investment we've made for our team. The ROI was evident within the first month.",
                rating: 5,
                avatar: "/Consultants/Jomon.png",
            },
        ]
    }

    const testimonials = getTestimonials()

    // Use real FAQs from product data or fallback to default ones
    const faqs = product?.faqs && product?.faqs?.length > 0 ? product?.faqs?.map((faq: any) => ({
        question: faq.question,
        answer: faq.answer
    })) : [
        {
            question: "How quickly can we get started?",
            answer: "You can be up and running in under 15 minutes. Our onboarding process includes guided setup, data migration assistance, and dedicated support.",
        },
        {
            question: "What integrations are available?",
            answer: "We integrate with 100+ popular tools including Slack, GitHub, Jira, Salesforce, and all major cloud platforms. Custom integrations are also available.",
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use enterprise-grade encryption, maintain SOC 2 compliance, and offer single sign-on (SSO) integration with your existing security infrastructure.",
        },
        {
            question: "What support do you provide?",
            answer: "We offer 24/7 support, dedicated customer success managers, comprehensive documentation, and regular training sessions for your team.",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white container">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-8 ">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
                            {product.product_category || 'Product'}
                        </Badge>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                            {product.product_name || 'Product Name'}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {product.product_description || 'Product description not available.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button size="lg" className="text-lg px-8">
                                Buy Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="text-lg px-8">
                                <Play className="mr-2 h-5 w-5" />
                                Watch Demo
                            </Button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Check className="h-4 w-4 text-green-500" />
                                14-day free trial
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="h-4 w-4 text-green-500" />
                                No credit card required
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="h-4 w-4 text-green-500" />
                                Cancel anytime
                            </div>
                        </div>

                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {/* <Image
                                src={getProductImage()}
                                alt={product.product_name || 'Product Image'}
                                width={600}
                                height={400}
                                className="w-full aspect-[4/3] object-cover"
                            /> */}
                            {/* Show video iframe if YouTube link exists and is valid */}
                            {product.youtube_video_links &&
                                product.youtube_video_links.length > 0 &&
                                getEmbedUrl(product.youtube_video_links[0]) ? (
                                <iframe
                                    src={getEmbedUrl(product.youtube_video_links[0]) || ''}
                                    className="w-full aspect-[16/9] border-0"
                                    title={`${product.product_name} Video`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <>
                                    <Image
                                        src={getProductImage()}
                                        alt={product.product_name || 'Product Image'}
                                        width={600}
                                        height={400}
                                        className="w-full aspect-[4/3] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </>
                            )}
                            {/* {product.youtube_video_links && product.youtube_video_links.length > 0 && (
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 p-0"
                                    // onClick={() => window.open(product.youtube_video_links[0], '_blank')}
                                >
                                    <Play className="h-6 w-6" />
                                </Button>
                            )} */}
                        </div>
                    </div>
                </div>
                <div className="container px-4 mt-16">
                    <div className=" mx-auto text-base text-muted-foreground leading-relaxed">
                        {product.product_long_description ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: product.product_long_description }}
                            />
                        ) : (
                            <p>Product long description not available.</p>
                        )}
                    </div>
                </div>

            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Powerful Features That Drive Results</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to manage projects efficiently and scale your business operations.
                    </p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                        >
                            <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>Real-time data synchronization</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>Customizable dashboards and reports</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>Advanced filtering and search capabilities</span>
                                    </li>
                                </ul>
                                <Button variant="outline">
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={feature.image || "/placeholder.svg"}
                                        alt={feature.title}
                                        width={600}
                                        height={400}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Teams Choose Our Platform</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Join thousands of successful teams who have transformed their project management.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                                <CardContent className="p-0">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <benefit.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">See It In Action</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Watch how our platform can transform your project management workflow in just 3 minutes.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        {/* Show second video if available, otherwise show static image */}
                        {product.youtube_video_links &&
                            product.youtube_video_links.length > 1 &&
                            getEmbedUrl(product.youtube_video_links[1]) ? (
                            <iframe
                                src={getEmbedUrl(product.youtube_video_links[1]) || ''}
                                className="w-full aspect-[16/9] border-0"
                                title={`${product.product_name} Demo Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN_URL + product.product_image_gallery?.[0] || "/Products/projectmanagement1.jpg"}
                                alt="Video Demo"
                                width={800}
                                height={700}
                                className="w-full aspect-[16/9] object-cover"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See what our customers have to say about their experience with our platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={testimonial.avatar || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {product.is_product_features_and_offers && product.product_features_and_offers.length > 0
                                ? 'Select the plan that best fits your needs and budget.'
                                : 'Flexible pricing options designed to scale with your team and business needs.'}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Show real product plans or fallback to static plans */}
                        {product.is_product_features_and_offers && product.product_features_and_offers.length > 0 ? (
                            product.product_features_and_offers.map((plan, index) => (
                                <Card key={index} className={`relative p-8 hover:shadow-xl transition-shadow ${plan.is_most_popular ? 'border-2 border-blue-500' : ''}`}>
                                    {plan.is_most_popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                                        </div>
                                    )}
                                    <CardContent className="p-0">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                            <p className="text-muted-foreground mb-4">{plan.description}</p>
                                            <div className="mb-6">
                                                <span className={`text-4xl font-bold ${plan.is_most_popular ? 'text-primary' : ''}`}>
                                                    ₹{plan.country_price?.[0]?.monthly_price?.toLocaleString() || 0}
                                                </span>
                                                <span className="text-muted-foreground">/month</span>
                                            </div>
                                            <Button className={`w-full ${plan.is_most_popular ? 'bg-primary hover:bg-blue-700' : ''}`}
                                                variant={plan.is_most_popular ? 'default' : 'outline'}>
                                                Buy Now
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {plan.features?.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center gap-3">
                                                    {feature.is_included ? (
                                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                    ) : (
                                                        <span className="h-5 w-5 flex-shrink-0 opacity-50">✕</span>
                                                    )}
                                                    <span className={feature.is_included ? '' : 'opacity-50'}>
                                                        {feature.name}: {feature.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <>
                                {/* Basic Plan */}
                                <Card className="relative p-8 hover:shadow-xl transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold mb-2">Basic</h3>
                                            <p className="text-muted-foreground mb-4">Perfect for small teams getting started</p>
                                            <div className="mb-6">
                                                <span className="text-4xl font-bold">$19</span>
                                                <span className="text-muted-foreground">/user/month</span>
                                            </div>
                                            <Button className="w-full" variant="outline">
                                                Buy Now
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Up to 5 team members</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>10 projects</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Basic reporting</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Email support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Mobile app access</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>5GB storage</span>
                                            </div>
                                            <div className="flex items-center gap-3 opacity-50">
                                                <span className="h-5 w-5 flex-shrink-0">✕</span>
                                                <span>Advanced analytics</span>
                                            </div>
                                            <div className="flex items-center gap-3 opacity-50">
                                                <span className="h-5 w-5 flex-shrink-0">✕</span>
                                                <span>Custom integrations</span>
                                            </div>
                                            <div className="flex items-center gap-3 opacity-50">
                                                <span className="h-5 w-5 flex-shrink-0">✕</span>
                                                <span>Priority support</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Professional Plan - Most Popular */}
                                <Card className="relative p-8 border-2 border-blue-500 hover:shadow-xl transition-shadow">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                                    </div>
                                    <CardContent className="p-0">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold mb-2">Professional</h3>
                                            <p className="text-muted-foreground mb-4">Ideal for growing teams and businesses</p>
                                            <div className="mb-6">
                                                <span className="text-4xl font-bold text-primary">$49</span>
                                                <span className="text-muted-foreground">/user/month</span>
                                            </div>
                                            <Button className="w-full bg-primary hover:bg-blue-700">Buy Now</Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Up to 25 team members</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Unlimited projects</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Advanced reporting & analytics</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Priority email & chat support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Mobile app access</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>100GB storage</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Time tracking & billing</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>API access</span>
                                            </div>
                                            <div className="flex items-center gap-3 opacity-50">
                                                <span className="h-5 w-5 flex-shrink-0">✕</span>
                                                <span>Dedicated account manager</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Enterprise Plan */}
                                <Card className="relative p-8 hover:shadow-xl transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                                            <p className="text-muted-foreground mb-4">For large organizations with advanced needs</p>
                                            <div className="mb-6">
                                                <span className="text-4xl font-bold">$99</span>
                                                <span className="text-muted-foreground">/user/month</span>
                                            </div>
                                            <Button className="w-full" variant="outline">
                                                Contact Sales
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Unlimited team members</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Unlimited projects</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Advanced reporting & analytics</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>24/7 phone & email support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Mobile app access</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Unlimited storage</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Advanced security & compliance</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Custom integrations & API</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span>Dedicated account manager</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>

                    {/* Additional Pricing Info */}
                    <div className="text-center mt-12">
                        <p className="text-muted-foreground mb-6">
                            All plans include a 14-day free trial. No credit card required. Cancel anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>30-day money-back guarantee</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Free migration assistance</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Volume discounts available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Get answers to common questions about our platform and services.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                >
                                    <span className="font-semibold text-lg">{faq.question}</span>
                                    {expandedFaq === index ? (
                                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-6 pb-6">
                                        <Separator className="mb-4" />
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Services & Consultations Section */}
            {/* <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Professional Services & Consultations</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Accelerate your success with our expert services. From implementation to optimization, our certified
                        consultants help you maximize your investment and achieve your goals faster.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Implementation Services */}
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Implementation & Setup</h3>
                                    <p className="text-muted-foreground">
                                        Get up and running quickly with our comprehensive implementation services.
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Custom platform configuration</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Data migration from existing tools</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Workflow design and optimization</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Integration with existing systems</span>
                                </li>
                            </ul>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-primary">$2,500</span>
                                    <span className="text-muted-foreground ml-2">starting price</span>
                                </div>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Training & Onboarding */}
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Training & Onboarding</h3>
                                    <p className="text-muted-foreground">
                                        Empower your team with comprehensive training programs and ongoing support.
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Live training sessions for all users</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Custom training materials</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Admin and power user certification</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Ongoing support and Q&A sessions</span>
                                </li>
                            </ul>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-green-600">$1,500</span>
                                    <span className="text-muted-foreground ml-2">per session</span>
                                </div>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Strategic Consulting */}
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Strategic Consulting</h3>
                                    <p className="text-muted-foreground">
                                        Optimize your processes and strategy with expert guidance from our consultants.
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Process optimization analysis</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Best practices implementation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>ROI measurement and reporting</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Quarterly strategy reviews</span>
                                </li>
                            </ul>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-purple-600">$5,000</span>
                                    <span className="text-muted-foreground ml-2">per month</span>
                                </div>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Custom Development */}
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Star className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Custom Development</h3>
                                    <p className="text-muted-foreground">
                                        Extend platform capabilities with custom features tailored to your unique needs.
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Custom integrations and APIs</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Bespoke workflow automation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Custom reporting and dashboards</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>Ongoing maintenance and support</span>
                                </li>
                            </ul>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-orange-600">Custom</span>
                                    <span className="text-muted-foreground ml-2">quote</span>
                                </div>
                                <Button variant="outline">Get Quote</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Service Packages */}
                {/* <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-4">Complete Success Packages</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Save up to 30% with our bundled service packages designed for different business sizes and needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <h4 className="text-xl font-bold mb-2">Startup Package</h4>
                                <p className="text-3xl font-bold text-primary mb-2">$4,500</p>
                                <p className="text-sm text-muted-foreground mb-4">Save $1,500</p>
                                <ul className="text-sm space-y-2 mb-6">
                                    <li>• Basic implementation</li>
                                    <li>• Team training (up to 10 users)</li>
                                    <li>• 3 months support</li>
                                </ul>
                                <Button className="w-full" variant="outline">
                                    Choose Package
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center border-2 border-blue-500 hover:shadow-lg transition-shadow">
                           
                            <CardContent className="p-0">
                                <h4 className="text-xl font-bold mb-2">Growth Package</h4>
                                <p className="text-3xl font-bold text-primary mb-2">$8,500</p>
                                <p className="text-sm text-muted-foreground mb-4">Save $3,000</p>
                                <ul className="text-sm space-y-2 mb-6">
                                    <li>• Full implementation</li>
                                    <li>• Advanced training (up to 25 users)</li>
                                    <li>• 6 months consulting</li>
                                    <li>• Custom integrations</li>
                                </ul>
                                <Button className="w-full bg-primary hover:bg-blue-700">Choose Package</Button>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <h4 className="text-xl font-bold mb-2">Enterprise Package</h4>
                                <p className="text-3xl font-bold text-primary mb-2">$15,000</p>
                                <p className="text-sm text-muted-foreground mb-4">Save $5,000</p>
                                <ul className="text-sm space-y-2 mb-6">
                                    <li>• Complete implementation</li>
                                    <li>• Unlimited user training</li>
                                    <li>• 12 months strategic consulting</li>
                                    <li>• Custom development included</li>
                                </ul>
                                <Button className="w-full" variant="outline">
                                    Contact Sales
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div> */}

                {/* Consultation CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Not Sure Which Service Is Right for You?</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Schedule a free 30-minute consultation with our experts to discuss your specific needs and get personalized
                        recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-primary hover:bg-blue-700">
                            Schedule Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        {/* <Button size="lg" variant="outline">
                            Download Services Brochure
                        </Button> */}
                    </div>
                </div>
            </section> */}

            {/* Final CTA Section */}
            <section className="bg-primary text-white py-16 rounded-sm">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Projects?</h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of teams who have already improved their productivity and project success rates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            Buy Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 border-white text-white bg-primary hover:bg-white hover:text-primary"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Fixed Bottom CTA Bar - Full Width */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
                <div className="container mx-auto py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <div className="font-bold text-xl text-primary">
                                ₹{productPrice.price.toLocaleString()}
                                <span className="text-base text-muted-foreground">
                                    {product.is_pay_as_you_go ? ' one-time' : ' /month'}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {product.badges || '14-day free trial • No credit card required'}
                            </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                                Schedule Demo
                            </Button>
                            <Button size="lg" className="flex-1 sm:flex-none bg-primary hover:bg-blue-700">
                                Contact Sales
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed bottom bar */}
            <div className="h-24" />
        </div>
    )
}
