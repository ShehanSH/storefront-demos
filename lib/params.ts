import { notFound } from "next/navigation";

import { BRAND_LIST, getBrand, isBrandId } from "@/lib/brands";
import type { Brand } from "@/lib/types";

export function brandParams() {
  return BRAND_LIST.map((brand) => ({ brand: brand.id }));
}

export async function resolveBrand(params: Promise<{ brand: string }>): Promise<Brand> {
  const { brand } = await params;
  if (!isBrandId(brand)) notFound();
  return getBrand(brand);
}
