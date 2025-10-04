// MockAPI configuration and utilities
const API_BASE_URL = "https://64f8b5c3824680fd81e13716.mockapi.io/api/v1";

// Fallback to local data when API is not available
const FALLBACK_DATA_URL = "/api/products";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Fallback to local API if MockAPI fails
    if (endpoint === "/products") {
      try {
        const fallbackResponse = await fetch("/api/products");
        if (fallbackResponse.ok) {
          return await fallbackResponse.json();
        }
      } catch (fallbackError) {
        console.warn("Fallback API also failed:", fallbackError);
      }
    }

    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      0,
      "Network Error"
    );
  }
}

// Products API
export const productsApi = {
  // Get all products
  getAll: (): Promise<any[]> => apiRequest<any[]>("/products"),

  // Get product by ID
  getById: async (id: string | number): Promise<any> => {
    try {
      return await apiRequest<any>(`/products/${id}`);
    } catch (error) {
      const products = await productsApi.getAll();
      return products.find((p) => p.id.toString() === id.toString());
    }
  },

  // Get products by category
  getByCategory: async (category: string): Promise<any[]> => {
    try {
      return await apiRequest<any[]>(
        `/products?category=${encodeURIComponent(category)}`
      );
    } catch (error) {
      const products = await productsApi.getAll();
      return products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
  },

  // Get featured products
  getFeatured: async (): Promise<any[]> => {
    try {
      return await apiRequest<any[]>("/products?featured=true");
    } catch (error) {
      const products = await productsApi.getAll();
      return products.filter((p) => p.featured === true);
    }
  },

  // Get best selling products
  getBestSelling: async (): Promise<any[]> => {
    try {
      return await apiRequest<any[]>("/products?isBestSeller=true");
    } catch (error) {
      const products = await productsApi.getAll();
      return products.filter((p) => p.isBestSeller === true);
    }
  },

  // Get new arrivals
  getNewArrivals: async (): Promise<any[]> => {
    try {
      return await apiRequest<any[]>("/products?isNew=true");
    } catch (error) {
      const products = await productsApi.getAll();
      return products.filter((p) => p.isNew === true);
    }
  },

  // Get top rated products
  getTopRated: async (): Promise<any[]> => {
    try {
      return await apiRequest<any[]>("/products?rating_gte=4.8");
    } catch (error) {
      const products = await productsApi.getAll();
      return products.filter((p) => p.rating >= 4.8);
    }
  },

  // Search products
  search: async (query: string): Promise<any[]> => {
    try {
      return await apiRequest<any[]>(
        `/products?search=${encodeURIComponent(query)}`
      );
    } catch (error) {
      const products = await productsApi.getAll();
      const searchTerm = query.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }
  },

  // Get products with pagination
  getPaginated: (page: number = 1, limit: number = 10): Promise<any[]> =>
    apiRequest<any[]>(`/products?page=${page}&limit=${limit}`),

  // Create new product (for admin)
  create: (product: any): Promise<any> =>
    apiRequest<any>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),

  // Update product (for admin)
  update: (id: string | number, product: any): Promise<any> =>
    apiRequest<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),

  // Delete product (for admin)
  delete: (id: string | number): Promise<void> =>
    apiRequest<void>(`/products/${id}`, {
      method: "DELETE",
    }),
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<any[]> => {
    try {
      return await apiRequest<any[]>("/categories");
    } catch (error) {
      // Fallback: extract categories from products
      const products = await productsApi.getAll();
      const categories = [...new Set(products.map((p) => p.category))];
      return categories.map((name, index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase(),
      }));
    }
  },

  // Get category by ID
  getById: (id: string | number): Promise<any> =>
    apiRequest<any>(`/categories/${id}`),
};

// Reviews API
export const reviewsApi = {
  // Get reviews for a product
  getByProduct: (productId: string | number): Promise<any[]> =>
    apiRequest<any[]>(`/reviews?productId=${productId}`),

  // Create new review
  create: (review: any): Promise<any> =>
    apiRequest<any>("/reviews", {
      method: "POST",
      body: JSON.stringify(review),
    }),

  // Update review
  update: (id: string | number, review: any): Promise<any> =>
    apiRequest<any>(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(review),
    }),

  // Delete review
  delete: (id: string | number): Promise<void> =>
    apiRequest<void>(`/reviews/${id}`, {
      method: "DELETE",
    }),
};

export default {
  products: productsApi,
  categories: categoriesApi,
  reviews: reviewsApi,
};
