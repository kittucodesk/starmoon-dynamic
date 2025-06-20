import CADFeaturesSection from "@/components/custom/common/product/graebert/CADFeaturesSection";
import CADFutureSection from "@/components/custom/common/product/graebert/CADFutureSection";
import ExpertCallSection from "@/components/custom/common/product/graebert/ExpertCallSection";
import GraebertCoreProducts from "@/components/custom/common/product/graebert/GraebertCoreProducts";
import GraebertHero from "@/components/custom/common/product/graebert/GraebertHero";
import GraebertProducts from "@/components/custom/common/product/graebert/GraebertProducts";
import TestimonialsSection from "@/components/custom/common/product/graebert/TestimonialsSection";


export default function GraebertPage() {
  return (
    <main className="min-h-screen container">
      {/* <GraebertNavbar /> */}
      <GraebertHero />
      <GraebertProducts />
      <GraebertCoreProducts />
      <ExpertCallSection />
      <CADFeaturesSection />
      <CADFutureSection />
      <TestimonialsSection />
      {/* <GraebertFooter /> */}
    </main>
  )
}
