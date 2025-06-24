"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageCircle, Star, Clock, Settings, User, Heart, CreditCard, LogOut } from "lucide-react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header-wrapper"
import { type UserProfile } from "@/lib/api"

interface CustomerDashboardClientProps {
  userData: UserProfile;
}

const bookings = [
  {
    id: 1,
    service: "Professional Web Development",
    provider: "TechCraft Solutions",
    providerAvatar: "/placeholder.svg?height=40&width=40",
    status: "in-progress",
    date: "2024-01-15",
    time: "10:00 AM",
    price: 500,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    service: "Logo Design",
    provider: "Creative Studio Pro",
    providerAvatar: "/placeholder.svg?height=40&width=40",
    status: "completed",
    date: "2024-01-10",
    time: "2:00 PM",
    price: 150,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const favorites = [
  {
    id: 1,
    title: "Digital Marketing Strategy",
    provider: "Growth Marketing Co",
    rating: 4.9,
    price: 300,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const messages = [
  {
    id: 1,
    provider: "TechCraft Solutions",
    lastMessage: "I'll have the first draft ready by tomorrow",
    time: "2 hours ago",
    unread: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    provider: "Sparkle Clean",
    lastMessage: "Confirmed for Monday at 9 AM",
    time: "1 day ago",
    unread: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CustomerDashboardClient({ userData }: CustomerDashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "upcoming":
        return "Upcoming"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <SiteHeader /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription>Customer since {new Date(userData.joined).getFullYear()}</CardDescription>
                {userData.verified && (
                  <Badge className="mt-2" variant="secondary">Verified</Badge>
                )}
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Bookings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your bookings and discover new services</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${bookings.reduce((sum, booking) => sum + booking.price, 0)}
                      </p>
                    </div>
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Saved Services</p>
                      <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="bookings" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Image
                            src={booking.image}
                            alt={booking.service}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {booking.service}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">by {booking.provider}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {booking.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {booking.time}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                                <p className="text-lg font-semibold text-gray-900 mt-2">
                                  ${booking.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((favorite) => (
                    <Card key={favorite.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Image
                            src={favorite.image}
                            alt={favorite.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{favorite.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{favorite.provider}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{favorite.rating}</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">
                                From ${favorite.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 