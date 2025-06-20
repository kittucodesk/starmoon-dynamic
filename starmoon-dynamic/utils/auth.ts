import { cookies } from "next/headers";

// Get authentication token from cookies in server components
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token?.value || null;
}

// Additional auth utility functions
export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  return userId?.value || null;
}

export async function getUserRole(): Promise<'customer' | 'provider' | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get("userRole");
  return role?.value as 'customer' | 'provider' || null;
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null;
}

// Get user session data from cookies
export async function getSessionData(): Promise<{
  token: string | null;
  userId: string | null;
  role: 'customer' | 'provider' | null;
}> {
  return {
    token: await getAuthToken(),
    userId: await getUserId(),
    role: await getUserRole(),
  };
} 