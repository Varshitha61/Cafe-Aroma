export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CafeLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
  isOpen: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  redirectTo?: string;
  productPreview?: {
    name: string;
    price: number;
    image: string;
    lore?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface User {
  email: string;
  name: string;
  isAuthenticated: boolean;
}