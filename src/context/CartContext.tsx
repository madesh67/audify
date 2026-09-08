"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantKey: string, delta: number) => void;
  removeItem: (productId: string, variantKey: string) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "audify_cart_registry_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage on changes after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, isHydrated]);

  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity = 1
  ) => {
    soundEngine.playChime();
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.product.id === product.id && i.variant.colorKey === variant.colorKey
      );

      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const updateQuantity = (
    productId: string,
    variantKey: string,
    delta: number
  ) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.variant.colorKey === variantKey
          ) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (productId: string, variantKey: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.variant.colorKey === variantKey)
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = useMemo(() => {
    if (!isHydrated) return 0;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items, isHydrated]);

  const subtotal = useMemo(() => {
    if (!isHydrated) return 0;
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [items, isHydrated]);

  return (
    <CartContext.Provider
      value={{
        items: isHydrated ? items : [],
        totalCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
