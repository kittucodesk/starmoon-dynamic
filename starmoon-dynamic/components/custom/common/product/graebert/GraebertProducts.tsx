import { Monitor, Cloud, Smartphone, Building, Settings, Map } from "lucide-react"

const products = [
  {
    icon: Monitor,
    title: "ARES Commander",
    description: "A versatile desktop CAD software for 2D drafting, 3D modeling, and BIM workflows",
    bgColor: "bg-blue-200",
    textColor: "text-blue-900",
  },
  {
    icon: Cloud,
    title: "ARES Kudo",
    description: "A cloud-based CAD solution enabling real-time collaboration and file sharing with browsers",
    bgColor: "bg-green-200",
    textColor: "text-green-900",
  },
  {
    icon: Smartphone,
    title: "ARES Touch",
    description: "A mobile CAD app for editing and annotating drawings on Android and iOS devices",
    bgColor: "bg-pink-200",
    textColor: "text-pink-900",
  },
  {
    icon: Building,
    title: "BIM Features",
    description: "Integrated tools in ARES Commander for viewing, editing, and converting BIM models into 2D drawings",
    bgColor: "bg-orange-200",
    textColor: "text-orange-900",
  },
  {
    icon: Settings,
    title: "OEM Solutions",
    description:
      "Manage your HR records, track employee work, collect work reports. Customizable white-label CAD platforms tailored to industry-specific needs for OEM partners",
    bgColor: "bg-lime-200",
    textColor: "text-lime-900",
  },
  {
    icon: Map,
    title: "ARES Map",
    description: "A GIS-CAD hybrid by Graebert and Esri, merging CAD tools with GIS for seamless geospatial workflows",
    bgColor: "bg-purple-200",
    textColor: "text-purple-900",
  },
]

export default function GraebertProducts() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Graebert</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`${product.bgColor} rounded-2xl p-6 h-full transition-transform duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-4 mx-auto">
                <product.icon className={`w-8 h-8 ${product.textColor}`} />
              </div>
              <h3 className={`text-xl font-bold ${product.textColor} mb-3 text-center`}>{product.title}</h3>
              <p className={`${product.textColor} leading-relaxed text-sm text-center`}>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
