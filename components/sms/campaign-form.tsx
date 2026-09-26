"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Megaphone, Search, Upload } from "lucide-react";

import { sendDemoSmsAction } from "@/app/actions/sms";
import { BRAND_LIST } from "@/lib/brands";
import {
  CAMPAIGN_MAX_IMPORT,
  CAMPAIGN_MESSAGE_MAX,
  brandContacts,
  campaignTemplate,
  classifyImportedPhones,
  parseImportLines,
  smsSegmentCount,
  type CampaignTemplateId,
  type Contact,
} from "@/lib/campaign";
import { normalizePhone } from "@/lib/format";
import type { BrandId } from "@/lib/types";

export function CampaignForm({
  defaultBrand,
  siteUrl,
}: {
  defaultBrand: BrandId;
  siteUrl: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [brandId, setBrandId] = useState<BrandId>(defaultBrand);
  const [extras, setExtras] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [template, setTemplate] = useState<CampaignTemplateId>("weekend");
  const [message, setMessage] = useState(campaignTemplate("weekend", BRAND_LIST.find((item) => item.id === defaultBrand)!, siteUrl));
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const brand = BRAND_LIST.find((item) => item.id === brandId)!;
  const customers = useMemo(() => {
    const base = brandContacts(brandId);
    const seen = new Set(base.map((row) => normalizePhone(row.phone)));
    return [...base, ...extras.filter((row) => !seen.has(normalizePhone(row.phone)))];
  }, [brandId, extras]);

  const existingPhones = customers.map((customer) => normalizePhone(customer.phone));
  const visible = customers.filter((customer) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return customer.name.toLowerCase().includes(term) || customer.phone.replace(/\s/g, "").includes(term.replace(/\s/g, ""));
  });
  const classified = useMemo(
    () => classifyImportedPhones(parseImportLines(bulkText), existingPhones).slice(0, CAMPAIGN_MAX_IMPORT),
    [bulkText, existingPhones],
  );
  const newRows = classified.filter((row) => row.status === "new");
  const segments = smsSegmentCount(message);

  function changeBrand(next: BrandId) {
    setBrandId(next);
    setExtras([]);
    setSelected(new Set());
    setQuery("");
    const nextBrand = BRAND_LIST.find((item) => item.id === next)!;
    setTemplate("weekend");
    setMessage(campaignTemplate("weekend", nextBrand, siteUrl));
  }

  function applyTemplate(id: CampaignTemplateId) {
    setTemplate(id);
    if (id !== "custom") setMessage(campaignTemplate(id, brand, siteUrl));
  }

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleVisible() {
    const ids = visible.map((customer) => customer.id);
    const allOn = ids.length > 0 && ids.every((id) => selected.has(id));
    setSelected((current) => {
      const next = new Set(current);
      for (const id of ids) {
        if (allOn) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }

  function addContact(nextName: string, nextPhone: string) {
    const preview = classifyImportedPhones([{ phone: nextPhone, name: nextName || "Customer" }], existingPhones)[0];
    if (!preview || preview.status === "invalid") {
      setNote("Enter a valid mobile number.");
      return false;
    }
    if (preview.status === "duplicate") {
      setNote("That number is already in the list.");
      return false;
    }
    const contact: Contact = {
      id: preview.normalized ?? nextPhone,
      name: nextName.trim() || "Customer",
      phone: nextPhone.trim(),
      orders: 0,
    };
    setExtras((current) => [...current, contact]);
    setSelected((current) => new Set(current).add(contact.id));
    return true;
  }

  function onAddOne(event: React.FormEvent) {
    event.preventDefault();
    if (addContact(name, phone)) {
      setName("");
      setPhone("");
      setNote("");
    }
  }

  function onImport() {
    if (newRows.length === 0) {
      setNote("Paste or upload new mobile numbers first.");
      return;
    }
    const added: Contact[] = newRows.map((row) => ({
      id: row.normalized ?? row.raw,
      name: row.name,
      phone: row.raw,
      orders: 0,
    }));
    setExtras((current) => [...current, ...added]);
    setSelected((current) => {
      const next = new Set(current);
      for (const row of added) next.add(row.id);
      return next;
    });
    setBulkText("");
    setNote(`${added.length} new number${added.length === 1 ? "" : "s"} added.`);
  }

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const text = await file.text();
    setBulkText((current) => (current.trim() ? `${current.trim()}\n${text}` : text));
  }

  async function onSend() {
    const phones = customers.filter((customer) => selected.has(customer.id)).map((customer) => customer.phone);
    if (phones.length === 0) {
      setNote("Select at least one number.");
      return;
    }
    setSending(true);
    const result = await sendDemoSmsAction({ phones, message });
    setNote(result.message);
    setSending(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="card space-y-6 p-5 sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Step 1</p>
          <h2 className="mt-1 font-display text-xl">Recipients</h2>
          <p className="mt-1 text-sm text-muted">Choose saved contacts, type a number, or upload a file.</p>
        </div>

        <label className="block text-sm">
          <span className="mb-1 block text-muted">Demo brand</span>
          <select className="field" value={brandId} onChange={(event) => changeBrand(event.target.value as BrandId)}>
            {BRAND_LIST.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-medium">Saved numbers</h3>
            <p className="text-xs text-muted">
              {selected.size} selected · {customers.length} saved
            </p>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or number…"
              className="field field-search"
            />
          </div>
          <button type="button" className="btn btn-outline h-8 px-3 text-xs" onClick={toggleVisible}>
            {visible.length > 0 && visible.every((customer) => selected.has(customer.id))
              ? "Clear visible"
              : "Select visible"}
          </button>
          <ul className="max-h-72 divide-y divide-line overflow-y-auto rounded-xl border border-line">
            {visible.map((customer) => {
              const on = selected.has(customer.id);
              return (
                <li key={customer.id}>
                  <button
                    type="button"
                    onClick={() => toggle(customer.id)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm ${on ? "bg-black/4" : ""}`}
                  >
                    <span
                      className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full border ${
                        on ? "border-black bg-black text-white" : "border-line bg-white"
                      }`}
                    >
                      {on ? <Check className="size-3" /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{customer.name}</span>
                      <span className="block text-xs text-muted">{customer.phone}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted">
                      {customer.orders} {customer.orders === 1 ? "order" : "orders"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-line pt-6">
          <h3 className="text-sm font-medium">Add a new number</h3>
          <form onSubmit={onAddOne} className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name (optional)" />
            <input
              className="field"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0771234567"
              inputMode="tel"
              required
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>

        <div className="border-t border-line pt-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium">Upload or paste numbers</h3>
              <p className="mt-1 text-xs text-muted">
                One number per line, or name, 077…. CSV and text files. Max {CAMPAIGN_MAX_IMPORT} at a time.
              </p>
            </div>
            <button type="button" className="btn btn-outline h-9 px-3 text-xs" onClick={() => fileRef.current?.click()}>
              <Upload className="size-3.5" />
              Upload file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt,text/plain,text/csv"
              className="sr-only"
              onChange={(event) => void onFile(event)}
            />
          </div>
          <textarea
            className="field mt-3 min-h-28"
            value={bulkText}
            onChange={(event) => setBulkText(event.target.value)}
            placeholder={"0771234567\nKasun, 0766650952"}
          />
          {classified.length > 0 ? (
            <p className="mt-2 text-xs">
              <span className="font-medium">{newRows.length} new</span>
              <span className="text-muted"> · {classified.filter((row) => row.status === "duplicate").length} already saved · {classified.filter((row) => row.status === "invalid").length} invalid</span>
            </p>
          ) : null}
          <button type="button" className="btn btn-primary mt-3" disabled={newRows.length === 0} onClick={onImport}>
            Import new numbers only
          </button>
        </div>
      </section>

      <section className="card h-fit space-y-5 p-5 sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Step 2</p>
          <h2 className="mt-1 font-display text-xl">Message</h2>
          <p className="mt-1 text-sm text-muted">Weekend specials, new offers, or your own text.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["weekend", "Weekend special"],
              ["offer", "New offer"],
              ["custom", "Custom"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => applyTemplate(id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                template === id ? "bg-black text-white" : "border border-line bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">SMS text</span>
          <textarea
            className="field field-sms"
            value={message}
            onChange={(event) => {
              setTemplate("custom");
              setMessage(event.target.value.slice(0, CAMPAIGN_MESSAGE_MAX));
            }}
          />
          <p className="mt-1 text-xs text-muted">
            {message.length}/{CAMPAIGN_MESSAGE_MAX} · {segments} {segments === 1 ? "SMS segment" : "SMS segments"}
          </p>
        </label>
        <button
          type="button"
          className="btn btn-primary w-full"
          disabled={sending || selected.size === 0 || message.trim().length < 10}
          onClick={() => void onSend()}
        >
          <Megaphone className="size-4" />
          {sending ? "Sending…" : `Send to ${selected.size || 0} ${selected.size === 1 ? "number" : "numbers"}`}
        </button>
        {note ? <p className="text-sm text-muted">{note}</p> : null}
      </section>
    </div>
  );
}
