"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formatLkr } from "@/lib/format";
import { isBrandId } from "@/lib/brands";

type Saved = { ref: string; name: string; total: number; type: string };

export default function ConfirmationPage() {
  const params = useParams<{ brand: string }>();
  const brandId = params.brand;
  const [order, setOrder] = useState<Saved | null>(null);

  useEffect(() => {
    if (!isBrandId(brandId)) return;
    const raw = sessionStorage.getItem(`demo-order:${brandId}`);
    setOrder(raw ? (JSON.parse(raw) as Saved) : null);
  }, [brandId]);

  return (
    <section className="page-wrap py-16">
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="text-sm uppercase tracking-wide text-muted">Demo confirmation</p>
        <h1 className="mt-2 font-display text-4xl">We received it</h1>
        {order ? (
          <p className="mt-4 text-muted">
            {order.ref} for {order.name} · {order.type} · {formatLkr(order.total)}
          </p>
        ) : (
          <p className="mt-4 text-muted">This page shows after a demo checkout or booking.</p>
        )}
        <p className="mt-4 text-sm text-muted">
          In production the customer gets an SMS with a tracking or appointment link.
        </p>
        <Link href={`/${brandId}`} className="btn btn-primary mt-6">
          Back home
        </Link>
      </div>
    </section>
  );
}
