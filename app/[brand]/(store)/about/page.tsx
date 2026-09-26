import Image from "next/image";

import { PageIntro } from "@/components/store/product-card";
import { brandParams, resolveBrand } from "@/lib/params";
import { aboutStory, highlights, hours } from "@/lib/store-content";

export function generateStaticParams() {
  return brandParams();
}

export default async function AboutPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap py-12">
      <PageIntro eyebrow="About" title={brand.name} text={aboutStory(brand)} />
      <div className="relative mt-10 h-72 overflow-hidden rounded-[1.4rem] sm:h-96">
        <Image src={brand.heroImage} alt={brand.name} fill className="object-cover" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {highlights(brand).map((item) => (
          <article key={item.title} className="card p-5">
            <h2 className="font-display text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.text}</p>
          </article>
        ))}
      </div>
      <div className="card mt-8 p-6">
        <h2 className="font-display text-2xl">Hours in {brand.city}</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {hours().map(([day, time]) => (
            <li key={day} className="flex justify-between border-b border-line py-2 last:border-0">
              <span className="text-muted">{day}</span>
              <span>{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
