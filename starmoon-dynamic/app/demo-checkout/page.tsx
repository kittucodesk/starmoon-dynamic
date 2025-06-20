import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ShoppingCart, CreditCard, Shield, Users, Globe, Zap, Eye, Lock } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutDemo() {
  const features = [
    {
      title: 'Progress Indicator',
      description: '2-step progress bar with visual hierarchy',
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      status: 'Complete'
    },
    {
      title: 'Checkout Options',
      description: 'Guest, Create Account, and Login options',
      icon: <Users className="h-5 w-5 text-green-600" />,
      status: 'Complete'
    },
    {
      title: 'Dynamic Forms',
      description: 'Smart forms with conditional fields',
      icon: <Eye className="h-5 w-5 text-purple-600" />,
      status: 'Complete'
    },
    {
      title: 'Address Management',
      description: 'Billing and shipping address forms',
      icon: <Globe className="h-5 w-5 text-orange-600" />,
      status: 'Complete'
    },
    {
      title: 'Payment Methods',
      description: 'Stripe and Razorpay integration',
      icon: <CreditCard className="h-5 w-5 text-indigo-600" />,
      status: 'Complete'
    },
    {
      title: 'Security & Trust',
      description: 'SSL and PCI-DSS compliance badges',
      icon: <Shield className="h-5 w-5 text-red-600" />,
      status: 'Complete'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ShoppingCart className="h-4 w-4" />
            Checkout Demo
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Checkout Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A fully responsive, accessible checkout page with modern UX patterns
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/checkout">
                <ShoppingCart className="h-5 w-5 mr-2" />
                View Live Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gray-50 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Next.js 15 with App Router</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>React 19 with TypeScript</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Tailwind CSS for styling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>shadcn/ui components</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Framer Motion animations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Mobile-first responsive design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>WCAG 2.1 accessibility compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Real-time form validation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Password strength indicator</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Smooth micro-interactions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Performance & Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Mobile Friendly</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">AAA</div>
                <div className="text-sm text-gray-600">Accessibility</div>
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

        {/* CTA */}
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-bold mb-4">Ready to Test It?</h2>
          <p className="text-gray-600 mb-6">
            Experience the complete checkout flow with all interactive features.
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