// API Types
export interface Product {
  id: number;
  name: string;
  seller: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  category: string;
  type: string;
  downloads: number;
  sale: boolean;
  description?: string;
  features?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'provider';
  joined: string;
  verified: boolean;
  // Add more fields as needed
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Authentication Types
export interface SignupRequest {
  email: string;
  mobile_number: string;
  name: string;
  profile_image?: string;
  password: string;
  country?: string;
  additional_info?: {
    state?: string;
  };
}

export interface SigninRequest {
  login: string;
  password: string;
}

export interface SignupResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: {
    id: number;
    email: string;
    mobile_number: string;
    name: string;
    user_type: string;
    message: string;
  };
}

export interface AuthResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: {
    status: boolean;
    token: string;
    user: {
      id: number;
      email: string;
      mobile_number: string;
      name: string;
      country: string;
      user_types: Array<{
        id: number;
        name: string;
      }>;
    };
  };
}

// Extended API Types for your endpoints
export interface HeaderMenuItem {
  id: number;
  title: string;
  icon: string;
  bannerImage: string;
  bannerTitle: string;
  bannerDescription: string;
  items: Array<{
    label: string;
    href: string;
    icon: string;
    subCategories: Array<{
      title: string;
      items: Array<{
        label: string;
        href: string;
        _id: string;
      }>;
      _id: string;
    }>;
    _id: string;
  }>;
  country: string;
  sort_order: number;
  is_active: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  background?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  badge?: string;
  is_active: boolean;
  sort_order: number;
  country: string;
}

export interface AboutUs {
  id: string;
  title: string;
  short_description: string;
  description: string;
  image: string;
  client_count: number;
  year_experience: number;
  success_rate: number;
  country: string;
}

export interface ProductCategory {
  id: number;
  product_category_name: string;
  product_category_description: string;
  product_category_image: string;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceCategory {
  id: number;
  service_category_name: string;
  service_category_description: string;
  service_category_image: string;
  is_active: boolean;
  sort_order: number;
}

export interface ConsultationCategory {
  id: number;
  consultation_category_name: string;
  consultation_category_description: string;
  consultation_category_image: string;
  is_active: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  rating: number;
  testimonial: string;
  avatar?: string;
  category?: string;
  country: string;
  is_active: boolean;
  sort_order: number;
}

export interface NewsItem {
  id: string;
  type: 'news' | 'events' | 'offers';
  title: string;
  description: string;
  image?: string;
  published_date: string;
  country: string;
  location?: string;
  badge?: string;
  link?: string;
  is_active: boolean;
}

export interface CmsContent {
  id: string;
  title: string;
  content: string;
  type: string;
  country: string;
  is_active: boolean;
}

export interface DynamicFilterOption {
  label: string;
  _id: string;
}

export interface DynamicFilterSection {
  title: string;
  options: DynamicFilterOption[];
  _id: string;
}

export interface DynamicFilter {
  id: number;
  category: string;
  sections: DynamicFilterSection[];
  sort_order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  id?: number;
  service_category: string;
  service_name: string;
  service_thumb_image: string;
  service_image_gallery: string[];
  service_description: string;
  service_long_description: string;
  tags: string[];
  is_pay_as_you_go: boolean;
  is_service_features_and_offers: boolean;
  experts_mapping: Array<{
    id: number;
    Name: string;
    _id: string;
  }>;
  products_mapping: Array<{
    id: number;
    Name: string;
    _id: string;
  }>;
  pay_as_you_go_price: any[];
  service_features_and_offers: Array<{
    name: string;
    description: string;
    is_most_popular: boolean;
    features: Array<{
      name: string;
      value: string | number;
      is_included: boolean;
      _id: string;
    }>;
    country_price: Array<{
      country: string;
      currency: string;
      monthly_price: number;
      yearly_price: number;
      _id: string;
    }>;
    _id: string;
  }>;
  quick_contact_no: Array<{
    country: string;
    contact_no: string;
    _id: string;
  }>;
  whatsapp_no: Array<{
    country: string;
    whatsapp_no: string;
    _id: string;
  }>;
  is_active: boolean;
  faqs: Array<{
    question: string;
    answer: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  badges: string;
  dynamic_filters: Array<{
    filter_name: string;
    filter_value: string;
    _id: string;
  }>;
  meta_keywords: string[];
  youtube_video_links: string[];
  meta_description: string;
  meta_title: string;
}

export interface DetailedProduct {
  _id: string;
  id?: number;
  product_category: string;
  product_name: string;
  product_thumb_image: string;
  product_image_gallery: string[];
  product_description: string;
  product_long_description: string;
  tags: string[];
  youtube_video_links: string[];
  dynamic_filters: Array<{
    filter_name: string;
    filter_value: string;
    _id: string;
  }>;
  is_pay_as_you_go: boolean;
  is_product_features_and_offers: boolean;
  pay_as_you_go_price: Array<{
    country: string;
    listing_price: number;
    selling_price: number;
    _id: string;
  }>;
  product_features_and_offers: Array<{
    name: string;
    description: string;
    is_most_popular: boolean;
    features: Array<{
      name: string;
      value: string;
      is_included: boolean;
      _id: string;
    }>;
    country_price: Array<{
      country: string;
      currency: string;
      monthly_price: number;
      yearly_price: number;
      _id: string;
    }>;
    _id: string;
  }>;
  quick_contact_no: Array<{
    country: string;
    contact_no: string;
    _id: string;
  }>;
  whatsapp_no: Array<{
    country: string;
    whatsapp_no: string;
    _id: string;
  }>;
  is_active: boolean;
  sort_order: number;
  faqs: Array<{
    question: string;
    answer: string;
    _id: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    image: string;
    _id: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    _id: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    description: string;
    rating: number;
    image: string;
    _id: string;
  }>;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  createdAt: string;
  updatedAt: string;
  badges: string;
}

export interface DetailedService {
  id: string;
  service_name: string;
  service_description: string;
  service_image: string;
  service_category: string;
  expert_details: {
    id: string;
    name: string;
    avatar?: string;
    bio: string;
    rating: number;
    reviews_count: number;
  };
  pricing: {
    min_price: number;
    max_price: number;
    pricing_type: string;
  };
  badges: string[];
  tags: string[];
  portfolio?: Array<{
    title: string;
    image: string;
    description: string;
  }>;
  is_active: boolean;
}

export interface Consultation {
  _id: string;
  id?: number;
  consultation_category: string;
  name: string;
  profile_image: string;
  about: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string;
  awards: string;
  links: Array<{
    label: string;
    url: string;
    _id: string;
  }>;
  availability: Array<{
    day: string;
    time_slots: Array<{
      start: string;
      end: string;
      _id: string;
    }>;
    _id: string;
  }>;
  tags: string[];
  dynamic_filters: Array<{
    filter_name: string;
    filter_value: string;
    _id: string;
  }>;
  experts_mapping: Array<{
    id: number;
    Name: string;
    _id: string;
  }>;
  products_mapping: Array<{
    id: number;
    Name: string;
    _id: string;
  }>;
  pricing_type: string;
  hourly_rate: number;
  currency: string;
  subscription_plans: any[];
  quick_contact_no: Array<{
    country: string;
    contact_no: string;
    _id: string;
  }>;
  whatsapp_no: Array<{
    country: string;
    whatsapp_no: string;
    _id: string;
  }>;
  is_active: boolean;
  faqs: Array<{
    question: string;
    answer: string;
    _id: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    image: string;
    _id: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    _id: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    description: string;
    rating: number;
    image: string;
    _id: string;
  }>;
  badges: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: number;
  title: string;
  logo: string;
  description: string;
  url: string;
  country: string;
  sort_order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CouponRequest {
  coupon_code: string;
  order_amount: number;
  product_ids: string[];
}

export interface CouponResponse {
  coupon_code: string;
  coupon_title: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  original_amount: string;
  discount_amount: number;
  final_amount: number;
  savings: number;
  valid_products: string[];
  valid_services: string[];
}

export interface ActiveCoupon {
  id: string;
  coupon_code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  max_discount?: number;
  min_order_amount?: number;
  description: string;
  expiry_date: string;
  is_active: boolean;
}

// Order Related Interfaces
export interface OrderItem {
  item_type: 'products' | 'services';
  item_id: string;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderPayment {
  method: string;
  status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  transaction_id?: string;
  payment_gateway?: string;
  paid_at?: string;
  invoice_url?: string;
}

export interface CreateOrderRequest {
  order_number: string;
  user: string;
  items: OrderItem[];
  shipping_address: OrderAddress;
  billing_address: OrderAddress;
  subtotal: number;
  discount: number;
  offer_discount: number;
  tax: number;
  shipping_fee: number;
  total: number;
  payment: OrderPayment;
  order_status: 'Created' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  coupon_code?: string;
}

export interface UpdateOrderRequest {
  payment_response: {
    payment_id: string;
    [key: string]: any; // Allow additional payment response fields
  };
}

export interface OrderResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: {
    id: string;
    order_number: string;
    user: string;
    items: OrderItem[];
    shipping_address: OrderAddress;
    billing_address: OrderAddress;
    subtotal: number;
    discount: number;
    offer_discount: number;
    tax: number;
    shipping_fee: number;
    total: number;
    payment: OrderPayment;
    order_status: string;
    coupon_code?: string;
    created_at: string;
    updated_at: string;
  };
}

// Razorpay Related Interfaces
export interface CreateRazorpayOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
}

export interface CreateRazorpayOrderResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id?: string;
    status: string;
    attempts: number;
    notes: Record<string, any>;
    created_at: number;
  };
}

export interface VerifyRazorpayPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyRazorpayPaymentResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: {
    payment_verified: boolean;
    order_id: string;
    payment_id: string;
    signature: string;
  };
}

// Query Parameters Interfaces
export interface ServiceListingParams {
  per_page?: number;
  page_no?: number;
  search?: string;
  filter_name?: string;
  filter_value?: string;
  expert_id?: string;
  badges?: string;
  service_category?: string;
  tags?: string;
  min_price?: number;
  max_price?: number;
}

export interface ProductListingParams {
  search?: string;
  tags?: string | string[];
  product_category?: string | string[];
  badges?: string | string[];
  filter_name?: string;
  filter_value?: string | string[];
  min_price?: number;
  max_price?: number;
  page_no?: number;
  per_page?: number;
}

export interface ConsultationListingParams {
  per_page?: number;
  page_no?: number;
  search?: string;
  filter_name?: string;
  filter_value?: string;
  expert_id?: string;
  badges?: string;
  consultation_category?: string;
  tags?: string;
  min_price?: number;
  max_price?: number;
}

// Base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

// Helper function to handle API requests with proper error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// 1. Header Menu API
export async function fetchHeaderMenu(country: string = 'India'): Promise<HeaderMenuItem[]> {
  try {
    const response = await apiRequest<ApiResponse<HeaderMenuItem[]>>(`/api/v1/header-menu/web/list/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch header menu:', error);
    throw error;
  }
}

// 2. Banner API
export async function fetchBanners(country: string = 'India'): Promise<Banner[]> {
  try {
    const response = await apiRequest<ApiResponse<Banner[]>>(`/api/v1/banner/web/list/${country}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch banners:', error);
    throw error;
  }
}

// 3. About Us API
export async function fetchAboutUs(country: string = 'India'): Promise<AboutUs> {
  try {
    const response = await apiRequest<ApiResponse<AboutUs>>(`/api/v1/about-us/web/get/${country}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch about us:', error);
    throw error;
  }
}

// 4. Product Category API
export async function fetchProductCategories(country: string = 'India'): Promise<ProductCategory[]> {
  try {
    const response = await apiRequest<{ data: ProductCategory[] }>(`/api/v1/product-category/web/list/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch product categories:', error);
    throw error;
  }
}

// 5. Testimonials API
export async function fetchTestimonials(country: string = 'India'): Promise<Testimonial[]> {
  try {
    const response = await apiRequest<ApiResponse<Testimonial[]>>(`/api/v1/testimonials/web/list/${country}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    throw error;
  }
}

// 6. News/Events/Offers API
export async function fetchNews(country: string = 'India', type: 'news' | 'events' | 'offers' = 'news'): Promise<NewsItem[]> {
  try {
    const response = await apiRequest<ApiResponse<NewsItem[]>>(`/api/v1/content-master/web/list/${country}/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${type}:`, error);
    throw error;
  }
}

// 7. CMS API
export async function fetchCmsContent(country: string = 'India', type: string = 'for_customers'): Promise<CmsContent[]> {
  try {
    const response = await apiRequest<ApiResponse<CmsContent[]>>(`/api/v1/cms/web/list/${country}/${type}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch CMS content:', error);
    throw error;
  }
}

// 8. Dynamic Filters API
export async function fetchDynamicFilters(filterName: string = 'products'): Promise<DynamicFilter[]> {
  try {
    const response = await apiRequest<{ data: DynamicFilter[] }>(`/api/v1/dynamic-filter/get-by-name/${filterName}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch dynamic filters:', error);
    throw error;
  }
}

// 9. Services Listing API
export async function fetchServices(country: string = 'India', params?: ServiceListingParams): Promise<Service[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/v1/service/country-wise-list/${country}${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest<ApiResponse<Service[]>>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    throw error;
  }
}

// 10. Products Listing API (Updated)
export async function fetchPublicProducts(country: string = 'India', params?: ProductListingParams): Promise<DetailedProduct[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // For arrays, append each value separately
            value.forEach(item => {
              queryParams.append(key, item.toString());
            });
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/v1/products/country-wise-list/${country}${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest<{ data: DetailedProduct[] }>(endpoint);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

// 11. Get Product Details by ID
export async function fetchProductById(id: string): Promise<DetailedProduct> {
  try {
    const response = await apiRequest<ApiResponse<DetailedProduct>>(`/api/v1/products/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}

// 12. Get Service Details by ID
export async function fetchServiceById(id: string): Promise<DetailedService> {
  try {
    const response = await apiRequest<ApiResponse<DetailedService>>(`/api/v1/service/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch service ${id}:`, error);
    throw error;
  }
}

// Get Full Service by ID with all details
export async function fetchFullServiceById(id: string): Promise<Service> {
  try {
    const response = await apiRequest<{ meta: any; data: Service }>(`/api/v1/service/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch full service ${id}:`, error);
    throw error;
  }
}

// 13. Apply Coupon API
export async function applyCoupon(couponData: CouponRequest, token?: string): Promise<CouponResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiRequest<any>('/api/v1/offers/apply-coupon', {
      method: 'POST',
      headers,
      body: JSON.stringify(couponData),
    });

    // Check if the response has the meta structure
    if (response.meta && response.data) {
      return response.data as CouponResponse;
    }

    // Fallback to direct response structure
    return response as CouponResponse;
  } catch (error) {
    console.error('Failed to apply coupon:', error);
    throw error;
  }
}

// 14. Active Coupons API
export async function fetchActiveCoupons(country: string = 'India'): Promise<ActiveCoupon[]> {
  try {
    const response = await apiRequest<ApiResponse<ActiveCoupon[]>>(`/api/v1/offers/web/random-active/${country}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch active coupons:', error);
    throw error;
  }
}

// 15. Legacy functions for backward compatibility
export async function fetchUserData(token: string): Promise<UserProfile> {
  try {
    const response = await apiRequest<ApiResponse<UserProfile>>('/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}

// 16. Update user profile
export async function updateUserProfile(token: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const response = await apiRequest<ApiResponse<UserProfile>>('/user/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
}

// 17. Customer Signup API
export async function signupCustomer(signupData: SignupRequest): Promise<SignupResponse> {
  try {
    const response = await apiRequest<SignupResponse>('/api/v1/auth/customer/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });
    return response;
  } catch (error) {
    console.error('Failed to signup customer:', error);
    throw error;
  }
}

// 18. Customer Signin API
export async function signinCustomer(signinData: SigninRequest): Promise<AuthResponse> {
  try {
    const response = await apiRequest<AuthResponse>('/api/v1/auth/customer/signin_password', {
      method: 'POST',
      body: JSON.stringify(signinData),
    });
    return response;
  } catch (error) {
    console.error('Failed to signin customer:', error);
    throw error;
  }
}

// 19. Service Category API
export async function fetchServiceCategories(country: string = 'India'): Promise<ServiceCategory[]> {
  try {
    const response = await apiRequest<{ data: ServiceCategory[] }>(`/api/v1/service-category/web/list/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch service categories:', error);
    throw error;
  }
}

// 20. Consultation Category API
export async function fetchConsultationCategories(country: string = 'India'): Promise<ConsultationCategory[]> {
  try {
    const response = await apiRequest<{ data: ConsultationCategory[] }>(`/api/v1/consultation-category/web/list/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch consultation categories:', error);
    throw error;
  }
}

// 21. Consultations Listing API
export async function fetchConsultations(country: string = 'India', params?: ConsultationListingParams): Promise<Consultation[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/v1/consultation/country-wise-list/${country}${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest<{ meta: any; data: Consultation[] }>(endpoint);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch consultations:', error);
    throw error;
  }
}

// 22. Get Consultation by ID API
export async function fetchConsultationById(id: string): Promise<Consultation> {
  try {
    const endpoint = `/api/v1/consultation/get/${id}`;

    const response = await apiRequest<{ meta: any; data: Consultation }>(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch consultation ${id}:`, error);
    throw error;
  }
}

// 23. Create Order API
export async function createOrder(orderData: CreateOrderRequest, token?: string): Promise<OrderResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiRequest<OrderResponse>('/api/v1/orders/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    return response;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

// 24. Update Order API
export async function updateOrder(orderId: string, updateData: UpdateOrderRequest, token?: string): Promise<OrderResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/update`, {
      method: 'POST',
      headers,
      body: JSON.stringify(updateData),
    });

    return response;
  } catch (error) {
    console.error(`Failed to update order ${orderId}:`, error);
    throw error;
  }
}

// 25. Create Razorpay Order API
export async function createRazorpayOrder(orderData: CreateRazorpayOrderRequest, token?: string): Promise<CreateRazorpayOrderResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiRequest<CreateRazorpayOrderResponse>('/api/v1/orders/create-razorpay-order', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    return response;
  } catch (error) {
    console.error('Failed to create Razorpay order:', error);
    throw error;
  }
}

// 26. Verify Razorpay Payment API
export async function verifyRazorpayPayment(paymentData: VerifyRazorpayPaymentRequest, token?: string): Promise<VerifyRazorpayPaymentResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiRequest<VerifyRazorpayPaymentResponse>('/api/v1/orders/verify-razorpay-order', {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentData),
    });

    return response;
  } catch (error) {
    console.error('Failed to verify Razorpay payment:', error);
    throw error;
  }
}

// 27. Partners API
export async function fetchPartners(country: string = 'India'): Promise<Partner[]> {
  try {
    const response = await apiRequest<{
      meta: {
        status: boolean;
        message: string;
        pagination: {
          per_page: number;
          page_no: number;
          total_rows: number;
          total_pages: number;
        };
      };
      data: Partner[];
    }>(`/api/v1/partners/web/list/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    throw error;
  }
}