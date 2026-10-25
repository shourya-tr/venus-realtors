import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30" />
      <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative w-full max-w-sm animate-fade-in-up">
        <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-sm font-bold text-white">
              V
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-700">Venus Realtors</p>
              <p className="text-xs text-stone-400">Admin portal</p>
            </div>
          </div>

          <h1 className="text-xl font-bold text-stone-900">Welcome back</h1>
          <p className="mt-1 text-sm text-stone-500">Enter your password to continue.</p>

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
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-base transition-colors focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 focus:outline-none"
              />
            </div>

            {params.error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Incorrect password. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all active:shadow-none active:brightness-90 sm:hover:shadow-md sm:hover:brightness-105"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
