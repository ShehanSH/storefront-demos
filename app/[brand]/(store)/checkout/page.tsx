import { PageIntro } from "@/components/store/product-card";
import { CheckoutForm } from "@/components/store/checkout-form";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CheckoutPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap py-12">
      <PageIntro eyebrow="Guest checkout" title="Checkout" text="Cash only. This is a demo — nothing is charged." />
      <div className="mt-8">
        <CheckoutForm brand={brand} />
      </div>
    </section>
  );
}
