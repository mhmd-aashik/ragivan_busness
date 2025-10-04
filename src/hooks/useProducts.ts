// Legacy hooks - now using React Query hooks from useProductsQuery.ts
// This file is kept for backward compatibility

import { useProducts as useProductsQuery } from "./useProductsQuery";
import { useProduct as useProductQuery } from "./useProductsQuery";
import { useProductCategories as useProductCategoriesQuery } from "./useProductsQuery";

// Re-export the React Query hooks with the same interface
export { useProductsQuery as useProducts };
export { useProductQuery as useProduct };
export { useProductCategoriesQuery as useProductCategories };
