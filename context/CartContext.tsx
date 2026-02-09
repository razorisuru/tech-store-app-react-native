import { CartItem, Product } from "@/types";
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Promo codes with discount percentages
const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  RAZOR20: 20,
  TECH15: 15,
};

const SHIPPING_THRESHOLD = 9900; // Free shipping above Rs 9,900
const SHIPPING_COST = 500;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode(null);
  }, []);

  const applyPromoCode = useCallback((code: string): boolean => {
    const normalizedCode = code.toUpperCase().trim();
    if (PROMO_CODES[normalizedCode]) {
      setPromoCode(normalizedCode);
      return true;
    }
    return false;
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
  }, []);

  const { itemCount, subtotal, shipping, discount, total } = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    
    let discountPercent = 0;
    if (promoCode && PROMO_CODES[promoCode]) {
      discountPercent = PROMO_CODES[promoCode];
    }
    
    const discount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal + shipping - discount;

    return { itemCount, subtotal, shipping, discount, total };
  }, [items, promoCode]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        discount,
        total,
        promoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
