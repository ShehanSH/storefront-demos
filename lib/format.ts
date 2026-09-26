export function formatLkr(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-LK")}`;
}

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("94") && digits.length >= 11) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `94${digits.slice(1)}`;
  if (digits.length === 9) return `94${digits}`;
  return digits;
}
