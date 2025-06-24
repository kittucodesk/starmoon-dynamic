"use client"

import { useState } from "react"
import { User, Calendar, ShoppingBag, Wrench, Package, LogOut, Settings, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ProfilePage } from "@/components/custom/dashboard/profile-page"
import { AppointmentsPage } from "@/components/custom/dashboard/appointments-page"
import { PurchasedServicesPage } from "@/components/custom/dashboard/purchased-services-page"
import { PurchasedProductsPage } from "@/components/custom/dashboard/purchased-products-page"
import { SettingsPage } from "@/components/custom/dashboard/settings-page"
import { OrdersPage } from "@/components/custom/dashboard/orders-page"
import Image from "next/image"
import Link from "next/link"

const navigationItems = [
    {
        id: "profile",
        title: "Profile",
        icon: User,
        component: ProfilePage,
    },
    {
        id: "appointments",
        title: "Appointments",
        icon: Calendar,
        component: AppointmentsPage,
    },
    {
        id: "orders",
        title: "Orders",
        icon: ShoppingBag,
        component: OrdersPage,
    },
    {
        id: "purchased-services",
        title: "Purchased Services",
        icon: Wrench,
        component: PurchasedServicesPage,
    },
    {
        id: "purchased-products",
        title: "Purchased Products",
        icon: Package,
        component: PurchasedProductsPage,
    },
    {
        id: "settings",
        title: "Settings",
        icon: Settings,
        component: SettingsPage,
    },
]

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("profile")

    const ActiveComponent = navigationItems.find((item) => item.id === activeSection)?.component || ProfilePage

    const handleLogout = () => {
        // Add your logout logic here
        console.log("User logged out")
        // Example: redirect to login page, clear tokens, etc.
        if (confirm("Are you sure you want to log out?")) {
            // Implement actual logout logic
            alert("Logout functionality would be implemented here")
        }
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar className="border-r">
                    <SidebarHeader className="border-b px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                {/* <User className="h-4 w-4" /> */}
                                <Link href="/">
                                    <Image src="/logo.png" alt="Logo" width={200} height={32} />
                                </Link>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">User Dashboard</span>
                                <span className="text-xs text-muted-foreground">Welcome back!</span>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                onClick={() => {
                                                    console.log(`Navigating to: ${item.title}`)
                                                    setActiveSection(item.id)
                                                }}
                                                isActive={activeSection === item.id}
                                                className="w-full justify-start transition-colors"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <SidebarInset className="flex-1">
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <h1 className="text-lg font-semibold">
                                {navigationItems.find((item) => item.id === activeSection)?.title}
                            </h1>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 px-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:flex flex-col items-start">
                                        <span className="text-sm font-medium">John Doe</span>
                                        <span className="text-xs text-muted-foreground">john.doe@example.com</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        console.log("Navigating to settings")
                                        setActiveSection("settings")
                                    }}
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>

                    <main className="flex-1 p-6 transition-all duration-200 ease-in-out">
                        <div key={activeSection} className="animate-in fade-in-50 duration-200">
                            <ActiveComponent />
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
