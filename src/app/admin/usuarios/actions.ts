"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Server Actions are callable as their own endpoint regardless of which page
 * rendered the form, so re-check the caller is an admin here too — the
 * /admin middleware gate alone isn't enough.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.user_metadata?.role === "admin";
}

export async function createAdminUser(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "No autorizado." };
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Ingresa un email válido." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "admin" },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/usuarios");
  return { success: true };
}
