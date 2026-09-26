import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/store/product-card";
import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return { title: brand.name, description: brand.description };
}

export default async function BrandHomePage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const featured = brand.products.filter((product) => product.featured);

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden text-white">
        <Image src={brand.heroImage} alt={brand.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10" />
        <div className="page-wrap relative flex min-h-[70vh] flex-col justify-center py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">{brand.city}</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl sm:text-6xl">{brand.name}</h1>
          <p className="mt-4 max-w-lg text-lg text-white/80">{brand.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${brand.id}/shop`} className="btn btn-primary">
              {brand.cta}
            </Link>
            <Link href={`/${brand.id}/admin`} className="btn bg-white/15 text-white">
              View admin
            </Link>
          </div>
        </div>
      </section>

      <section className="page-wrap py-16">
        <div className="card mb-10 grid gap-6 p-6 sm:grid-cols-[1.2fr_0.8fr] sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">This week</p>
            <h2 className="mt-2 font-display text-3xl">{brand.special.title}</h2>
            <p className="mt-2 text-muted">{brand.special.blurb}</p>
          </div>
          <div className="flex items-end justify-between gap-4 sm:justify-end sm:text-right">
            <p className="font-display text-4xl">{formatLkr(brand.special.price)}</p>
            <Link href={`/${brand.id}/shop`} className="btn btn-primary">
              {brand.kind === "booking" ? "Book" : "Order"}
            </Link>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl">Popular {brand.productLabel.toLowerCase()}</h2>
          <Link href={`/${brand.id}/shop`} className="text-sm underline-offset-2 hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(featured.length ? featured : brand.products.slice(0, 3)).map((product) => (
            <ProductCard key={product.slug} brand={brand} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
