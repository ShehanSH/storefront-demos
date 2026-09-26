"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { DemoBanner } from "@/components/demo-banner";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/store/social-icons";
import { useCart } from "@/hooks/use-cart";
import { socials } from "@/lib/store-content";
import type { Brand } from "@/lib/types";

export function StoreShell({ brand, children }: { brand: Brand; children: React.ReactNode }) {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const base = `/${brand.id}`;
  const links = [
    { href: base, label: "Home" },
    { href: `${base}/shop`, label: brand.shopLabel },
    brand.kind === "booking" ? { href: `${base}/book`, label: "Book" } : { href: `${base}/cart`, label: "Cart" },
    { href: `${base}/about`, label: "About" },
    { href: `${base}/contact`, label: "Contact" },
  ];
  const linksOut = socials(brand);

  return (
    <div data-theme={brand.id} className="flex min-h-full flex-col">
      <DemoBanner />
      <header className="sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur">
        <div className="page-wrap flex items-center justify-between gap-4 py-3.5">
          <Link href={base} className="font-display text-lg tracking-tight sm:text-xl">
            {brand.name}
          </Link>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 ${active ? "bg-black/6 font-semibold" : "text-muted hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              );
            })}
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
            <Link href={brand.kind === "booking" ? `${base}/book` : `${base}/shop`} className="btn btn-primary hidden sm:inline-flex">
              {brand.cta}
            </Link>
            <button type="button" className="btn btn-outline px-3 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-line px-4 py-3 md:hidden">
            <div className="page-wrap flex flex-col gap-2 text-sm">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 bg-[#14110f] text-white">
        <div className="page-wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">{brand.name}</p>
            <p className="mt-3 text-sm text-white/65">{brand.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a href={linksOut.facebook} target="_blank" rel="noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2]" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={linksOut.instagram} target="_blank" rel="noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#E4405F]" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={linksOut.tiktok} target="_blank" rel="noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-black" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href={linksOut.whatsapp} target="_blank" rel="noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebe57]" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Visit</p>
            <p className="mt-3 text-sm text-white/75">{brand.address}</p>
            <p className="text-sm text-white/75">{brand.city}</p>
            <p className="mt-3 text-sm text-white/75">{brand.phone}</p>
            <p className="text-sm text-white/75">{brand.email}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Explore</p>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/75 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Demo</p>
            <Link href={`${base}/admin`} className="text-white/75 hover:text-white">
              Open admin
            </Link>
            <Link href="/" className="text-white/75 hover:text-white">
              All demos
            </Link>
            <Link href="/studio/sms" className="text-white/75 hover:text-white">
              SMS gateway
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="page-wrap flex flex-wrap justify-between gap-2 py-5 text-xs text-white/45">
            <p>Demo storefront · sample prices in LKR</p>
            <p>{brand.city} · Asia/Colombo</p>
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
      className={className ?? "object-cover transition duration-500 group-hover:scale-105"}
    />
  );
}
