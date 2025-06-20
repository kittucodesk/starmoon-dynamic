import { Calendar, CheckCircle, Clock, Flag } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Task Management",
    description: "Create, assign, and track tasks with powerful project management tools",
  },
  {
    icon: Calendar,
    title: "Timeline View",
    description: "Visualize project timelines and deadlines with interactive Gantt charts",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Monitor time spent on tasks and projects for better productivity insights",
  },
  {
    icon: Flag,
    title: "Milestones",
    description: "Set and celebrate important project milestones and achievements",
  },
]

export default function TasksSection() {
  return (
    <section className="py-20 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <img
                  src="/Products/tasks.jpg"
                  alt="Tasks Dashboard"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Manage tasks and projects effortlessly</h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay organized and on track with comprehensive project management tools that adapt to your workflow and
              team needs.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
