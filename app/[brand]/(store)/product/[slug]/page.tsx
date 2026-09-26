import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/store/add-to-cart";
import { ProductCard } from "@/components/store/product-card";
import { BRAND_LIST } from "@/lib/brands";
import { formatLkr } from "@/lib/format";
import { resolveBrand } from "@/lib/params";
import { catalog, findCatalogProduct } from "@/lib/store-content";

export function generateStaticParams() {
  return BRAND_LIST.flatMap((brand) =>
    catalog(brand).map((product) => ({ brand: brand.id, slug: product.slug })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}) {
  const { slug } = await params;
  const brand = await resolveBrand(params);
  const product = findCatalogProduct(brand, slug);
  if (!product) notFound();
  const related = catalog(brand)
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);

  return (
    <section className="page-wrap py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-4 self-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">{product.category}</p>
          <h1 className="font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="text-3xl">
            {product.compareAt ? <span className="mr-2 text-lg text-muted line-through">{formatLkr(product.compareAt)}</span> : null}
            {formatLkr(product.price)}
          </p>
          <p className="max-w-xl text-muted">{product.description}</p>
          <AddToCart brand={brand} product={product} />
        </div>
      </div>
      {related.length > 0 ? (
        <div className="mt-16">
          <h2 className="font-display text-3xl">More in {product.category}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} brand={brand} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
