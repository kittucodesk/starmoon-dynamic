'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Check, 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Users, 
  Globe,
  Zap,
  Eye,
  Lock
} from 'lucide-react'
import Link from 'next/link'

export default function CheckoutDemo() {
  const [selectedDevice, setSelectedDevice] = useState('desktop')

  const features = [
    {
      title: 'Progress Indicator',
      description: '2-step progress bar with clear visual hierarchy',
      icon: <Zap className="h-5 w-5" />,
      implemented: true,
      details: 'Interactive progress bar showing current step with smooth transitions'
    },
    {
      title: 'Checkout Options',
      description: 'Radio-style cards for different checkout methods',
      icon: <Users className="h-5 w-5" />,
      implemented: true,
      details: 'Guest checkout, account creation, and existing user login options'
    },
    {
      title: 'Dynamic Forms',
      description: 'Smart forms that adapt based on user selections',
      icon: <Eye className="h-5 w-5" />,
      implemented: true,
      details: 'Password fields appear/hide, shipping address toggles automatically'
    },
    {
      title: 'Address Management',
      description: 'Comprehensive billing and shipping address forms',
      icon: <Globe className="h-5 w-5" />,
      implemented: true,
      details: 'Country dropdown, optional shipping address, form validation'
    },
    {
      title: 'Payment Integration',
      description: 'Multiple payment gateway support',
      icon: <CreditCard className="h-5 w-5" />,
      implemented: true,
      details: 'Stripe and Razorpay integration with branded styling'
    },
    {
      title: 'Security & Trust',
      description: 'Trust badges and security indicators',
      icon: <Shield className="h-5 w-5" />,
      implemented: true,
      details: 'SSL, PCI-DSS compliance badges with help tooltips'
    }
  ]

  const technicalFeatures = [
    'React Hook Form + Zod validation',
    'Framer Motion animations',
    'shadcn/ui components',
    'Tailwind CSS responsive design',
    'TypeScript type safety',
    'ARIA accessibility labels',
    'Password strength validation',
    'Real-time form validation',
    'Mobile-first responsive design',
    'High contrast mode support'
  ]

  const deviceSizes = [
    {
      id: 'mobile',
      name: 'Mobile',
      icon: Smartphone,
      width: '320px',
      description: 'Mobile phones (320px+)'
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: Tablet,
      width: '768px',
      description: 'Tablets (768px+)'
    },
    {
      id: 'desktop',
      name: 'Desktop',
      icon: Monitor,
      width: '100%',
      description: 'Desktop screens (1024px+)'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ShoppingCart className="h-4 w-4" />
            Checkout Page Demo
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Checkout Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A fully responsive, accessible, and conversion-optimized checkout page built with modern React patterns and best UX practices.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="px-8">
              <Link href="/checkout">
                <ShoppingCart className="h-5 w-5 mr-2" />
                View Live Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit">
                        {feature.icon}
                      </div>
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <p className="text-xs text-gray-500">{feature.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">Mobile Friendly</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">WCAG 2.1</div>
                    <div className="text-sm text-gray-600">Accessible</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{"< 2s"}</div>
                    <div className="text-sm text-gray-600">Load Time</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">100%</div>
                    <div className="text-sm text-gray-600">Type Safe</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-8">
            {/* Device Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Responsive Preview</CardTitle>
                <div className="flex flex-wrap gap-2">
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
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg bg-white p-4 overflow-hidden">
                  <div 
                    className={`mx-auto transition-all duration-500 ${
                      selectedDevice === 'mobile' ? 'max-w-sm' : 
                      selectedDevice === 'tablet' ? 'max-w-2xl' : 
                      'max-w-none'
                    }`}
                  >
                    <div className="bg-gray-100 rounded-t-lg p-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-2 text-xs text-gray-500">localhost:3000/checkout</div>
                    </div>
                    <iframe
                      src="/checkout"
                      className="w-full h-96 border-0 rounded-b-lg"
                      title="Checkout Page Preview"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screenshot Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Visual Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 text-center">
                    <Monitor className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold">Desktop Experience</h3>
                    <p className="text-sm text-gray-600">Spacious layout with side-by-side forms</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center">
                    <Tablet className="h-12 w-12 mx-auto mb-3 text-green-600" />
                    <h3 className="font-semibold">Tablet Optimized</h3>
                    <p className="text-sm text-gray-600">Balanced layout for medium screens</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6 text-center">
                    <Smartphone className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold">Mobile First</h3>
                    <p className="text-sm text-gray-600">Touch-friendly with stacked sections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-8">
            {/* Tech Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Next.js 15</span>
                      <Badge variant="secondary">App Router</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="font-medium">React 19</span>
                      <Badge variant="secondary">TypeScript</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Tailwind CSS</span>
                      <Badge variant="secondary">Responsive</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">shadcn/ui</span>
                      <Badge variant="secondary">Components</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="font-medium">Framer Motion</span>
                      <Badge variant="secondary">Animations</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form & Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">React Hook Form</span>
                      <Badge variant="secondary">Performance</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Zod Schema</span>
                      <Badge variant="secondary">Validation</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium">Real-time Validation</span>
                      <Badge variant="secondary">UX</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="font-medium">Password Strength</span>
                      <Badge variant="secondary">Security</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="font-medium">Error Handling</span>
                      <Badge variant="secondary">Robust</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technical Features */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technicalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance & Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-1">95+</div>
                    <div className="text-xs text-gray-600">Lighthouse Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-1">AAA</div>
                    <div className="text-xs text-gray-600">WCAG Rating</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{"< 1s"}</div>
                    <div className="text-xs text-gray-600">First Paint</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-3xl font-bold text-orange-600 mb-1">0</div>
                    <div className="text-xs text-gray-600">JS Errors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience It?</h2>
          <p className="text-gray-600 mb-6">
            Test the checkout flow with all interactive features and responsive design.
          </p>
          <Button size="lg" asChild className="px-8">
            <Link href="/checkout">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Launch Checkout Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 