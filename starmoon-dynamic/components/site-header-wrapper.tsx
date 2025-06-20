import { fetchHeaderMenu, type HeaderMenuItem } from "@/lib/api"
import { SiteHeader } from "./site-header"

interface SiteHeaderWrapperProps {
  showSearch?: boolean
  isLoggedIn?: boolean
  userAvatar?: string
  userInitials?: string
}

async function SiteHeaderServer(props: SiteHeaderWrapperProps) {
  let menuData: HeaderMenuItem[] = [];
  
  try {
    // Fetch header menu data from API
    console.log('🔄 Fetching header menu from API...');
    menuData = await fetchHeaderMenu('India');
    console.log('✅ Header menu fetched successfully:', menuData.length, 'items');
  } catch (error) {
    console.error('❌ Failed to fetch header menu, using fallback:', error);
    // Will fall back to hardcoded menu in SiteHeader component
  }
  
  return <SiteHeader {...props} menuData={menuData} />;
}

export { SiteHeaderServer as SiteHeader }; 