"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Shield,
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
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import ProductCard from "@/components/custom/common/ProductCard"
import { motion } from "framer-motion"
import ExpertCard from "@/components/custom/common/ExpertCard"

interface Consultation {
  id: number;
  badge?: string;
  name: string;
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

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  badge?: string;
  ribbon?: string;
  // pricing: ProductPricing;
}

// ——— NEW serviceData shape ———
const serviceData =
{
  "service_category": "Business Automation",
  "service_name": "Starmoon Business Suite",
  "service_thumb_image": "/api/files/uploads/starmoon-thumb.png",
  "service_image_gallery": [
    "/FindService/BusinessAutomation.jpg",
    "/FindService/DigitalMarketing.jpg",
    "/FindService/WebDevelopment.png"
  ],
  "service_description": "A complete suite to automate, manage, and grow your business.",
  "service_long_description": "Starmoon Business Suite is designed to help companies of all sizes centralize operations, automate tasks, analyze insights, nurture client relationships, and strategically plan growth — all from one integrated platform.",
  "tags": [
    "automation",
    "CRM",
    "CAD",
    "consulting",
    "productivity"
  ],
  "is_pay_as_you_go": false,
  "is_service_features_and_offers": true,
  "experts_mapping": [
    {
      "id": 1,
      "Name": "Rohit Aneja"
    },
    {
      "id": 3,
      "Name": "Manish jolly"
    }
  ],
  "products_mapping": [
    {
      "id": 3,
      "Name": "Bitrix24"
    },
    {
      "id": 2,
      "Name": "Graebert ARES"
    }
  ],
  "pay_as_you_go_price": [],
  "service_features_and_offers": [
    {
      "name": "Basic",
      "description": "Perfect for startups and small businesses",
      "is_most_popular": false,
      "features": [
        {
          "name": "Number of Users",
          "value": 5,
          "is_included": true
        },
        {
          "name": "Cloud Storage (GB)",
          "value": 10,
          "is_included": true
        }
      ],
      "country_price": [
        {
          "country": "United Arab Emirates",
          "currency": "AED",
          "monthly_price": 999,
          "yearly_price": 9999
        }
      ]
    },
    {
      "name": "Standard",
      "description": "Great for growing businesses with expanding teams",
      "is_most_popular": false,
      "features": [
        {
          "name": "Number of Users",
          "value": 25,
          "is_included": true
        },
        {
          "name": "Cloud Storage (GB)",
          "value": 50,
          "is_included": true
        }
      ],
      "country_price": [
        {
          "country": "United Arab Emirates",
          "currency": "AED",
          "monthly_price": 1999,
          "yearly_price": 19999
        }
      ]
    },
    {
      "name": "Professional",
      "description": "Ideal for enterprise-level automation and analytics",
      "is_most_popular": true,
      "features": [
        {
          "name": "Number of Users",
          "value": 100,
          "is_included": true
        },
        {
          "name": "Dedicated Support",
          "value": "Included",
          "is_included": true
        }
      ],
      "country_price": [
        {
          "country": "United Arab Emirates",
          "currency": "AED",
          "monthly_price": 2999,
          "yearly_price": 29999
        }
      ]
    },
    {
      "name": "Enterprise",
      "description": "Tailored for large organizations with custom requirements",
      "is_most_popular": false,
      "features": [
        {
          "name": "Number of Users",
          "value": "Unlimited",
          "is_included": true
        },
        {
          "name": "Custom Integration",
          "value": "Yes",
          "is_included": true
        }
      ],
      "country_price": [
        {
          "country": "United Arab Emirates",
          "currency": "AED",
          "monthly_price": 4999,
          "yearly_price": 49999
        }
      ]
    }
  ],
  "quick_contact_no": [
    {
      "country": "United Arab Emirates",
      "contact_no": "054454545"
    },
    {
      "country": "India",
      "contact_no": "0987654321"
    }
  ],
  "whatsapp_no": [
    {
      "country": "United Arab Emirates",
      "whatsapp_no": "0561234567"
    },
    {
      "country": "India",
      "whatsapp_no": "09123456789"
    }
  ],
  "is_active": true,
  "faqs": [
    {
      "id": "faq-1",
      "question": "What is included in the Starmoon Business Suite?",
      "answer": "It includes CRM, task management, CAD tools, communication platforms, and more — all in one integrated dashboard."
    },
    {
      "id": "faq-2",
      "question": "Do you offer training or onboarding?",
      "answer": "Yes, we provide full onboarding support and corporate training options for teams."
    }
  ]
}

export default function ServiceDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  // alias for convenience
  const offers = serviceData.service_features_and_offers
  const currentOffer = offers[selectedPackage]
  // pick the first country price
  const price = currentOffer.country_price[0].monthly_price

  const openWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    window.open(`https://wa.me/${cleanNumber}`, '_blank')
  };

  useEffect(() => {
    const fetchData = async () => {
      const [pRes, cRes, sRes] = await Promise.all([
        // fetch("/data/featuredServices.json"),
        fetch("/data/products.json"),
        fetch("/data/consultations.json"),
        fetch("/data/services.json")
      ])
      // setFeaturedServices(await fsRes.json())
      setProducts(await pRes.json())
      setConsultations(await cRes.json())
    }
    fetchData()
  }, []);

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
                    serviceData.service_image_gallery[selectedImage] ||
                    serviceData.service_thumb_image
                  }
                  alt={serviceData.service_name}
                  width={600}
                  height={400}
                  className="w-full h-96 object-contain rounded-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {/* <Button size="sm" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="secondary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share this Project</DialogTitle>
                        <DialogDescription>
                          Easily share this project with your friends or colleagues.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 py-4">
                        {/* Copy Link */}
                        <button
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                          }}
                        >
                          <Copy className="w-4 h-4" />
                          Copy Link
                        </button>
                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Share on WhatsApp
                        </a>
                        {/* Email */}
                        <a
                          href={`mailto:?subject=Check out this project&body=${encodeURIComponent(window.location.href)}`}
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
              <div className="flex space-x-2">
                {serviceData.service_image_gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === i ? "border-primary" : "border-gray-200"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${serviceData.service_name} ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
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

              <div className="flex flex-wrap gap-2 mb-6">
                {serviceData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Packages Section */}
            <div className="mb-8">
              <div className="text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
                <p className="text-gray-600">Select the perfect plan that fits your business needs</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-lg border bg-white cursor-pointer transition-all hover:shadow-lg ${selectedPackage === idx ? "ring-2 ring-primary" : ""
                      }`}
                    onClick={() => setSelectedPackage(idx)}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold flex items-center justify-between mb-2">
                        {pkg.name}
                        <span className="text-lg font-bold text-primary">
                          AED {pkg.country_price[0].monthly_price}
                        </span>
                      </h3>
                      <p className="text-gray-600 text-sm">{pkg.description}</p>
                    </div>
                    <div>
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                            {f.name}: {f.value}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {pkg.country_price[0].monthly_price
                          ? "Monthly billing"
                          : "—"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* FAQs */}
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

            {/* Products Section */}
            <div className="mb-12 mt-20">
              <h2 className="text-2xl font-bold mb-4"> Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Related to Consultation Experts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Consultation Experts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultations?.slice(0, 3).map(expert => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Book This Service</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    AED {price}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      {currentOffer.name} Plan
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      Monthly subscription
                    </div>
                    {/* <Button variant="outline" className="w-full mb-2">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Expert
                    </Button> */}
                    <Button className="w-full">
                      {/* <Calendar className="h-4 w-4 mr-2" /> */}
                      Buy Now
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      You won't be charged until confirmation
                    </p>
                  </div>
                </CardContent>
              </Card>
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

                    <Separator />

                    {/* WhatsApp Numbers */}
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
