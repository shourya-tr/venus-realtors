"use client";

import PhotoCarousel from "@/components/PhotoCarousel";
import { formatBathrooms } from "@/lib/format";
import type { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group/card flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-200 active:shadow-lg active:-translate-y-0.5 sm:hover:shadow-lg sm:hover:-translate-y-0.5">
      <div className="relative">
        <PhotoCarousel
          photoUrls={property.photo_urls}
          youtubeUrl={property.youtube_url}
          alt={property.name || property.address}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        {property.name && (
          <p className="text-base font-bold text-stone-900 sm:text-lg">{property.name}</p>
        )}

        <p className="flex items-center gap-1.5 text-sm text-stone-500 leading-snug">
          <svg width="14" height="14" className="flex-shrink-0 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.address}
        </p>

        <div className="mt-1 flex items-center gap-2 text-xs text-stone-600 sm:text-sm">
          <span className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 font-medium">
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 font-medium">
            {formatBathrooms(property.bathrooms)} Baths
          </span>
          <span className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 font-medium">
            {property.sqft.toLocaleString("en-IN")} ft&sup2;
          </span>
        </div>

        {property.description && (
          <p className="mt-1 line-clamp-2 text-sm text-stone-500 leading-relaxed">{property.description}</p>
        )}
      </div>
    </div>
  );
}
