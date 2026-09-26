"use server";

import { sendGatewaySms } from "@/lib/sms";

export async function sendDemoSmsAction(input: {
  phones: string[];
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const text = input.message.trim();
  if (text.length < 10) {
    return { success: false, message: "Write a longer SMS before sending." };
  }

  const result = await sendGatewaySms(input.phones, text);
  if (!result.success) {
    return { success: false, message: result.error || "Could not send SMS." };
  }
  if (result.preview) {
    return {
      success: true,
      message: `Preview only — add SMS_API_KEY and SMS_SENDER_ID on Vercel to send for real. ${input.phones.length} number(s) ready.`,
    };
  }
  return { success: true, message: `Sent to ${input.phones.length} number(s).` };
}
