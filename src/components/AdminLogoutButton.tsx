"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{ background: "none", border: "1px solid #ffffff33", color: "#f4f0e6", borderRadius: "999px", padding: ".4em .9em", fontSize: ".85rem", cursor: "pointer" }}
    >
      Cerrar sesión
    </button>
  );
}
