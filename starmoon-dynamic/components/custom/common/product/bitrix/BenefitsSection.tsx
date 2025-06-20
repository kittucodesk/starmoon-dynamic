import { Building2, Package, DollarSign } from "lucide-react"

const benefits = [
  {
    icon: Building2,
    title: "For any & every business",
    description: "Whether you're a startup or enterprise, our platform scales with your needs",
  },
  {
    icon: Package,
    title: "All-in-one solution",
    description: "Everything you need in one place - no more juggling multiple tools",
  },
  {
    icon: DollarSign,
    title: "Business-friendly pricing",
    description: "Transparent pricing with no hidden fees and flexible payment options",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
