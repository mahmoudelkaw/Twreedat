// User types
export interface User {
  id: number;
  email: string;
  user_type: 'admin' | 'operations' | 'company' | 'individual';
  status: 'pending' | 'active' | 'suspended';
  full_name: string;
  phone: string;
  company_name?: string;
  commercial_registration?: string;
  tax_id?: string;
  address?: string;
  created_at: string;
}

// Product types
export interface Product {
  id: number;
  sku: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  specifications_ar: string;
  specifications_en: string;
  category_id: number;
  category_name_ar?: string;
  category_name_en?: string;
  base_price: number;
  min_order_quantity: number;
  stock_quantity: number;
  unit: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  images: string[];
  created_at: string;
}

// Price tier types
export interface PriceTier {
  id: number;
  product_id: number;
  min_quantity: number;
  max_quantity: number | null;
  price: number;
  discount_percentage: number;
}

// Category types
export interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  status: 'active' | 'inactive';
  display_order: number;
}

// Cart types
export interface CartItem {
  id: number;
  product_id: number;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  subtotal: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  item_count: number;
}

// Order types
export interface OrderItem {
  id: number;
  product_id: number;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  user_email?: string;
  user_name?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled';
  total_amount: number;
  items_count: number;
  delivery_address: string;
  delivery_phone: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

// Admin analytics types
export interface Analytics {
  total_orders: number;
  total_revenue: number;
  total_users: number;
  pending_orders: number;
  top_products?: TopProduct[];
}

export interface TopProduct {
  product_id: number;
  product_name_ar: string;
  product_name_en: string;
  total_quantity: number;
  total_revenue: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Language types
export type Language = 'ar' | 'en';

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  user_type: 'company' | 'individual';
  company_name?: string;
  commercial_registration?: string;
  tax_id?: string;
  address?: string;
}
