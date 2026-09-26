import { demoSmsLogs } from "@/lib/admin-data";
import { brandParams, resolveBrand } from "@/lib/params";

export function generateStaticParams() {
  return brandParams();
}

export default async function SmsLogPage({ params }: { params: Promise<{ brand: string }> }) {
  const brand = await resolveBrand(params);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">Every campaign and order SMS. Sample rows for the demo.</p>
        <h1 className="font-display text-3xl">SMS log</h1>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoSmsLogs(brand).map((row) => (
              <tr key={`${row.phone}-${row.at}`} className="border-t border-line">
                <td className="px-4 py-3">{row.at}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">{row.event}</td>
                <td className="max-w-xs truncate px-4 py-3">{row.message}</td>
                <td className="px-4 py-3">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
