"use client";

import { useState } from "react";

import { sendDemoSmsAction, type CampaignKind } from "@/app/actions/sms";
import { BRAND_LIST, offerSms, salesFollowUpSms } from "@/lib/brands";
import type { BrandId } from "@/lib/types";

export function CampaignForm({
  defaultBrand,
  siteUrl,
}: {
  defaultBrand: BrandId;
  siteUrl: string;
}) {
  const [brandId, setBrandId] = useState<BrandId>(defaultBrand);
  const [phones, setPhones] = useState("");
  const [note, setNote] = useState("");
  const [pending, setPending] = useState<CampaignKind | null>(null);
  const brand = BRAND_LIST.find((item) => item.id === brandId)!;

  async function send(kind: CampaignKind) {
    setPending(kind);
    const result = await sendDemoSmsAction({ brandId, phones, kind });
    setNote(result.message);
    setPending(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Demo brand</span>
          <select className="field" value={brandId} onChange={(event) => setBrandId(event.target.value as BrandId)}>
            {BRAND_LIST.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Client mobile numbers</span>
          <textarea
            className="field min-h-32"
            value={phones}
            onChange={(event) => setPhones(event.target.value)}
            placeholder="0766650952, 0771234567"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn btn-primary" disabled={pending !== null} onClick={() => send("offer")}>
            {pending === "offer" ? "Sending…" : "1. Send offer + demo link"}
          </button>
          <button type="button" className="btn btn-outline" disabled={pending !== null} onClick={() => send("followup")}>
            {pending === "followup" ? "Sending…" : "2. Send contact SMS"}
          </button>
        </div>
        {note ? <p className="text-sm text-muted">{note}</p> : null}
      </div>
      <div className="space-y-4">
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">SMS 1 · business offer</p>
          <p className="mt-2 text-sm leading-6">{offerSms(brand, siteUrl)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">SMS 2 · your sales line</p>
          <p className="mt-2 text-sm leading-6">{salesFollowUpSms()}</p>
        </div>
      </div>
    </div>
  );
}
