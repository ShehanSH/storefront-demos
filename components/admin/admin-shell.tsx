import Link from "next/link";
import { BarChart3, CalendarDays, LayoutDashboard, MessageSquare, Settings, ShoppingBag, Users } from "lucide-react";

import { DemoBanner } from "@/components/demo-banner";
import type { Brand } from "@/lib/types";

export function AdminShell({ brand, children }: { brand: Brand; children: React.ReactNode }) {
  const base = `/${brand.id}/admin`;
  const links = [
    { href: base, label: "Dashboard", icon: LayoutDashboard },
    { href: `${base}/orders`, label: brand.orderLabel, icon: brand.kind === "booking" ? CalendarDays : ShoppingBag },
    { href: `${base}/catalog`, label: brand.productLabel, icon: BarChart3 },
    { href: `${base}/customers`, label: "Customers", icon: Users },
    { href: `${base}/sms`, label: "SMS", icon: MessageSquare },
    { href: `${base}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <div data-theme={brand.id} className="flex min-h-full flex-col bg-background">
      <DemoBanner />
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-60 shrink-0 flex-col bg-[#14110f] text-white md:flex">
          <div className="border-b border-white/10 px-4 py-4">
            <p className="font-display text-lg">{brand.name}</p>
            <p className="text-xs text-white/50">Admin demo · no login</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href={`/${brand.id}`} className="border-t border-white/10 px-4 py-4 text-sm text-white/70">
            View storefront
          </Link>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3 text-sm md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full border border-line px-3 py-1">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="page-wrap py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
