import { Suspense } from "react";

import { BookingForm } from "@/components/store/booking-form";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function BookPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h1 className="font-display text-4xl">Book at {brand.name}</h1>
        <p className="mt-3 text-muted">{brand.tagline}</p>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li>Pick a service, day, and stylist.</li>
          <li>Production apps send SMS reminders before the appointment.</li>
        </ul>
      </div>
      <Suspense>
        <BookingForm brand={brand} />
      </Suspense>
    </section>
  );
}
