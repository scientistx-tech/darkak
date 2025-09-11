// -----------------------------
// User
// -----------------------------
interface Cat {
  title: string;
  id: number;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
  isAdmin: boolean;
  image: string;
  socketId: string | null;
  pushToken: string | null;
  marital_status: string | null;
  anniversary_date: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  isActive: boolean;
}

// -----------------------------
// Delivery Info
// -----------------------------
export interface IDeliveryInfo {
  id: number;
  delivery_time: string;
  delivery_charge: number;
  return_days: number;
  delivery_time_outside: string;
  delivery_charge_outside: number;
  multiply: boolean;
  productId: number;
}

// -----------------------------
// Product
// -----------------------------
export interface IProduct {
  id: number;
  title: string;
  slug: string;
  code: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  meta_alt: string | null;
  video_link: string;
  thumbnail: string;
  thumbnail_alt: string | null;
  price: number;
  discount_type: string | null;
  discount: number;
  discount_type_mobile: string | null;
  discount_mobile: number;
  tax_amount: number;
  status: string;
  tax_type: string;
  aliexpress_id: number | null;
  aliexpress_benifit: string | null;
  available: string;
  warranty: string | null;
  warranty_time: string | null;
  region: string;
  stock: number;
  minOrder: number;
  unit: string;
  specification: string;
  description: string;
  warranty_details: string;
  drafted: boolean;
  scheduled_time: string | null;
  meta_description: string;
  deal: boolean;
  feature: boolean;
  categoryId: number;
  subCategoryId: number;
  subSubCategoryId: number;
  brandId: number;
  userId: number;
  date: string;
  ae_sku_property_dtos: any;
  faq: any;
  content: any;
  delivery_info: IDeliveryInfo;
  user: IUser;
  items: VariantItem[];
  brand: Cat;
  category: Cat;
}

// -----------------------------
// Label Variants
// -----------------------------
export interface ILabelItem {
  id: number;
  title: string;
}

export interface ILabelOption {
  id: number;
  image: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  alt: string | null;
  key: string | null;
  itemId: number;
  productId: number;
}

export interface ILabelVariant {
  id: number;
  product_label_id: number;
  optionId: number;
  itemId: number;
  item: ILabelItem;
  option: ILabelOption;
}

// -----------------------------
// Root Wishlist Item
// -----------------------------
export interface IWishlistItem {
  id: number;
  productId: number;
  code: string;
  product: IProduct;
  label_variants: ILabelVariant[];
}

// -----------------------------
// Label Variant (Request)
// -----------------------------
export interface ILabelVariantRequest {
  optionId: number;
  itemId: number;
}

// -----------------------------
// Wishlist/Cart Request Payload
// -----------------------------
export interface IWishlistRequest {
  productId: number;
  code: string;
  label_variants: ILabelVariantRequest[];
}
export interface VariantOption {
  id: number;
  image: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  alt: string | null;
  key: string | null;
  itemId: number;
  productId: number;
}

export interface VariantItem {
  id: number;
  title: string; // Example: "Color", "Size", "RAM"
  options: VariantOption[];
}

// Option Schema
export interface OptionInput {
  optionId: number;
  itemId: number;
}

// Product Schema
export interface ProductInput {
  productId: number;
  options?: OptionInput[]; // optional, defaults to []
  quantity: number;
  ae_sku_attr?: string; // optional
}

// POS Order Schema
export interface PosOrderInput {
  userId?: number; // optional
  name: string;
  email?: string; // defaults to ""
  phone: string; // must follow /^01[3-9]\d{8}$/
  division: string;
  district: string;
  sub_district: string;
  area: string;
  paymentType: 'cod' | 'online' | 'offline';
  productIds: ProductInput[];
  couponId?: number;
  sellerId?: number;
  order_type: 'in-house' | 'vendor' | 'pos';
  paid?: boolean; // defaults to false
  store_discount?: number; // defaults to 0
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
  email?: string;
}

export interface ICustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string; // ISO date string
}
