import { ProductCard } from "@/components/store/product-card";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return { title: brand.shopLabel };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const brand = await resolveBrand(params);
  const { category } = await searchParams;
  const items = category ? brand.products.filter((product) => product.category === category) : brand.products;

  return (
    <section className="page-wrap py-12">
      <h1 className="font-display text-4xl">{brand.shopLabel}</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href={`/${brand.id}/shop`} className={`btn ${!category ? "btn-primary" : "btn-outline"}`}>
          All
        </a>
        {brand.categories.map((name) => (
          <a
            key={name}
            href={`/${brand.id}/shop?category=${encodeURIComponent(name)}`}
            className={`btn ${category === name ? "btn-primary" : "btn-outline"}`}
          >
            {name}
          </a>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.slug} brand={brand} product={product} />
        ))}
      </div>
    </section>
  );
}
