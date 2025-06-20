import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CallToActionSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your business?</h2>
              <p className="text-xl text-white/90 mb-6">
                Join thousands of companies that have already revolutionized their operations. Our team is ready to help
                you get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl">📞</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Call Us Today</h3>
                <p className="text-white/90">Our experts are standing by to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
