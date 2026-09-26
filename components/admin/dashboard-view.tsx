"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { formatLkr } from "@/lib/format";
import type { Brand } from "@/lib/types";

const POINTS = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 38 },
  { name: "Wed", value: 51 },
  { name: "Thu", value: 47 },
  { name: "Fri", value: 86 },
  { name: "Sat", value: 74 },
  { name: "Sun", value: 55 },
];

export function DashboardView({ brand }: { brand: Brand }) {
  const cards = [
    { label: brand.orderLabel, value: String(brand.stats.orders) },
    { label: "Revenue today", value: formatLkr(brand.stats.revenue) },
    { label: "Customers", value: String(brand.stats.customers) },
    { label: "Open", value: String(brand.stats.pending) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">Today · Asia/Colombo</p>
        <h1 className="font-display text-3xl">Dashboard</h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card p-5">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <h2 className="mb-4 font-display text-xl">This week</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={POINTS}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Ref</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {brand.orders.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{formatLkr(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
