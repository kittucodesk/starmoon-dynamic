import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConsultantSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Schedule Your Consultant</h2>
        <p className="text-xl text-blue-100 mb-8">
          Get personalized guidance from our experts to optimize your business processes
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tell us about your business needs..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
