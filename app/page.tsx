import Image from "next/image";
import Link from "next/link";
import { Globe, LayoutDashboard, MessageSquare, Smartphone } from "lucide-react";

import { BRAND_LIST, SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";

const WHATSAPP_PRICE = salesWhatsAppUrl(
  "Hi, I want a website and SMS notifications for my business. Please share pricing.",
);
const WHATSAPP_GENERAL = salesWhatsAppUrl(
  "Hi, I saw your platform and want a shop dashboard plus SMS for my customers.",
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
        <p className="text-sm uppercase tracking-[0.2em] text-muted">SaaS for shops in Sri Lanka</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Your shop online. Offers by SMS. More repeat sales.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          One platform: customers order or book, your staff run the dashboard, and SMS sends offers and updates so people
          come back.
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
            <h2 className="mt-2 font-display text-3xl">A shop platform with SMS, not a one-page site</h2>
          </div>
          <p className="text-muted">
            These demos show restaurant, clothing, tech, and salon owners the SaaS we run: customer shop, staff
            dashboard, and SMS. After you contact us we connect your brand, products or menu, and SMS so customers get
            order updates and Friday offers.
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
                  <Link href={`/${brand.id}/admin/sms`} className="btn btn-outline">
                    SMS gateway
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="page-wrap pb-16">
        <div className="card-dark p-6 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Pricing</p>
          <h2 className="mt-2 font-display text-3xl text-white">For pricing, please contact us</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Every shop is different — catalogue size, delivery, booking, and how many SMS you send. Message us on
            WhatsApp and we will quote the platform and SMS gateway together.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={WHATSAPP_PRICE} target="_blank" rel="noreferrer" className="btn bg-white text-black">
              WhatsApp {SALES_PHONE}
            </a>
            <a href={`tel:${SALES_PHONE}`} className="btn bg-white/15 text-white">
              Call {SALES_PHONE}
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="page-wrap pb-20">
        <h2 className="font-display text-3xl">Contact us</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Ready to go live? We set up your shop platform and SMS gateway so you can notify customers and grow sales.
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
