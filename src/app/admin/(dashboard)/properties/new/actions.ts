"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

const PHOTO_BUCKET = "property-photos";

export async function createProperty(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const address = String(formData.get("address") ?? "").trim();
  const bedrooms = Number(formData.get("bedrooms") ?? 0);
  const bathrooms = Number(formData.get("bathrooms") ?? 0);
  const sqft = Number(formData.get("sqft") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const youtubeUrlRaw = String(formData.get("youtube_url") ?? "").trim();
  const youtube_url = youtubeUrlRaw.length > 0 ? youtubeUrlRaw : null;
  const price = Number(priceRaw);

  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!address || !Number.isFinite(price) || price < 0) {
    redirect(
      `/admin/properties/new?error=${encodeURIComponent("Please provide a valid address and price.")}`,
    );
  }

  const supabase = createAdminClient();

  const uploadResults = await Promise.all(
    photos.map(async (photo) => {
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

  const photo_urls: string[] = [];
  for (const r of uploadResults) {
    if ("error" in r) {
      redirect(`/admin/properties/new?error=${encodeURIComponent(`Photo upload failed: ${r.error}`)}`);
    }
    photo_urls.push(r.url);
  }

  const { error: insertError } = await supabase.from("properties").insert({
    name,
    price,
    address,
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : 0,
    bathrooms: Number.isFinite(bathrooms) ? bathrooms : 0,
    sqft: Number.isFinite(sqft) ? sqft : 0,
    description,
    youtube_url,
    photo_urls,
  });

  if (insertError) {
    redirect(`/admin/properties/new?error=${encodeURIComponent(insertError.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}
