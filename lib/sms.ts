import { normalizePhone } from "@/lib/format";

export type SmsSendResult = {
  success: boolean;
  preview?: boolean;
  error?: string;
};

export async function sendGatewaySms(phones: string[], message: string): Promise<SmsSendResult> {
  const apiUrl = process.env.SMS_API_URL || "https://app.smsgateway.lk/api/v3/sms/send";
  const apiKey = process.env.SMS_API_KEY?.trim();
  const senderId = process.env.SMS_SENDER_ID?.trim();
  const recipients = phones.map(normalizePhone).filter((phone) => phone.length >= 11);

  if (recipients.length === 0) {
    return { success: false, error: "Add at least one valid Sri Lankan mobile number." };
  }

  if (!apiKey || !senderId) {
    console.info("[sms preview]", { recipients, senderId: senderId || "DEMO", message });
    return { success: true, preview: true };
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      recipient: recipients.join(","),
      sender_id: senderId,
      type: "plain",
      message,
      api_token: apiKey,
    }),
    cache: "no-store",
  });

  const body = await response.text();
  if (!response.ok) {
    return { success: false, error: body.slice(0, 180) || `Gateway returned ${response.status}` };
  }

  return { success: true };
}
