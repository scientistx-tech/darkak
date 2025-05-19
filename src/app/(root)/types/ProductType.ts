export interface Product {
  id: string;
  title: string;
  slug: string;
  Image: string[];
  price: number;
  originalPrice: number;
  storage: string;
  discount: number; // percentage
  rating: number;
  reviews: [];
  thumbnail: string;
  discount_type: string;
}
