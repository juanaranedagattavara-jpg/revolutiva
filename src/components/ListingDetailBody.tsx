import type { GuiadoData, HospedajeData, Listing } from "@/lib/types";

function StoryBlock({ ic, title, body }: { ic: string; title: string; body?: string | null }) {
  if (!body) return null;
  return (
    <div className="story-block">
      <h3>
        <span className="ic">{ic}</span>
        {title}
      </h3>
      <p>{body}</p>
    </div>
  );
}

function KV({ k, v }: { k: string; v?: string | null }) {
  if (!v) return null;
  return (
    <div className="item">
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </div>
  );
}

export default function ListingDetailBody({ item }: { item: Listing }) {
  if (item.category === "experiencia") return <ExperienciaBody item={item} />;
  if (item.category === "hospedaje") return <HospedajeBody item={item} />;
  return <GuiadoBody item={item} />;
}

function ExperienciaBody({ item: it }: { item: Listing }) {
  return (
    <>
      <StoryBlock ic="☷" title="Historia del lugar" body={it.historia} />
      <StoryBlock ic="⌖" title="Vocación del proyecto" body={it.vocacion} />
      <div className="kv">
        <KV k="Duración" v={it.duracion} />
        <KV k="Nivel de esfuerzo" v={it.esfuerzo} />
        <KV k="Tamaño de grupo" v={it.grupo} />
        <KV k="Anfitrión" v={it.anfitrion} />
        <KV k="Idiomas" v={it.idiomas.join(", ")} />
        <KV k="Para quién es ideal" v={it.viajero} />
      </div>
      <div className="taglist">
        {it.tipos.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <StoryBlock ic="✺" title="Qué vivirá el viajero" body={it.vivira} />
      <StoryBlock ic="✎" title="Qué aprenderá" body={it.aprendera} />
      <div className="story-block">
        <h3>
          <span className="ic">∞</span>Las tres relaciones
        </h3>
        <div className="kv">
          <KV k="Contigo" v={it.r_conmigo} />
          <KV k="Con la comunidad" v={it.r_comunidad} />
          <KV k="Con la naturaleza" v={it.r_naturaleza} />
          <KV k="Ritmo de la experiencia" v={it.ritmo} />
        </div>
      </div>
      <StoryBlock ic="☾" title="Ritmos del lugar · calendario regenerativo" body={it.calendario} />
      <StoryBlock ic="⚑" title="Qué debe saber antes de ir" body={it.saber_antes} />
      <StoryBlock ic="♺" title="Prácticas de reciprocidad" body={it.reciprocidad} />
      <p className="quote" style={{ marginTop: "24px", fontSize: "1.25rem" }}>
        Esta experiencia no es solo una actividad: es una invitación a entrar en relación con un
        territorio vivo.
      </p>
    </>
  );
}

function HospedajeBody({ item: it }: { item: Listing }) {
  const cd = it.category_data as HospedajeData;
  return (
    <>
      <StoryBlock ic="☷" title="Historia del lugar" body={it.historia} />
      <StoryBlock ic="♥" title="Filosofía de hospitalidad" body={cd.filosofia} />
      <StoryBlock ic="⌖" title="Vocación del proyecto" body={it.vocacion} />
      <div className="kv">
        <KV k="Tipo de alojamiento" v={cd.tipoAloj} />
        <KV k="Capacidad" v={cd.habitaciones} />
        <KV k="Alimentación" v={cd.alimentacion} />
        <KV k="Proveedores locales" v={cd.proveedores} />
        <KV k="Idiomas" v={it.idiomas.join(", ")} />
        <KV k="Para quién es ideal" v={it.viajero} />
      </div>
      <div className="story-block">
        <h3>
          <span className="ic">❧</span>Cómo cuida el lugar
        </h3>
        <div className="kv">
          <KV k="Gestión de agua" v={cd.agua} />
          <KV k="Gestión de energía" v={cd.energia} />
          <KV k="Gestión de residuos" v={cd.residuos} />
          <KV k="Relación con la comunidad" v={cd.comunidad} />
          <KV k="Conservación / restauración" v={cd.conservacion} />
          <KV k="Ritmos del lugar" v={it.ritmo} />
        </div>
      </div>
      <div className="taglist">
        {it.tipos.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <StoryBlock ic="☾" title="Temporadas y calendario regenerativo" body={it.calendario} />
      {!!cd.experienciasAsoc?.length && (
        <div className="story-block">
          <h3>
            <span className="ic">✺</span>Experiencias asociadas
          </h3>
          <div className="taglist">
            {cd.experienciasAsoc.map((e) => (
              <span className="tag" key={e}>
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
      <p className="quote" style={{ marginTop: "24px", fontSize: "1.25rem" }}>
        No es solo un lugar para dormir: es una forma de habitar, cuidar y participar del territorio.
      </p>
    </>
  );
}

function GuiadoBody({ item: it }: { item: Listing }) {
  const cd = it.category_data as GuiadoData;
  return (
    <>
      <StoryBlock ic="☺" title="Historia personal" body={cd.historiaPersonal} />
      <StoryBlock ic="⌖" title="Relación con el territorio" body={cd.relTerritorio} />
      <div className="kv">
        <KV k="Especialidad" v={cd.especialidad} />
        <KV k="Lugar de trabajo" v={it.territorio} />
        <KV k="Idiomas" v={it.idiomas.join(", ")} />
        <KV k="Para quién es ideal" v={it.viajero} />
      </div>
      {!!cd.tiposGuiado?.length && (
        <div className="story-block">
          <h3>
            <span className="ic">✺</span>Tipo de guiados
          </h3>
          <div className="taglist">
            {cd.tiposGuiado.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
      <StoryBlock ic="✎" title="Relatos y saberes que comparte" body={cd.saberes} />
      <div className="story-block">
        <h3>
          <span className="ic">∞</span>Cómo acompaña
        </h3>
        <div className="kv">
          <KV k="Cuida el ritmo del grupo" v={cd.cuidaRitmo} />
          <KV k="Interpreta naturaleza y cultura" v={cd.interpreta} />
          <KV k="Prácticas de seguridad" v={cd.seguridad} />
          <KV k="Acuerdos comunitarios" v={cd.acuerdos} />
          <KV k="Límites del territorio que comunica" v={cd.limites} />
          <KV k="Ritmos / calendario" v={it.calendario} />
        </div>
      </div>
      <p className="quote" style={{ marginTop: "24px", fontSize: "1.25rem" }}>
        Un intérprete vivo del lugar, no solo un prestador de servicios.
      </p>
    </>
  );
}
