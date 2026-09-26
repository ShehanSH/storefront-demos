import { PageIntro } from "@/components/store/product-card";
import { SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";
import { brandParams, resolveBrand } from "@/lib/params";
import { socials } from "@/lib/store-content";

export function generateStaticParams() {
  return brandParams();
}

export default async function ContactPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const links = socials(brand);
  return (
    <section className="page-wrap py-12">
      <PageIntro eyebrow="Contact" title={`Talk to ${brand.shortName}`} text={`${brand.address}, ${brand.city}`} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">Phone</p>
            <a href={`tel:${brand.phone}`} className="mt-1 block font-display text-2xl">
              {brand.phone}
            </a>
            <p className="mt-3 text-sm text-muted">{brand.email}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">Want this for your shop?</p>
            <p className="mt-2 text-sm text-muted">Call or WhatsApp {SALES_PHONE}.</p>
            <a href={salesWhatsAppUrl("Hi, I want a shop site like this.")} target="_blank" rel="noreferrer" className="btn mt-4 bg-[#25D366] text-white">
              WhatsApp us
            </a>
          </div>
          <div className="flex gap-3 text-sm">
            <a href={links.facebook} className="text-muted hover:text-foreground">Facebook</a>
            <a href={links.instagram} className="text-muted hover:text-foreground">Instagram</a>
            <a href={links.tiktok} className="text-muted hover:text-foreground">TikTok</a>
            <a href={links.whatsapp} className="text-muted hover:text-foreground">WhatsApp</a>
          </div>
        </div>
        <form className="card space-y-3 p-6">
          <input className="field" placeholder="Name" />
          <input className="field" placeholder="Phone" />
          <input className="field" placeholder="Email (optional)" />
          <textarea className="field min-h-36" placeholder="How can we help?" />
          <button type="button" className="btn btn-primary w-full">
            Send message
          </button>
          <p className="text-xs text-muted">Demo form — nothing is stored.</p>
        </form>
      </div>
    </section>
  );
}
