import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

const orders = [
    {
        id: "ORD-001",
        date: "2024-01-10",
        total: "$2,499.99",
        status: "completed",
        items: "Custom Web Application",
        description: "E-commerce platform development",
    },
    {
        id: "ORD-002",
        date: "2024-01-12",
        total: "$899.50",
        status: "in_progress",
        items: "API Integration Service",
        description: "Third-party payment gateway integration",
    },
    {
        id: "ORD-003",
        date: "2024-01-14",
        total: "$1,299.99",
        status: "pending",
        items: "Mobile App Development",
        description: "iOS and Android app development",
    },
]

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed":
            return <CheckCircle className="h-4 w-4" />
        case "in_progress":
            return <Truck className="h-4 w-4" />
        case "pending":
            return <Clock className="h-4 w-4" />
        default:
            return <Package className="h-4 w-4" />
    }
}

const getStatusVariant = (status: string) => {
    switch (status) {
        case "completed":
            return "default" as const
        case "in_progress":
            return "secondary" as const
        case "pending":
            return "outline" as const
        default:
            return "outline" as const
    }
}

export function OrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
                <Button variant="outline">View All Orders</Button>
            </div>

            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                                    <CardDescription>Placed on {order.date}</CardDescription>
                                </div>
                                <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="font-medium">{order.items}</div>
                                    <div className="text-sm text-muted-foreground">{order.description}</div>
                                    <div className="text-sm font-semibold">{order.total}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                    {order.status === "completed" && (
                                        <Button variant="outline" size="sm">
                                            Request Similar
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
