export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>

        <div className="space-y-8 mb-12">
          <blockquote className="text-lg text-gray-600 italic">
            "Graebert's CAD solutions have transformed our workflow. Real-time collaboration is a game-changer!"
          </blockquote>
          <cite className="text-sm text-gray-500">— Airports Authority of India</cite>

          <blockquote className="text-lg text-gray-600 italic">
            "With seamless cross-platform support, our design team works efficiently anywhere, anytime."
          </blockquote>
          <cite className="text-sm text-gray-500">— CAT</cite>
        </div>

        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-6xl font-bold text-blue-600 mb-4">95%</div>
          <div className="text-xl text-gray-900 font-semibold">Customer Satisfaction Rate</div>
        </div>
      </div>
    </section>
  )
}
