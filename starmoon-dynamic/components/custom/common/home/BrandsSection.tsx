'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight } from "lucide-react"
import Image from "next/image"

const partners = [
  { name: "Bitrix24", image: "/Dropdown/Bitrix.png" },
  { name: "Wazzup", image: "/Dropdown/Wazzup.png" },
  { name: "ChatApp", image: "/Dropdown/Chatapp.png" },
  { name: "SocifyIt", image: "/Dropdown/Socifyit.png" },
  { name: "Graebert", image: "/Dropdown/Graebert.png" },
  { name: "Zadarma", image: "/Dropdown/Zadarma.png" }
];

export default function BrandsSection() {
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
            Our Trusted Technology Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-300/90 max-w-2xl mx-auto">
            We collaborate with top-tier software companies to deliver genuine, supported solutions tailored to your business growth.
          </p>
        </div>

        {/* Partners Grid - Big Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800/90 rounded-3xl shadow-md hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700/50 p-10 flex flex-col items-center justify-between h-72 dark:backdrop-blur-sm relative overflow-hidden"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-primary/5 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Image container with background */}
              <div className="relative flex-1 w-full flex items-center justify-center bg-white dark:bg-slate-800/50 rounded-xl p-4">
                <Image
                  src={partner.image || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={160}
                  height={160}
                  className="object-contain max-h-32 w-auto relative z-10 dark:filter-none dark:opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white text-center relative z-10 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors duration-300">
                {partner.name}
              </h3>
            </div>
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