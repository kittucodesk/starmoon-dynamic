"use client"

import { useParams, useRouter } from "next/navigation"
import {
    ChevronLeft,
    Star,
    Phone,
    MessageCircle,
    Globe,
    Linkedin,
    Twitter,
    Instagram,
    Clock,
    Award,
    GraduationCap,
    CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { consultantsData } from "@/public/data/consultants"

// Helper function to get image URL
const getImageUrl = (imagePath: string) => {
    return imagePath.startsWith("http") ? imagePath : imagePath
}

// Helper function to render stars
const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
}

// Helper function to get icon for benefits
const getBenefitIcon = (iconType: string) => {
    switch (iconType) {
        case "growth":
            return <CheckCircle className="w-6 h-6 text-green-500" />
        case "shield":
            return <CheckCircle className="w-6 h-6 text-blue-500" />
        case "target":
            return <CheckCircle className="w-6 h-6 text-purple-500" />
        case "automation":
            return <CheckCircle className="w-6 h-6 text-orange-500" />
        case "insights":
            return <CheckCircle className="w-6 h-6 text-indigo-500" />
        case "revenue":
            return <CheckCircle className="w-6 h-6 text-green-600" />
        case "wellness":
            return <CheckCircle className="w-6 h-6 text-pink-500" />
        default:
            return <CheckCircle className="w-6 h-6 text-gray-500" />
    }
}

export default function ConsultantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const consultantId = params.id as string

    const consultant = consultantsData.find((c) => c._id === consultantId)

    if (!consultant) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Consultant Not Found</h1>
                    <p className="text-gray-600 mb-6">The consultant you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                        Back to Consultants
                    </Button>
                </div>
            </div>
        )
    }

    const handleBackToListing = () => {
        router.push("/")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Button
                        variant="ghost"
                        onClick={handleBackToListing}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to all consultants
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={getImageUrl(consultant.profile_image) || "/placeholder.svg"}
                                alt={consultant.name}
                                className="w-48 h-48 rounded-xl object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {consultant.badges?.map((badge: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{consultant.name}</h1>
                            <p className="text-xl text-blue-600 mb-2">{consultant.consultation_category}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {consultant.specialization.map((spec: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                        {spec}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-6 text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{consultant.experience}</span>
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${consultant.hourly_rate}/{consultant.currency === "USD" ? "hour" : consultant.currency}
                                </div>
                            </div>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Book Consultation
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">About</h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">{consultant.about}</p>
                            </CardContent>
                        </Card>

                        {/* Credentials Section */}
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">Credentials</h2>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Education */}
                                {consultant.education && consultant.education.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5" />
                                            Education
                                        </h3>
                                        <div className="space-y-2">
                                            {consultant.education.map((edu: any, index: number) => (
                                                <div key={index} className="border-l-2 border-blue-200 pl-4">
                                                    <p className="font-medium">{edu.degree}</p>
                                                    <p className="text-gray-600">
                                                        {edu.institution} • {edu.year}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Certifications */}
                                {consultant.certifications && consultant.certifications.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                            <Award className="w-5 h-5" />
                                            Certifications
                                        </h3>
                                        <div className="space-y-2">
                                            {consultant.certifications.map((cert: any, index: number) => (
                                                <div key={index} className="border-l-2 border-green-200 pl-4">
                                                    <p className="font-medium">{cert.name}</p>
                                                    <p className="text-gray-600">
                                                        {cert.issuer} • {cert.year}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Awards */}
                                {consultant.awards && consultant.awards.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                            <Award className="w-5 h-5" />
                                            Awards
                                        </h3>
                                        <div className="space-y-2">
                                            {consultant.awards.map((award: any, index: number) => (
                                                <div key={index} className="border-l-2 border-yellow-200 pl-4">
                                                    <p className="font-medium">{award.title}</p>
                                                    <p className="text-gray-600">{award.organization}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Key Features */}
                        {consultant.features && consultant.features.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-2xl font-bold">Key Features of this Consultation</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {consultant.features.map((feature: any, index: number) => (
                                            <div key={index} className="flex gap-4">
                                                <img
                                                    src={getImageUrl(feature.image) || "/placeholder.svg"}
                                                    alt={feature.title}
                                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/placeholder.svg?height=60&width=60"
                                                    }}
                                                />
                                                <div>
                                                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Benefits */}
                        {consultant.benefits && consultant.benefits.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-2xl font-bold">Benefits You'll Gain</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {consultant.benefits.map((benefit: any, index: number) => (
                                            <div key={index} className="flex gap-4">
                                                {getBenefitIcon(benefit.icon)}
                                                <div>
                                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                                    <p className="text-gray-600">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Testimonials */}
                        {consultant.testimonials && consultant.testimonials.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-2xl font-bold">What Clients Say</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {consultant.testimonials.map((testimonial: any, index: number) => (
                                            <div key={index} className="border-l-4 border-blue-200 pl-6">
                                                <div className="flex items-center gap-1 mb-2">{renderStars(testimonial.rating)}</div>
                                                <p className="text-gray-700 mb-4 italic">"{testimonial.description}"</p>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={getImageUrl(testimonial.image) || "/placeholder.svg"}
                                                        alt={testimonial.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/placeholder.svg?height=60&width=60"
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{testimonial.name}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {testimonial.role} at {testimonial.company}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* FAQs */}
                        {consultant.faqs && consultant.faqs.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {consultant.faqs.map((faq: any, index: number) => (
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Availability */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-bold">Availability</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {consultant.availability.map((avail: any, index: number) => (
                                        <div key={index}>
                                            <p className="font-medium text-gray-900">{avail.day}</p>
                                            <div className="text-sm text-gray-600 ml-2">
                                                {avail.time_slots.map((slot: string, slotIndex: number) => (
                                                    <p key={slotIndex}>{slot}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-bold">Contact</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <span>{consultant.quick_contact_no}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="w-5 h-5 text-green-500" />
                                    <span>{consultant.whatsapp_no}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Connect */}
                        {consultant.links && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-lg font-bold">Connect</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-3">
                                        {consultant.links.website && (
                                            <Button variant="outline" size="sm">
                                                <Globe className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {consultant.links.linkedin && (
                                            <Button variant="outline" size="sm">
                                                <Linkedin className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {consultant.links.twitter && (
                                            <Button variant="outline" size="sm">
                                                <Twitter className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {consultant.links.instagram && (
                                            <Button variant="outline" size="sm">
                                                <Instagram className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Tags */}
                        {consultant.tags && consultant.tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-lg font-bold">Tags</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {consultant.tags.map((tag: string, index: number) => (
                                            <Badge key={index} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
