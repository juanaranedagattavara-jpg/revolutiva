"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const [value, setValue] = useState(published);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !value;
    setValue(next);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from("listings").update({ published: next }).eq("id", id);
      if (error) setValue(!next);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`btn btn-sm ${value ? "btn-primary" : "btn-ghost"}`}
      style={{ minWidth: "96px" }}
    >
      {value ? "Publicado" : "Borrador"}
    </button>
  );
}
