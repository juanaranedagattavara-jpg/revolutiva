"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/experiencias", label: "Experiencias" },
  { href: "/hospedajes", label: "Hospedaje" },
  { href: "/operadores", label: "Operadores" },
  { href: "/principios", label: "Principios IGTR" },
  { href: "/mentoria", label: "Mentoría" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <div>
            <b>
              REVOLUTIVA<span style={{ color: "var(--terra)" }}>.TRAVEL</span>
            </b>
            <small>evolucionar viajando</small>
          </div>
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/explorar" className="btn btn-ghost btn-sm always">
            Explorar
          </Link>
          <Link href="/postular" className="btn btn-terra btn-sm always">
            Postula tu proyecto
          </Link>
          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
