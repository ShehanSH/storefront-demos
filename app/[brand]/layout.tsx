import { CartProvider } from "@/hooks/use-cart";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const brand = await resolveBrand(params);
  return <CartProvider brandId={brand.id}>{children}</CartProvider>;
}
