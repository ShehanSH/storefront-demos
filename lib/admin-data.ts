import type { Brand, BrandKind, DemoCustomer, DemoOrder } from "@/lib/types";

export type StaffRow = { name: string; role: string; phone: string; active: boolean };

export type SmsLogRow = {
  phone: string;
  event: string;
  message: string;
  status: "Sent" | "Failed";
  at: string;
};

export function boardColumns(kind: BrandKind): string[] {
  if (kind === "booking") return ["New", "Confirmed", "In chair", "Completed", "Cancelled"];
  if (kind === "retail") return ["New", "Packed", "Ready", "Out for delivery", "Completed", "Cancelled"];
  return ["New", "Preparing", "Ready", "Out for delivery", "Completed", "Cancelled"];
}

function mapStatus(kind: BrandKind, status: string): string {
  if (kind === "food") return status;
  if (kind === "booking") {
    if (status === "Preparing" || status === "Packed") return "Confirmed";
    if (status === "Ready" || status === "Out for delivery") return "In chair";
    return status;
  }
  if (status === "Preparing") return "Packed";
  return status;
}

const EXTRA_CUSTOMERS: DemoCustomer[] = [
  { name: "Malith Jayawardena", phone: "0771234004", orders: 3, spent: 4200 },
  { name: "Nadeesha Gunasekara", phone: "0771234005", orders: 6, spent: 9800 },
  { name: "Tharindu Bandara", phone: "0771234007", orders: 2, spent: 3100 },
  { name: "Shanika Rajapaksha", phone: "0771234008", orders: 4, spent: 7600 },
];

export function demoCustomers(brand: Brand): DemoCustomer[] {
  const seen = new Set(brand.customers.map((row) => row.phone));
  return [...brand.customers, ...EXTRA_CUSTOMERS.filter((row) => !seen.has(row.phone))];
}

export function demoOrders(brand: Brand): DemoOrder[] {
  const extras: DemoOrder[] = [
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1050`, customer: "Tharindu Bandara", phone: "0771234007", total: 2100, status: mapStatus(brand.kind, "New"), type: brand.kind === "booking" ? "Fri 5:30 PM" : "Pickup", createdAt: "Today 13:10", items: brand.products[0]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1049`, customer: "Shanika Rajapaksha", phone: "0771234008", total: 1850, status: mapStatus(brand.kind, "Preparing"), type: brand.kind === "booking" ? "Today 2:30 PM" : "Delivery", createdAt: "Today 12:40", items: brand.products[1]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1048`, customer: "Kasun Perera", phone: "0771234010", total: 3200, status: mapStatus(brand.kind, "Ready"), type: brand.kind === "booking" ? "Today 4:00 PM" : "Pickup", createdAt: "Today 12:05", items: brand.products[2]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1047`, customer: "Amaya Silva", phone: "0771234011", total: 2750, status: mapStatus(brand.kind, "Out for delivery"), type: "Delivery", createdAt: "Today 11:15", items: brand.products[0]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1046`, customer: "Fathima Rizan", phone: "0771234012", total: 1450, status: "Completed", type: brand.kind === "booking" ? "Today 10:00 AM" : "Pickup", createdAt: "Today 10:20", items: brand.products[3]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1045`, customer: "Dilani Samarakoon", phone: "0771234013", total: 1600, status: "Cancelled", type: "Pickup", createdAt: "Today 09:50", items: brand.products[0]?.name ?? "Item" },
    { id: `${brand.shortName.slice(0, 3).toUpperCase()}-1044`, customer: "Nuwan Amarasinghe", phone: "0771234014", total: 2400, status: "Completed", type: "Delivery", createdAt: "Yesterday 18:40", items: brand.products[1]?.name ?? "Item" },
  ];
  const seen = new Set(brand.orders.map((row) => row.id));
  return [...brand.orders.map((order) => ({ ...order, status: mapStatus(brand.kind, order.status) })), ...extras.filter((row) => !seen.has(row.id))];
}

export function demoStaff(brand: Brand): StaffRow[] {
  const rider = brand.kind === "booking" ? "Stylist" : "Delivery";
  return [
    { name: "Demo Admin", role: "ADMIN", phone: "0766650952", active: true },
    { name: "Kasun Perera", role: brand.kind === "booking" ? "Reception" : "CASHIER", phone: "0772001100", active: true },
    { name: "Nimali Silva", role: rider, phone: "0772002200", active: true },
    { name: "Harsha Fernando", role: rider, phone: "0772003300", active: false },
  ];
}

export function demoSmsLogs(brand: Brand): SmsLogRow[] {
  return [
    { phone: "0771234001", event: "ORDER_PLACED", message: `${brand.name}: we received your order.`, status: "Sent", at: "Today 13:12" },
    { phone: "0771234002", event: "CAMPAIGN", message: brand.smsOffer, status: "Sent", at: "Today 12:40" },
    { phone: "0771234003", event: "READY", message: `${brand.name}: your order is ready.`, status: "Sent", at: "Today 11:50" },
    { phone: "0771234005", event: "CAMPAIGN", message: brand.smsOffer, status: "Failed", at: "Today 10:05" },
  ];
}

export function demoTrend() {
  return [
    { name: "Mon", value: 18400 },
    { name: "Tue", value: 15200 },
    { name: "Wed", value: 22100 },
    { name: "Thu", value: 19800 },
    { name: "Fri", value: 34600 },
    { name: "Sat", value: 28900 },
    { name: "Sun", value: 21400 },
  ];
}
