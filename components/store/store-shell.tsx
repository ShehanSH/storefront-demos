"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { DemoBanner } from "@/components/demo-banner";
import { useCart } from "@/hooks/use-cart";
import type { Brand } from "@/lib/types";

export function StoreShell({ brand, children }: { brand: Brand; children: React.ReactNode }) {
  const pathname = usePathname();
  const { count } = useCart();
  const base = `/${brand.id}`;
  const links = [
    { href: base, label: "Home" },
    { href: `${base}/shop`, label: brand.shopLabel },
    brand.kind === "booking" ? { href: `${base}/book`, label: "Book" } : { href: `${base}/cart`, label: "Cart" },
    { href: `${base}/about`, label: "About" },
    { href: `${base}/contact`, label: "Contact" },
  ];

  return (
    <div data-theme={brand.id} className="flex min-h-full flex-col">
      <DemoBanner />
      <header className="sticky top-0 z-20 border-b border-line bg-card/90 backdrop-blur">
        <div className="page-wrap flex items-center justify-between gap-4 py-3">
          <Link href={base} className="font-display text-lg tracking-tight sm:text-xl">
            {brand.name}
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "font-semibold" : "text-muted hover:text-foreground"}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {brand.kind !== "booking" ? (
              <Link href={`${base}/cart`} className="btn btn-outline px-3">
                <ShoppingBag size={16} />
                <span>{count}</span>
              </Link>
            ) : null}
            <Link href={`${base}/admin`} className="btn btn-outline hidden sm:inline-flex">
              Admin
            </Link>
            <Link href={brand.kind === "booking" ? `${base}/book` : `${base}/shop`} className="btn btn-primary">
              {brand.cta}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-line">
        <div className="page-wrap grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl">{brand.name}</p>
            <p className="mt-2 text-sm text-muted">{brand.tagline}</p>
          </div>
          <div className="text-sm text-muted">
            <p>{brand.address}</p>
            <p>{brand.city}</p>
            <p className="mt-2">{brand.phone}</p>
            <p>{brand.email}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href={`${base}/shop`}>{brand.shopLabel}</Link>
            <Link href={`${base}/admin`}>Open admin demo</Link>
            <Link href="/studio/sms">SMS marketing demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ProductImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className={className ?? "object-cover"}
    />
  );
}
