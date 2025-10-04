# MockAPI Setup for Rajeevan E-commerce

## Quick Setup

1. **Create MockAPI Account**

   - Go to [https://mockapi.io](https://mockapi.io)
   - Sign up for a free account
   - Create a new project

2. **Set up Collections**

   - Create `products` collection
   - Create `categories` collection
   - Create `reviews` collection

3. **Update API URL**

   - Replace the `API_BASE_URL` in `/src/lib/mockapi.ts` with your project URL
   - Format: `https://[your-project-id].mockapi.io/api/v1`

4. **Import Sample Data**
   - Use the sample data from `/src/data/` folder
   - Import via MockAPI dashboard or API

## API Endpoints

### Products

- `GET /products` - All products
- `GET /products/:id` - Product by ID
- `GET /products?category=keyboards` - Filter by category
- `GET /products?featured=true` - Featured products
- `GET /products?isBestSeller=true` - Best selling
- `GET /products?isNew=true` - New arrivals
- `GET /products?rating_gte=4.8` - Top rated

### Categories

- `GET /categories` - All categories
- `GET /categories/:id` - Category by ID

### Reviews

- `GET /reviews?productId=1` - Reviews for product
- `POST /reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

## Usage in Components

```tsx
import { useProducts } from "@/hooks/useProducts";

function ProductList() {
  const { products, loading, error } = useProducts({
    featured: true,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## File Structure

```
src/
├── lib/
│   └── mockapi.ts          # API configuration
├── hooks/
│   └── useProducts.ts      # React hooks for products
├── data/
│   ├── sample-products.json    # Sample product data
│   └── sample-categories.json  # Sample category data
└── components/
    └── ... (existing components)
```
