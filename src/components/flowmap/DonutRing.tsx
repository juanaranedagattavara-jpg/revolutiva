export default function DonutRing({
  pctValue,
  size = 70,
  stroke = 7,
  arcColor = "#436358",
  trackColor = "rgba(0,0,0,0.08)",
  textColor,
  showText = true,
}: {
  pctValue: number;
  size?: number;
  stroke?: number;
  arcColor?: string;
  trackColor?: string;
  textColor?: string;
  showText?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pctValue / 100) * c;
  return (
    <svg className="donut-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${pctValue}% de avance`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={arcColor}
        strokeWidth={stroke}
        strokeDasharray={c.toFixed(2)}
        strokeDashoffset={offset.toFixed(2)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {showText && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={(size * 0.24).toFixed(0)}
          fontWeight={700}
          fill={textColor || arcColor}
        >
          {pctValue}%
        </text>
      )}
    </svg>
  );
}
