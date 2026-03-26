import api from "./api";

// Represents a single item inside an order
export interface OrderItem {
  id: number;
  gift: {
    name: string;
    impactType: string;
    impactDescription: string;
    price: number;
  };
  quantity: number;
}

// Represents one order returned by the backend
export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  occasion: string;
  senderName: string;
  receiverName: string;
  deliveryDate: string;
  items: OrderItem[];
//   cause: string;       // comes from impact record
//   impactAmount: number; // comes from impact record
}

export const orderService = {
  // Fetches all orders for the currently logged-in user
  async getUserOrders(): Promise<Order[]> {
    const response = await api.get("/orders/user");
    return response.data;
  },
};