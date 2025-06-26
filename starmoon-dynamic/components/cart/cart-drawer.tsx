"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, X, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  closeCart 
} from "@/lib/store/slices/cartSlice"

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const { items, totalItems, totalAmount, isOpen } = useAppSelector(state => state.cart)

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCloseCart = () => {
    dispatch(closeCart())
  }

  const handleCheckout = () => {
    dispatch(closeCart())
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleCloseCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">
                Add some products or services to get started
              </p>
              <Button onClick={handleCloseCart} asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {item.image && (
                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.planName && (
                          <p className="text-xs text-muted-foreground">{item.planName}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-sm font-semibold text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                            className="h-6 w-6"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                            className="h-6 w-6"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" asChild onClick={handleCheckout}>
                    <Link href="/checkout">Continue to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCloseCart}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 