import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-2)" }}>
      <div style={{ background: "var(--ink)", color: "#f4f0e6" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/admin" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
            REVOLUTIVA <span style={{ color: "var(--terra)" }}>admin</span>
          </Link>
          {user && (
            <nav style={{ display: "flex", gap: "1.4rem", alignItems: "center", fontSize: ".9rem" }}>
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/listings">Listings</Link>
              <Link href="/admin/leads">Leads</Link>
              <Link href="/admin/postulaciones">Postulaciones</Link>
              <span style={{ opacity: 0.6 }}>{user.email}</span>
              <AdminLogoutButton />
            </nav>
          )}
        </div>
      </div>
      <div className="wrap" style={{ padding: "34px 24px 60px" }}>
        {children}
      </div>
    </div>
  );
}
