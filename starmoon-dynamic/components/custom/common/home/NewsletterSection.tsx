'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email)
    // You can add API call here
    setEmail("") // Clear form after submission
  }

  return (
    <section className="w-full bg-gray-900 py-8 container">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">
              Sign up & get 10% off your first order!
            </h2>
            <p className="text-gray-300 text-sm lg:text-base">
              Join our newsletter and get first access to exclusive product drops & deals!
            </p>
          </div>
          
          {/* Right side - Form */}
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-gray-900 placeholder:text-gray-500 border-0 focus-visible:ring-2 focus-visible:ring-yellow-500"
              />
              <Button 
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 whitespace-nowrap"
              >
                Get 10% off
              </Button>
            </form>
            <p className="text-gray-400 text-xs italic text-center lg:text-left">
              We respect your data and privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 