import { getAuthToken } from "@/utils/auth"
import { fetchUserData, type UserProfile } from "@/lib/api"
import { redirect } from "next/navigation"
import ProviderDashboardClient from "./dashboard-client"

// Fallback user data for when API fails
const fallbackUserData: UserProfile = {
  id: "provider-1",
  name: "TechCraft Solutions",
  email: "hello@techcraft.com",
  avatar: "/placeholder.svg?height=80&width=80",
  role: "provider",
  joined: "2022-03-15",
  verified: true,
}

async function ProviderDashboardServer() {
  // Get authentication token from cookies
  const token = await getAuthToken();
  
  if (!token) {
    redirect("/login");
  }

  let userData: UserProfile;
  
  try {
    // Fetch user profile data from API
    userData = await fetchUserData(token);
  } catch (error) {
    console.error('Failed to fetch user data, using fallback:', error);
    // Use fallback data when API fails
    userData = fallbackUserData;
  }
  
  return <ProviderDashboardClient userData={userData} />;
}

export default ProviderDashboardServer; 