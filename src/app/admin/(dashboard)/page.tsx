import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/properties/new"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Add Property</p>
          <p className="mt-1 text-sm text-slate-500">Create a new listing with photos and details.</p>
        </Link>
        <Link
          href="/admin/properties"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Listings</p>
          <p className="mt-1 text-sm text-slate-500">View and delete existing listings.</p>
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Leads</p>
          <p className="mt-1 text-sm text-slate-500">See everyone who clicked &quot;I&apos;m Interested&quot;.</p>
        </Link>
      </div>
    </div>
  );
}
