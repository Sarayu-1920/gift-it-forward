import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  occasion: string;
  imageUrl: string;
  images: string[];
  impactType: string;
  impactDescription: string;
  impactAmount: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface ProductFilters {
  category?: string;
  occasion?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

// Mock data for development (used when backend is unavailable)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, name: "Handcrafted Bamboo Watch", description: "Eco-friendly bamboo watch with genuine leather strap. Each purchase plants 2 trees.", price: 2499, category: "Eco-Friendly", occasion: "Birthday", imageUrl: "/products/bamboo-watch.jpg", images: ["/products/bamboo-watch.jpg"], impactType: "tree_planting", impactDescription: "Plants 2 trees via Grow-Trees Foundation", impactAmount: 150, rating: 4.5, reviewCount: 128, inStock: true,
  },
  {
    id: 2, name: "Personalized Photo Frame", description: "Custom engraved wooden photo frame. Part of the proceeds support education for underprivileged children.", price: 1299, category: "Personalized", occasion: "Anniversary", imageUrl: "/products/photo-frame.jpg", images: ["/products/photo-frame.jpg"], impactType: "education", impactDescription: "Funds 1 week of education supplies", impactAmount: 100, rating: 4.8, reviewCount: 256, inStock: true,
  },
  {
    id: 3, name: "Organic Tea Gift Set", description: "Premium organic tea collection sourced from fair-trade farms.", price: 899, category: "Eco-Friendly", occasion: "Festival", imageUrl: "/products/tea-set.jpg", images: ["/products/tea-set.jpg"], impactType: "ngo_support", impactDescription: "Supports fair-trade farming communities", impactAmount: 75, rating: 4.3, reviewCount: 89, inStock: true,
  },
  {
    id: 4, name: "Smart LED Desk Lamp", description: "Energy-efficient desk lamp with wireless charging pad.", price: 3499, category: "Electronics", occasion: "Graduation", imageUrl: "/products/desk-lamp.jpg", images: ["/products/desk-lamp.jpg"], impactType: "tree_planting", impactDescription: "Plants 3 trees for every lamp sold", impactAmount: 200, rating: 4.6, reviewCount: 175, inStock: true,
  },
  {
    id: 5, name: "Artisan Silk Scarf", description: "Hand-woven silk scarf from local artisans.", price: 1899, category: "Fashion", occasion: "Birthday", imageUrl: "/products/silk-scarf.jpg", images: ["/products/silk-scarf.jpg"], impactType: "ngo_support", impactDescription: "Empowers women artisans in rural communities", impactAmount: 120, rating: 4.7, reviewCount: 64, inStock: true,
  },
  {
    id: 6, name: "Classic Literature Collection", description: "Beautifully bound set of 5 classic novels.", price: 2199, category: "Books", occasion: "Graduation", imageUrl: "/products/books-collection.jpg", images: ["/products/books-collection.jpg"], impactType: "education", impactDescription: "Donates 3 books to a school library", impactAmount: 180, rating: 4.9, reviewCount: 312, inStock: true,
  },
  {
    id: 7, name: "Ceramic Planter Set", description: "Set of 3 handmade ceramic planters with drainage holes.", price: 1599, category: "Home Décor", occasion: "Anniversary", imageUrl: "/products/ceramic-planters.jpg", images: ["/products/ceramic-planters.jpg"], impactType: "tree_planting", impactDescription: "Plants 1 tree per planter sold", impactAmount: 100, rating: 4.4, reviewCount: 98, inStock: true,
  },
  {
    id: 8, name: "Luxury Candle Gift Box", description: "Premium soy wax candles in an elegant gift box.", price: 1999, category: "Luxury", occasion: "Festival", imageUrl: "/products/candle-box.jpg", images: ["/products/candle-box.jpg"], impactType: "ngo_support", impactDescription: "Supports mental health awareness programs", impactAmount: 130, rating: 4.5, reviewCount: 145, inStock: true,
  },
  {
    id: 9, name: "Hand-Painted Tote Bag", description: "Unique hand-painted cotton tote bag by local artists.", price: 799, category: "Handmade", occasion: "Birthday", imageUrl: "/products/tote-bag.jpg", images: ["/products/tote-bag.jpg"], impactType: "education", impactDescription: "Funds art supplies for children", impactAmount: 60, rating: 4.2, reviewCount: 73, inStock: true,
  },
  {
    id: 10, name: "Wireless Earbuds Pro", description: "Noise-cancelling wireless earbuds with 30hr battery life.", price: 4999, category: "Electronics", occasion: "Graduation", imageUrl: "/products/earbuds.jpg", images: ["/products/earbuds.jpg"], impactType: "tree_planting", impactDescription: "Plants 5 trees per purchase", impactAmount: 300, rating: 4.7, reviewCount: 420, inStock: true,
  },
  {
    id: 11, name: "Handmade Jewelry Box", description: "Intricate carved wooden jewelry box with velvet lining.", price: 2799, category: "Handmade", occasion: "Anniversary", imageUrl: "/products/jewelry-box.jpg", images: ["/products/jewelry-box.jpg"], impactType: "ngo_support", impactDescription: "Supports craft preservation programs", impactAmount: 180, rating: 4.8, reviewCount: 56, inStock: true,
  },
  {
    id: 12, name: "Organic Skincare Set", description: "Natural skincare gift set with cleanser, toner, and moisturizer.", price: 1499, category: "Eco-Friendly", occasion: "Festival", imageUrl: "/products/skincare-set.jpg", images: ["/products/skincare-set.jpg"], impactType: "ngo_support", impactDescription: "Supports clean water initiatives", impactAmount: 90, rating: 4.4, reviewCount: 187, inStock: true,
  },
];

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    try {
      const response = await api.get("/products", { params: filters });
      return response.data;
    } catch {
      // Fallback to mock data
      let filtered = [...MOCK_PRODUCTS];
      if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
      if (filters.occasion) filtered = filtered.filter(p => p.occasion === filters.occasion);
      if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice!);
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      if (filters.sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
      if (filters.sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
      if (filters.sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
      if (filters.sort === "newest") filtered.reverse();

      const page = filters.page || 0;
      const size = filters.size || 8;
      const start = page * size;
      const content = filtered.slice(start, start + size);

      return {
        content,
        totalPages: Math.ceil(filtered.length / size),
        totalElements: filtered.length,
        number: page,
        size,
      };
    }
  },

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    }
  },
};