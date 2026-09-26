import { boardColumns, demoOrders } from "@/lib/admin-data";
import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function OrdersPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const orders = demoOrders(brand);
  const columns = boardColumns(brand.kind);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          Filter by date or customer on a production board. Live status updates work without refresh.
        </p>
        <h1 className="font-display text-3xl">{brand.orderLabel}</h1>
        <p className="mt-1 text-sm text-muted">{orders.length} sample records across the queue.</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {columns.map((column) => {
          const rows = orders.filter((order) => order.status === column);
          return (
            <section key={column} className="w-72 shrink-0">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold">{column}</h2>
                <span className="text-xs text-muted">{rows.length}</span>
              </div>
              <div className="space-y-3">
                {rows.map((order) => (
                  <article key={order.id} className="card p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{order.id}</p>
                      <span className="text-xs text-muted">{order.status}</span>
                    </div>
                    <p className="mt-1 text-sm">{order.customer}</p>
                    <p className="text-xs text-muted">{order.type} · {order.createdAt}</p>
                    <p className="mt-2 text-sm">{order.items}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span>{formatLkr(order.total)}</span>
                      <span className="text-xs text-muted">{order.status === "Cancelled" ? "—" : "Unpaid"}</span>
                    </div>
                    {order.status !== "Completed" && order.status !== "Cancelled" ? (
                      <div className="mt-3 flex flex-col gap-2">
                        <button type="button" className="btn btn-primary h-9 text-xs">
                          Next status
                        </button>
                        <button type="button" className="btn btn-outline h-9 text-xs">
                          Details
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="btn btn-outline mt-3 h-9 w-full text-xs">
                        Details
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
