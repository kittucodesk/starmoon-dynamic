'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { fetchPartners, type Partner } from "@/lib/api"

// Component for individual partner card with read more functionality
function PartnerCard({ partner }: { partner: Partner }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)

  // Check if description is long enough to warrant "Read More"
  useEffect(() => {
    setShowReadMore(partner.description.length > 120)
  }, [partner.description])

  const truncatedDescription = partner.description.length > 120 
    ? partner.description.substring(0, 120) + "..."
    : partner.description

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on read more button
    if ((e.target as HTMLElement).closest('.read-more-btn')) {
      return
    }
    window.open(partner.url, '_blank')
  }

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  // Fix the image URL construction
  const getImageSrc = () => {
    if (!partner.logo) return "/placeholder.svg"
    
    // If logo already starts with http or https, use it as is
    if (partner.logo.startsWith('http')) {
      return partner.logo
    }
    
    // If logo starts with /api, prepend the domain
    if (partner.logo.startsWith('/api')) {
      return `${process.env.NEXT_PUBLIC_DOMAIN_URL || ''}${partner.logo}`
    }
    
    // Otherwise, use as is (for local images)
    return partner.logo
  }

  return (
    <div
      className="group bg-white dark:bg-slate-800/90 rounded-3xl shadow-md hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700/50 p-6 flex flex-col dark:backdrop-blur-sm relative overflow-hidden cursor-pointer min-h-[360px]"
      onClick={handleCardClick}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-primary/5 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative w-full flex items-center justify-center bg-white dark:bg-slate-800/50 rounded-xl p-4 h-32 mb-4">
        <Image
          src={getImageSrc()}
          alt={`${partner.title} logo`}
          width={300}
          height={200}
          className="object-contain max-h-24 w-auto relative z-10 dark:filter-none dark:opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-3 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors duration-300">
          {partner.title}
        </h3>
        
        {/* Description with Read More */}
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            {isExpanded ? partner.description : truncatedDescription}
          </p>
          
          {showReadMore && (
            <button
              onClick={toggleDescription}
              className="read-more-btn mt-2 text-xs text-primary dark:text-primary/90 hover:text-primary/80 dark:hover:text-primary flex items-center justify-center w-full transition-colors duration-200 font-medium"
            >
              {isExpanded ? (
                <>
                  Read Less <ChevronUp className="ml-1 w-3 h-3" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="ml-1 w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Visit link button */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
          <button
            onClick={handleCardClick}
            className="w-full text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary/90 transition-colors duration-200 flex items-center justify-center font-medium"
          >
            Visit Product <ExternalLink className="ml-1 w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BrandsSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPartners() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPartners('India')
        // Sort by sort_order and filter only active partners
        const activePartners = data
          .filter(partner => partner.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
        setPartners(activePartners)
      } catch (err) {
        console.error('Failed to fetch partners:', err)
        setError('Failed to load partners')
        // Fallback to hardcoded data if API fails
        setPartners([
          { 
            id: 1, 
            title: "Bitrix24", 
            logo: "/Dropdown/Bitrix.png", 
            description: "Bitrix24 CRM enables you to streamline sales, marketing, and customer service processes, improve customer relationships, and increase sales. Sales automation and pipeline management. Customer database and communication tools. Marketing automation and campaigns.",
            url: "/product/bitrix",
            country: "India",
            sort_order: 1,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          { 
            id: 2, 
            title: "Wazzup", 
            logo: "/Dropdown/Wazzup.png", 
            description: "Your own WhatsApp Business Channel for professional communication and customer engagement with advanced features.",
            url: "/product/wazzup",
            country: "India",
            sort_order: 2,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          { 
            id: 3, 
            title: "ChatApp", 
            logo: "/Dropdown/Chatapp.png", 
            description: "Your trusted Chat Application for seamless communication and collaboration across teams and customers.",
            url: "/product/chatapp",
            country: "India",
            sort_order: 3,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          { 
            id: 4, 
            title: "SocifyIt", 
            logo: "/Dropdown/Socifyit.png", 
            description: "Social media application for enhanced social networking and content management with powerful analytics and engagement tools.",
            url: "/product/socifyit",
            country: "India",
            sort_order: 4,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          { 
            id: 5, 
            title: "Graebert", 
            logo: "/Dropdown/Graebert.png", 
            description: "Innovating Together: How Graebert Collaborates with Partners to Advance CAD Technology. A decade-long collaboration delivering cutting-edge CAD technology for designers worldwide. Cloud-native CAD innovation at scale, powered by advanced algorithms for global accessibility and seamless workflow integration.",
            url: "/product/graebert",
            country: "India",
            sort_order: 5,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          { 
            id: 6, 
            title: "Zadarma", 
            logo: "/Dropdown/Zadarma.png", 
            description: "VoIP and telephony services for modern business communications with crystal clear call quality and global reach.",
            url: "/product/zadarma",
            country: "India",
            sort_order: 6,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPartners()
  }, [])

  if (loading) {
    return (
      <section id="brands" className="container py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/95 dark:to-slate-800/95 dark:backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 border-0 px-3 py-1 transition-colors duration-300">
              <Shield className="w-4 h-4 mr-1 dark:text-blue-400" />
              Authorized Distributor
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 dark:drop-shadow-sm">
              Our Trusted Technology Brands
            </h2>
            <p className="text-gray-600 dark:text-gray-300/90 max-w-2xl mx-auto">
              We collaborate with top-tier software companies to deliver genuine, supported solutions tailored to your business growth.
            </p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700/50 p-6 flex flex-col min-h-[360px] animate-pulse"
              >
                <div className="w-full h-32 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4"></div>
                <div className="w-24 h-6 bg-gray-300 dark:bg-slate-600 rounded mx-auto mb-3"></div>
                <div className="space-y-2 flex-1">
                  <div className="w-full h-4 bg-gray-300 dark:bg-slate-600 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-300 dark:bg-slate-600 rounded mx-auto"></div>
                  <div className="w-1/2 h-4 bg-gray-300 dark:bg-slate-600 rounded mx-auto"></div>
                </div>
                <div className="w-20 h-6 bg-gray-300 dark:bg-slate-600 rounded mx-auto mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="brands" className="container py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/95 dark:to-slate-800/95 dark:backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 border-0 px-3 py-1 transition-colors duration-300">
            <Shield className="w-4 h-4 mr-1 dark:text-blue-400" />
            Authorized Distributor
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 dark:drop-shadow-sm">
            Our Trusted Technology Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-300/90 max-w-2xl mx-auto">
            We collaborate with top-tier software companies to deliver genuine, supported solutions tailored to your business growth.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Partners Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
          <Button 
            size="lg" 
            className="px-8 py-3 rounded-xl bg-primary dark:bg-primary/90 dark:hover:bg-primary shadow-lg dark:shadow-primary/20 hover:shadow-xl dark:hover:shadow-primary/30 transition-all duration-300"
          >
            Browse Solutions
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 dark:border-slate-600/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800/80 px-8 py-3 rounded-xl transition-all duration-300 dark:hover:border-slate-500 dark:hover:shadow-lg dark:hover:shadow-slate-900/20"
          >
            Sell on StarMoon
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
} 