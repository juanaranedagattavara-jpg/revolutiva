import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anon, cookie-free client for public reads (published listings, etc).
 * Unlike lib/supabase/server.ts this never touches next/headers cookies(),
 * so routes that only use this client stay eligible for static rendering
 * and ISR (`export const revalidate`) instead of being forced dynamic.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
