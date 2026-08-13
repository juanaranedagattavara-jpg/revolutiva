import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "110px 0", minHeight: "50vh" }}>
      <div className="wrap center" style={{ maxWidth: "560px" }}>
        <div className="eyebrow">404</div>
        <h1>No encontramos este lugar</h1>
        <p className="lead">
          El proyecto o la página que buscas no existe o fue movida. Puede que el enlace esté
          desactualizado.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
          <Link href="/explorar" className="btn btn-primary">
            Explorar la red
          </Link>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
