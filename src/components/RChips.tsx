import { R_DIMS, ST } from "@/lib/constants";
import type { RDims } from "@/lib/types";

export default function RChips({ R }: { R: RDims }) {
  return (
    <div className="rchips">
      {R_DIMS.map((d) => (
        <div
          key={d.code}
          className={`rchip ${R[d.code]}`}
          title={`${d.code} ${d.name}: ${ST[R[d.code]]}`}
        />
      ))}
    </div>
  );
}
