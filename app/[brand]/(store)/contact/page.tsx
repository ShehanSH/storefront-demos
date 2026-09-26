import { SALES_PHONE } from "@/lib/brands";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function ContactPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <section className="page-wrap grid gap-8 py-12 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl">Contact</h1>
        <p className="mt-4 text-muted">{brand.address}</p>
        <p className="text-muted">{brand.city}</p>
        <p className="mt-4">{brand.phone}</p>
        <p>{brand.email}</p>
        <p className="mt-6 text-sm text-muted">
          Want this built for your business? Call {SALES_PHONE}.
        </p>
      </div>
      <form className="card space-y-3 p-5">
        <input className="field" placeholder="Name" />
        <input className="field" placeholder="Phone" />
        <textarea className="field min-h-32" placeholder="Message" />
        <button type="button" className="btn btn-primary">
          Send (demo)
        </button>
      </form>
    </section>
  );
}
