function Fan({ cx, cy, r, dur }: { cx: number; cy: number; r: number; dur: string }) {
  const blades = Array.from({ length: 9 });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke="black" strokeOpacity="0.5" strokeWidth="1.6" fill="white" />
      <g>
        {blades.map((_, i) => {
          const angle = (360 / blades.length) * i;
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy - r * 0.52}
              rx={r * 0.16}
              ry={r * 0.42}
              fill="black"
              fillOpacity="0.55"
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur={dur}
          repeatCount="indefinite"
        />
      </g>
      <circle cx={cx} cy={cy} r={r * 0.14} fill="black" />
    </g>
  );
}

export default function GpuAnimation() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="h-auto w-72 shrink-0 md:w-96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gpuGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* ambient glow under the card */}
      <ellipse cx="190" cy="150" rx="150" ry="30" fill="url(#gpuGlow)" opacity="0.18">
        <animate attributeName="opacity" values="0.1;0.28;0.1" dur="2.6s" repeatCount="indefinite" />
      </ellipse>

      {/* PCB edge (bottom, peeking out) */}
      <rect x="55" y="118" width="270" height="14" fill="black" fillOpacity="0.85" />
      {/* PCIe connector fingers */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={70 + i * 22} y="128" width="12" height="8" fill="black" fillOpacity="0.6" />
      ))}

      {/* shroud body */}
      <rect x="30" y="30" width="300" height="92" rx="10" stroke="black" strokeWidth="2" fill="white" />
      <rect x="30" y="30" width="300" height="92" rx="10" stroke="black" strokeOpacity="0.08" strokeWidth="18" />

      {/* backplate screws */}
      <circle cx="44" cy="44" r="2.4" fill="black" fillOpacity="0.4" />
      <circle cx="316" cy="44" r="2.4" fill="black" fillOpacity="0.4" />
      <circle cx="44" cy="108" r="2.4" fill="black" fillOpacity="0.4" />
      <circle cx="316" cy="108" r="2.4" fill="black" fillOpacity="0.4" />

      {/* RGB light strip along the top edge, powering up */}
      <rect x="30" y="26" width="300" height="4" rx="2" fill="url(#gpuGlow)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
      </rect>

      {/* power LED */}
      <circle cx="308" cy="66" r="3.2" fill="#22c55e">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>

      {/* fans */}
      <Fan cx="105" cy="76" r="42" dur="2.4s" />
      <Fan cx="255" cy="76" r="42" dur="2.8s" />

      {/* label */}
      <text x="180" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="black" fillOpacity="0.35" letterSpacing="2">
        GPU
      </text>
    </svg>
  );
}
