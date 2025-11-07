// Represents product information inside order items
export interface ProductInfo {
  title: string;
  thumbnail: string;
  id: number;
  slug: string;
}

// Each order item includes a product
export interface OrderItem {
  product: ProductInfo;
}

// Represents a single order's online payment info
export interface OnlinePayment {
  id?: number;
  tran_id?: string;
  amount?: number;
  status?: string;
  method?: string;
  [key: string]: any; // Flexible for other optional fields
}

// Main order data structure
export interface Order {
  id: number;
  orderId: string;
  name: string;
  status: string;
  paid: boolean;
  email: string;
  phone: string;
  total: number;
  paymentType: 'cod' | 'online' | 'pos';
  order_type: 'in-house' | 'vendor' | 'aliexpress';
  order_items: OrderItem[];
  online_payments: OnlinePayment[];
  date: string;
}

// The overall API response structure
export interface PaymentListResponse {
  totalPage: number;
  total: number;
  page: number;
  data: Order[];
}
