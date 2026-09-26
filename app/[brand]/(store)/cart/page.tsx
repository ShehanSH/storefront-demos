import { PageIntro } from "@/components/store/product-card";
import { CartView } from "@/components/store/cart-view";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CartPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  if (brand.kind === "booking") {
    return (
      <section className="page-wrap py-12">
        <PageIntro title="Book a chair" text="This salon uses appointments instead of a cart." />
      </section>
    );
  }
  return (
    <section className="page-wrap py-12">
      <PageIntro eyebrow="Checkout when ready" title="Your cart" text="Demo cart — cash on collect or delivery. Nothing is charged." />
      <div className="mt-8">
        <CartView brand={brand} />
      </div>
    </section>
  );
}
