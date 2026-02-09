// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  specs?: Record<string, string>;
}

// Category type
export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  ordersCount: number;
  wishlistCount: number;
  points: number;
}

// Auth state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Cart state
export interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode: string | null;
}

// Navigation types
export type RootStackParamList = {
  "(auth)": undefined;
  "(tabs)": undefined;
};

export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
};

export type TabParamList = {
  index: undefined;
  search: undefined;
  cart: undefined;
  profile: undefined;
};
