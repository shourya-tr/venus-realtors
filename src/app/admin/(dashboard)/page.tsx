import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Dashboard</h1>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <Link
          href="/admin/properties/new"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm active:shadow-md sm:hover:shadow-md"
        >
          <p className="font-semibold text-stone-900">Add Property</p>
          <p className="mt-1 text-sm text-stone-500">Create a new listing with photos and details.</p>
        </Link>
        <Link
          href="/admin/properties"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm active:shadow-md sm:hover:shadow-md"
        >
          <p className="font-semibold text-stone-900">Listings</p>
          <p className="mt-1 text-sm text-stone-500">View, edit, and manage existing listings.</p>
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm active:shadow-md sm:hover:shadow-md"
        >
          <p className="font-semibold text-stone-900">Leads</p>
          <p className="mt-1 text-sm text-stone-500">See everyone who showed interest.</p>
        </Link>
      </div>
    </div>
  );
}
