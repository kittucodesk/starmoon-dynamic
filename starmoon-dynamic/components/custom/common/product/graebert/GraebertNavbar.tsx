import { Button } from "@/components/ui/button"

export default function GraebertNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-600">STARMOON</span>
              <div className="text-xs text-gray-500 -mt-1">Your Technology Partner</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Software Solutions</span>
              <span>Digital Solutions</span>
              <span>Business Automation</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <select className="text-sm border-none bg-transparent">
              <option>Find Products</option>
            </select>
            <select className="text-sm border-none bg-transparent">
              <option>Find Services</option>
            </select>
            <select className="text-sm border-none bg-transparent">
              <option>Find Consultants</option>
            </select>
          </div>
          <span className="text-sm text-gray-600">Support</span>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
            Login/Register
          </Button>
        </div>
      </div>
    </nav>
  )
}
