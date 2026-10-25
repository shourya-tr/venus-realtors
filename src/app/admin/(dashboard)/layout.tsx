import Link from "next/link";
import { logout } from "../login/actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <nav className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="text-sm font-bold text-stone-900 sm:text-base">
            Venus Realtors
          </Link>
          <form action={logout}>
            <button type="submit" className="text-sm font-medium text-stone-500 active:text-stone-900 sm:hover:text-stone-900">
              Log out
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 pb-2 text-sm font-medium">
            <Link href="/admin" className="rounded-lg px-3 py-2 text-stone-600 active:bg-stone-100 sm:hover:bg-stone-100">
              Dashboard
            </Link>
            <Link href="/admin/properties/new" className="rounded-lg px-3 py-2 text-stone-600 active:bg-stone-100 sm:hover:bg-stone-100">
              Add
            </Link>
            <Link href="/admin/properties" className="rounded-lg px-3 py-2 text-stone-600 active:bg-stone-100 sm:hover:bg-stone-100">
              Listings
            </Link>
            <Link href="/admin/leads" className="rounded-lg px-3 py-2 text-stone-600 active:bg-stone-100 sm:hover:bg-stone-100">
              Leads
            </Link>
          </div>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
