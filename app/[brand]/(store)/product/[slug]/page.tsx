import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/store/add-to-cart";
import { BRAND_LIST, findProduct } from "@/lib/brands";
import { formatLkr } from "@/lib/format";
import { resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return BRAND_LIST.flatMap((brand) =>
    brand.products.map((product) => ({ brand: brand.id, slug: product.slug })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}) {
  const { slug } = await params;
  const brand = await resolveBrand(params);
  const product = findProduct(brand, slug);
  if (!product) notFound();

  return (
    <section className="page-wrap grid gap-8 py-12 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-muted">{product.category}</p>
        <h1 className="font-display text-4xl">{product.name}</h1>
        <p className="text-2xl">
          {product.compareAt ? <span className="mr-2 text-muted line-through">{formatLkr(product.compareAt)}</span> : null}
          {formatLkr(product.price)}
        </p>
        <p className="max-w-xl text-muted">{product.description}</p>
        <AddToCart brand={brand} product={product} />
      </div>
    </section>
  );
}
