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
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Available Properties
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse our current listings and reach out on any property you like.
        </p>
      </header>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load listings right now. Please try again later.
        </p>
      )}

      {!error && (properties?.length ?? 0) === 0 && (
        <p className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No listings available at the moment. Check back soon.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
