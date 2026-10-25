"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProperty } from "./actions";
import type { Property } from "@/types/property";

export default function EditPropertyForm({
  property,
  error,
}: {
  property: Property;
  error?: string;
}) {
  const [photoUrls, setPhotoUrls] = useState<string[]>(property.photo_urls);

  function removePhoto(url: string) {
    setPhotoUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <form
      action={updateProperty}
      encType="multipart/form-data"
      className="mt-5 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <input type="hidden" name="id" value={property.id} />
      <input type="hidden" name="existing_photo_urls" value={photoUrls.join("\n")} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Property name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={property.name}
          placeholder="e.g. Sunrise Villa"
          className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-stone-700">
            Price (INR)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={property.price}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-stone-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            defaultValue={property.address}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-stone-700">
            Beds
          </label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={property.bedrooms}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-stone-700">
            Baths
          </label>
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            step="0.5"
            required
            defaultValue={property.bathrooms}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="sqft" className="block text-sm font-medium text-stone-700">
            Sq ft
          </label>
          <input
            id="sqft"
            name="sqft"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={property.sqft}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={property.description}
          className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="youtube_url" className="block text-sm font-medium text-stone-700">
          YouTube video link (optional)
        </label>
        <input
          id="youtube_url"
          name="youtube_url"
          type="url"
          defaultValue={property.youtube_url ?? ""}
          placeholder="https://www.youtube.com/watch?v=..."
          className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
        />
      </div>

      {photoUrls.length > 0 && (
        <div>
          <p className="text-sm font-medium text-stone-700">Current photos</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {photoUrls.map((url) => (
              <div key={url} className="group relative h-20 w-24 overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src={url}
                  alt="Property photo"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(url)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 active:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="photos" className="block text-sm font-medium text-stone-700">
          Add more photos
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-base file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-stone-700"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_active"
          name="is_active"
          defaultChecked={property.is_active}
          className="h-5 w-5 rounded border-stone-300 text-amber-700 accent-amber-700"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-stone-700">
          Active (visible on public site)
        </label>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white active:bg-stone-700 sm:hover:bg-stone-700"
      >
        Save Changes
      </button>
    </form>
  );
}
