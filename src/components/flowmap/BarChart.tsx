"use client";

import { useEffect, useRef } from "react";

export default function BarChart({
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
    const marginLeft = 130;
    const marginRight = 30;
    const marginTop = 20;
    const marginBottom = 20;
    const chartW = w - marginLeft - marginRight;
    const chartH = h - marginTop - marginBottom;
    const n = labels.length;
    const barH = (chartH / n) * 0.6;
    const gap = chartH / n;
    const maxVal = 7;

    ctx.strokeStyle = "#ddd5c6";
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, marginTop + chartH);
    ctx.stroke();

    labels.forEach((lab, i) => {
      const y = marginTop + gap * i + gap / 2 - barH / 2;
      const v = valores[i] ?? 0;
      const barW = chartW * (v / maxVal);
      ctx.fillStyle = colores[i] || "#436358";
      ctx.fillRect(marginLeft, y, barW, barH);
      ctx.fillStyle = "#26241f";
      ctx.textAlign = "right";
      ctx.font = "11px sans-serif";
      ctx.fillText(lab, marginLeft - 10, y + barH / 2 + 4);
      ctx.textAlign = "left";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(v.toFixed(1), marginLeft + barW + 8, y + barH / 2 + 4);
    });
  }, [labels, valores, colores]);

  return <canvas ref={ref} width={380} height={380} role="img" aria-label={ariaLabel} />;
}
