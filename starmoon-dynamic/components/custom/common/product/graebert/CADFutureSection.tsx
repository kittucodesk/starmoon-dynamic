import { Button } from "@/components/ui/button"

export default function CADFutureSection() {
  return (
    <section className="py-20 px-4 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Empowering the Future of CAD Design</h2>
            <p className="text-lg text-gray-600 mb-8">
              Seamlessly integrate 2D & 3D CAD tools with cloud and mobile solutions
            </p>
            <div className="flex space-x-4">
              <Button className="bg-gray-800 hover:bg-gray-900">Explore Trinity</Button>
              <Button variant="outline" className="border-gray-800 text-gray-800">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src="/Products/arescommander.png"
                    alt="ARES Commander"
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2 text-sm font-semibold">ARES Commander</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src= "/Products/areskudo.png"
                    alt="ARES Touch"
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2 text-sm font-semibold">ARES Touch</div>
                </div>
              </div>
              <div className="pt-8">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src="/Products/arestouch.jpg"
                    alt="ARES Kudo"
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2 text-sm font-semibold">ARES Kudo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
