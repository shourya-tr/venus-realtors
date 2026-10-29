"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

const PHOTO_BUCKET = "property-photos";

export async function updateProperty(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const address = String(formData.get("address") ?? "").trim();
  const bedrooms = Number(formData.get("bedrooms") ?? 0);
  const bathrooms = Number(formData.get("bathrooms") ?? 0);
  const sqft = Number(formData.get("sqft") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const youtubeUrlRaw = String(formData.get("youtube_url") ?? "").trim();
  const youtube_url = youtubeUrlRaw.length > 0 ? youtubeUrlRaw : null;
  const isActive = formData.get("is_active") === "on";
  const price = Number(priceRaw);

  if (!id || !address || !Number.isFinite(price) || price < 0) {
    redirect(
      `/admin/properties/${id}/edit?error=${encodeURIComponent("Please provide a valid address and price.")}`,
    );
  }

  const supabase = createAdminClient();

  const existingUrlsRaw = String(formData.get("existing_photo_urls") ?? "");
  const photo_urls: string[] = existingUrlsRaw ? existingUrlsRaw.split("\n").filter(Boolean) : [];

  const newPhotos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const uploadResults = await Promise.all(
    newPhotos.map(async (photo) => {
      const ext = photo.name.includes(".") ? photo.name.split(".").pop() : "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(PHOTO_BUCKET)
        .upload(path, photo, { contentType: photo.type || "image/jpeg" });
      if (uploadError) return { error: uploadError.message };
      const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
      return { url: data.publicUrl };
    }),
  );

  for (const r of uploadResults) {
    if ("error" in r) {
      redirect(`/admin/properties/${id}/edit?error=${encodeURIComponent(`Photo upload failed: ${r.error}`)}`);
    }
    photo_urls.push(r.url);
  }

  const { error: updateError } = await supabase
    .from("properties")
    .update({
      name,
      price,
      address,
      bedrooms: Number.isFinite(bedrooms) ? bedrooms : 0,
      bathrooms: Number.isFinite(bathrooms) ? bathrooms : 0,
      sqft: Number.isFinite(sqft) ? sqft : 0,
      description,
      youtube_url,
      photo_urls,
      is_active: isActive,
    })
    .eq("id", id);

  if (updateError) {
    redirect(`/admin/properties/${id}/edit?error=${encodeURIComponent(updateError.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}
