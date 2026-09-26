import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";

import { ProductCard } from "@/components/store/product-card";
import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";
import { catalog, highlights, hours, reviews } from "@/lib/store-content";

export function generateStaticParams() {
  return brandParams();
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return { title: brand.name, description: brand.description };
}

export default async function BrandHomePage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const items = catalog(brand);
  const featured = items.filter((product) => product.featured);
  const popular = featured.length >= 3 ? featured : items.slice(0, 6);

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden text-white">
        <Image src={brand.heroImage} alt={brand.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/15" />
        <div className="page-wrap relative flex min-h-[78vh] flex-col justify-center py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">{brand.city} · {brand.kind === "food" ? "Pickup & delivery" : brand.kind === "booking" ? "Online booking" : "Island-wide delivery"}</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] sm:text-7xl">{brand.name}</h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">{brand.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${brand.id}/shop`} className="btn btn-primary">
              {brand.cta}
            </Link>
            <Link href={`/${brand.id}/contact`} className="btn bg-white/12 text-white">
              Find us
            </Link>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-4 py-10 sm:grid-cols-3">
        {highlights(brand).map((item) => (
          <article key={item.title} className="card p-5">
            <Sparkles size={18} />
            <h2 className="mt-3 font-display text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="page-wrap pb-16">
        <div className="card mb-10 overflow-hidden sm:grid sm:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">This week</p>
            <h2 className="mt-2 font-display text-4xl">{brand.special.title}</h2>
            <p className="mt-3 text-muted">{brand.special.blurb}</p>
            <Link href={`/${brand.id}/shop`} className="btn btn-primary mt-6">
              {brand.kind === "booking" ? "Book now" : "Order now"}
            </Link>
          </div>
          <div className="flex items-center justify-between bg-black/4 p-6 sm:justify-end sm:p-8">
            <p className="font-display text-5xl">{formatLkr(brand.special.price)}</p>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{brand.shopLabel}</p>
            <h2 className="mt-1 font-display text-3xl">Popular {brand.productLabel.toLowerCase()}</h2>
          </div>
          <Link href={`/${brand.id}/shop`} className="text-sm underline-offset-4 hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} brand={brand} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-black/[.03] py-16">
        <div className="page-wrap grid gap-4 md:grid-cols-3">
          {reviews(brand).map((review) => (
            <blockquote key={review.name} className="card p-5">
              <p className="text-sm leading-6">“{review.text}”</p>
              <footer className="mt-4 text-xs uppercase tracking-wide text-muted">{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="page-wrap grid gap-6 py-16 md:grid-cols-2">
        <div className="card p-6">
          <MapPin size={18} />
          <h2 className="mt-3 font-display text-2xl">Visit {brand.shortName}</h2>
          <p className="mt-2 text-muted">{brand.address}</p>
          <p className="text-muted">{brand.city}</p>
          <p className="mt-3">{brand.phone}</p>
        </div>
        <div className="card p-6">
          <Clock size={18} />
          <h2 className="mt-3 font-display text-2xl">Hours</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {hours().map(([day, time]) => (
              <li key={day} className="flex justify-between gap-4 border-b border-line py-2 last:border-0">
                <span className="text-muted">{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
