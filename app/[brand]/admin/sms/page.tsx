import { CampaignForm } from "@/components/sms/campaign-form";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function AdminSmsPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">SMS</h1>
        <p className="mt-2 text-muted">
          Show the client how an offer SMS looks, then send your follow-up with {process.env.NEXT_PUBLIC_SALES_PHONE || "0766650952"}.
        </p>
      </div>
      <CampaignForm defaultBrand={brand.id} siteUrl={siteUrl} />
    </div>
  );
}
