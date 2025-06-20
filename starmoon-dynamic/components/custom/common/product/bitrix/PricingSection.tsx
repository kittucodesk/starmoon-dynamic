"use client"

import { useState } from "react"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    monthlyPrice: 29,
    annualPrice: 290,
    description: "Perfect for small teams getting started",
    features: ["Up to 5 team members", "Basic CRM features", "Task management", "5GB storage", "Email support"],
    popular: false,
  },
  {
    name: "Standard",
    monthlyPrice: 59,
    annualPrice: 590,
    description: "Great for growing businesses",
    features: [
      "Up to 15 team members",
      "Advanced CRM features",
      "Project management",
      "50GB storage",
      "Priority support",
      "Basic automation",
    ],
    popular: false,
  },
  {
    name: "Professional",
    monthlyPrice: 99,
    annualPrice: 990,
    description: "Best for established companies",
    features: [
      "Up to 50 team members",
      "Full CRM suite",
      "Advanced project tools",
      "200GB storage",
      "24/7 phone support",
      "Advanced automation",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 1990,
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Enterprise CRM",
      "Custom workflows",
      "Unlimited storage",
      "Dedicated support",
      "White-label options",
      "API access",
      "Advanced security",
    ],
    popular: false,
  },
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose the perfect plan for your business</h2>
          <p className="text-xl text-gray-600 mb-8">Flexible pricing options that scale with your needs</p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${!isAnnual ? "text-blue-600" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-8 rounded-full transition-colors ${isAnnual ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? "text-blue-600" : "text-gray-500"}`}>Annually</span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">Save 20%</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular ? "border-blue-500 transform scale-105" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isAnnual ? "year" : "month"}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
