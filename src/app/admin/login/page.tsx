import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-amber-700">Venus Realtors</p>
        <h1 className="mt-1 text-lg font-bold text-stone-900">Admin Login</h1>
        <p className="mt-1 text-sm text-stone-500">Enter the admin password to continue.</p>

        <form action={login} className="mt-5 space-y-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          {params.error && (
            <p className="text-sm text-red-600">Incorrect password. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white active:bg-stone-700 sm:hover:bg-stone-700"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
