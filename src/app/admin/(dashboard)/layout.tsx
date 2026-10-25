import Link from "next/link";
import { logout } from "../login/actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/admin" className="font-semibold text-slate-900">
              Admin
            </Link>
            <Link href="/admin/properties/new" className="hover:text-slate-900">
              Add Property
            </Link>
            <Link href="/admin/properties" className="hover:text-slate-900">
              Listings
            </Link>
            <Link href="/admin/leads" className="hover:text-slate-900">
              Leads
            </Link>
          </div>
          <form action={logout}>
            <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-900">
              Log out
            </button>
          </form>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
