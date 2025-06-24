'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ChevronLeft, Check, Shield, CreditCard, HelpCircle, Eye, EyeOff, Lock, LogIn } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAppSelector } from '@/lib/store/hooks'

// Form validation schema - dynamic based on auth status
const createCheckoutSchema = (isAuthenticated: boolean) => z.object({
  accountType: z.enum(['guest', 'create', 'existing']),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  fullName: z.string().min(2, 'Full name is required'),
  company: z.string().optional(),
  email: isAuthenticated ? z.string().optional() : z.string().email('Invalid email address'),
  phone: isAuthenticated ? z.string().optional() : z.string().min(10, 'Phone number is required'),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State/Region is required'),
    zipCode: z.string().min(1, 'ZIP/Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  useBillingForShipping: z.boolean(),
  shippingAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  paymentMethod: z.enum(['stripe', 'razorpay']),
  savePaymentMethod: z.boolean(),
}).refine((data) => {
  if (data.accountType === 'create') {
    return data.password && data.password.length >= 8
  }
  return true
}, {
  message: 'Password must be at least 8 characters',
  path: ['password']
}).refine((data) => {
  if (data.accountType === 'create') {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Other'
]

export default function CheckoutPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Get auth state from Redux
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  // Create schema based on auth status
  const checkoutSchema = createCheckoutSchema(isAuthenticated)

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      accountType: 'guest',
      useBillingForShipping: true,
      paymentMethod: 'stripe',
      savePaymentMethod: false,
      // Pre-fill user data if authenticated
      fullName: isAuthenticated ? user?.name || '' : '',
      email: isAuthenticated ? user?.email || '' : '',
    },
  })

  // Update form when auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      form.setValue('fullName', user.name || '')
      form.setValue('email', user.email || '')
    }
  }, [isAuthenticated, user, form])

  const accountType = form.watch('accountType')
  const useBillingForShipping = form.watch('useBillingForShipping')
  const password = form.watch('password')

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log(values)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/cart" className='flex items-center gap-2 text-sm'>
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <span className="font-medium text-primary">Details</span>
            </div>
            <div className="flex-1 mx-4">
              <Progress value={50} className="h-2" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground/20 text-muted-foreground text-sm">
                2
              </div>
              <span className="text-muted-foreground">Payment</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Checkout Options - Only show if not authenticated */}
            {!isAuthenticated && (
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Checkout Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div
                            className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                              field.value === 'guest' 
                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <RadioGroupItem value="guest" id="guest" />
                            <div className="flex-1">
                              <Label htmlFor="guest" className={`text-base font-medium cursor-pointer transition-colors ${
                                field.value === 'guest' ? 'text-primary' : 'text-gray-900'
                              }`}>
                                Continue as Guest
                              </Label>
                              <p className={`text-sm transition-colors ${
                                field.value === 'guest' ? 'text-primary/70' : 'text-muted-foreground'
                              }`}>
                                Quick checkout without creating an account
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                              field.value === 'create' 
                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <RadioGroupItem value="create" id="create" />
                            <div className="flex-1">
                              <Label htmlFor="create" className={`text-base font-medium cursor-pointer transition-colors ${
                                field.value === 'create' ? 'text-primary' : 'text-gray-900'
                              }`}>
                                Create Account
                              </Label>
                              <p className={`text-sm transition-colors ${
                                field.value === 'create' ? 'text-primary/70' : 'text-muted-foreground'
                              }`}>
                                Save your information for faster future checkouts
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                            <Button
                              type="button"
                              variant="ghost"
                              className="w-full justify-start p-0 h-auto font-normal"
                            >
                              <div className="flex items-center space-x-3">
                                <LogIn className="w-4 h-4 text-blue-600" />
                                <div className="text-left">
                                  <div className="text-sm font-medium text-gray-900">Already have an account?</div>
                                  <p className="text-xs text-gray-500 mt-1">Sign in to use saved information</p>
                                </div>
                              </div>
                            </Button>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password fields for account creation */}
                {accountType === 'create' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mt-6 pt-6 border-t"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Enter password"
                                  className="pr-10 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    const strength = calculatePasswordStrength(e.target.value)
                                    setPasswordStrength(strength)
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-primary transition-colors"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            {password && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Progress value={passwordStrength} className="h-2 flex-1" />
                                  <span className={`text-xs font-medium ${passwordStrength < 50 ? 'text-red-500' :
                                    passwordStrength < 75 ? 'text-yellow-500' :
                                      'text-green-500'
                                    }`}>
                                    {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                                  </span>
                                </div>
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  placeholder="Confirm password"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            )}

            {/* Show logged in user info if authenticated */}
            {isAuthenticated && user && (
              <Card className="shadow-sm bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Logged in as {user.name}</p>
                      <p className="text-sm text-green-700">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            disabled={isAuthenticated}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Only show email and phone fields when not authenticated */}
                {!isAuthenticated && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Show message when authenticated that email/phone are taken from account */}
                {isAuthenticated && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Email and phone number will be taken from your account
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="billingAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billingAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Region *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state or region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billingAddress.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP/Postal Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ZIP or postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="useBillingForShipping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Use billing address for shipping</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {!useBillingForShipping && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="shippingAddress.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippingAddress.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="shippingAddress.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Region *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state or region" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippingAddress.zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ZIP or postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="shippingAddress.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Payment Method */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4"
                        >
                          <div
                            className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                              field.value === 'stripe' 
                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <RadioGroupItem value="stripe" id="stripe" />
                            <div className="flex items-center gap-3 flex-1">
                              <div className="bg-[#635BFF] text-white px-3 py-1 rounded text-sm font-medium shadow-sm">
                                stripe
                              </div>
                              <div>
                                <Label htmlFor="stripe" className={`text-base font-medium cursor-pointer transition-colors ${
                                  field.value === 'stripe' ? 'text-primary' : 'text-gray-900'
                                }`}>
                                  Pay with Stripe
                                </Label>
                                <p className={`text-sm transition-colors ${
                                  field.value === 'stripe' ? 'text-primary/70' : 'text-muted-foreground'
                                }`}>
                                  Secure payment processing
                                </p>
                              </div>
                            </div>
                            <CreditCard className={`h-5 w-5 transition-colors ${
                              field.value === 'stripe' ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>

                          <div
                            className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                              field.value === 'razorpay' 
                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <RadioGroupItem value="razorpay" id="razorpay" />
                            <div className="flex items-center gap-3 flex-1">
                              <div className="bg-[#3395FF] text-white px-3 py-1 rounded text-sm font-medium shadow-sm">
                                Razorpay
                              </div>
                              <div>
                                <Label htmlFor="razorpay" className={`text-base font-medium cursor-pointer transition-colors ${
                                  field.value === 'razorpay' ? 'text-primary' : 'text-gray-900'
                                }`}>
                                  Pay with Razorpay
                                </Label>
                                <p className={`text-sm transition-colors ${
                                  field.value === 'razorpay' ? 'text-primary/70' : 'text-muted-foreground'
                                }`}>
                                  Popular payment gateway
                                </p>
                              </div>
                            </div>
                            <CreditCard className={`h-5 w-5 transition-colors ${
                              field.value === 'razorpay' ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="savePaymentMethod"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Save this payment method for future purchases</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Trust & Support */}
            <Card className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 border-green-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg border border-green-200">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg border border-blue-200">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">PCI-DSS Compliant</span>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          Need help?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Contact our support team or check our FAQs</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full text-lg font-semibold bg-primary hover:bg-primary/90 active:bg-primary/95 hover:shadow-lg active:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-primary/20"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  Proceed to Payment
                  {/* <Check className="h-5 w-5" /> */}
                </motion.span>
              </Button>

              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                By completing this purchase, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
} 