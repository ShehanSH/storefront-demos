import Link from "next/link";

import { ProductImage } from "@/components/store/store-shell";
import { formatLkr } from "@/lib/format";
import type { Brand, Product } from "@/lib/types";

export function ProductCard({ brand, product }: { brand: Brand; product: Product }) {
  return (
    <Link href={`/${brand.id}/product/${product.slug}`} className="card overflow-hidden">
      <div className="relative aspect-[4/3]">
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-wide text-muted">{product.category}</p>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm">
          {product.compareAt ? (
            <span className="mr-2 text-muted line-through">{formatLkr(product.compareAt)}</span>
          ) : null}
          {formatLkr(product.price)}
        </p>
      </div>
    </Link>
  );
}
