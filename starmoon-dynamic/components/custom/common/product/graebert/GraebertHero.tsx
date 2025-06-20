import { Search } from "lucide-react"

export default function GraebertHero() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Innovating Together: How Graebert Collaborates with Partners to Advance CAD Technology
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
          A decade-long collaboration delivering cutting-edge CAD technology for designers worldwide. Cloud-native CAD
          innovation at scale, powered by for global accessibility.
        </p>

        {/* <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white shadow-sm"
            />
          </div>
        </div> */}
      </div>
    </section>
  )
}
