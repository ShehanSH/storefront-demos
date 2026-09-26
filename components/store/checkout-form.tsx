"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/hooks/use-cart";
import { formatLkr } from "@/lib/format";
import type { Brand } from "@/lib/types";

export function CheckoutForm({ brand }: { brand: Brand }) {
  const router = useRouter();
  const { lines, total, clear } = useCart();
  const [pending, setPending] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p>Add items before checkout.</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 lg:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setPending(true);
        const form = new FormData(event.currentTarget);
        const ref = `${brand.shortName.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        sessionStorage.setItem(
          `demo-order:${brand.id}`,
          JSON.stringify({
            ref,
            name: String(form.get("name")),
            total,
            type: brand.kind === "food" ? String(form.get("type")) : "Delivery",
          }),
        );
        clear();
        router.push(`/${brand.id}/confirmation`);
      }}
    >
      <div className="card space-y-4 p-5">
        <h2 className="font-display text-2xl">Your details</h2>
        <input className="field" name="name" placeholder="Full name" required />
        <input className="field" name="phone" placeholder="07X XXX XXXX" required />
        {brand.kind === "food" ? (
          <select className="field" name="type" defaultValue="Pickup">
            <option>Pickup</option>
            <option>Delivery</option>
          </select>
        ) : (
          <textarea className="field min-h-28" name="address" placeholder="Delivery address" required />
        )}
        <textarea className="field min-h-24" name="notes" placeholder="Notes (optional)" />
        <button className="btn btn-primary w-full" disabled={pending}>
          {pending ? "Placing…" : `Place ${brand.kind === "food" ? "order" : "order"} · ${formatLkr(total)}`}
        </button>
      </div>
      <div className="card h-fit space-y-3 p-5">
        <h2 className="font-display text-2xl">Summary</h2>
        {lines.map((line) => (
          <div key={`${line.slug}-${line.option ?? ""}`} className="flex justify-between text-sm">
            <span>
              {line.quantity}× {line.name}
              {line.option ? ` (${line.option})` : ""}
            </span>
            <span>{formatLkr(line.price * line.quantity)}</span>
          </div>
        ))}
        <p className="border-t border-line pt-3 text-sm text-muted">Cash on {brand.kind === "food" ? "collect / delivery" : "delivery"}. This is a demo — nothing is charged.</p>
      </div>
    </form>
  );
}
