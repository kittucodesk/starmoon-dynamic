"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  MessageCircle,
  ArrowLeft,
  Share2,
  Contact,
  Phone,
} from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Copy, Mail } from "lucide-react"
import ProductCard from "@/components/custom/common/ProductCard"
import ExpertCard from "@/components/custom/common/ExpertCard"
import { fetchFullServiceById, fetchPublicProducts, fetchConsultations, Service, DetailedProduct, Consultation } from "@/lib/api"
import { useParams } from "next/navigation"

// Expected interfaces for components
interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  badge?: string;
  ribbon?: string;
  pricing: {
    monthly: string;
    yearly: string;
    currency: string;
    discount?: string;
    original_yearly?: string;
  };
}

interface Expert {
  id: number;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  bio: string;
  badge?: string;
  image: string;
  description: string;
  skills: string[];
  reviews: number;
  rate: string;
  consultation_category: string;
}

// Transformation functions
const transformProductData = (apiProduct: DetailedProduct): Product => {
  const mostPopularPlan = apiProduct.product_features_and_offers?.find(plan => plan.is_most_popular) || apiProduct.product_features_and_offers?.[0];
  const countryPrice = mostPopularPlan?.country_price?.[0];
  
  return {
    id: parseInt(apiProduct._id.slice(-6), 16) || Math.floor(Math.random() * 10000),
    title: apiProduct.product_name,
    category: apiProduct.product_category,
    description: apiProduct.product_description,
    image: apiProduct.product_thumb_image.startsWith('http') ? apiProduct.product_thumb_image : `https://atapp.ecom.ind.in${apiProduct.product_thumb_image}`,
    features: [
      ...apiProduct.tags.slice(0, 2),
      ...(mostPopularPlan?.features?.slice(0, 3).map(f => f.name) || [])
    ].slice(0, 3),
    badge: apiProduct.badges,
    pricing: {
      monthly: `${countryPrice?.currency || 'AED'} ${countryPrice?.monthly_price || 0}`,
      yearly: `${countryPrice?.currency || 'AED'} ${countryPrice?.yearly_price || 0}`,
      currency: countryPrice?.currency || 'AED',
      discount: countryPrice?.yearly_price && countryPrice?.monthly_price ? 
        `${Math.round((1 - countryPrice.yearly_price / (countryPrice.monthly_price * 12)) * 100)}% OFF` : undefined,
      original_yearly: countryPrice?.yearly_price && countryPrice?.monthly_price ? 
        `${countryPrice.currency} ${countryPrice.monthly_price * 12}` : undefined
    }
  };
};

const transformConsultationData = (apiConsultation: Consultation): Expert => {
  return {
    id: parseInt(apiConsultation._id.slice(-6), 16) || Math.floor(Math.random() * 10000),
    name: apiConsultation.name,
    avatar: apiConsultation.profile_image.startsWith('http') ? apiConsultation.profile_image : `https://atapp.ecom.ind.in${apiConsultation.profile_image}`,
    title: apiConsultation.specialization,
    rating: 4.5, // Default rating as not available in API
    bio: apiConsultation.about,
    image: apiConsultation.profile_image.startsWith('http') ? apiConsultation.profile_image : `https://atapp.ecom.ind.in${apiConsultation.profile_image}`,
    description: apiConsultation.about,
    skills: apiConsultation.tags.slice(0, 3),
    reviews: 25, // Default reviews as not available in API
    rate: `${apiConsultation.currency} ${apiConsultation.hourly_rate}/hr`,
    consultation_category: apiConsultation.consultation_category
  };
};

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.id as string
  
  const [serviceData, setServiceData] = useState<Service | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [experts, setExperts] = useState<Expert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const openWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    window.open(`https://wa.me/${cleanNumber}`, '_blank')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch service data
        const service = await fetchFullServiceById(serviceId)
        setServiceData(service)
        
        // Fetch related products and consultations
        const [productsData, consultationsData] = await Promise.all([
          fetchPublicProducts('India', { per_page: 3 }),
          fetchConsultations('India', { per_page: 3 })
        ])
        
        // Transform data for components
        const transformedProducts = productsData.map(transformProductData)
        const transformedExperts = consultationsData.map(transformConsultationData)
        
        setProducts(transformedProducts)
        setExperts(transformedExperts)
        
      } catch (err) {
        console.error('Error fetching service data:', err)
        setError('Failed to load service data')
      } finally {
        setLoading(false)
      }
    }
    
    if (serviceId) {
      fetchData()
    }
  }, [serviceId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !serviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Service not found'}</p>
          <Link href="/services">
            <Button variant="outline">Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  const offers = serviceData.service_features_and_offers || []
  const currentOffer = offers[selectedPackage]
  const price = currentOffer?.country_price?.[0]?.monthly_price || 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/services" className="hover:text-primary flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Browse
          </Link>
          <span>/</span>
          <span>{serviceData.service_category}</span>
          <span>/</span>
          <span className="text-gray-900">{serviceData.service_name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <Image
                  src={
                    serviceData.service_image_gallery?.[selectedImage]?.startsWith('http') 
                      ? serviceData.service_image_gallery[selectedImage]
                      : `https://atapp.ecom.ind.in${serviceData.service_image_gallery?.[selectedImage] || serviceData.service_thumb_image}`
                  }
                  alt={serviceData.service_name}
                  width={600}
                  height={400}
                  className="w-full h-96 object-contain rounded-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="secondary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share this Service</DialogTitle>
                        <DialogDescription>
                          Easily share this service with your friends or colleagues.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 py-4">
                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                          }}
                        >
                          <Copy className="w-4 h-4" />
                          Copy Link
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Share on WhatsApp
                        </a>
                        <a
                          href={`mailto:?subject=Check out this service&body=${encodeURIComponent(window.location.href)}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 transition"
                        >
                          <Mail className="w-4 h-4" />
                          Share via Email
                        </a>
                      </div>
                      <DialogFooter>
                        <p className="text-xs text-gray-400">The link will be copied or shared as per your selection.</p>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {serviceData.service_image_gallery && serviceData.service_image_gallery.length > 1 && (
                <div className="flex space-x-2">
                  {serviceData.service_image_gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === i ? "border-primary" : "border-gray-200"}`}
                    >
                      <Image
                        src={img.startsWith('http') ? img : `https://atapp.ecom.ind.in${img}`}
                        alt={`${serviceData.service_name} ${i + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {serviceData.service_name}
                  </h1>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {serviceData.service_long_description}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 w-fit text-nowrap">
                  {serviceData.service_category}
                </Badge>
              </div>

              {serviceData.tags && serviceData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {serviceData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator className="my-8" />

            {/* Packages Section */}
            {offers.length > 0 && (
              <div className="mb-8">
                <div className="text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
                  <p className="text-gray-600">Select the perfect plan that fits your business needs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {offers.map((pkg, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-lg border bg-white cursor-pointer transition-all hover:shadow-lg ${selectedPackage === idx ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setSelectedPackage(idx)}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold flex items-center justify-between mb-2">
                          {pkg.name}
                          <span className="text-lg font-bold text-primary">
                            {pkg.country_price?.[0]?.currency} {pkg.country_price?.[0]?.monthly_price}
                          </span>
                        </h3>
                        <p className="text-gray-600 text-sm">{pkg.description}</p>
                      </div>
                      <div>
                        <ul className="space-y-2 mb-4">
                          {pkg.features?.map((f, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              {f.name}: {f.value}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Monthly billing
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* FAQs */}
            {serviceData.faqs && serviceData.faqs.length > 0 && (
              <div>
                <div className="text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                  <p className="text-gray-600">Find answers to common questions about our services</p>
                </div>
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    {serviceData.faqs.map((faq, index) => (
                      <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            )}

            {/* Products Section */}
            {products.length > 0 && (
              <div className="mb-12 mt-20">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* Consultation Experts */}
            {experts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Consultation Experts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.slice(0, 3).map(expert => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Book This Service</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {currentOffer?.country_price?.[0]?.currency} {price}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      {currentOffer?.name} Plan
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      Monthly subscription
                    </div>
                    <Button className="w-full">
                      Buy Now
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      You won't be charged until confirmation
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl">Contact Us</h3>
                      <p className="text-sm text-gray-500">Get in touch with our team</p>
                    </div>
                    <Contact className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Phone Numbers */}
                    {serviceData.quick_contact_no && serviceData.quick_contact_no.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700">Call Us</h4>
                        <div className="space-y-3">
                          {serviceData.quick_contact_no.map((contact, index) => (
                            <a
                              key={index}
                              href={`tel:${contact.contact_no}`}
                              className="flex items-center justify-between p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full">
                                  <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{contact.country}</p>
                                  <p className="text-xs text-gray-500">Direct Call</p>
                                </div>
                              </div>
                              <span className="text-sm font-medium text-primary">{contact.contact_no}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {serviceData.quick_contact_no && serviceData.whatsapp_no && (
                      <Separator />
                    )}

                    {/* WhatsApp Numbers */}
                    {serviceData.whatsapp_no && serviceData.whatsapp_no.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700">WhatsApp</h4>
                        <div className="space-y-3">
                          {serviceData.whatsapp_no.map((contact, index) => (
                            <div
                              key={index}
                              onClick={() => openWhatsApp(contact.whatsapp_no)}
                              className="flex items-center justify-between p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-full">
                                  <img
                                    className="h-4 w-4"
                                    src='https://img.icons8.com/?size=100&id=uZWiLUyryScN&format=png&color=000000'
                                    alt="WhatsApp"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{contact.country}</p>
                                  <p className="text-xs text-gray-500">Chat on WhatsApp</p>
                                </div>
                              </div>
                              <span className="text-sm font-medium text-green-600">{contact.whatsapp_no}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
