import { Suspense } from "react";

import { PageIntro } from "@/components/store/product-card";
import { BookingForm } from "@/components/store/booking-form";
import { brandParams, resolveBrand } from "@/lib/params";
import { catalog } from "@/lib/store-content";
import { formatLkr } from "@/lib/format";

export function generateStaticParams() {
  return brandParams();
}

export default async function BookPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const services = catalog(brand).slice(0, 4);
  return (
    <section className="page-wrap py-12">
      <PageIntro eyebrow="Appointments" title={`Book at ${brand.name}`} text={brand.tagline} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {services.map((service) => (
            <article key={service.slug} className="card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-muted">{service.category}</p>
              </div>
              <p className="font-semibold">{formatLkr(service.price)}</p>
            </article>
          ))}
        </div>
        <Suspense>
          <BookingForm brand={brand} />
        </Suspense>
      </div>
    </section>
  );
}
