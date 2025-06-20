import { Button } from "@/components/ui/button"

const coreProducts = [
  {
    title: "ARES Commander",
    subtitle: "Professional 2D/3D CAD for desktops",
    image: "/Products/arescommander.png",
    badge: "NEW",
  },
  {
    title: "ARES Kudo",
    subtitle: "Cloud-based CAD for collaborative anywhere",
    image: "/Products/areskudo.png",
    badge: "HOT",
  },
  {
    title: "ARES Touch",
    subtitle: "Mobile CAD for Android and iOS devices",
    image: "/Products/arestouch.jpg",
    badge: "TOP",
  },
]

export default function GraebertCoreProducts() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Core Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.subtitle}</p>

                <div className="relative mb-6">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                </div>

                <Button className="w-full bg-gray-800 hover:bg-gray-900">Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
