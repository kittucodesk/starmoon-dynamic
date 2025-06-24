"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { addToCart } from "@/lib/store/slices/cartSlice"
import { useToast } from "@/hooks/use-toast"

export function AddToCartDemo() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleAddProduct = () => {
    const demoProduct = {
      id: `product-${Date.now()}`,
      name: "Bitrix24 CRM Software",
      price: 99.99,
      type: "product" as const,
      image: "/Products/Bitrix.jpg"
    }

    dispatch(addToCart(demoProduct))
    
    toast({
      title: "Added to Cart",
      description: `${demoProduct.name} has been added to your cart.`,
    })
  }

  const handleAddService = () => {
    const demoService = {
      id: `service-${Date.now()}`,
      name: "Web Development Service",
      price: 299.99,
      type: "service" as const,
      planName: "Professional Plan",
      image: "/Products/websites-main.png"
    }

    dispatch(addToCart(demoService))
    
    toast({
      title: "Added to Cart",
      description: `${demoService.name} has been added to your cart.`,
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <Button 
        onClick={handleAddProduct}
        className="shadow-lg block w-full"
        size="sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Demo Product
      </Button>
      <Button 
        onClick={handleAddService}
        variant="outline"
        className="shadow-lg block w-full"
        size="sm"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add Demo Service
      </Button>
    </div>
  )
} 