import { Button } from "@/components/ui/button"

export default function ExpertCallSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Connect with an Expert? Call Us at</h2>
            <div className="text-2xl font-bold text-blue-600 mb-6">+91-9718963567</div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At Starmoon Technology Consultant, we're dedicated to simplifying corporate life. Our mission is to help
              companies like yours reduce operational costs by implementing the latest market-leading technologies.
            </p>
            <Button className="bg-gray-800 hover:bg-gray-900 px-8 py-3">Request</Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/images/support-avatar.png" // Make sure your image is in /public/images/
                  alt="Expert Support"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Get personalized assistance from our CAD specialists</p> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
