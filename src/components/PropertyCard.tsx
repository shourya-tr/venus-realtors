"use client";

import { useState } from "react";
import PhotoCarousel from "@/components/PhotoCarousel";
import InterestForm from "@/components/InterestForm";
import { formatBathrooms, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <PhotoCarousel
        photoUrls={property.photo_urls}
        youtubeUrl={property.youtube_url}
        alt={property.address}
      />

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xl font-semibold text-slate-900">{formatPrice(property.price)}</p>
        <p className="mt-0.5 text-sm text-slate-600">{property.address}</p>

        <div className="mt-3 flex gap-4 text-sm text-slate-700">
          <span>{property.bedrooms} bd</span>
          <span>{formatBathrooms(property.bathrooms)} ba</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>

        {property.description && (
          <p className="mt-3 line-clamp-3 text-sm text-slate-600">{property.description}</p>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          I&apos;m Interested
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <InterestForm propertyId={property.id} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
