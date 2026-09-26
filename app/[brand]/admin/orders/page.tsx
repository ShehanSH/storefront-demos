import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function OrdersPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">Live queue · sample data</p>
        <h1 className="font-display text-3xl">{brand.orderLabel}</h1>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {brand.orders.map((order) => (
          <article key={order.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted">{order.customer}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">{order.status}</span>
            </div>
            <p className="mt-3 text-sm">{order.items}</p>
            <div className="mt-4 flex justify-between text-sm text-muted">
              <span>{order.type}</span>
              <span>{formatLkr(order.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
