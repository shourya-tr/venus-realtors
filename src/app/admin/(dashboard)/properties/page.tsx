import Image from "next/image";
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
      <h1 className="text-2xl font-bold text-slate-900">Listings</h1>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load listings: {error.message}
        </p>
      )}

      {!error && (properties?.length ?? 0) === 0 && (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No listings yet.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {properties?.map((property) => (
          <div
            key={property.id}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="relative h-16 w-20 flex-none overflow-hidden rounded-lg bg-slate-100">
              {property.photo_urls[0] && (
                <Image
                  src={property.photo_urls[0]}
                  alt={property.address}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">{property.address}</p>
              <p className="text-sm text-slate-500">
                {formatPrice(property.price)} · {property.bedrooms} bd ·{" "}
                {formatBathrooms(property.bathrooms)} ba · {property.sqft.toLocaleString()} sqft
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  property.is_active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {property.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <DeletePropertyButton id={property.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
