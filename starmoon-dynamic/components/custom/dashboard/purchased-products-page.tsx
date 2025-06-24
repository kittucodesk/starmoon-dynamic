import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Premium Analytics Dashboard",
    category: "Software License",
    purchaseDate: "2024-01-08",
    price: "$299.99",
    status: "active",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    licenseKey: "PREM-ANAL-2024-XYZ123",
  },
  {
    id: 2,
    name: "API Integration Toolkit",
    category: "Developer Tools",
    purchaseDate: "2024-01-12",
    price: "$149.99",
    status: "active",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
    licenseKey: "API-TOOL-2024-ABC456",
  },
  {
    id: 3,
    name: "Custom CRM Solution",
    category: "Enterprise Software",
    purchaseDate: "2024-01-15",
    price: "$1,299.99",
    status: "pending_delivery",
    rating: null,
    image: "/placeholder.svg?height=80&width=80",
    licenseKey: null,
  },
  {
    id: 4,
    name: "Mobile App Template Bundle",
    category: "Digital Assets",
    purchaseDate: "2024-01-10",
    price: "$79.99",
    status: "active",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    licenseKey: "MOBILE-TEMP-2024-DEF789",
  },
]

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
  ))
}

export function PurchasedProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Purchased Products</h2>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Shop More
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      {product.licenseKey && (
                        <p className="text-xs text-muted-foreground font-mono">License: {product.licenseKey}</p>
                      )}
                    </div>
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : product.status === "pending_delivery"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {product.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Purchased: {product.purchaseDate}</span>
                    <span className="font-semibold text-foreground">{product.price}</span>
                  </div>

                  {product.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="ml-1 text-sm text-muted-foreground">({product.rating}/5)</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {product.status === "active" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Package className="mr-1 h-3 w-3" />
                          Documentation
                        </Button>
                      </>
                    )}
                    {!product.rating && product.status === "active" && (
                      <Button variant="outline" size="sm">
                        <Star className="mr-1 h-3 w-3" />
                        Rate
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3 w-3" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
