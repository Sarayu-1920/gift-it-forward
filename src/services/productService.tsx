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


export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    const response = await api.get("/products", { params: filters });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};