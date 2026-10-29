import { notFound } from "next/navigation";
import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { formatPrice, formatBathrooms } from "@/lib/format";
import PhotoGallery from "@/components/PhotoGallery";
import EnquirySection from "@/components/EnquirySection";
import type { Property } from "@/types/property";

export const dynamic = "force-dynamic";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createPublicClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single<Property>();

  if (!property) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-20 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors active:text-stone-900 sm:hover:text-stone-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="h-4 w-px bg-stone-300" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-[10px] font-bold text-white">
              V
            </div>
            <span className="text-sm font-semibold text-stone-900">Venus Realtors</span>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {/* Photo gallery */}
        <PhotoGallery
          photoUrls={property.photo_urls}
          youtubeUrl={property.youtube_url}
          alt={property.name || property.address}
        />

        {/* Property info */}
        <div className="mt-6 sm:mt-8">
          {property.name && (
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {property.name}
            </h1>
          )}

          <p className="mt-2 flex items-center gap-1.5 text-base text-stone-500">
            <svg width="16" height="16" className="flex-shrink-0 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.address}
          </p>

          {/* Price */}
          <p className="mt-4 text-2xl font-bold text-amber-700 sm:text-3xl">
            {formatPrice(property.price)}
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5">
              <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <div>
                <p className="text-lg font-bold text-stone-900">{property.bedrooms}</p>
                <p className="text-xs text-stone-500">Bedrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5">
              <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-lg font-bold text-stone-900">{formatBathrooms(property.bathrooms)}</p>
                <p className="text-xs text-stone-500">Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5">
              <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              <div>
                <p className="text-lg font-bold text-stone-900">{property.sqft.toLocaleString("en-IN")}</p>
                <p className="text-xs text-stone-500">Sq. ft.</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg font-bold text-stone-900">About this property</h2>
              <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-stone-600">
                {property.description}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Enquiry section */}
      <EnquirySection />

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
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
