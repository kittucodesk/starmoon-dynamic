'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, ArrowRight, TrendingUp, Newspaper, Gift } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { type NewsItem } from "@/lib/api"

interface NewsEventsSectionProps {
  newsData?: NewsItem[]
  eventsData?: NewsItem[]
  offersData?: NewsItem[]
}

// Fallback data in case API fails
const fallbackData = {
  events: [
    {
      id: "1",
      type: "events" as const,
      title: "Award Function",
      description: "Join us for our annual award ceremony celebrating excellence in business and technology.",
      image: "/Banner/event1.jpeg",
      published_date: "2025-01-01T14:00:00.000Z",
      country: "India",
      location: "Dubai",
      badge: "Featured",
      link: "#",
      is_active: true,
    },
    {
      id: "2",
      type: "events" as const,
      title: "Digital Marketing Workshop 1",
      description: "Learn the latest digital marketing strategies and techniques.",
      image: "/E&N/Event2.png",
      published_date: "2025-04-01T14:00:00.000Z",
      country: "India",
      location: "Mumbai",
      badge: "",
      link: "#",
      is_active: true,
    },
    {
      id: "3",
      type: "events" as const,
      title: "Digital Marketing Workshop 2",
      description: "Advanced digital marketing workshop for professionals.",
      image: "/E&N/Event2.png",
      published_date: "2025-04-02T14:00:00.000Z",
      country: "India",
      location: "Delhi",
      badge: "",
      link: "#",
      is_active: true,
    },
  ],
  news: [
    {
      id: "1",
      type: "news" as const,
      title: "Latest Company Updates",
      description: "Stay informed about our latest developments and achievements.",
      image: "/Banner/News3.jpeg",
      published_date: "2025-01-01T00:00:00.000Z",
      country: "India",
      location: "",
      badge: "Featured",
      link: "#",
      is_active: true,
    },
    {
      id: "2",
      type: "news" as const,
      title: "Exciting new developments in AI technology integration",
      description: "Discover how AI is transforming business operations.",
      image: "/Banner/News3.jpeg",
      published_date: "2025-03-01T00:00:00.000Z",
      country: "India",
      location: "",
      badge: "",
      link: "#",
      is_active: true,
    },
  ],
  offers: [
    {
      id: "1",
      type: "offers" as const,
      title: "New Year Special Offer",
      description: "Get amazing discounts on our premium products and services.",
      image: "/Banner/offer2.png",
      published_date: "2025-01-31T00:00:00.000Z",
      country: "India",
      location: "",
      badge: "30% OFF",
      link: "#",
      is_active: true,
    },
    {
      id: "2",
      type: "offers" as const,
      title: "Premium Bundle 1",
      description: "Special discount on premium services.",
      image: "/Banner/offer1.jpg",
      published_date: "2025-02-07T00:00:00.000Z",
      country: "India",
      location: "",
      badge: "15% OFF",
      link: "#",
      is_active: true,
    },
  ],
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Helper function to get image URL
const getImageUrl = (image?: string, fallbackImage?: string) => {
  if (!image) return fallbackImage || "/placeholder.svg"
  if (image.startsWith('/api/')) {
    return `${process.env.NEXT_PUBLIC_DOMAIN_URL}${image}`
  }
  return image
}

export default function NewsEventsSection({ newsData, eventsData, offersData }: NewsEventsSectionProps) {
  // Use API data if available, otherwise fallback to default
  const events = eventsData && eventsData.length > 0 
    ? eventsData.filter(item => item.is_active).sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    : fallbackData.events

  const news = newsData && newsData.length > 0 
    ? newsData.filter(item => item.is_active).sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    : fallbackData.news

  const offers = offersData && offersData.length > 0 
    ? offersData.filter(item => item.is_active).sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    : fallbackData.offers

  const featuredEvent = events[0]
  const recentEvents = events.slice(1, 4)

  const featuredNews = news[0]
  const recentNews = news.slice(1, 4)

  const featuredOffer = offers[0]
  const recentOffers = offers.slice(1, 4)

  return (
    <section className="w-full py-20 relative overflow-hidden container mx-auto px-4 rounded-md">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-200 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-slate-400/[0.03] bg-[size:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4 md:px-6 relative z-10"
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 dark:border-primary/40 text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-primary/10 dark:bg-slate-800/50">
            <TrendingUp className="w-4 h-4 mr-2" />
            Latest Updates
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-secondary dark:from-blue-400 dark:via-blue-300 dark:to-purple-400">
            Recent Events, News & Offers
          </h2>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with our latest events, news, and exclusive offers
          </p>
        </div>

        <Tabs defaultValue="event" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm border dark:border-slate-700 max-w-md">
              <TabsTrigger value="event" className="flex-1 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="news" className="flex-1 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white dark:text-gray-300">
                <Newspaper className="w-4 h-4 mr-2" />
                News
              </TabsTrigger>
              <TabsTrigger value="offers" className="flex-1 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white dark:text-gray-300">
                <Gift className="w-4 h-4 mr-2" />
                Offers
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border dark:border-slate-700">
            <TabsContent value="event" className="mt-0 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Featured Event */}
                <div className="lg:col-span-2">
                  {featuredEvent && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-slate-900/50 transition-shadow duration-300">
                      <div className="aspect-[16/9] relative group">
                        <Image
                          src={getImageUrl(featuredEvent.image, "/Banner/event1.jpeg")}
                          alt={featuredEvent.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-4 text-white mb-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(featuredEvent.published_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(featuredEvent.published_date)}</span>
                            </div>
                            {featuredEvent.location && (
                              <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <MapPin className="w-4 h-4" />
                                <span>{featuredEvent.location}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{featuredEvent.title}</h3>
                          <p className="text-white/90 mb-4 line-clamp-2">{featuredEvent.description}</p>
                          <Button className="bg-white text-primary hover:bg-white/90">
                            Register Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Events List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold dark:text-white">Upcoming Events</h3>
                    <Button variant="outline" size="sm" className="rounded-full dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {recentEvents.map((event, i) => (
                      <div key={event.id} className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 dark:from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getImageUrl(event.image, "/E&N/Event2.png")}
                              alt={event.title}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-base mb-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors dark:text-white line-clamp-2">
                              {event.title}
                            </h4>
                            <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(event.published_date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{formatTime(event.published_date)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {i < recentEvents.length - 1 && <div className="h-px bg-gray-100 dark:bg-slate-700 w-full mt-6" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-0 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 items-start h-full gap-8">
                {/* Left Side - Featured News */}
                <div className="lg:col-span-2">
                  {featuredNews && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-slate-900/50 transition-shadow duration-300">
                      <div className="aspect-[16/10] relative group">
                        <Image
                          src={getImageUrl(featuredNews.image, "/Banner/News3.jpeg")}
                          alt={featuredNews.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-4 text-white mb-4">
                            <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(featuredNews.published_date)}</span>
                            </div>
                            {featuredNews.badge && (
                              <Badge className="bg-primary/90 dark:bg-blue-600/90 text-white">{featuredNews.badge}</Badge>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{featuredNews.title}</h3>
                          <p className="text-white/90 mb-4 line-clamp-2">{featuredNews.description}</p>
                          <Button className="bg-white text-primary hover:bg-white/90">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - News List */}
                <div className="bg-white dark:bg-slate-800 h-full rounded-xl shadow-md dark:shadow-slate-900/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold dark:text-white">Recent News</h3>
                    <Button variant="outline" size="sm" className="rounded-full dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {recentNews.map((newsItem, i) => (
                      <div key={newsItem.id} className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 dark:from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getImageUrl(newsItem.image, "/Banner/News3.jpeg")}
                              alt={newsItem.title}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDate(newsItem.published_date)}</span>
                            </div>
                            <h4 className="font-medium text-base mb-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-2 dark:text-white">
                              {newsItem.title}
                            </h4>
                          </div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full dark:text-gray-300 dark:hover:bg-slate-700">
                            Read
                          </Button>
                        </div>
                        {i < recentNews.length - 1 && <div className="h-px bg-gray-100 dark:bg-slate-700 w-full mt-6" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offers" className="mt-0 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Featured Offer */}
                <div className="lg:col-span-2">
                  {featuredOffer && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-slate-900/50 transition-shadow duration-300">
                      <div className="aspect-[16/9] relative group">
                        <Image
                          src={getImageUrl(featuredOffer.image, "/Banner/offer2.png")}
                          alt={featuredOffer.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-4 text-white mb-4">
                            <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <Calendar className="w-4 h-4" />
                              <span>Valid until: {formatDate(featuredOffer.published_date)}</span>
                            </div>
                            {featuredOffer.badge && (
                              <Badge className="bg-red-500 text-white">{featuredOffer.badge}</Badge>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{featuredOffer.title}</h3>
                          <p className="text-white/90 mb-4 line-clamp-2">{featuredOffer.description}</p>
                          <Button className="bg-white text-primary hover:bg-white/90">
                            Claim Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Offers List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold dark:text-white">Current Offers</h3>
                    <Button variant="outline" size="sm" className="rounded-full dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {recentOffers.map((offer, i) => (
                      <div key={offer.id} className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 dark:from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                            <Image
                              src={getImageUrl(offer.image, "/Banner/offer1.jpg")}
                              alt={offer.title}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* {offer.badge && (
                              <div className="absolute bottom-0 right-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                                {offer.badge}
                              </div>
                            )} */}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-base mb-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors dark:text-white line-clamp-2">
                              {offer.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Until {formatDate(offer.published_date)}</span>
                            </div>
                            {offer.badge && (
                              <div className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md w-fit mt-1">
                                {offer.badge}
                              </div>
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full dark:text-gray-300 dark:hover:bg-slate-700">
                            Claim
                          </Button>
                        </div>
                        {i < recentOffers.length - 1 && <div className="h-px bg-gray-100 dark:bg-slate-700 w-full mt-6" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </section>
  )
} 