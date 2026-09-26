import Image from "next/image";
import Link from "next/link";
import { Globe, LayoutDashboard, MessageSquare, Smartphone } from "lucide-react";

import { BRAND_LIST, SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";

const WHATSAPP_PRICE = salesWhatsAppUrl(
  "Hi, I want a website and SMS notifications for my business. Please share pricing.",
);
const WHATSAPP_GENERAL = salesWhatsAppUrl(
  "Hi, I saw the Storefront Demos website and want to increase sales with a web app and SMS.",
);

const SERVICES = [
  {
    icon: Globe,
    title: "Customer website",
    text: "A shop, menu, or booking site your customers can open on their phone. Orders and appointments without calling the shop.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboard",
    text: "Staff see new orders, change status, manage products, and read reports. Same idea as the live demos below.",
  },
  {
    icon: MessageSquare,
    title: "SMS gateway",
    text: "We connect SMS so you can message customers: new offers, order updates, and reminders. That is how shops increase repeat sales.",
  },
  {
    icon: Smartphone,
    title: "Not only the website",
    text: "We build the full system: website, admin, and SMS notifications. Restaurant, clothing, tech shop, salon, or any local business.",
  },
];

export default function HubPage() {
  return (
    <div data-theme="studio" className="min-h-full">
      <header className="sticky top-0 z-20 border-b border-line bg-background/90 backdrop-blur">
        <div className="page-wrap flex items-center justify-between gap-4 py-4">
          <a href="#top" className="font-display text-xl">
            Storefront Demos
          </a>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            <a href="#demos" className="text-muted hover:text-foreground">
              Demos
            </a>
            <a href="#about" className="text-muted hover:text-foreground">
              About us
            </a>
            <a href="#services" className="text-muted hover:text-foreground">
              What we provide
            </a>
            <a href="#pricing" className="text-muted hover:text-foreground">
              Pricing
            </a>
            <a href="#contact" className="text-muted hover:text-foreground">
              Contact
            </a>
          </nav>
          <div className="flex gap-2">
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp
            </a>
            <a href={`tel:${SALES_PHONE}`} className="btn btn-primary">
              {SALES_PHONE}
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="page-wrap py-12 sm:py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Web apps + SMS for Sri Lankan businesses</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Your customers order online. You message them back. Sales go up.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          We do not only build a website. We give you a customer site, an admin dashboard, and an SMS gateway so you can
          send offers and order alerts to your customers.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#demos" className="btn btn-primary">
            See live demos
          </a>
          <a href={WHATSAPP_PRICE} target="_blank" rel="noreferrer" className="btn btn-outline">
            WhatsApp for pricing
          </a>
        </div>
      </section>

      <section id="about" className="page-wrap pb-16">
        <div className="card grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">About us</p>
            <h2 className="mt-2 font-display text-3xl">We build sales systems, not just pages</h2>
          </div>
          <p className="text-muted">
            Storefront Demos is how we show restaurant, clothing, tech, and salon owners what a finished product looks
            like. The sites below are samples. After you contact us we build the real app for your brand, connect your
            products or menu, and set up SMS so customers get messages from your shop — order confirmed, ready for
            pickup, out for delivery, or a Friday offer.
          </p>
        </div>
      </section>

      <section id="services" className="page-wrap pb-16">
        <h2 className="font-display text-3xl">What we provide</h2>
        <p className="mt-3 max-w-2xl text-muted">
          One project covers the public website and the staff tools. SMS is part of the build, not an extra afterthought.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.title} className="card p-5">
              <service.icon className="text-primary" size={22} />
              <h3 className="mt-3 font-display text-xl">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demos" className="page-wrap pb-16">
        <h2 className="font-display text-3xl">Live demos</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Open a customer site or the admin. These use sample data so you can click around before we build yours.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {BRAND_LIST.map((brand) => (
            <article key={brand.id} className="card overflow-hidden">
              <div className="relative h-56">
                <Image src={brand.heroImage} alt={brand.name} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {brand.kind === "food" ? "Restaurant" : brand.kind === "booking" ? "Salon" : "Retail"}
                </p>
                <h3 className="font-display text-2xl">{brand.name}</h3>
                <p className="text-sm text-muted">{brand.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/${brand.id}`} className="btn btn-primary">
                    Open website
                  </Link>
                  <Link href={`/${brand.id}/admin`} className="btn btn-outline">
                    Open admin
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="page-wrap pb-16">
        <div className="card bg-primary p-6 text-primary-fg sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-fg/70">Pricing</p>
          <h2 className="mt-2 font-display text-3xl">For pricing, please contact us</h2>
          <p className="mt-3 max-w-2xl text-primary-fg/85">
            Every shop is different — menu size, delivery, booking, and how many SMS you send. Message us on WhatsApp
            and we will quote the website, admin, and SMS gateway together.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={WHATSAPP_PRICE} target="_blank" rel="noreferrer" className="btn bg-white text-primary">
              WhatsApp {SALES_PHONE}
            </a>
            <a href={`tel:${SALES_PHONE}`} className="btn bg-white/10 text-white">
              Call {SALES_PHONE}
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="page-wrap pb-20">
        <h2 className="font-display text-3xl">Contact us</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Ready for a production app? We implement the website and the SMS gateway so you can notify customers and grow
          sales.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">Phone</p>
            <a href={`tel:${SALES_PHONE}`} className="mt-2 block font-display text-2xl">
              {SALES_PHONE}
            </a>
          </div>
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">WhatsApp</p>
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noreferrer" className="mt-2 block font-display text-2xl">
              Chat now
            </a>
            <p className="mt-2 text-sm text-muted">Opens WhatsApp to {SALES_PHONE}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">SMS demo</p>
            <Link href="/studio/sms" className="mt-2 block font-display text-2xl">
              Campaign tool
            </Link>
            <p className="mt-2 text-sm text-muted">See the offer + follow-up messages.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-3 py-8 text-sm text-muted">
          <p>Storefront Demos · websites and SMS for local businesses</p>
          <a href={WHATSAPP_GENERAL} target="_blank" rel="noreferrer" className="font-medium text-foreground">
            WhatsApp {SALES_PHONE}
          </a>
        </div>
      </footer>
    </div>
  );
}
