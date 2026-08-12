import { NIVELES } from "@/lib/constants";

export default function LevelBadge({ nivel }: { nivel: number }) {
  const l = NIVELES[nivel];
  if (!l) return null;
  return (
    <span className={`level ${l.cls}`}>
      <span className="dot" />
      Nivel {nivel} · {l.name}
    </span>
  );
}
