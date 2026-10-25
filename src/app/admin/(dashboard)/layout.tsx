import Link from "next/link";
import { logout } from "../login/actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <nav className="border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-xs font-bold text-white">
              V
            </div>
            <span className="text-sm font-bold text-stone-900 sm:text-base">Venus Realtors</span>
          </Link>
          <form action={logout}>
            <button type="submit" className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors active:bg-stone-100 active:text-stone-900 sm:hover:bg-stone-100 sm:hover:text-stone-900">
              Log out
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 pb-2 text-sm font-medium">
            <Link href="/admin" className="rounded-lg px-3 py-2 text-stone-600 transition-colors active:bg-amber-50 active:text-amber-800 sm:hover:bg-amber-50 sm:hover:text-amber-800">
              Dashboard
            </Link>
            <Link href="/admin/properties/new" className="rounded-lg px-3 py-2 text-stone-600 transition-colors active:bg-amber-50 active:text-amber-800 sm:hover:bg-amber-50 sm:hover:text-amber-800">
              Add
            </Link>
            <Link href="/admin/properties" className="rounded-lg px-3 py-2 text-stone-600 transition-colors active:bg-amber-50 active:text-amber-800 sm:hover:bg-amber-50 sm:hover:text-amber-800">
              Listings
            </Link>
            <Link href="/admin/leads" className="rounded-lg px-3 py-2 text-stone-600 transition-colors active:bg-amber-50 active:text-amber-800 sm:hover:bg-amber-50 sm:hover:text-amber-800">
              Leads
            </Link>
          </div>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
