import { Database, CheckSquare, Globe, Users, Zap, Bot } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "CRM",
    description: "Manage customer relationships and sales pipeline effectively",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: CheckSquare,
    title: "Tasks & Projects",
    description: "Organize and track your team's work and deadlines",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Sites & Stores",
    description: "Build and manage your online presence and e-commerce",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work together seamlessly with your team members",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "HR & Automation",
    description: "Streamline HR processes and automate workflows",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Bot,
    title: "CoPilot",
    description: "AI-powered assistant to boost your productivity",
    gradient: "from-indigo-500 to-purple-500",
  },
]

export default function FeatureGrid() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything your business needs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools and features to help you manage, grow, and scale your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white overflow-hidden group hover:scale-105 transition-transform duration-300`}
            >
              <div className="relative z-10">
                <feature.icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed">{feature.description}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
