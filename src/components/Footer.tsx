import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: "16px" }}>
              <div>
                <b style={{ color: "#f1ede2" }}>
                  REVOLUTIVA<span style={{ color: "var(--terra)" }}>.TRAVEL</span>
                </b>
                <small style={{ color: "#8c9480" }}>evolucionar viajando</small>
              </div>
            </Link>
            <p style={{ fontSize: ".92rem", maxWidth: "340px" }}>
              Viajes que regeneran relaciones: contigo, con las comunidades y con la naturaleza.
              Una red viva de lugares, anfitriones y experiencias con sentido.
            </p>
            <p style={{ fontSize: ".78rem", color: "#8c9480", marginBottom: "10px" }}>Con el respaldo de</p>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <a href="https://www.caminaconsultores.com" target="_blank" rel="noopener" title="Camina Consultores">
                <Image
                  src="https://caminaconsultores.com/wp-content/uploads/2025/11/Logo-Camina.png"
                  alt="Camina Consultores"
                  width={160}
                  height={32}
                  className="footer-partner-logo"
                  style={{ width: "auto", height: "32px" }}
                />
              </a>
              <a href="https://turismoregenerativo.org" target="_blank" rel="noopener" title="Iniciativa Global de Turismo Regenerativo">
                <Image
                  src="https://turismoregenerativo.org/v4/wp-content/uploads/elementor/thumbs/Logo-TR-1000-qz56jyib1wtdhze387v6ovpgw6mkrqdo09uazlxkwe.png"
                  alt="Turismo Regenerativo IGTR"
                  width={160}
                  height={32}
                  className="footer-partner-logo"
                  style={{ width: "auto", height: "32px" }}
                />
              </a>
            </div>
          </div>
          <div>
            <h5>Explorar</h5>
            <ul>
              <li>
                <Link href="/experiencias">Experiencias</Link>
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
          <span>Curaduría · Verificación · Evolución continua</span>
        </div>
      </div>
    </footer>
  );
}
