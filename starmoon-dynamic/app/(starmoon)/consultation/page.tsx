import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Video, Phone, MessageSquare, CheckCircle, CalendarIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header-wrapper"

const consultationTypes = [
  {
    id: "video",
    title: "Video Consultation",
    description: "Face-to-face video call with a specialist",
    icon: <Video className="h-8 w-8 text-primary" />,
    price: "$75",
    duration: "45 minutes",
  },
  {
    id: "phone",
    title: "Phone Consultation",
    description: "Speak directly with a specialist over the phone",
    icon: <Phone className="h-8 w-8 text-primary" />,
    price: "$60",
    duration: "30 minutes",
  },
  {
    id: "message",
    title: "Message Consultation",
    description: "Get expert advice through our messaging platform",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    price: "$40",
    duration: "Unlimited messages for 7 days",
  },
]

const specialists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Business Strategy",
    experience: "15+ years",
    rating: 4.9,
    reviews: 127,
    availability: "Next available: Tomorrow",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Web Development",
    experience: "10+ years",
    rating: 4.8,
    reviews: 89,
    availability: "Next available: Today",
  },
  {
    id: 3,
    name: "Emily Davis",
    specialty: "Digital Marketing",
    experience: "12+ years",
    rating: 4.9,
    reviews: 156,
    availability: "Next available: In 2 days",
  },
]

const benefits = [
  {
    title: "Expert Advice",
    description: "Get personalized guidance from industry professionals",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Book consultations at times that work for you",
    icon: <Calendar className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Tailored Solutions",
    description: "Receive customized recommendations for your specific needs",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Follow-up Support",
    description: "Access to post-consultation resources and assistance",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
  },
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Consultation Services</h1>
              <p className="text-xl text-gray-600 mb-6">
                Get personalized advice and solutions from our network of experienced professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Schedule a Consultation</Button>
                <Button variant="outline" size="lg">
                  Browse Specialists
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Request a Consultation</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Consultation Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Strategy</SelectItem>
                      <SelectItem value="development">Web Development</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="legal">Legal Advice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Brief Description of Your Needs</Label>
                  <Textarea id="message" placeholder="Please describe what you need help with..." rows={3} />
                </div>
                <Button type="submit" className="w-full">
                  Request Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Consultation Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the consultation format that works best for your needs and schedule
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type) => (
              <Card key={type.id} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">{type.icon}</div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">{type.price}</div>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    {type.duration}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Specialists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals ready to provide expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialists.map((specialist) => (
              <Card key={specialist.id}>
                <CardHeader>
                  <CardTitle>{specialist.name}</CardTitle>
                  <CardDescription>{specialist.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-medium">{specialist.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{specialist.rating}</span>
                        <span className="text-gray-500">({specialist.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Availability:</span>
                      <span className="font-medium text-green-600">{specialist.availability}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Schedule Consultation</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Specialists
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting expert consultation is easy with our simple process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Specialist</h3>
              <p className="text-gray-600">Browse our network of experts and find the right match for your needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Consultation Type</h3>
              <p className="text-gray-600">Choose between video, phone, or message-based consultation.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule a Time</h3>
              <p className="text-gray-600">Pick a convenient time slot from the specialist's availability.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Expert Advice</h3>
              <p className="text-gray-600">Connect with your specialist and receive personalized guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Consultation Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get the guidance you need from experienced professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Expert Advice?</h2>
          <p className="text-xl mb-8 opacity-90">Schedule your consultation today and take the first step forward</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Now
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
