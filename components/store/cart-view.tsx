"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/use-cart";
import { formatLkr } from "@/lib/format";
import type { Brand } from "@/lib/types";

export function CartView({ brand }: { brand: Brand }) {
  const { lines, total, setQuantity } = useCart();

  if (lines.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-medium">Your cart is empty.</p>
        <Link href={`/${brand.id}/shop`} className="btn btn-primary mt-4">
          Browse {brand.shopLabel.toLowerCase()}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-3">
        {lines.map((line) => (
          <div key={`${line.slug}-${line.option ?? ""}`} className="card flex gap-4 p-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl">
              <Image src={line.image} alt={line.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{line.name}</p>
              {line.option ? <p className="text-sm text-muted">{line.option}</p> : null}
              <p className="mt-1 text-sm">{formatLkr(line.price)}</p>
            </div>
            <select
              className="field w-20"
              value={line.quantity}
              onChange={(event) => setQuantity(line.slug, line.option, Number(event.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value === 0 ? "Remove" : value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <aside className="card h-fit space-y-4 p-5">
        <p className="text-sm text-muted">Demo checkout — no payment is taken.</p>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatLkr(total)}</span>
        </div>
        <Link href={`/${brand.id}/checkout`} className="btn btn-primary w-full">
          Checkout
        </Link>
      </aside>
    </div>
  );
}
