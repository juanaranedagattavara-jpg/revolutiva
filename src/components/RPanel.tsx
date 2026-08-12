import { R_DIMS, ST } from "@/lib/constants";
import type { RDims, RState } from "@/lib/types";

function nextImprovement(R: RDims): { code: string; name: string } {
  const order: RState[] = ["inicial", "desarrollo", "enraizado"];
  let weakest = R_DIMS[0];
  let min = 3;
  R_DIMS.forEach((d) => {
    const v = order.indexOf(R[d.code]);
    if (v < min) {
      min = v;
      weakest = d;
    }
  });
  return weakest;
}

export function NextImprovementNote({ R }: { R: RDims }) {
  const w = nextImprovement(R);
  return (
    <>
      Siguiente mejora sugerida: fortalecer <b>{w.code} {w.name}</b>.
    </>
  );
}

export default function RPanel({ R, title = "Indicadores R" }: { R: RDims; title?: string }) {
  return (
    <div className="rpanel">
      <h4
        style={{
          fontFamily: "var(--font-sans)",
          textTransform: "uppercase",
          letterSpacing: ".12em",
          fontSize: ".74rem",
          color: "var(--muted)",
          marginBottom: "6px",
        }}
      >
        {title}
      </h4>
      {R_DIMS.map((d) => {
        const s = R[d.code];
        return (
          <div className="rrow" key={d.code}>
            <div className={`semaforo s-${s}`}>
              <i />
              <i />
              <i />
            </div>
            <div className="rlabel">
              <b>
                {d.code} · {d.name}
              </b>
              <span>{d.desc}</span>
            </div>
            <span className={`rstate st-${s}`}>{ST[s]}</span>
          </div>
        );
      })}
    </div>
  );
}
