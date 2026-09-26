"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/use-cart";
import type { Brand, Product } from "@/lib/types";

export function AddToCart({ brand, product }: { brand: Brand; product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const [option, setOption] = useState(product.options?.[0] ?? "");

  function addAndStay() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      option: option || undefined,
    });
  }

  return (
    <div className="space-y-4">
      {product.options?.length ? (
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Option</span>
          <select className="field" value={option} onChange={(event) => setOption(event.target.value)}>
            {product.options.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {brand.kind === "booking" ? (
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/${brand.id}/book?service=${product.slug}`)}>
            Book this
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={addAndStay}>
              Add to cart
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                addAndStay();
                router.push(`/${brand.id}/cart`);
              }}
            >
              Go to cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
