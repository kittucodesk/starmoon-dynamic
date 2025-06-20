"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Check,
  Clock,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  LifeBuoy,
  Lightbulb,
  Lock,
  MessageSquare,
  Zap,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type PaymentType = "pay-as-you-go" | "subscription" | "enterprise"

export default function ProductPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>("subscription")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const handleSelect = (value: string) => {
    const selectedPaymentType = value as PaymentType
    setPaymentType(selectedPaymentType)
  }

  // Subscription plans data
  const subscriptionPlans = [
    {
      name: "Starter",
      description: "Perfect for small teams just getting started with automation.",
      price: billingCycle === "monthly" ? "$49" : "$39",
      period: "/month",
      features: [
        { name: "Up to 5 users", included: true },
        { name: "50 automated workflows", included: true },
        { name: "10,000 tasks per month", included: true },
        { name: "Standard integrations (25+)", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "Advanced integrations", included: false },
        { name: "API access", included: false },
      ],
      isPopular: false,
      ctaText: "Start Free Trial",
      onSelect: () => console.log("Starter plan selected"),
    },
    {
      name: "Professional",
      description: "For growing teams that need more power and flexibility.",
      price: billingCycle === "monthly" ? "$149" : "$119",
      period: "/month",
      features: [
        { name: "Up to 20 users", included: true },
        { name: "Unlimited workflows", included: true },
        { name: "50,000 tasks per month", included: true },
        { name: "Advanced integrations (100+)", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Workflow templates library", included: true },
        { name: "API access", included: true },
      ],
      isPopular: true,
      ctaText: "Start Free Trial",
      onSelect: () => console.log("Professional plan selected"),
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex automation needs.",
      price: "Custom",
      period: "",
      features: [
        { name: "Unlimited users", included: true },
        { name: "Unlimited workflows", included: true },
        { name: "Custom task volume", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated success manager", included: true },
        { name: "Custom reporting & BI tools", included: true },
        { name: "SSO & advanced security", included: true },
        { name: "SLA guarantees", included: true },
        { name: "On-premise deployment option", included: true },
      ],
      isPopular: false,
      ctaText: "Contact Sales",
      onSelect: () => console.log("Enterprise plan selected"),
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge className="mb-2">New Features Available</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Streamline your workflow with intelligent automation
              </h1>
              <p className="text-xl text-muted-foreground">
                FlowSync helps teams eliminate repetitive tasks and focus on what matters most. Automate your business
                processes in minutes, not months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-6">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6">
                  Book a Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="FlowSync Dashboard"
                width={1280}
                height={720}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="border-y bg-muted/40">
          <div className="container py-12">
            <h2 className="text-center text-sm font-medium text-muted-foreground mb-6">
              TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-center">
                  <div className="h-8 w-32 bg-muted rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features to Transform Your Workflow
            </h2>
            <p className="max-w-[85%] text-muted-foreground text-xl">
              FlowSync combines powerful automation with an intuitive interface to help you work smarter, not harder.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-12 mt-16">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Intelligent Automation</h3>
              <p className="text-center text-muted-foreground">
                Create complex workflows with our drag-and-drop builder. No coding required. Save up to 20 hours per
                week on repetitive tasks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Seamless Integrations</h3>
              <p className="text-center text-muted-foreground">
                Connect with 200+ popular apps and services. Unify your tech stack and eliminate data silos for better
                collaboration.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Insights</h3>
              <p className="text-center text-muted-foreground">
                Get actionable recommendations to optimize your workflows. Our AI analyzes patterns to suggest
                improvements.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Enterprise-Grade Security</h3>
              <p className="text-center text-muted-foreground">
                SOC 2 Type II certified with end-to-end encryption. Your data is always protected with role-based access
                controls.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Powerful Analytics</h3>
              <p className="text-center text-muted-foreground">
                Track performance metrics and identify bottlenecks with customizable dashboards. Make data-driven
                decisions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Scalable Infrastructure</h3>
              <p className="text-center text-muted-foreground">
                Built to handle enterprise workloads with 99.99% uptime. Scale from startups to Fortune 500 companies.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How FlowSync Works</h2>
              <p className="max-w-[85%] text-muted-foreground text-xl">
                Get started in minutes with our intuitive platform designed for teams of all technical abilities.
              </p>
            </div>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Design Your Workflow</h3>
                <p className="text-center text-muted-foreground">
                  Use our visual workflow builder to map out your processes. Drag and drop actions, set conditions, and
                  connect your apps.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-border" />
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Automate & Test</h3>
                <p className="text-center text-muted-foreground">
                  Set triggers that automatically start your workflows. Test in our sandbox environment before going
                  live.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-border" />
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Monitor & Optimize</h3>
                <p className="text-center text-muted-foreground">
                  Track performance in real-time. Get alerts for issues and use AI-powered suggestions to continuously
                  improve.
                </p>
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl border">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="FlowSync Workflow Builder"
                  width={1280}
                  height={720}
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm">
                    Watch Demo Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Use Cases</h2>
            <p className="max-w-[85%] text-muted-foreground text-xl">
              See how companies across industries are using FlowSync to transform their operations.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Customer Onboarding</CardTitle>
                <CardDescription>Streamline the customer journey from sign-up to activation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically send welcome emails, schedule onboarding calls, and track customer progress. Reduce
                  time-to-value by 40%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline Automation</CardTitle>
                <CardDescription>Accelerate deal cycles and improve conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automate lead scoring, follow-ups, and contract generation. Our customers report 28% faster sales
                  cycles on average.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>HR Process Automation</CardTitle>
                <CardDescription>Simplify employee onboarding and management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automate document collection, training assignments, and approval workflows. Reduce administrative work
                  by 60%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaign Management</CardTitle>
                <CardDescription>Coordinate multi-channel campaigns effortlessly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Schedule content, track engagement, and automatically nurture leads across channels. Increase campaign
                  ROI by 35%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IT Service Management</CardTitle>
                <CardDescription>Streamline incident response and resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically categorize tickets, assign to the right team, and track SLAs. Reduce mean time to
                  resolution by 45%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Operations</CardTitle>
                <CardDescription>Automate invoicing, approvals, and reconciliation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamline accounts payable/receivable processes and approval workflows. Reduce processing time by
                  70%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Industry Leaders
              </h2>
              <p className="max-w-[85%] text-muted-foreground text-xl">
                See what our customers are saying about how FlowSync has transformed their operations.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "FlowSync has completely transformed how we manage our customer onboarding process. What used to
                    take days now happens automatically in minutes. The ROI has been incredible."
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-full bg-muted h-12 w-12" />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">CTO, TechNova Inc.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "As a fast-growing startup, we needed to scale our operations without adding headcount. FlowSync
                    allowed us to automate 80% of our manual processes, letting our team focus on strategic work."
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-full bg-muted h-12 w-12" />
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">COO, GrowthWave</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The implementation was surprisingly fast. Within two weeks, we had automated our entire sales
                    pipeline. The support team was exceptional in helping us customize workflows to our needs."
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-full bg-muted h-12 w-12" />
                  <div>
                    <p className="font-medium">Jessica Martinez</p>
                    <p className="text-sm text-muted-foreground">VP of Sales, Elevate Solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="rounded-lg border bg-background p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4">
                    <Badge>Case Study</Badge>
                    <h3 className="text-2xl font-bold">How Acme Corp Saved $2M Annually with FlowSync</h3>
                    <p className="text-muted-foreground">
                      Learn how this Fortune 500 company automated their entire procurement process, reducing processing
                      time by 85% and eliminating costly errors.
                    </p>
                    <Button>Read Case Study</Button>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src="/placeholder.svg?height=360&width=640"
                        alt="Case Study Preview"
                        width={640}
                        height={360}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[85%] text-muted-foreground text-xl">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Payment Type Selector */}
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-lg font-medium">Select Payment Type</h3>
              <Tabs defaultValue={paymentType} onValueChange={handleSelect} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="pay-as-you-go">Pay-As-You-Go</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <>
            {/* Billing Cycle Toggle (only for subscription) */}
            {paymentType === "subscription" && (
              <div className="mt-8 flex justify-center">
                <Tabs
                  defaultValue={billingCycle}
                  onValueChange={(value: string) => setBillingCycle(value as "monthly" | "annual")}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                  </TabsList>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    All plans include a 14-day free trial. No credit card required.
                  </div>
                </Tabs>
              </div>
            )}

            {/* Pricing Content Based on Payment Type */}
            <div className="mt-8">
              {paymentType === "pay-as-you-go" ? (
                <div className="mx-auto max-w-4xl">
                  <div className="rounded-lg border bg-background p-8 shadow-sm">
                    <h3 className="text-2xl font-bold mb-4">Pay-As-You-Go Pricing</h3>
                    <p className="text-muted-foreground mb-6">
                      Only pay for what you use with our flexible pay-as-you-go option. Perfect for teams with variable usage
                      needs.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-3">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">$20 base fee</p>
                            <p className="text-sm text-muted-foreground">Monthly subscription</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-3">
                            <Zap className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">$0.01 per task</p>
                            <p className="text-sm text-muted-foreground">Usage-based pricing</p>
                          </div>
                        </div>

                        <Button className="w-full mt-4">Start Free Trial</Button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Included with base fee:</h4>
                        <ul className="space-y-2">
                          {[
                            "Up to 5 users",
                            "Unlimited workflows",
                            "Standard integrations (25+)",
                            "Email support",
                            "Basic analytics",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                      <h4 className="font-medium mb-4">Usage Examples:</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4">
                          <p className="font-medium">Light Usage</p>
                          <p className="text-2xl font-bold mt-2">$70/mo</p>
                          <p className="text-sm text-muted-foreground mt-1">$20 base + 5,000 tasks</p>
                        </div>
                        <div className="rounded-lg border p-4 bg-primary/5">
                          <p className="font-medium">Medium Usage</p>
                          <p className="text-2xl font-bold mt-2">$220/mo</p>
                          <p className="text-sm text-muted-foreground mt-1">$20 base + 20,000 tasks</p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <p className="font-medium">Heavy Usage</p>
                          <p className="text-2xl font-bold mt-2">$520/mo</p>
                          <p className="text-sm text-muted-foreground mt-1">$20 base + 50,000 tasks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : paymentType === "subscription" ? (
                <div className="grid gap-8 md:grid-cols-3">
                  {subscriptionPlans.map((plan, index) => (
                    <Card key={index} className="flex flex-col rounded-lg border bg-background shadow-sm relative">
                      {plan.isPopular && (
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="p-6">
                        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                        <CardDescription className="mt-2 text-sm text-muted-foreground">{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 p-6 pt-0 space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className={`h-4 w-4 ${feature.included ? "text-primary" : "text-muted-foreground/50"}`} />
                              <span className={feature.included ? "" : "text-muted-foreground/50 line-through"}>
                                {feature.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full" onClick={plan.onSelect}>
                          {plan.ctaText}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mx-auto max-w-3xl">
                  <div className="rounded-lg border bg-background p-8 shadow-sm text-center">
                    <h3 className="text-2xl font-bold mb-4">Enterprise Solutions</h3>
                    <p className="text-muted-foreground mb-6">
                      Custom solutions for large organizations with complex automation needs. Our enterprise plans include
                      dedicated support, custom integrations, and flexible deployment options.
                    </p>
                    <Button size="lg" className="mt-4">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[85%] text-muted-foreground text-xl">
                Find answers to common questions about FlowSync.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does implementation take?</AccordionTrigger>
                  <AccordionContent>
                    Most customers are up and running with their first automated workflow within 1-2 days. For more
                    complex enterprise implementations with custom integrations, our professional services team will
                    create a tailored implementation plan, typically ranging from 2-4 weeks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do I need technical skills to use FlowSync?</AccordionTrigger>
                  <AccordionContent>
                    No technical skills are required. FlowSync is designed with a visual, drag-and-drop interface that
                    anyone can use. For advanced customizations, our platform does support custom code blocks for
                    developers who want to extend functionality.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What integrations do you support?</AccordionTrigger>
                  <AccordionContent>
                    FlowSync integrates with 200+ popular business applications including Salesforce, HubSpot, Slack,
                    Microsoft 365, Google Workspace, Jira, Asana, QuickBooks, and many more. We also offer a REST API
                    for custom integrations with any system.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is FlowSync secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, security is our top priority. FlowSync is SOC 2 Type II certified and GDPR compliant. We use
                    enterprise-grade encryption for data in transit and at rest, role-based access controls, and regular
                    security audits. For enterprise customers, we offer additional security features like SSO, SAML, and
                    custom data residency options.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I migrate from another automation platform?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer migration services to help you transition from other platforms. Our team will help map
                    your existing workflows to FlowSync and ensure a smooth transition with minimal disruption to your
                    operations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
                  <AccordionContent>
                    All plans include access to our knowledge base and community forum. Starter plans include email
                    support with 24-hour response time. Professional plans include priority email and chat support with
                    4-hour response time. Enterprise plans include 24/7 phone support, a dedicated success manager, and
                    custom SLAs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Support & Resources Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <LifeBuoy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customer Support</h3>
              <p className="text-muted-foreground">
                Our support team is available to help you get the most out of FlowSync.
              </p>
              <Button variant="outline">Contact Support</Button>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Documentation</h3>
              <p className="text-muted-foreground">
                Comprehensive guides, tutorials, and API references to help you build.
              </p>
              <Button variant="outline">View Docs</Button>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-muted-foreground">
                Join our community of users to share tips, workflows, and get help.
              </p>
              <Button variant="outline">Join Community</Button>
            </div>
          </div>
          <div className="mt-16 rounded-lg border bg-muted/40 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Ready to transform your workflow?</h3>
                <p className="text-muted-foreground">Start your 14-day free trial today. No credit card required.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-6">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
