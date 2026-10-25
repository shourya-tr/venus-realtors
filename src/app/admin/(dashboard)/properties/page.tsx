import Image from "next/image";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatBathrooms, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";
import DeletePropertyButton from "./DeletePropertyButton";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const supabase = createAdminClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Listings</h1>
        <Link
          href="/admin/properties/new"
          className="rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white active:bg-stone-700 sm:hover:bg-stone-700"
        >
          + Add
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load listings: {error.message}
        </p>
      )}

      {!error && (properties?.length ?? 0) === 0 && (
        <p className="mt-4 rounded-xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
          No listings yet.
        </p>
      )}

      <div className="mt-5 space-y-3">
        {properties?.map((property) => (
          <div
            key={property.id}
            className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="relative h-16 w-20 flex-none overflow-hidden rounded-xl bg-stone-100 sm:h-20 sm:w-24">
                {property.photo_urls[0] ? (
                  <Image
                    src={property.photo_urls[0]}
                    alt={property.name || property.address}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                    No photo
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {property.name && (
                  <p className="font-semibold text-stone-900 truncate">{property.name}</p>
                )}
                <p className={`text-sm text-stone-600 truncate ${!property.name ? "font-semibold text-stone-900" : ""}`}>
                  {property.address}
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  {formatPrice(property.price)} · {property.bedrooms} bd · {formatBathrooms(property.bathrooms)} ba · {property.sqft.toLocaleString("en-IN")} sqft
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    property.is_active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {property.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/admin/properties/${property.id}/edit`}
                className="flex-1 rounded-xl border border-stone-300 px-3 py-2.5 text-center text-sm font-medium text-stone-700 active:bg-stone-100 sm:hover:bg-stone-50 sm:flex-none sm:py-1.5"
              >
                Edit
              </Link>
              <DeletePropertyButton id={property.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
