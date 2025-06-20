import { Button } from "@/components/ui/button"

export default function StatsBanner() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">30,000,000 Organizations Trust Our Platform</h2>
        <p className="text-xl text-white/90 mb-8">
          Join millions of businesses worldwide who have transformed their operations with our solutions
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}
