const features = [
  {
    title: "CAD",
    description:
      "Computer-Aided Design is a technology that enables designers, engineers, and architects to create precise and detailed drawings, models, and blueprints using specialized software tools to bring their ideas to life.",
    bgColor: "bg-blue-200",
  },
  {
    title: "Graebert",
    description:
      "Giving an overview of all the new features for 2D & 3D Desktop CAD, Cloud CAD for BIM, Mobile CAD and interoperability within the ARES Trinity of CAD Software, we Graebert next online event did include everything you need.",
    bgColor: "bg-blue-300",
  },
  {
    title: "ARES Trinity",
    description:
      "Revolutionizing CAD Workflows ARES Trinity offers a seamless blend of desktop, cloud, and mobile CAD, ensuring uninterrupted workflows for professionals.",
    bgColor: "bg-blue-200",
  },
  {
    title: "ARES Commander",
    description:
      "With ARES Commander 2022 released, the ARES 'trinity' of CAD Software now packs new features that you should not miss out on. New 2D/3D CAD Features, Improved Performance, Enhanced Collaboration, and Trinity Collaboration Features, are here to increase your productivity.",
    bgColor: "bg-blue-300",
  },
]

export default function CADFeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">CAD, Graebert and ARES</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} rounded-2xl p-6`}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-800 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="CAD Software Interface"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <span className="text-xs text-gray-600">Desktop</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <span className="text-xs text-gray-600">Cloud</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                  <span className="text-xs text-gray-600">Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
