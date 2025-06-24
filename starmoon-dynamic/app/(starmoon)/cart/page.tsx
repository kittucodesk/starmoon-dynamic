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
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { removeFromCart, updateQuantity, addToCart } from "@/lib/store/slices/cartSlice"
import { applyCoupon, CouponRequest, CouponResponse } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
    const dispatch = useAppDispatch()
    const { items: cartItems, totalAmount } = useAppSelector((state) => state.cart)
    const { token } = useAppSelector((state) => state.auth)
    const [promoCode, setPromoCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<CouponResponse | null>(null)
    const [promoError, setPromoError] = useState("")
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
    const { toast } = useToast()

    // Calculate cart totals
    const subtotal = totalAmount
    const discountAmount = appliedCoupon ? appliedCoupon.discount_amount : 0
    const taxEstimate = (subtotal - discountAmount) * 0.00 // 8% tax estimate
    const total = appliedCoupon ? appliedCoupon.final_amount + taxEstimate : subtotal + taxEstimate

    // Handle quantity change
    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        dispatch(updateQuantity({ id, quantity: newQuantity }))
    }

    // Handle item removal
    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id))
        // Reset coupon if cart changes
        if (appliedCoupon) {
            setAppliedCoupon(null)
            setPromoCode("")
        }
    }

    // Handle coupon application using API
    const applyPromoCode = async () => {
        if (!promoCode.trim()) {
            setPromoError("Please enter a coupon code")
            return
        }

        if (cartItems.length === 0) {
            setPromoError("Cannot apply coupon to empty cart")
            return
        }

        // Optional: Check if user is logged in for token-required coupons
        // if (!token) {
        //     setPromoError("Please log in to apply coupon codes")
        //     return
        // }

        setIsApplyingCoupon(true)
        setPromoError("")

        try {
            // Prepare API request data
            const couponRequest: CouponRequest = {
                coupon_code: promoCode.trim(),
                order_amount: subtotal,
                product_ids: cartItems.map(item => item.id)
            }

            // Call the API with token
            const response = await applyCoupon(couponRequest, token || undefined)

            // API response will always be successful if no error is thrown
            setAppliedCoupon(response)
            setPromoError("")
            toast({
                title: "Coupon Applied Successfully!",
                description: `${response.coupon_title} - You saved ₹${response.discount_amount.toFixed(2)} with code ${response.coupon_code}`,
            })
        } catch (error) {
            console.error("Coupon application error:", error)
            setPromoError("Failed to apply coupon. Please try again.")
            setAppliedCoupon(null)
            toast({
                title: "Coupon Application Failed",
                description: "Please check your coupon code and try again.",
                variant: "destructive"
            })
        } finally {
            setIsApplyingCoupon(false)
        }
    }

    // Remove applied coupon
    const removeCoupon = () => {
        setAppliedCoupon(null)
        setPromoCode("")
        setPromoError("")
        toast({
            title: "Coupon Removed",
            description: "Coupon has been removed from your order.",
        })
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
                                                        <p className="text-muted-foreground text-sm">
                                                            {item.type === 'product' ? 'Product' : 'Service'}
                                                        </p>
                                                        <Badge variant="outline" className="mt-1">
                                                            {item.type === 'product' ? 'Product' : 'Service'}
                                                        </Badge>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="font-medium">
                                                            ₹{item.price.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                                                    <div className="flex items-center">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-r-none"
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-l-none"
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="font-medium text-right min-w-[80px]">
                                                            ₹{(item.price * item.quantity).toFixed(2)}
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
                                                                onClick={() => handleRemoveItem(item.id)}
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
                    </div>

                    {/* Cart Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-lg shadow-sm border sticky top-4">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>

                                    {appliedCoupon && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({appliedCoupon.coupon_code})</span>
                                            <span>-₹{discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Tax</span>
                                        <span>₹{taxEstimate.toFixed(2)}</span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex gap-2 mb-1">
                                            <Input
                                                placeholder="Enter coupon code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                disabled={isApplyingCoupon}
                                                onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                                            />
                                            <Button
                                                variant="outline"
                                                onClick={applyPromoCode}
                                                disabled={!promoCode.trim() || isApplyingCoupon}
                                            >
                                                {isApplyingCoupon ? "Applying..." : "Apply"}
                                            </Button>
                                        </div>

                                        {promoError && <p className="text-destructive text-sm">{promoError}</p>}

                                        {appliedCoupon && (
                                            <div className="flex items-center justify-between text-green-600 text-sm bg-green-50 p-2 rounded">
                                                <span>
                                                    {appliedCoupon.discount_type === 'percentage'
                                                        ? `${appliedCoupon.discount_value}% discount applied!`
                                                        : `₹${appliedCoupon.discount_value} discount applied!`
                                                    }
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={removeCoupon}
                                                    className="text-green-600 hover:text-green-700 p-1 h-auto"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <Button className="w-full" size="lg" asChild>
                                        <Link href="/checkout">
                                            Proceed to Checkout
                                        </Link>
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

                                    <Alert className="bg-muted/50 mt-4">
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
