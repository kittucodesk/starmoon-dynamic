import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wrench, Calendar, Star } from "lucide-react"

const services = [
    {
        id: 1,
        name: "Cloud Infrastructure Management",
        provider: "TechOps Solutions",
        purchaseDate: "2023-12-01",
        expiryDate: "2024-12-01",
        status: "active",
        progress: 75,
        price: "$299.99/month",
    },
    {
        id: 2,
        name: "Custom Software Development",
        provider: "DevCraft Studios",
        purchaseDate: "2024-01-05",
        expiryDate: "2024-04-05",
        status: "active",
        progress: 40,
        price: "$4,999.99",
    },
    {
        id: 3,
        name: "24/7 Technical Support Plan",
        provider: "SupportPro",
        purchaseDate: "2023-11-15",
        expiryDate: "2024-11-15",
        status: "expiring",
        progress: 90,
        price: "$199.99/month",
    },
    {
        id: 4,
        name: "SEO & Digital Marketing Package",
        provider: "GrowthHackers",
        purchaseDate: "2024-01-01",
        expiryDate: "2024-07-01",
        status: "active",
        progress: 25,
        price: "$799.99",
    },
]

export function PurchasedServicesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Purchased Services</h2>
                <Button>
                    <Wrench className="mr-2 h-4 w-4" />
                    Browse Services
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                    <Card key={service.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{service.name}</CardTitle>
                                    <CardDescription>by {service.provider}</CardDescription>
                                </div>
                                <Badge variant={service.status === "active" ? "default" : "destructive"}>{service.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Service Progress</span>
                                    <span>{service.progress}%</span>
                                </div>
                                <Progress value={service.progress} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Purchased</div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {service.purchaseDate}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Expires</div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {service.expiryDate}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="font-semibold">{service.price}</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Manage
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Star className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
