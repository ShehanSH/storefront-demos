"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { BrandId } from "@/lib/types";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  option?: string;
  quantity: number;
};

type CartContextValue = {
  brandId: BrandId;
  lines: CartLine[];
  count: number;
  total: number;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, option: string | undefined, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(brandId: BrandId) {
  return `storefront-demo-cart:${brandId}`;
}

function lineKey(slug: string, option?: string) {
  return `${slug}::${option ?? ""}`;
}

export function CartProvider({ brandId, children }: { brandId: BrandId; children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(brandId));
      setLines(raw ? (JSON.parse(raw) as CartLine[]) : []);
    } catch {
      setLines([]);
    }
  }, [brandId]);

  useEffect(() => {
    localStorage.setItem(storageKey(brandId), JSON.stringify(lines));
  }, [brandId, lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    return {
      brandId,
      lines,
      count,
      total,
      add(line, quantity = 1) {
        setLines((current) => {
          const key = lineKey(line.slug, line.option);
          const existing = current.find((item) => lineKey(item.slug, item.option) === key);
          if (!existing) return [...current, { ...line, quantity }];
          return current.map((item) =>
            lineKey(item.slug, item.option) === key ? { ...item, quantity: item.quantity + quantity } : item,
          );
        });
      },
      setQuantity(slug, option, quantity) {
        setLines((current) =>
          quantity <= 0
            ? current.filter((item) => lineKey(item.slug, item.option) !== lineKey(slug, option))
            : current.map((item) =>
                lineKey(item.slug, item.option) === lineKey(slug, option) ? { ...item, quantity } : item,
              ),
        );
      },
      clear() {
        setLines([]);
      },
    };
  }, [brandId, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
