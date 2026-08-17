"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export default function StatusSelect({
  table,
  id,
  value,
  options,
}: {
  table: "leads" | "postulations" | "flowmap_diagnosticos";
  id: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  const [status, setStatus] = useState(value);
  const [pending, startTransition] = useTransition();

  function handleChange(next: string) {
    const prev = status;
    setStatus(next);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from(table).update({ status: next }).eq("id", id);
      if (error) setStatus(prev);
    });
  }

  return (
    <select className="select" value={status} disabled={pending} onChange={(e) => handleChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
