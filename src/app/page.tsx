import { createPublicClient } from "@/lib/supabase/public";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types/property";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = createPublicClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight text-stone-900 sm:text-xl">
            Venus Realtors
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            Available Properties
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Browse our listings and reach out on any property you like.
          </p>
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Couldn&apos;t load listings right now. Please try again later.
          </p>
        )}

        {!error && (properties?.length ?? 0) === 0 && (
          <p className="rounded-xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
            No listings available at the moment. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-stone-400 sm:px-6">
          Venus Realtors
        </div>
      </footer>
    </div>
  );
}
