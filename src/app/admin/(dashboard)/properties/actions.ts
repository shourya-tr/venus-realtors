"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

const PHOTO_BUCKET = "property-photos";

export async function deleteProperty(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();

  const { data: property } = await supabase
    .from("properties")
    .select("photo_urls")
    .eq("id", id)
    .single();

  const photoUrls: string[] = property?.photo_urls ?? [];
  const paths = photoUrls
    .map((url) => {
      const marker = `/${PHOTO_BUCKET}/`;
      const idx = url.indexOf(marker);
      return idx === -1 ? null : url.slice(idx + marker.length);
    })
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    await supabase.storage.from(PHOTO_BUCKET).remove(paths);
  }

  await supabase.from("properties").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/properties");
}
