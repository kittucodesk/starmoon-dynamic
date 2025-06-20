import Image from "next/image";

export default function GraebertPage() {
  return (
    <div className="min-h-screen bg-gray-100"> 

      <main>
        {/* Innovating Together Section */}
        <section className="bg-gray-200 text-center py-16 px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Innovating Together: How Graebert Collaborates with Partners to Advance CAD Technology
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A decade-long collaboration delivering cutting-edge CAD technology for designers worldwide.
            Cloud-native CAD innovation at scale, powered by for global accessibility
          </p>
          <div className="mt-8 relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Graebert Product Overview Section */}
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Graebert</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-commander.svg" alt="ARES Commander Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Commander</h3>
              <p className="text-gray-600">
                A versatile desktop CAD software for 2D drafting, 3D modeling and CAD innovations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-kudo.svg" alt="ARES Kudo Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Kudo</h3>
              <p className="text-gray-600">
                A cloud-based CAD solution enabling real-time collaboration on 2D drafting and 3D modeling.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-touch.svg" alt="ARES Touch Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Touch</h3>
              <p className="text-gray-600">
                A mobile CAD app for editing and annotating drawings on Android and iOS devices.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-bim.svg" alt="BIM Features Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">BIM Features</h3>
              <p className="text-gray-600">
                Integrate and transform BIM data for viewing, editing, and converting BIM models into 2D drawings.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-oem.svg" alt="OEM Solutions Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">OEM Solutions</h3>
              <p className="text-gray-600">
                Manage your product development, artwork, collect work customizable, white-label CAD platforms tailored to your specific needs for OEM partners.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <Image src="/icon-map.svg" alt="ARES Map Icon" width={60} height={60} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Map</h3>
              <p className="text-gray-600">
                A GIS CAD tool for designing and managing CAD texts with GIS for seamless geospatial workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Our Core Products Section */}
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="/product-commander.png" alt="ARES Commander" width={300} height={200} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Commander</h3>
              <p className="text-gray-600 mb-4">Professional 2D/3D CAD for desktops.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                Learn More
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="/product-kudo.png" alt="ARES Kudo" width={300} height={200} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Kudo</h3>
              <p className="text-gray-600 mb-4">Cloud-based CAD for collaboration anywhere.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                Learn More
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="/product-touch.png" alt="ARES Touch" width={300} height={200} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Touch</h3>
              <p className="text-gray-600 mb-4">Mobile CAD for Android and iOS devices.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Ready to Connect Section */}
        <section className="bg-gray-200 py-16 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Connect with an Expert? Call Us at</h2>
              <p className="text-4xl font-extrabold text-blue-600 mb-4">+91-9718963567</p>
              <p className="text-gray-600 max-w-md mx-auto md:mx-0 mb-6">
                At Starmoon Technology Consultant, we're dedicated to empowering organizations to streamline workflows,
                reduce lead-operational costs by implementing the latest market leading technologies.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">
                Request
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image src="/contact-image.png" alt="Contact Us" width={400} height={300} />
            </div>
          </div>
        </section>

        {/* CAD, Graebert and ARES Section */}
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">CAD, Graebert and ARES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-blue-100 p-6 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">CAD</h3>
                <p className="text-gray-600">
                  Computer-Aided Design is a technology that enables designers to create, modify, analyze, and optimize
                  detailed drawings, models, and blueprints. It allows users to bring designs from conceptualization to
                  detailed creation, analysis, and simulation of real-world scenarios.
                </p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Trinity</h3>
                <p className="text-gray-600">
                  Revolutionizing CAD Workflows
                  <br />
                  ARES Trinity provides a complete CAD solution: desktop, cloud, and mobile CAD, ensuring uninterrupted
                  workflows for professionals.
                </p>
              </div>
              <div className="bg-orange-100 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ARES Commander</h3>
                <p className="text-gray-600">
                  With ARES Commander 2023 released, the ARES Trinity of CAD products gets a significant new update
                  for desktop, mobile and cloud. The new release comes with enhanced
                  interoperability, new CAD for BIM features, and new Trinity Collaboration features, all here to
                  increase your productivity.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src="/cad-overview.png" alt="CAD Overview" width={500} height={350} />
            </div>
          </div>
        </section>

        {/* Empowering the Future of CAD Design Section */}
        <section className="bg-gray-200 py-16 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Empowering the Future of CAD Design</h2>
              <p className="text-gray-600 max-w-md mx-auto md:mx-0 mb-6">
                Seamlessly integrate 2D & 3D CAD tools with cloud and mobile solutions
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                  Explore Trinity
                </button>
                <button className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image src="/empower-cad.png" alt="Empower CAD" width={400} height={300} />
            </div>
          </div>
        </section>

        {/* What Our Customers Say Section */}
        <section className="container mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            "Graebert's CAD solutions have transformed our workflows. Real-time collaboration is a game-changer!"
            <br />
            - Happy Customer
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">95%</p>
          <p className="text-gray-600">Customer Satisfaction Rate</p>
        </section>
      </main> 
    </div>
  );
} 