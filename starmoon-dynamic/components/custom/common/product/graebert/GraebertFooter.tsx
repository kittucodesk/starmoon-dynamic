import { Linkedin, Twitter, Facebook, Youtube, Phone } from "lucide-react"

const companyLinks = ["About Us", "Contacts", "Blogs", "Career", "Privacy Policy", "Terms and Conditions"]

const clientLinks = [
  "FAQs",
  "Find Expert",
  "Find Service",
  "Privacy Policy",
  "Terms and Conditions",
  "Bulk Purchase Policy",
  "Cancellation and refund",
]

const expertLinks = [
  "Login as an Expert",
  "Work with Us",
  "Privacy Policy",
  "Terms and Conditions",
  "No-Show Policy",
  "Account Deletion",
]

export default function GraebertFooter() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <div className="text-2xl font-bold mb-2">STARMOON</div>
              <div className="text-sm text-gray-300">Your Technology Partner</div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              We are consulting company which help organization to reduce their current running cost.
            </p>
            <div className="flex space-x-3 mb-4">
              <Linkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Phone className="w-4 h-4" />
              <span>+91-9718963567</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Our Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">For Clients</h3>
            <ul className="space-y-3">
              {clientLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">For Experts</h3>
            <ul className="space-y-3">
              {expertLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2024 Starmoon Consulting Services Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
