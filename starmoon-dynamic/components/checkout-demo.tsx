'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Smartphone, Tablet, Monitor, Check } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutDemo() {
  const [selectedDevice, setSelectedDevice] = useState('desktop')

  const features = [
    {
      title: 'Progress Indicator',
      description: '2-step progress bar with "Details" highlighted',
      implemented: true
    },
    {
      title: 'Checkout Options',
      description: 'Radio-style cards for Guest, Create Account, and Login options',
      implemented: true
    },
    {
      title: 'Dynamic Password Fields',
      description: 'Password strength validation with show/hide toggles',
      implemented: true
    },
    {
      title: 'Contact Information',
      description: 'Full name, company (optional), email, and phone fields',
      implemented: true
    },
    {
      title: 'Billing & Shipping Addresses',
      description: 'Complete address forms with country dropdown and shipping toggle',
      implemented: true
    },
    {
      title: 'Payment Methods',
      description: 'Stripe and Razorpay options with branded styling',
      implemented: true
    },
    {
      title: 'Trust & Security',
      description: 'SSL Secure and PCI-DSS Compliant badges with help tooltip',
      implemented: true
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first design that works on all screen sizes',
      implemented: true
    },
    {
      title: 'Micro-interactions',
      description: 'Hover effects, focus rings, and smooth animations',
      implemented: true
    },
    {
      title: 'Form Validation',
      description: 'Client-side validation with Zod and React Hook Form',
      implemented: true
    },
    {
      title: 'Accessibility',
      description: 'ARIA labels, semantic HTML, and keyboard navigation',
      implemented: true
    }
  ]

  const deviceSizes = [
    {
      id: 'mobile',
      name: 'Mobile',
      icon: Smartphone,
      width: '375px',
      description: 'iPhone/Android phones'
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: Tablet,
      width: '768px',
      description: 'iPad/Android tablets'
    },
    {
      id: 'desktop',
      name: 'Desktop',
      icon: Monitor,
      width: '100%',
      description: 'Laptop/Desktop screens'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Checkout Page Demo
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A fully responsive, accessible checkout experience
          </p>
          <Button size="lg" asChild className="mr-4">
            <Link href="/checkout">
              View Live Checkout Page
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Device Preview Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Responsive Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {deviceSizes.map((device) => {
                const Icon = device.icon
                return (
                  <Button
                    key={device.id}
                    variant={selectedDevice === device.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice(device.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {device.name}
                  </Button>
                )
              })}
            </div>
            
            <div className="border rounded-lg bg-white p-4 overflow-hidden">
              <div 
                className={`mx-auto transition-all duration-300 ${
                  selectedDevice === 'mobile' ? 'max-w-sm' : 
                  selectedDevice === 'tablet' ? 'max-w-2xl' : 
                  'max-w-none'
                }`}
                style={{
                  width: deviceSizes.find(d => d.id === selectedDevice)?.width
                }}
              >
                <iframe
                  src="/checkout"
                  className="w-full h-96 border-0 rounded"
                  title="Checkout Page Preview"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  {feature.implemented && (
                    <Badge variant="default" className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Frontend Stack</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Next.js 15 with App Router</li>
                  <li>• React 19 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui component library</li>
                  <li>• Framer Motion for animations</li>
                  <li>• React Hook Form + Zod validation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Mobile-first responsive design</li>
                  <li>• WCAG 2.1 accessibility compliance</li>
                  <li>• Real-time form validation</li>
                  <li>• Password strength indicator</li>
                  <li>• Smooth micro-interactions</li>
                  <li>• Payment gateway integration ready</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 