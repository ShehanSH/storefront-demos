import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function AboutPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap max-w-3xl py-12">
      <h1 className="font-display text-4xl">About {brand.name}</h1>
      <p className="mt-4 text-lg text-muted">{brand.description}</p>
      <p className="mt-4 text-muted">
        This is a demonstration website. Names, products, prices, and customers are sample data so you can walk a
        buyer through the customer site and the admin dashboard.
      </p>
    </section>
  );
}
