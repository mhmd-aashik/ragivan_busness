export interface ProductReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductSpecifications {
  [key: string]: string;
}

export interface Product {
  id: number | string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  brand?: string;
  originalPrice: number;
  discount: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  featured?: boolean;
  features: string[];
  description: string;
  specifications: ProductSpecifications;
  reviews: ProductReview[];
  createdAt?: string;
  tags?: string[];
  availability?: "in-stock" | "out-of-stock";
  shipping?: "free" | "paid";
}

export interface ProductFilter {
  id: string;
  label: string;
}
