import { createPublicClient } from "@/lib/supabase/public";
import PropertyCard from "@/components/PropertyCard";
import EnquirySection from "@/components/EnquirySection";
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
      {/* Hero header */}
      <header className="relative overflow-hidden bg-stone-900">
        <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-sm font-bold text-white sm:h-10 sm:w-10">
              V
            </div>
            <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Venus Realtors
            </span>
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white sm:mt-8 sm:text-4xl">
            Find your dream property
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-300 sm:text-base">
            Handpicked listings, transparent pricing, and a team that puts you first.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/40" />
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              Available Properties
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Browse our listings and reach out on any property you like.
            </p>
          </div>
          {(properties?.length ?? 0) > 0 && (
            <span className="hidden rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 sm:inline-block">
              {properties!.length} {properties!.length === 1 ? "listing" : "listings"}
            </span>
          )}
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Couldn&apos;t load listings right now. Please try again later.
          </p>
        )}

        {!error && (properties?.length ?? 0) === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-400">
              &#127968;
            </div>
            <p className="font-medium text-stone-700">No listings available yet</p>
            <p className="mt-1 text-sm text-stone-500">Check back soon for new properties.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties?.map((property, i) => (
            <div key={property.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </main>

      {/* Enquire with us */}
      <EnquirySection />

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-600 text-[10px] font-bold text-white">
              V
            </div>
            <span className="text-sm font-medium text-stone-600">Venus Realtors</span>
          </div>
          <p className="text-xs text-stone-400">&copy; {new Date().getFullYear()} Venus Realtors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
