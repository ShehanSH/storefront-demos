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
          <h1 className="mt-2 font-display text-4xl">Client introduction SMS</h1>
          <p className="mt-3 max-w-2xl text-muted">
            First send the shop offer with the demo website link. Then send your contact number so the client can hire
            you for the production build.
          </p>
        </div>
        <CampaignForm defaultBrand="restaurant" siteUrl={siteUrl} />
      </section>
    </div>
  );
}
