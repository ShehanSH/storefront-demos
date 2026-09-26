import { StoreShell } from "@/components/store/store-shell";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const brand = await resolveBrand(params);
  return <StoreShell brand={brand}>{children}</StoreShell>;
}
