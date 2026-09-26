"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { formatLkr } from "@/lib/format";
import { catalog } from "@/lib/store-content";
import type { Brand } from "@/lib/types";

const SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];
const STYLISTS = ["Maya", "Nisha", "Amaya"];

export function BookingForm({ brand }: { brand: Brand }) {
  const router = useRouter();
  const search = useSearchParams();
  const [pending, setPending] = useState(false);
  const services = catalog(brand);
  const selected = search.get("service") ?? services[0]?.slug;
  const service = services.find((product) => product.slug === selected) ?? services[0]!;

  return (
    <form
      className="card space-y-4 p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setPending(true);
        const form = new FormData(event.currentTarget);
        const ref = `BLM-${Math.floor(1000 + Math.random() * 9000)}`;
        sessionStorage.setItem(
          `demo-order:${brand.id}`,
          JSON.stringify({
            ref,
            name: String(form.get("name")),
            total: service.price,
            type: `${form.get("day")} ${form.get("slot")}`,
          }),
        );
        router.push(`/${brand.id}/confirmation`);
      }}
    >
      <label className="block text-sm">
        <span className="mb-1 block text-muted">Service</span>
        <select
          className="field"
          name="service"
          defaultValue={service.slug}
          onChange={(event) => router.replace(`/${brand.id}/book?service=${event.target.value}`)}
        >
          {services.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name} · {formatLkr(product.price)}
            </option>
          ))}
        </select>
      </label>
      <input className="field" name="name" placeholder="Your name" required />
      <input className="field" name="phone" placeholder="07X XXX XXXX" required />
      <div className="grid gap-3 sm:grid-cols-3">
        <select className="field" name="day" defaultValue="Friday">
          <option>Today</option>
          <option>Tomorrow</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
        <select className="field" name="slot" defaultValue={SLOTS[2]}>
          {SLOTS.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
        <select className="field" name="stylist" defaultValue={STYLISTS[0]}>
          {STYLISTS.map((stylist) => (
            <option key={stylist}>{stylist}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary w-full" disabled={pending}>
        {pending ? "Booking…" : `Confirm · ${formatLkr(service.price)}`}
      </button>
      <p className="text-sm text-muted">Demo booking only. A production salon app sends SMS reminders and blocks the chair.</p>
    </form>
  );
}
