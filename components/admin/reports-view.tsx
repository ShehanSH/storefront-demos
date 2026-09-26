"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { demoOrders, demoTrend } from "@/lib/admin-data";
import { formatLkr } from "@/lib/format";
import type { Brand } from "@/lib/types";

export function ReportsView({ brand }: { brand: Brand }) {
  const orders = demoOrders(brand);
  const completed = orders.filter((order) => order.status === "Completed").length;
  const cancelled = orders.filter((order) => order.status === "Cancelled").length;
  const revenue = orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
  const categories = brand.categories.map((name) => ({
    name,
    value: brand.products.filter((product) => product.category === name).length * 4200,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Sales, category, and item performance. Sample data only.</p>
          <h1 className="font-display text-3xl">Reports</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline h-9 text-xs">PDF</button>
          <button type="button" className="btn btn-primary h-9 text-xs">Excel</button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card p-5">
          <p className="text-sm text-muted">{brand.orderLabel}</p>
          <p className="mt-2 font-display text-3xl">{orders.length}</p>
          <p className="mt-1 text-xs text-muted">{completed} completed · {cancelled} cancelled</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-muted">Revenue</p>
          <p className="mt-2 font-display text-3xl">{formatLkr(revenue)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-muted">Items sold</p>
          <p className="mt-2 font-display text-3xl">{orders.length + 14}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-muted">Average order</p>
          <p className="mt-2 font-display text-3xl">{formatLkr(Math.round(revenue / Math.max(orders.length, 1)))}</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-xl">Revenue trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoTrend()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-display text-xl">Category share</h2>
          <div className="space-y-3">
            {categories.map((row) => (
              <div key={row.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{row.name}</span>
                  <span>{formatLkr(row.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-line">
                  <div className="h-2 rounded-full bg-black" style={{ width: `${Math.min(100, row.value / 80)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
