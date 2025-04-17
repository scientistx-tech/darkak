export interface Product {
    id: string;
    name: string;
    images: string[];
    price: number;
    originalPrice: number;
    storage: string;
    discount: number; // percentage
    rating: number;
    reviews: number;
  }