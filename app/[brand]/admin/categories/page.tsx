import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CategoriesPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const rows = brand.categories.map((name, index) => ({
    name,
    active: true,
    featured: index < 2,
    order: index,
    items: brand.products.filter((product) => product.category === name).length,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Organize items into sections customers browse.</p>
          <h1 className="font-display text-3xl">Categories</h1>
        </div>
        <button type="button" className="btn btn-primary">
          + Add category
        </button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.active ? "Active" : "Hidden"}</td>
                <td className="px-4 py-3">{row.featured ? "Featured" : "—"}</td>
                <td className="px-4 py-3">{row.order}</td>
                <td className="px-4 py-3">{row.items}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline h-8 px-3 text-xs">Edit</button>
                    <button type="button" className="btn btn-outline h-8 px-3 text-xs">Hide</button>
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
