import { Suspense } from "react"
import { fetchServices, fetchDynamicFilters, Service, DynamicFilter } from "@/lib/api"
import ServicesClient from "./services-client"

// Static fallback data for graceful degradation
const fallbackServices: Service[] = [
    {
        _id: "1",
        service_category: "Automation",
        service_name: "Business Process Automation",
        service_description: "Streamline your workflows with intelligent automation solutions that reduce manual tasks and increase efficiency.",
        service_thumb_image: "/FindService/BusinessAutomation.jpg",
        service_image_gallery: ["/FindService/BusinessAutomation.jpg"],
        service_long_description: "Comprehensive business process automation to improve efficiency",
        tags: ["Workflow", "Efficiency", "ROI"],
        is_pay_as_you_go: false,
        is_service_features_and_offers: true,
        experts_mapping: [],
        products_mapping: [],
        pay_as_you_go_price: [],
        service_features_and_offers: [
            {
                name: "Enterprise Plan",
                description: "Full automation suite",
                is_most_popular: true,
                features: [
                    {
                        name: "Workflow Automation",
                        value: "Unlimited",
                        is_included: true,
                        _id: "f1"
                    }
                ],
                country_price: [
                    {
                        country: "India",
                        currency: "USD",
                        monthly_price: 2500,
                        yearly_price: 25000,
                        _id: "p1"
                    }
                ],
                _id: "plan1"
            }
        ],
        quick_contact_no: [],
        whatsapp_no: [],
        is_active: true,
        faqs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        badges: "Popular",
        dynamic_filters: [
            {
                filter_name: "level",
                filter_value: "Enterprise",
                _id: "filter1"
            },
            {
                filter_name: "duration",
                filter_value: "4-6 weeks",
                _id: "filter2"
            }
        ],
        meta_keywords: ["automation", "workflow", "efficiency"],
        youtube_video_links: [],
        meta_description: "Business process automation services",
        meta_title: "Business Process Automation"
    }
];

const fallbackFilters: DynamicFilter[] = [
    {
        id: 1,
        category: "services",
        sections: [
            {
                title: "Service Category",
                options: [
                    { label: "Automation", _id: "cat1" },
                    { label: "Consulting", _id: "cat2" },
                    { label: "Security", _id: "cat3" },
                    { label: "Development", _id: "cat4" }
                ],
                _id: "section1"
            },
            {
                title: "Features",
                options: [
                    { label: "AI", _id: "feat1" },
                    { label: "Cloud", _id: "feat2" },
                    { label: "24/7 Support", _id: "feat3" },
                    { label: "Mobile App", _id: "feat4" }
                ],
                _id: "section2"
            }
        ],
        sort_order: 1,
        is_active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

interface ServicesPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

async function ServicesData() {
    try {
        // Fetch services and dynamic filters in parallel
        const [servicesData, filtersData] = await Promise.all([
            fetchServices('India').catch(() => fallbackServices),
            fetchDynamicFilters('services').catch(() => fallbackFilters)
        ]);

        return (
            <ServicesClient 
                initialServices={servicesData || fallbackServices}
                dynamicFilters={filtersData || fallbackFilters}
            />
        );
    } catch (error) {
        console.error('Error fetching services data:', error);
        // Return fallback data in case of error
        return (
            <ServicesClient 
                initialServices={fallbackServices}
                dynamicFilters={fallbackFilters}
            />
        );
    }
}

export default function ServicesPage({ searchParams }: ServicesPageProps) {
    return (
        <div className="min-h-screen dark:from-slate-900 dark:to-slate-800">
            <div className="mx-auto px-4 md:px-8 py-12 max-w-screen-2xl">
                <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-8 text-center">
                    Browse Our Services
                </h1>
                <Suspense fallback={
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                }>
                    <ServicesData />
                </Suspense>
            </div>
        </div>
    );
}
