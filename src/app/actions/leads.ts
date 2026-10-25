"use server";

import { createPublicClient } from "@/lib/supabase/public";

export type LeadFormState = {
  success: boolean;
  error?: string;
};

export type EnquiryFormState = {
  success: boolean;
  error?: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const propertyId = String(formData.get("property_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!propertyId || !name || !phone) {
    return { success: false, error: "Please fill in your name and phone number." };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("leads").insert({
    property_id: propertyId,
    name,
    phone,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone) {
    return { success: false, error: "Please fill in your name and phone number." };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    message: message || null,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
