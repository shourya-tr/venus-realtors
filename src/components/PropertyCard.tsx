"use client";

import { useState } from "react";
import PhotoCarousel from "@/components/PhotoCarousel";
import InterestForm from "@/components/InterestForm";
import { formatBathrooms, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow active:shadow-md sm:hover:shadow-md">
      <PhotoCarousel
        photoUrls={property.photo_urls}
        youtubeUrl={property.youtube_url}
        alt={property.name || property.address}
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-lg font-bold text-stone-900 leading-tight sm:text-xl">
          {formatPrice(property.price)}
        </p>

        {property.name && (
          <p className="text-sm font-medium text-stone-800">{property.name}</p>
        )}

        <p className="text-sm text-stone-500 leading-snug">{property.address}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-600 sm:text-sm">
          <span>{property.bedrooms} Beds</span>
          <span className="text-stone-300">|</span>
          <span>{formatBathrooms(property.bathrooms)} Baths</span>
          <span className="text-stone-300">|</span>
          <span>{property.sqft.toLocaleString("en-IN")} sq ft</span>
        </div>

        {property.description && (
          <p className="line-clamp-2 text-sm text-stone-500 leading-relaxed">{property.description}</p>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-auto w-full rounded-xl bg-amber-700 px-4 py-3 text-sm font-semibold text-white active:bg-amber-800 sm:hover:bg-amber-800 sm:py-2.5"
        >
          I&apos;m Interested
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <InterestForm propertyId={property.id} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
