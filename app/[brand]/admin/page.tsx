import { DashboardView } from "@/components/admin/dashboard-view";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function AdminHomePage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return <DashboardView brand={brand} />;
}
