"use client";

import { useEffect, useState } from "react";

export function showToast(msg: string) {
  window.dispatchEvent(new CustomEvent("revolutiva:toast", { detail: msg }));
}

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    function onToast(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setMsg(detail);
      setShow(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setShow(false), 2600);
    }
    window.addEventListener("revolutiva:toast", onToast);
    return () => {
      window.removeEventListener("revolutiva:toast", onToast);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
