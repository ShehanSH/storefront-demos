import { demoCustomers } from "@/lib/admin-data";
import { formatLkr } from "@/lib/format";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function CustomersPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Customers</h1>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">{brand.orderLabel}</th>
              <th className="px-4 py-3 font-medium">Spent</th>
            </tr>
          </thead>
          <tbody>
            {demoCustomers(brand).map((customer) => (
              <tr key={customer.phone} className="border-t border-line">
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3">{formatLkr(customer.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
