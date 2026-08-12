import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: "16px" }}>
              <div className="logo" />
              <div>
                <b style={{ color: "#f1ede2" }}>
                  REVOLUTIVA<span style={{ color: "var(--terra)" }}>.TRAVEL</span>
                </b>
                <small style={{ color: "#8c9480" }}>Una iniciativa de la IGTR</small>
              </div>
            </Link>
            <p style={{ fontSize: ".92rem", maxWidth: "340px" }}>
              Viajes que regeneran relaciones: contigo, con las comunidades y con la naturaleza.
              Una red viva de lugares, anfitriones y experiencias con sentido.
            </p>
            <p style={{ fontSize: ".85rem" }}>
              <a href="https://turismoregenerativo.org/" target="_blank" rel="noopener">
                turismoregenerativo.org ↗
              </a>
            </p>
          </div>
          <div>
            <h5>Explorar</h5>
            <ul>
              <li>
                <Link href="/experiencias">Peregrinación / Naturaleza</Link>
              </li>
              <li>
                <Link href="/hospedajes">Hospedaje</Link>
              </li>
              <li>
                <Link href="/operadores">Operadores</Link>
              </li>
              <li>
                <Link href="/explorar">Buscar todo</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Para proyectos</h5>
            <ul>
              <li>
                <Link href="/postular">Postula tu proyecto</Link>
              </li>
              <li>
                <Link href="/mentoria">Mentoría IGTR</Link>
              </li>
              <li>
                <Link href="/niveles">Niveles evolutivos</Link>
              </li>
              <li>
                <Link href="/indicadores">Indicadores R</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>IGTR</h5>
            <ul>
              <li>
                <Link href="/principios">Principios</Link>
              </li>
              <li>
                <Link href="/principios">Las 3 relaciones</Link>
              </li>
              <li>
                <Link href="/mentoria">Modelo comercial</Link>
              </li>
              <li>
                <a href="https://turismoregenerativo.org/" target="_blank" rel="noopener">
                  Sitio IGTR ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} REVOLUTIVA.TRAVEL · Iniciativa Global de Turismo Regenerativo</span>
          <span>Curaduría · Transparencia · Mejora continua</span>
        </div>
      </div>
    </footer>
  );
}
