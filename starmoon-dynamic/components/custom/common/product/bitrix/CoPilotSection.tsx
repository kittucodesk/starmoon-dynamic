import { Brain, Lightbulb, Target, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart Analytics",
    description: "AI-powered insights for better decision making",
  },
  {
    icon: Lightbulb,
    title: "Intelligent Suggestions",
    description: "Get personalized recommendations for your business",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Monitor progress and achieve your objectives faster",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate repetitive tasks and focus on growth",
  },
]

const badges = [
  { icon: Brain, color: "bg-blue-500" },
  { icon: Lightbulb, color: "bg-yellow-500" },
  { icon: Target, color: "bg-green-500" },
]

export default function CoPilotSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-white/30 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🤖</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-8 left-8 flex space-x-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center shadow-lg animate-bounce`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet CoPilot</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Your AI-powered business assistant that helps you make smarter decisions, automate workflows, and unlock
              new opportunities for growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <feature.icon className="w-8 h-8 mb-3 text-white" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
