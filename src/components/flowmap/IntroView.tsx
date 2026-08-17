import { ELEMENTOS, ORDEN_ELEMENTOS, ORDEN_RS, RANGOS, RS, resolveColor } from "@/lib/flowmap/data";
import styles from "./flowmap.module.css";

export default function IntroView({ onComenzar }: { onComenzar: () => void }) {
  return (
    <section aria-labelledby="intro-title">
      <div className={styles.card}>
        <h2 id="intro-title" className={styles.sectionTitle}>FlowMap de Turismo Regenerativo</h2>
        <p className={styles.sectionSub}>Una herramienta para observar a las organizaciones turísticas como sistemas vivos.</p>

        <p>El FlowMap adapta una mirada viva y bioantropocéntrica al contexto de empresas, organizaciones y emprendimientos turísticos.</p>
        <p>Desde esta perspectiva, una organización no es entendida únicamente como una estructura destinada a producir servicios o generar ingresos. Es observada como una Organización Viva que posee identidad, relaciones, procesos y recursos, y que forma parte de un territorio igualmente vivo.</p>
        <p>La mirada bioantropocéntrica comprende al ser humano y a la naturaleza como una totalidad interdependiente. Las cualidades presentes en la naturaleza también se manifiestan en las personas, las comunidades y las organizaciones.</p>
        <p>El FlowMap utiliza los cuatro elementos —tierra, agua, aire y fuego— como una estructura para observar las diferentes dimensiones de la vida organizacional.</p>
      </div>

      <p className={styles.nivelesEyebrow} style={{ marginTop: "2.5rem" }}>Génesis y método FlowMap</p>
      <h2 className={styles.sectionTitle} style={{ marginBottom: ".25rem" }}>Mirada bioantropocéntrica para organismos vivos</h2>
      <p className={styles.sectionSub}>La correspondencia entre los cuatro elementos, sus facultades y los ámbitos que observa el FlowMap en cada organización.</p>

      <div className={styles.infoTableWrap}>
        <table className={styles.infoTable}>
          <thead>
            <tr><th>Elemento</th><th>Entendimiento</th><th>Facultades</th><th>Reino</th><th>Ámbito</th></tr>
          </thead>
          <tbody>
            {ORDEN_ELEMENTOS.map((key) => {
              const el = ELEMENTOS[key];
              return (
                <tr key={key} className={styles[`${key}Row`]}>
                  <td>
                    <span className={styles.elementoCell}>
                      <span className={styles.circleIcon} aria-hidden="true">{el.icon}</span>
                      <span className={styles.name}>{el.nombre.toUpperCase()}</span>
                    </span>
                  </td>
                  <td>{el.entendimiento}</td>
                  <td>{el.facultad}</td>
                  <td>{el.reino}</td>
                  <td>{el.ambito}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className={styles.sectionTitle}>Los cuatro elementos</h2>
      <p className={styles.sectionSub}>Cada elemento organiza una etapa del cuestionario.</p>
      <div className={styles.elementosGrid}>
        {ORDEN_ELEMENTOS.map((key) => {
          const el = ELEMENTOS[key];
          return (
            <div key={key} className={`${styles.elementoCard} ${styles[el.claseColor]}`}>
              <span className={styles.icon} aria-hidden="true">{el.icon}</span>
              <span className={styles.ambitoLabel}>{el.ambito}</span>
              <h3>{el.nombre} — {el.ambito.toUpperCase()}</h3>
              <p>{el.descripcion}</p>
              <strong style={{ fontSize: ".85rem", display: "block", marginTop: ".5rem" }}>Preguntas centrales:</strong>
              <ul>
                {el.preguntasCentrales.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <h2 className={styles.sectionTitle}>Las cinco R</h2>
      <p className={styles.sectionSub}>Después de responder el cuestionario, los resultados se reinterpretan a través de cinco indicadores regenerativos.</p>
      <div className={styles.rGrid}>
        {ORDEN_RS.map((key) => {
          const r = RS[key];
          return (
            <div key={key} className={styles.rCard} style={{ borderTopColor: `var(--${key})` }}>
              <h4>{r.nombre}</h4>
              <p>{r.descripcion}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.flowDiagram}>
        <strong>Los cuatro elementos organizan el cuestionario. Las cinco R reinterpretan los resultados.</strong>
        <p style={{ marginTop: ".5rem" }}>
          Cada uno de los 16 principios del FlowMap alimenta una o más R: la mayoría contribuye a una R principal, y
          dos principios del ámbito Agua contribuyen además a una R secundaria, conservando su puntuación completa
          en ambas lecturas.
        </p>
      </div>

      <section className={styles.nivelesSection} aria-labelledby="niveles-title">
        <p className={styles.nivelesEyebrow}>Curaduría evolutiva</p>
        <h2 id="niveles-title" className={styles.sectionTitle}>Sistema de niveles evolutivos</h2>
        <p className={styles.sectionSub}>
          No exigimos perfección. Este marco acompaña a cada organización en su camino hacia una relación más
          madura con la vida, el territorio y las personas. Los resultados de este autodiagnóstico se leen a
          través de estos tres niveles.
        </p>
        <div className={styles.nivelesGrid}>
          {RANGOS.map((r) => {
            const color = resolveColor(r.color);
            return (
              <div key={r.numero} className={styles.nivelCard}>
                <div className={styles.nivelIndex}>{r.numero}</div>
                <span className={styles.nivelBadge} style={{ background: `${color}22`, color }}>
                  Nivel {parseInt(r.numero, 10)} · {r.nivel}
                </span>
                <h4>{r.nivel}</h4>
                <p>{r.texto}</p>
                <p className={styles.visibilidad}><strong>Visibilidad:</strong> {r.visibilidad}</p>
              </div>
            );
          })}
        </div>
        <p className={styles.nivelesDisclaimer}>
          Estos niveles describen el grado de integración observado a partir de tus propias respuestas. No
          constituyen una certificación ni una evaluación oficial de la IGTR.
        </p>
      </section>

      <div className={styles.closingPhraseWrap}>
        <h2 className={styles.sectionTitle}>¿Listo para comenzar?</h2>
        <div className={styles.noticeList} style={{ marginTop: "1.25rem" }}>
          <ul>
            <li>No hay respuestas correctas o incorrectas.</li>
            <li>La herramienta no constituye una certificación.</li>
            <li>El propósito es reconocer fortalezas, contradicciones, brechas y posibilidades de evolución.</li>
            <li>Las respuestas deben reflejar la situación actual y no solamente las aspiraciones de la organización.</li>
            <li>Se recomienda realizar el ejercicio individualmente y posteriormente contrastarlo con equipos, colaboradores y actores territoriales.</li>
            <li>Se recomienda repetir el diagnóstico al menos una vez al año.</li>
          </ul>
        </div>
        <button type="button" className={`${styles.btn} ${styles.btnBig}`} style={{ marginTop: "2rem" }} onClick={onComenzar}>
          Comenzar el autodiagnóstico
        </button>
        <p className={styles.closingPhrase} style={{ marginTop: "2rem" }}>Bienvenido a una red viva de lugares, anfitriones y experiencias de impacto regenerativo</p>
      </div>
    </section>
  );
}
