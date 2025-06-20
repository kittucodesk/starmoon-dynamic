import { Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BusinessPlatform</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Solutions
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Resources
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
