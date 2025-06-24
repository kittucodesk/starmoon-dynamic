import TestimonialSection from "@/components/custom/common/home/Testimonial"
import About from "@/components/custom/common/home/About"
import HeroBanner from "@/components/custom/common/home/HeroBanner"
import ProductsSection from "@/components/custom/common/home/ProductsSection"
import AutomationSteps from "@/components/custom/common/home/AutomationSteps"
import FeaturedServices from "@/components/custom/common/home/FeaturedServices"
import BrandsSection from "@/components/custom/common/home/BrandsSection"
import ConsultationSection from "@/components/custom/common/home/ConsultationSection"
import NewsEventsSection from "@/components/custom/common/home/NewsEventsSection"
import NewsletterSection from "@/components/custom/common/home/NewsletterSection"
import { AddToCartDemo } from "@/components/cart/add-to-cart-demo"
import { fetchAboutUs, fetchBanners, fetchTestimonials, fetchNews, type Banner, type AboutUs, type Testimonial, type NewsItem } from "@/lib/api"

export default async function HomePage() {
  let bannerData: Banner[] = [];
  let aboutUsData: AboutUs | undefined = undefined;
  let testimonialData: Testimonial[] = [];
  let newsData: NewsItem[] = [];
  let eventsData: NewsItem[] = [];
  let offersData: NewsItem[] = [];
  
  try {
    // Fetch banner data from API
    console.log('🔄 Fetching banners from API...');
    bannerData = await fetchBanners('India');
    console.log('✅ Banners fetched successfully:', bannerData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch banners, using fallback data:', error);
    // Will fall back to hardcoded banners in HeroBanner component
  }
  
  try {
    // Fetch about us data from API
    console.log('🔄 Fetching about us data from API...');
    aboutUsData = await fetchAboutUs('India');
    console.log('✅ About us data fetched successfully');
  } catch (error) {
    console.error('❌ Failed to fetch about us data, using fallback data:', error);
    // Will fall back to hardcoded data in About component
  }

  try {
    // Fetch testimonial data from API
    console.log('🔄 Fetching testimonials from API...');
    testimonialData = await fetchTestimonials('India');
    console.log('✅ Testimonials fetched successfully:', testimonialData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch testimonials, using fallback data:', error);
    // Will fall back to hardcoded testimonials in TestimonialSection component
  }

  try {
    // Fetch news data from API
    console.log('🔄 Fetching news from API...');
    newsData = await fetchNews('India', 'news');
    console.log('✅ News fetched successfully:', newsData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch news, using fallback data:', error);
    // Will fall back to hardcoded news in NewsEventsSection component
  }

  try {
    // Fetch events data from API
    console.log('🔄 Fetching events from API...');
    eventsData = await fetchNews('India', 'events');
    console.log('✅ Events fetched successfully:', eventsData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch events, using fallback data:', error);
    // Will fall back to hardcoded events in NewsEventsSection component
  }

  try {
    // Fetch offers data from API
    console.log('🔄 Fetching offers from API...');
    offersData = await fetchNews('India', 'offers');
    console.log('✅ Offers fetched successfully:', offersData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch offers, using fallback data:', error);
    // Will fall back to hardcoded offers in NewsEventsSection component
  }

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Hero Banner Carousel */}
      <HeroBanner bannerData={bannerData} />

      {/* About Section */}
      <About aboutUsData={aboutUsData} />

      {/* Products Section */}
      <ProductsSection />

      {/* Automation Steps Section */}
      <AutomationSteps />

      {/* Featured Services */}
      <FeaturedServices />

      {/* Brands */}
      <BrandsSection />

      {/* Consultation Section */}
      <ConsultationSection />

      {/* Testimonials */}
      <section className="py-12">
        <TestimonialSection testimonialData={testimonialData} />
      </section>

      {/* Recent News, Events & Offers */}
      <NewsEventsSection 
        newsData={newsData}
        eventsData={eventsData}
        offersData={offersData}
      />

      {/* Newsletter Signup */}
      <NewsletterSection />
      
      {/* Demo Cart Buttons for Testing */}
      {/* <AddToCartDemo /> */}
    </div>
  )
}