import Link from "next/link";

import { SALES_PHONE } from "@/lib/brands";

export function DemoBanner() {
  return (
    <div className="bg-black text-white">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
        <p>Demo website — sample data only. Production apps are built after you contact us.</p>
        <div className="flex gap-4">
          <Link href="/" className="underline-offset-2 hover:underline">
            All demos
          </Link>
          <a href={`tel:${SALES_PHONE}`} className="underline-offset-2 hover:underline">
            Call {SALES_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
