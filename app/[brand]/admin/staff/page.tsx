import { demoStaff } from "@/lib/admin-data";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function StaffPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Cashiers, riders, or stylists. Sample accounts only.</p>
          <h1 className="font-display text-3xl">Staff</h1>
        </div>
        <button type="button" className="btn btn-primary">
          + Add staff
        </button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoStaff(brand).map((row) => (
              <tr key={row.phone} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.role}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">{row.active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
