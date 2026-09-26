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
        <h1 className="font-display text-4xl">Book a chair</h1>
        <p className="mt-3 text-muted">This salon demo uses appointments instead of a cart.</p>
      </section>
    );
  }
  return (
    <section className="page-wrap py-12">
      <h1 className="font-display text-4xl">Cart</h1>
      <div className="mt-8">
        <CartView brand={brand} />
      </div>
    </section>
  );
}
