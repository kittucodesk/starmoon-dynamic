import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Edit } from "lucide-react"

export function ProfilePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Profile Information</h2>
                <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your account details and personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">John Doe</h3>
                                <Badge variant="secondary">Premium Member</Badge>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">john.doe@example.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">New York, NY</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Statistics</CardTitle>
                        <CardDescription>Your account activity overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">12</div>
                                <div className="text-sm text-muted-foreground">Total Orders</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">8</div>
                                <div className="text-sm text-muted-foreground">Appointments</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">5</div>
                                <div className="text-sm text-muted-foreground">Services</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">24</div>
                                <div className="text-sm text-muted-foreground">Products</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
