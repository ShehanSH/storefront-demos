import Link from "next/link";

import { CampaignForm } from "@/components/sms/campaign-form";
import { SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";

export const metadata = {
  title: "SMS campaigns",
};

export default function StudioSmsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div data-theme="studio" className="min-h-full">
      <header className="page-wrap flex items-center justify-between py-5">
        <Link href="/" className="font-display text-xl">
          Storefront Demos
        </Link>
        <a href={salesWhatsAppUrl("Hi, I want SMS and a website for my shop.")} target="_blank" rel="noreferrer" className="btn btn-primary">
          WhatsApp {SALES_PHONE}
        </a>
      </header>
      <section className="page-wrap space-y-6 py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">smsgateway.lk</p>
          <h1 className="mt-2 font-display text-4xl">Offers & specials</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Text weekend specials and offers to customer phones. Saved numbers are ready to use. Upload a file or type
            new numbers — duplicates are skipped.
          </p>
        </div>
        <CampaignForm defaultBrand="restaurant" siteUrl={siteUrl} />
      </section>
    </div>
  );
}
