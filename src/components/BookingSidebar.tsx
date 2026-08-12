"use client";

import { useState } from "react";
import { clp, priceUnit } from "@/lib/constants";
import { listingR, type Listing } from "@/lib/types";
import RPanel, { NextImprovementNote } from "./RPanel";
import LeadFormModal from "./LeadFormModal";

const ACCIONES = ["Pedir cotización", "Solicitar información", "Contactar anfitrión", "Solicitar viaje a medida"];

export default function BookingSidebar({ item, price }: { item: Listing; price: number | null }) {
  const [accion, setAccion] = useState<string | null>(null);

  return (
    <aside>
      <div className="booking">
        <div className="price">
          {clp(price)} <small>{priceUnit(item.category)}</small>
        </div>
        <div className="muted" style={{ fontSize: ".85rem" }}>
          {item.modalidad_precio}
        </div>
        <div className="stack">
          {ACCIONES.map((a, i) => (
            <button
              key={a}
              className={`btn btn-block ${i === 0 ? "btn-terra" : i === 1 ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setAccion(a)}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="note">Reserva curada por REVOLUTIVA.TRAVEL. Respondemos en 48 h.</div>
        <RPanel R={listingR(item)} />
        <p
          style={{
            fontSize: ".85rem",
            margin: "14px 0 0",
            padding: "12px",
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid var(--line)",
          }}
        >
          <NextImprovementNote R={listingR(item)} />
        </p>
      </div>
      {accion && (
        <LeadFormModal
          listingId={item.id}
          listingName={item.nombre}
          anfitrion={item.anfitrion}
          accion={accion}
          onClose={() => setAccion(null)}
        />
      )}
    </aside>
  );
}
