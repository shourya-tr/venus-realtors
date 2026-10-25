import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client. Subject to RLS: can read active properties and insert leads,
 * nothing else. Safe to use from server components and server actions that
 * handle public (unauthenticated) requests.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
