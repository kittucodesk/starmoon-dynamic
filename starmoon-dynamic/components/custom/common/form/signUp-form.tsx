"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signupCustomer, SignupRequest, SignupResponse } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { loginStart, loginSuccess, loginFailure } from "@/lib/store/slices/authSlice"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<SignupRequest>({
        email: "",
        mobile_number: "",
        name: "",
        profile_image: "",
        password: "",
        country: "India",
        additional_info: {
            state: ""
        }
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()
    const { toast } = useToast()
    
    // Redux state and actions
    const dispatch = useAppDispatch()
    const { loading: isLoading, error } = useAppSelector(state => state.auth)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === "state") {
            setFormData(prev => ({
                ...prev,
                additional_info: {
                    ...prev.additional_info,
                    state: value
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleCountryChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            country: value
        }))
    }

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter your full name.",
                variant: "destructive",
            })
            return false
        }
        if (!formData.email.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter your email address.",
                variant: "destructive",
            })
            return false
        }
        if (!formData.mobile_number.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter your mobile number.",
                variant: "destructive",
            })
            return false
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Validation Error",
                description: "Please enter a valid email address.",
                variant: "destructive",
            })
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (!formData.password.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter a password.",
                variant: "destructive",
            })
            return false
        }
        if (formData.password.length < 6) {
            toast({
                title: "Validation Error",
                description: "Password must be at least 6 characters long.",
                variant: "destructive",
            })
            return false
        }
        if (formData.password !== confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Password and confirm password do not match.",
                variant: "destructive",
            })
            return false
        }
        return true
    }

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (currentStep === 1) {
            handleNext()
            return
        }

        if (!validateStep2()) {
            return
        }

        dispatch(loginStart())

        try {
            const response: SignupResponse = await signupCustomer(formData)
            console.log(response)
            if (response.meta.status) {
                toast({
                    title: "Account Created Successfully",
                    description: response.meta.message || "Welcome to Starmoon! Please login to continue.",
                })
                
                // Redirect to login page 
                router.push("/login")
            } else {
                dispatch(loginFailure(response.meta.message || "Failed to create account"))
                toast({
                    title: "Signup Failed",
                    description: response.meta.message || "Failed to create account",
                    variant: "destructive",
                })
            }
        } catch (error) {
            const errorMessage = "An error occurred during signup. Please try again."
            dispatch(loginFailure(errorMessage))
            console.error("Signup error:", error)
            toast({
                title: "Signup Failed",
                description: errorMessage,
                variant: "destructive",
            })
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid gap-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                                id="name" 
                                name="name"
                                type="text" 
                                placeholder="John Doe" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                name="email"
                                type="email" 
                                placeholder="you@example.com" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="mobile_number">Mobile Number</Label>
                            <Input 
                                id="mobile_number" 
                                name="mobile_number"
                                type="tel" 
                                placeholder="7898767898" 
                                value={formData.mobile_number}
                                onChange={handleInputChange}
                                required 
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="grid gap-3">
                        <div className="grid gap-3">
                            <Label htmlFor="country">Country</Label>
                            <Select value={formData.country} onValueChange={handleCountryChange} disabled={isLoading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="state">State</Label>
                            <Input 
                                id="state" 
                                name="state"
                                type="text" 
                                placeholder="Haryana" 
                                value={formData.additional_info?.state || ""}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                name="password"
                                type="password" 
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input 
                                id="confirm-password" 
                                name="confirm-password"
                                type="password" 
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm">
                    {currentStep === 1 ? "Let's start with your basic information" : "Complete your profile and set up security"}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Step {currentStep} of 2</span>
                    <span>{Math.round((currentStep / 2) * 100)}% Complete</span>
                </div>
                <Progress value={(currentStep / 2) * 100} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        currentStep >= 1 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-muted-foreground text-muted-foreground"
                    )}>
                        {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
                    </div>
                    <span className={cn(
                        "text-sm font-medium",
                        currentStep >= 1 ? "text-primary" : "text-muted-foreground"
                    )}>
                        Basic Info
                    </span>
                </div>
                
                <div className="flex-1 h-px bg-border" />
                
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        currentStep >= 2 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-muted-foreground text-muted-foreground"
                    )}>
                        2
                    </div>
                    <span className={cn(
                        "text-sm font-medium",
                        currentStep >= 2 ? "text-primary" : "text-muted-foreground"
                    )}>
                        Location & Security
                    </span>
                </div>
            </div>

            {/* Form Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
                {currentStep > 1 && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>
                )}
                
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={cn("flex-1", currentStep === 1 ? "w-full" : "")}
                >
                    {isLoading ? (
                        "Processing..."
                    ) : currentStep === 1 ? (
                        <>
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </div>

            {/* Social Login Options - Only show on step 1 */}
            {currentStep === 1 && (
                <>
                    <div className="relative text-center text-sm before:absolute before:inset-0 before:top-1/2 before:border-t before:border-border">
                        <span className="relative z-10 px-2 bg-card text-muted-foreground">
                            Or continue with
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* <Button variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                                <path
                                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Sign up with Apple</span>
                        </Button> */}
                        <Button variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Sign up with Google</span>
                        </Button>
                        {/* <Button variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                                <path
                                    d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533A2.264 2.264 0 0 1 6.873 6.636z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Sign up with Meta</span>
                        </Button> */}
                    </div>
                </>
            )}

            {/* Login Link */}
            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    )
}
