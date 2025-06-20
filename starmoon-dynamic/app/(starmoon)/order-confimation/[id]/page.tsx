"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Copy, Download, ExternalLink, Printer, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrderConfirmationPage() {
    const [copied, setCopied] = useState(false)

    // This would normally be fetched from your backend based on the order ID
    const orderDetails = {
        orderNumber: "ORD-28756",
        date: "June 13, 2025",
        total: "$299.99",
        paymentMethod: "Credit Card ending in ****4321",
        email: "customer@example.com",
        items: [
            {
                name: "Analytics Pro Suite",
                type: "Annual Subscription",
                quantity: 1,
                price: "$199.99",
            },
            {
                name: "Implementation Consultation",
                type: "2-Hour Session",
                quantity: 1,
                price: "$100.00",
            },
        ],
        licenseKey: "AP-PRO-2025-XXXX-YYYY-ZZZZ",
    }

    const copyLicenseKey = () => {
        navigator.clipboard.writeText(orderDetails.licenseKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const printReceipt = () => {
        window.print()
    }

    return (
        <div className="container py-10 print:py-4">
            {/* Success Header */}
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mb-2 text-3xl font-bold">Thank You for Your Purchase!</h1>
                <p className="text-lg text-muted-foreground">
                    Your order <span className="font-medium text-foreground">#{orderDetails.orderNumber}</span> has been
                    successfully placed.
                </p>
                <p className="text-muted-foreground">
                    A confirmation email has been sent to <span className="font-medium">{orderDetails.email}</span>
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content - Order Details & Access */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="access" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="access">Access & Next Steps</TabsTrigger>
                            <TabsTrigger value="details">Order Details</TabsTrigger>
                            <TabsTrigger value="support">Support & Resources</TabsTrigger>
                        </TabsList>

                        {/* Access & Next Steps Tab */}
                        <TabsContent value="access" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Software Access</CardTitle>
                                    <CardDescription>Access your purchased software and services</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Analytics Pro Suite</h3>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <div className="space-y-0.5">
                                                    <div className="text-sm font-medium">License Key</div>
                                                    <div className="font-mono text-xs text-muted-foreground">{orderDetails.licenseKey}</div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={copyLicenseKey}
                                                    className="flex items-center gap-1"
                                                >
                                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    {copied ? "Copied" : "Copy"}
                                                </Button>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Button className="flex items-center gap-2">
                                                    <Download className="h-4 w-4" />
                                                    Download Software
                                                </Button>
                                                <Button variant="outline" className="flex items-center gap-2">
                                                    <ExternalLink className="h-4 w-4" />
                                                    Access Dashboard
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="font-medium mb-2">Implementation Consultation</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Schedule your 2-hour consultation session with our experts.
                                        </p>
                                        <Button className="flex items-center gap-2">Schedule Consultation</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Next Steps</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>Install the Analytics Pro Suite using the download link above</li>
                                        <li>Activate your software using the provided license key</li>
                                        <li>Schedule your implementation consultation at your convenience</li>
                                        <li>Explore our knowledge base for tutorials and best practices</li>
                                    </ol>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Order Details Tab */}
                        <TabsContent value="details" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                    <CardDescription>
                                        Order #{orderDetails.orderNumber} - {orderDetails.date}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Payment Method:</span>
                                            <span>{orderDetails.paymentMethod}</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="font-medium mb-2">Items</h3>
                                        <div className="space-y-3">
                                            {orderDetails.items.map((item, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.type} × {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between font-medium text-lg">
                                        <span>Total</span>
                                        <span>{orderDetails.total}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full flex items-center gap-2" onClick={printReceipt}>
                                        <Printer className="h-4 w-4" />
                                        Print Receipt
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Support & Resources Tab */}
                        <TabsContent value="support" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Help & Support</CardTitle>
                                    <CardDescription>Resources to help you get started</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4">
                                        <div className="rounded-lg border p-3">
                                            <h3 className="font-medium mb-1">Knowledge Base</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Access tutorials, guides, and documentation for your products.
                                            </p>
                                            <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                                Browse Knowledge Base
                                            </Link>
                                        </div>

                                        <div className="rounded-lg border p-3">
                                            <h3 className="font-medium mb-1">Technical Support</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Need help? Our support team is available 24/7.
                                            </p>
                                            <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                                Contact Support
                                            </Link>
                                        </div>

                                        <div className="rounded-lg border p-3">
                                            <h3 className="font-medium mb-1">Frequently Asked Questions</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Find answers to common questions about your purchase.
                                            </p>
                                            <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                                View FAQs
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Account Dashboard
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share Purchase
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Related Products Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>You Might Also Like</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border p-3">
                                <h3 className="font-medium">Advanced Training Package</h3>
                                <p className="text-sm text-muted-foreground my-1">Get the most out of your Analytics Pro Suite</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-medium">$149.99</span>
                                    <Button size="sm">Add to Cart</Button>
                                </div>
                            </div>

                            <div className="rounded-lg border p-3">
                                <h3 className="font-medium">Data Integration Add-on</h3>
                                <p className="text-sm text-muted-foreground my-1">Connect to additional data sources</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-medium">$79.99</span>
                                    <Button size="sm">Add to Cart</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">How was your purchase experience?</p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                        Excellent
                    </Button>
                    <Button variant="outline" size="sm">
                        Good
                    </Button>
                    <Button variant="outline" size="sm">
                        Could be better
                    </Button>
                </div>
            </div>
        </div>
    )
}
