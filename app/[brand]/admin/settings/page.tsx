import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function SettingsPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const rows = [
    ["Business name", brand.name],
    ["City", brand.city],
    ["Address", brand.address],
    ["Phone", brand.phone],
    ["Email", brand.email],
    ["Currency", "LKR"],
    ["Accepting orders", "Yes"],
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Settings</h1>
      <div className="card divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
            <span className="text-muted">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">Read-only in this demo. Production settings are editable by the shop owner.</p>
    </div>
  );
}
