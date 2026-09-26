import { AdminShell } from "@/components/admin/admin-shell";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const brand = await resolveBrand(params);
  return <AdminShell brand={brand}>{children}</AdminShell>;
}
