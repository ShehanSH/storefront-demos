import { PageIntro, ProductCard } from "@/components/store/product-card";
import { brandParams, resolveBrand } from "@/lib/params";
import { catalog } from "@/lib/store-content";

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
  const items = catalog(brand);
  const visible = category ? items.filter((product) => product.category === category) : items;

  return (
    <section className="page-wrap py-12">
      <PageIntro
        eyebrow={brand.city}
        title={brand.shopLabel}
        text={`${visible.length} ${brand.productLabel.toLowerCase()} · cash on ${brand.kind === "food" ? "collect or delivery" : brand.kind === "booking" ? "the day" : "delivery"}`}
      />
      <div className="mt-8 flex flex-wrap gap-2">
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
        {visible.map((product) => (
          <ProductCard key={product.slug} brand={brand} product={product} />
        ))}
      </div>
    </section>
  );
}
