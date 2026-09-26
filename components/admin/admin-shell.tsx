"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Settings,
  ShoppingBag,
  Tag,
  UserRound,
  Users,
} from "lucide-react";

import { SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";
import type { Brand } from "@/lib/types";

function isActive(pathname: string, href: string, exact = false) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ brand, children }: { brand: Brand; children: React.ReactNode }) {
  const pathname = usePathname();
  const base = `/${brand.id}/admin`;
  const links = [
    { href: base, label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: `${base}/orders`, label: brand.orderLabel, icon: brand.kind === "booking" ? CalendarDays : ShoppingBag },
    { href: `${base}/sms`, label: "Offers SMS", icon: Megaphone },
    { href: `${base}/sms-log`, label: "SMS log", icon: MessageSquare },
    { href: `${base}/categories`, label: "Categories", icon: Tag },
    { href: `${base}/catalog`, label: brand.productLabel, icon: ShoppingBag },
    { href: `${base}/customers`, label: "Customers", icon: UserRound },
    { href: `${base}/reports`, label: "Reports", icon: BarChart3 },
    { href: `${base}/staff`, label: "Staff", icon: Users },
    { href: `${base}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <div data-theme={brand.id} className="flex h-svh overflow-hidden bg-background">
      <aside className="hidden h-svh w-60 shrink-0 flex-col bg-[#14110f] text-white md:flex">
        <div className="border-b border-white/10 px-4 py-4">
          <p className="font-display text-lg">{brand.name}</p>
          <p className="text-xs text-white/50">Admin demo · no login</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2.5 py-3">
          {links.map((link) => {
            const active = isActive(pathname, link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium ${
                  active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link href={`/${brand.id}`} className="border-t border-white/10 px-4 py-4 text-sm text-white/70">
          View storefront
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Demo Admin</p>
            <p className="text-xs text-muted">{brand.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={salesWhatsAppUrl("Hi, I want this admin for my shop.")} target="_blank" rel="noreferrer" className="btn btn-outline hidden h-9 px-3 text-xs sm:inline-flex">
              WhatsApp {SALES_PHONE}
            </a>
            <Link href="/" className="btn btn-outline h-9 px-3 text-xs">
              All demos
            </Link>
          </div>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3 text-sm md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full border border-line px-3 py-1">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] p-4 md:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
