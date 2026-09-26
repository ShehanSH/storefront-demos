import Link from "next/link";

export default function NotFound() {
  return (
    <div data-theme="studio" className="page-wrap flex min-h-svh flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl">Page not found</h1>
      <Link href="/" className="btn btn-primary mt-6">
        Back to demos
      </Link>
    </div>
  );
}
