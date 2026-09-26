import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CatalogPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Manage names, prices, and availability.</p>
          <h1 className="font-display text-3xl">{brand.productLabel}</h1>
        </div>
        <button type="button" className="btn btn-primary">
          + Add item
        </button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Availability</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brand.products.map((product) => (
              <tr key={product.slug} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{formatLkr(product.price)}</td>
                <td className="px-4 py-3">Available</td>
                <td className="px-4 py-3">{product.featured ? "Featured" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline h-8 px-3 text-xs">Edit</button>
                    <button type="button" className="btn btn-outline h-8 px-3 text-xs">Set unavailable</button>
                    <button type="button" className="btn btn-outline h-8 px-3 text-xs text-red-700">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
