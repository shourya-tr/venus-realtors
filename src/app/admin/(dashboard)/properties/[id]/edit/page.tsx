import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Property } from "@/types/property";
import EditPropertyForm from "./EditPropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = createAdminClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single<Property>();

  if (!property) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">Edit Property</h1>
      <EditPropertyForm property={property} error={error} />
    </div>
  );
}
