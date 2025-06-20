import { MessageSquare, Share2, Users, Video } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Communicate instantly with your team members across all projects",
  },
  {
    icon: Share2,
    title: "File Sharing",
    description: "Share documents, images, and files securely with version control",
  },
  {
    icon: Users,
    title: "Team Spaces",
    description: "Create dedicated workspaces for different teams and departments",
  },
  {
    icon: Video,
    title: "Video Calls",
    description: "Host meetings and collaborate face-to-face with integrated video",
  },
]

export default function CollaborationSection() {
  return (
    <section className="py-20 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Collaborate seamlessly with your team</h2>
            <p className="text-xl text-gray-600 mb-8">
              Bring your team together with powerful collaboration tools that make working together feel effortless, no
              matter where you are.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
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

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <img
                  src="/Products/bitrix24.png"
                  alt="Collaboration Dashboard"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
