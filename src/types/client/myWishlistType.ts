// types/wishlist.ts

export type Brand = {
  id: number;
  title: string;
  icon: string;
  userId: number;
};

export type Product = {
  slug: string;
  title: string;
  thumbnail: string;
  brand: Brand;
  price: number;
  discount: number;
  discount_type: "flat" | "percentage";
};

export type WishlistItem = {
  id: number;
  userId: number;
  productId: number;
  date: string;
  product: Product;
};

export type WishlistResponse = {
  message: string;
  totalPage: number;
  data: WishlistItem[];
};
