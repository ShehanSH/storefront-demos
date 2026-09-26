import { demoCustomers } from "@/lib/admin-data";
import { getBrand } from "@/lib/brands";
import { normalizePhone } from "@/lib/format";
import type { Brand } from "@/lib/types";

export const CAMPAIGN_MESSAGE_MAX = 320;
export const CAMPAIGN_MAX_IMPORT = 100;

export type CampaignTemplateId = "weekend" | "offer" | "custom";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  orders: number;
};

export type ClassifiedPhone = {
  raw: string;
  name: string;
  normalized?: string;
  status: "new" | "duplicate" | "invalid";
};

function looksLikePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 12;
}

export function campaignTemplate(id: CampaignTemplateId, brand: Brand, siteUrl: string): string {
  const link = `${siteUrl.replace(/\/$/, "")}/${brand.id}`;
  switch (id) {
    case "weekend":
      if (brand.id === "restaurant") {
        return `Hi! ${brand.name} weekend specials are ON! Enjoy pizza, kottu, rice and more. Order pickup or delivery: ${link}`;
      }
      if (brand.id === "clothing") {
        return `Hi! ${brand.name} weekend drop is live. Fresh shirts, denim and extras — shop now: ${link}`;
      }
      if (brand.id === "tech") {
        return `Hi! ${brand.name} weekend deals on phones and laptops. See this week's prices: ${link}`;
      }
      return `Hi! ${brand.name} weekend bookings are open. Book your chair before slots fill: ${link}`;
    case "offer":
      return `${brand.smsOffer} ${link}`;
    case "custom":
      return "";
  }
}

export function smsSegmentCount(message: string): number {
  if (message.length === 0) return 0;
  return Math.ceil(message.length / 160);
}

export function parseImportLines(raw: string): { phone: string; name: string }[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const rows: { phone: string; name: string }[] = [];
  for (const line of lines) {
    const parts = line.split(/[,;\t]/).map((part) => part.trim().replace(/^["']|["']$/g, ""));
    if (parts.length === 0) continue;
    const [first = "", second = ""] = parts;
    if (/^(phone|mobile|number|name)$/i.test(first) && (!second || /^(phone|mobile|number|name)$/i.test(second))) {
      continue;
    }
    if (looksLikePhone(first)) {
      rows.push({ phone: first, name: second && !looksLikePhone(second) ? second : "Customer" });
    } else if (looksLikePhone(second)) {
      rows.push({ phone: second, name: first || "Customer" });
    } else {
      rows.push({ phone: first, name: second || "Customer" });
    }
  }
  return rows;
}

export function classifyImportedPhones(
  rows: { phone: string; name: string }[],
  existingNormalized: Iterable<string>,
): ClassifiedPhone[] {
  const existing = new Set(existingNormalized);
  const seen = new Set<string>();

  return rows.map((row) => {
    if (!looksLikePhone(row.phone)) {
      return { raw: row.phone, name: row.name.trim() || "Customer", status: "invalid" };
    }
    const normalized = normalizePhone(row.phone);
    if (existing.has(normalized) || seen.has(normalized)) {
      return { raw: row.phone, name: row.name.trim() || "Customer", normalized, status: "duplicate" };
    }
    seen.add(normalized);
    return { raw: row.phone, name: row.name.trim() || "Customer", normalized, status: "new" };
  });
}

export function brandContacts(brandId: string): Contact[] {
  return demoCustomers(getBrand(brandId)).map((customer) => ({
    id: customer.phone,
    name: customer.name,
    phone: customer.phone,
    orders: customer.orders,
  }));
}
