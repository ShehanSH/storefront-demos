import { CheckoutForm } from "@/components/store/checkout-form";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CheckoutPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap py-12">
      <h1 className="font-display text-4xl">Checkout</h1>
      <p className="mt-2 text-muted">Guest checkout · cash only · demo data</p>
      <div className="mt-8">
        <CheckoutForm brand={brand} />
      </div>
    </section>
  );
}
