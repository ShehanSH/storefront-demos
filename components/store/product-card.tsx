import Link from "next/link";

import { ProductImage } from "@/components/store/store-shell";
import { formatLkr } from "@/lib/format";
import type { Brand, Product } from "@/lib/types";

export function ProductCard({ brand, product }: { brand: Brand; product: Product }) {
  return (
    <Link href={`/${brand.id}/product/${product.slug}`} className="group card overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductImage src={product.image} alt={product.name} />
        {product.compareAt ? (
          <span className="absolute top-3 left-3 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-medium text-white">
            Sale
          </span>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{product.category}</p>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm">
          {product.compareAt ? (
            <span className="mr-2 text-muted line-through">{formatLkr(product.compareAt)}</span>
          ) : null}
          <span className="font-semibold">{formatLkr(product.price)}</span>
        </p>
      </div>
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-muted">{eyebrow}</p> : null}
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">{title}</h1>
      {text ? <p className="mt-3 text-lg text-muted">{text}</p> : null}
    </div>
  );
}
