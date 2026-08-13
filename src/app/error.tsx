"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section style={{ padding: "110px 0", minHeight: "50vh" }}>
      <div className="wrap center" style={{ maxWidth: "560px" }}>
        <div className="eyebrow">Algo no salió bien</div>
        <h1>No pudimos cargar esta página</h1>
        <p className="lead">
          Tuvimos un problema temporal al conectar con el servidor. Intenta de nuevo en unos
          segundos.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
          <button onClick={reset} className="btn btn-primary">
            Reintentar
          </button>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
