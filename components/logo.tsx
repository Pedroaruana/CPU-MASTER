export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="7" y="7" width="10" height="10" stroke="black" strokeWidth="1.4" />
        <rect x="10.25" y="10.25" width="3.5" height="3.5" fill="black" />
        <line x1="12" y1="0.5" x2="12" y2="4.5" stroke="black" strokeWidth="1.4" />
        <line x1="12" y1="19.5" x2="12" y2="23.5" stroke="black" strokeWidth="1.4" />
        <line x1="0.5" y1="12" x2="4.5" y2="12" stroke="black" strokeWidth="1.4" />
        <line x1="19.5" y1="12" x2="23.5" y2="12" stroke="black" strokeWidth="1.4" />
      </svg>
      <span className="text-lg font-semibold uppercase tracking-tight text-black">
        CPU<span className="font-light">Master</span>
      </span>
    </div>
  );
}
