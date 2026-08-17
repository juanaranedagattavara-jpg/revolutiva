"use client";

import { useEffect, useRef } from "react";

export default function RadarChart({
  labels,
  valores,
  colores,
  ariaLabel,
}: {
  labels: string[];
  valores: (number | null)[];
  colores: string[];
  ariaLabel: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 50;
    const n = labels.length;
    const maxVal = 7;

    ctx.strokeStyle = "#ddd5c6";
    ctx.fillStyle = "#57534a";
    ctx.font = "11px sans-serif";
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      const rr = radius * (ring / 4);
      for (let i = 0; i <= n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + rr * Math.cos(angle);
        const y = cy + rr * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = "#ddd5c6";
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
      const lx = cx + (radius + 28) * Math.cos(angle);
      const ly = cy + (radius + 28) * Math.sin(angle);
      ctx.fillStyle = "#26241f";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? "center" : Math.cos(angle) > 0 ? "left" : "right";
      ctx.fillText(labels[i], lx, ly);
    }

    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const v = valores[i] ?? 0;
      const rr = radius * (v / maxVal);
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + rr * Math.cos(angle);
      const y = cy + rr * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(95,138,126,0.25)";
    ctx.strokeStyle = "#436358";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    for (let i = 0; i < n; i++) {
      const v = valores[i] ?? 0;
      const rr = radius * (v / maxVal);
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + rr * Math.cos(angle);
      const y = cy + rr * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colores[i] || "#436358";
      ctx.fill();
    }
  }, [labels, valores, colores]);

  return <canvas ref={ref} width={380} height={380} role="img" aria-label={ariaLabel} />;
}
