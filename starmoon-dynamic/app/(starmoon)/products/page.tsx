import { fetchPublicProducts, fetchProductCategories, fetchDynamicFilters, type Product, type DetailedProduct, type ProductCategory, type DynamicFilter } from "@/lib/api"
import { Suspense } from "react"
import ProductsClient from "./products-client"

// Fallback data for when API fails
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "UI Component Library",
    seller: "DesignSystems Pro",
    rating: 4.9,
    reviews: 87,
    price: 49,
    image: "/Products/ui.png",
    category: "Digital Products",
    type: "Template",
    downloads: 1250,
    sale: false,
  },
  {
    id: 2,
    name: "E-commerce Website Template",
    seller: "WebTemplates Co",
    rating: 4.8,
    reviews: 64,
    price: 79,
    image: "/Products/ecommerce.png",
    category: "Templates",
    type: "Website",
    downloads: 890,
    sale: true,
  },
  {
    id: 3,
    name: "Social Media Marketing Kit",
    seller: "Marketing Masters",
    rating: 4.7,
    reviews: 42,
    price: 39,
    image: "/Products/social.png",
    category: "Digital Products",
    type: "Marketing",
    downloads: 670,
    sale: true,
  },
  {
    id: 4,
    name: "SEO Analysis Tool",
    seller: "SEO Experts",
    rating: 4.9,
    reviews: 56,
    price: 129,
    image: "/Products/seo.png",
    category: "Tools & Software",
    type: "Software",
    downloads: 430,
    sale: false,
  },
  {
    id: 5,
    name: "Business Proposal Template",
    seller: "Business Docs Pro",
    rating: 4.8,
    reviews: 38,
    price: 29,
    image: "/Products/business.png",
    category: "Templates",
    type: "Document",
    downloads: 780,
    sale: false,
  },
  {
    id: 6,
    name: "Video Editing Presets",
    seller: "Creative Studio",
    rating: 4.7,
    reviews: 29,
    price: 59,
    image: "/Products/video.png",
    category: "Digital Products",
    type: "Media",
    downloads: 520,
    sale: false,
  },
]

// Transform DetailedProduct to Product interface
const transformDetailedProductToProduct = (detailedProduct: DetailedProduct): Product | null => {
  if (!detailedProduct) {
    console.warn('Invalid detailed product:', detailedProduct);
    return null;
  }

  const mostPopularPlan = detailedProduct.product_features_and_offers?.find(plan => plan?.is_most_popular);
  const firstPlan = detailedProduct.product_features_and_offers?.[0];
  const selectedPlan = mostPopularPlan || firstPlan;
  
  const price = selectedPlan?.country_price?.[0]?.monthly_price || 0;
  
  return {
    id: detailedProduct.id || parseInt(detailedProduct._id.slice(-8), 16),
    name: detailedProduct.product_name || 'Unknown Product',
    seller: "Starmoon",
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * 100) + 10, // Random reviews count
    price: price,
    image: detailedProduct.product_thumb_image?.startsWith('http') 
      ? detailedProduct.product_thumb_image 
      : `${process.env.NEXT_PUBLIC_DOMAIN_URL || ''}${detailedProduct.product_thumb_image || '/placeholder.svg'}`,
    category: detailedProduct.product_category || 'Uncategorized',
    type: "Software",
    downloads: Math.floor(Math.random() * 1000) + 100, // Random downloads
    sale: selectedPlan?.is_most_popular || false,
  };
};

async function ProductsServerComponent() {
  let products: Product[] = [];
  let categories: string[] = [];
  let dynamicFilters: DynamicFilter[] = [];
  
  try {
    console.log('Starting API fetch operations...');
    console.log('Environment check:', {
      DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    
    // Fetch products, categories, and dynamic filters from API
    const [detailedProducts, productCategories, filters] = await Promise.all([
      fetchPublicProducts('India').catch(err => {
        console.error('Products API failed:', err);
        return [];
      }),
      fetchProductCategories('India').catch(err => {
        console.error('Categories API failed:', err);
        return [];
      }),
      fetchDynamicFilters('products').catch(err => {
        console.error('Dynamic filters API failed:', err);
        return [];
      })
    ]);
    
    console.log('Raw API Responses:', {
      detailedProducts: {
        length: detailedProducts?.length || 0,
        isArray: Array.isArray(detailedProducts),
        sample: detailedProducts?.[0] ? Object.keys(detailedProducts[0]) : 'No data'
      },
      productCategories: {
        length: productCategories?.length || 0,
        isArray: Array.isArray(productCategories),
        sample: productCategories?.[0] ? Object.keys(productCategories[0]) : 'No data'
      },
      filters: {
        length: filters?.length || 0,
        isArray: Array.isArray(filters)
      }
    });
    
    if (detailedProducts && Array.isArray(detailedProducts) && detailedProducts.length > 0) {
      const activeProducts = detailedProducts.filter(product => product?.is_active);
      console.log('Active products found:', activeProducts.length, 'out of', detailedProducts.length);
      
      if (activeProducts.length > 0) {
        products = activeProducts
          .map(transformDetailedProductToProduct)
          .filter((product): product is Product => product !== null);
          
        console.log('Successfully transformed products:', products.length);
        console.log('Sample transformed product:', products[0] ? {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
          category: products[0].category
        } : 'No products');
      } else {
        console.warn('No active products found in API response');
      }
    } else {
      console.warn('No valid products data received from API or empty array');
    }
      
    if (productCategories && Array.isArray(productCategories) && productCategories.length > 0) {
      const activeCategories = productCategories.filter(cat => cat?.is_active);
      categories = activeCategories
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map(cat => cat.product_category_name)
        .filter(Boolean);
        
      console.log('Successfully processed categories:', categories);
    } else {
      console.warn('No valid categories data received from API');
    }
      
    dynamicFilters = filters || [];
    console.log('Dynamic filters processed:', dynamicFilters.length);
    console.log('Dynamic filters data:', dynamicFilters);
    
    // If we have no products from API, use fallback
    if (products.length === 0) {
      console.log('Using fallback products due to no API data');
      products = fallbackProducts;
    }
    
    // If we have no categories from API, use fallback
    if (categories.length === 0) {
      console.log('Using fallback categories due to no API data');
      categories = ["Electronics", "Clothing", "Home", "Accessories", "Digital Products", "Templates", "Tools & Software", "Media"];
    }
    
    // If we have no dynamic filters from API, use fallback for testing
    if (dynamicFilters.length === 0) {
      console.log('Using fallback dynamic filters due to no API data');
      dynamicFilters = [
        {
          id: 1,
          category: "products",
          sections: [
            // {
            //   title: "Technology",
            //   options: [
            //     { label: "AI/ML", _id: "tech-1" },
            //     { label: "Web Development", _id: "tech-2" },
            //     { label: "Mobile Apps", _id: "tech-3" },
            //     { label: "Cloud Services", _id: "tech-4" }
            //   ],
            //   _id: "section-1"
            // },
            // {
            //   title: "Industry",
            //   options: [
            //     { label: "Healthcare", _id: "industry-1" },
            //     { label: "Finance", _id: "industry-2" },
            //     { label: "E-commerce", _id: "industry-3" },
            //     { label: "Education", _id: "industry-4" }
            //   ],
            //   _id: "section-2"
            // },
            // {
            //   title: "Complexity",
            //   options: [
            //     { label: "Beginner", _id: "complexity-1" },
            //     { label: "Intermediate", _id: "complexity-2" },
            //     { label: "Advanced", _id: "complexity-3" },
            //     { label: "Expert", _id: "complexity-4" }
            //   ],
            //   _id: "section-3"
            // }
          ],
          sort_order: 1,
          is_active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }
      
  } catch (error) {
    console.error('Critical error in ProductsServerComponent:', error);
    // Use fallback data when there's a critical error
    products = fallbackProducts;
    categories = ["Electronics", "Clothing", "Home", "Accessories", "Digital Products", "Templates", "Tools & Software", "Media"];
    dynamicFilters = [];
  }
  
  console.log('Final data being passed to client:', {
    products: products.length,
    categories: categories.length,
    dynamicFilters: dynamicFilters.length,
    productNames: products.slice(0, 3).map(p => p.name)
  });
  
  return <ProductsClient products={products} categories={categories} dynamicFilters={dynamicFilters} />;
}

export default function ProductsPage() {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      }>
        <ProductsServerComponent />
      </Suspense>
    </div>
  );
} 