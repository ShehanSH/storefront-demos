import Link from "next/link";

import { SALES_PHONE, salesWhatsAppUrl } from "@/lib/brands";

export function DemoBanner() {
  return (
    <div className="bg-black text-white">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
        <p>Demo website — sample data only. For pricing, contact us. We also set up SMS for your customers.</p>
        <div className="flex gap-4">
          <Link href="/#about" className="underline-offset-2 hover:underline">
            About us
          </Link>
          <a href={salesWhatsAppUrl("Hi, I want pricing for a website and SMS.")} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            WhatsApp {SALES_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
