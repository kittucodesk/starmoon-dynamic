import BenefitsSection from "@/components/custom/common/product/bitrix/BenefitsSection";
import CallToActionSection from "@/components/custom/common/product/bitrix/CallToActionSection";
import CollaborationSection from "@/components/custom/common/product/bitrix/CollaborationSection";
import ConsultantSection from "@/components/custom/common/product/bitrix/ConsultantSection";
import CoPilotSection from "@/components/custom/common/product/bitrix/CoPilotSection";
import FeatureGrid from "@/components/custom/common/product/bitrix/FeatureGrid";
import Footer from "@/components/custom/common/product/bitrix/Footer";
import Navbar from "@/components/custom/common/product/bitrix/Navbar";
import PricingSection from "@/components/custom/common/product/bitrix/PricingSection";
import StatsBanner from "@/components/custom/common/product/bitrix/StatsBanner";
import TasksSection from "@/components/custom/common/product/bitrix/TasksSection";


export default function Home() {
    return (
        <main className="min-h-screen">
            {/* <Navbar /> */}
            <FeatureGrid />
            <CoPilotSection />
            <CollaborationSection />
            <TasksSection />
            <StatsBanner />
            <PricingSection />
            <ConsultantSection />
            <CallToActionSection />
            <BenefitsSection />
            {/* <Footer /> */}
        </main>
    )
}
