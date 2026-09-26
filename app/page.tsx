import Image from "next/image";
import Link from "next/link";

import { BRAND_LIST, SALES_PHONE } from "@/lib/brands";

export default function HubPage() {
  return (
    <div data-theme="studio" className="min-h-full">
      <header className="page-wrap flex items-center justify-between py-5">
        <p className="font-display text-xl">Storefront Demos</p>
        <div className="flex gap-3">
          <Link href="/studio/sms" className="btn btn-outline">
            SMS campaigns
          </Link>
          <a href={`tel:${SALES_PHONE}`} className="btn btn-primary">
            {SALES_PHONE}
          </a>
        </div>
      </header>

      <section className="page-wrap py-10 sm:py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">For any kind of local business</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Customer website + admin dashboard. Four live demos you can send to a client today.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Restaurant ordering, fashion retail, phone and laptop sales, or salon bookings. Each demo uses sample data — no
          database required. After the client calls, we build the production app.
        </p>
      </section>

      <section className="page-wrap grid gap-5 pb-16 md:grid-cols-2">
        {BRAND_LIST.map((brand) => (
          <article key={brand.id} className="card overflow-hidden">
            <div className="relative h-56">
              <Image src={brand.heroImage} alt={brand.name} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-xs uppercase tracking-wide text-muted">{brand.kind === "food" ? "Restaurant" : brand.kind === "booking" ? "Salon" : "Retail"}</p>
              <h2 className="font-display text-2xl">{brand.name}</h2>
              <p className="text-sm text-muted">{brand.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${brand.id}`} className="btn btn-primary">
                  Open website
                </Link>
                <Link href={`/${brand.id}/admin`} className="btn btn-outline">
                  Open admin
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
