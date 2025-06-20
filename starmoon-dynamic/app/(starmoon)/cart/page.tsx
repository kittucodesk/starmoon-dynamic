"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2, Lock, Shield, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for cart items
const initialCartItems = [
    {
        id: 1,
        name: "Cloud Security Suite",
        type: "Pro Version - Annual Subscription",
        image: "/placeholder.svg?height=80&width=80",
        unitPrice: 299.99,
        quantity: 2,
        isSubscription: true,
        period: "year",
    },
    {
        id: 2,
        name: "Developer API Access",
        type: "API Credits (10,000 units)",
        image: "/placeholder.svg?height=80&width=80",
        unitPrice: 149.5,
        quantity: 1,
        isSubscription: false,
    },
    {
        id: 3,
        name: "Enterprise Support Plan",
        type: "Premium Support - 24/7 Access",
        image: "/placeholder.svg?height=80&width=80",
        unitPrice: 499.99,
        quantity: 1,
        isSubscription: true,
        period: "month",
    },
]

// Mock data for cross-sell items
const crossSellItems = [
    {
        id: 101,
        name: "Security Training Module",
        image: "/placeholder.svg?height=100&width=100",
        price: 79.99,
        description: "Comprehensive security training for your team",
    },
    {
        id: 102,
        name: "Data Backup Add-on",
        image: "/placeholder.svg?height=100&width=100",
        price: 49.99,
        description: "Automated cloud backup solution",
    },
    {
        id: 103,
        name: "Advanced Analytics Package",
        image: "/placeholder.svg?height=100&width=100",
        price: 129.99,
        description: "Enhanced reporting and insights",
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [promoCode, setPromoCode] = useState("")
    const [appliedPromo, setAppliedPromo] = useState<null | { code: string; discount: number }>(null)
    const [promoError, setPromoError] = useState("")

    // Calculate cart totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const discountAmount = appliedPromo ? appliedPromo.discount : 0
    const taxEstimate = (subtotal - discountAmount) * 0.08 // 8% tax estimate
    const total = subtotal - discountAmount + taxEstimate

    // Handle quantity change
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    // Handle item removal
    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    // Handle promo code application
    const applyPromoCode = () => {
        // Mock promo code validation
        if (promoCode.toUpperCase() === "SAVE20") {
            setAppliedPromo({ code: "SAVE20", discount: subtotal * 0.2 })
            setPromoError("")
        } else if (promoCode.toUpperCase() === "NEWUSER") {
            setAppliedPromo({ code: "NEWUSER", discount: 25 })
            setPromoError("")
        } else {
            setPromoError("Invalid promo code")
            setAppliedPromo(null)
        }
    }

    // Add cross-sell item to cart
    const addCrossSellItem = (item: (typeof crossSellItems)[0]) => {
        setCartItems([
            ...cartItems,
            {
                id: item.id,
                name: item.name,
                type: "Standard License",
                image: item.image,
                unitPrice: item.price,
                quantity: 1,
                isSubscription: false,
            },
        ])
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <ShoppingCart className="h-8 w-8" />
                Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-lg">
                    <div className="max-w-md mx-auto">
                        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">
                            Looks like your cart is empty. Why not explore our Software or Services?
                        </p>
                        <Button asChild size="lg">
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg shadow-sm border">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>

                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                                        >
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md border bg-background"
                                                />
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                                        <p className="text-muted-foreground text-sm">{item.type}</p>
                                                        {item.isSubscription && (
                                                            <Badge variant="outline" className="mt-1">
                                                                Subscription (per {item.period})
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="font-medium">
                                                            ${item.unitPrice.toFixed(2)}
                                                            {item.isSubscription && (
                                                                <span className="text-xs text-muted-foreground">/{item.period}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                                                    <div className="flex items-center">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-r-none"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-l-none"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="font-medium text-right min-w-[80px]">
                                                            ${(item.unitPrice * item.quantity).toFixed(2)}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                onClick={() => removeItem(item.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cross-sell Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Enhance your purchase</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {crossSellItems.map((item) => (
                                    <Card key={item.id} className="overflow-hidden">
                                        <div className="aspect-video relative bg-muted">
                                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-medium mb-1">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">${item.price.toFixed(2)}</span>
                                                <Button variant="secondary" size="sm" onClick={() => addCrossSellItem(item)}>
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-lg shadow-sm border sticky top-4">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    {appliedPromo && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({appliedPromo.code})</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Tax</span>
                                        <span>${taxEstimate.toFixed(2)}</span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex gap-2 mb-1">
                                            <Input
                                                placeholder="Promo code or gift card"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode}>
                                                Apply
                                            </Button>
                                        </div>

                                        {promoError && <p className="text-destructive text-sm">{promoError}</p>}

                                        {appliedPromo && <p className="text-green-600 text-sm">Promo code applied successfully!</p>}
                                    </div>

                                    <Button className="w-full" size="lg">
                                        Proceed to Checkout
                                    </Button>

                                    <div className="text-center">
                                        <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                                            Continue Shopping
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                                        <Lock className="h-4 w-4" />
                                        <span>Secure Checkout</span>
                                        <Shield className="h-4 w-4 ml-2" />
                                        <span>SSL Encrypted</span>
                                    </div>

                                    <Alert variant="outline" className="bg-muted/50 mt-4">
                                        <AlertDescription className="text-xs text-muted-foreground">
                                            Software licenses will be assigned to your account immediately after purchase. Services will be
                                            available through your dashboard.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
