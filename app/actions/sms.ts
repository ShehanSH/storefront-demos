"use server";

import { offerSms, salesFollowUpSms, getBrand, isBrandId } from "@/lib/brands";
import { sendGatewaySms } from "@/lib/sms";

export type CampaignKind = "offer" | "followup";

export async function sendDemoSmsAction(input: {
  brandId: string;
  phones: string;
  kind: CampaignKind;
}): Promise<{ success: boolean; message: string }> {
  if (!isBrandId(input.brandId)) {
    return { success: false, message: "Choose a demo brand first." };
  }

  const phones = input.phones
    .split(/[\s,;]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const brand = getBrand(input.brandId);
  const text = input.kind === "offer" ? offerSms(brand, siteUrl) : salesFollowUpSms();
  const result = await sendGatewaySms(phones, text);

  if (!result.success) {
    return { success: false, message: result.error || "Could not send SMS." };
  }

  if (result.preview) {
    return {
      success: true,
      message: `Preview only — add SMS_API_KEY and SMS_SENDER_ID to send for real. Message: ${text}`,
    };
  }

  return { success: true, message: input.kind === "offer" ? "Offer SMS sent." : "Follow-up SMS sent." };
}
