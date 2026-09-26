import { ReportsView } from "@/components/admin/reports-view";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function ReportsPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return <ReportsView brand={brand} />;
}
