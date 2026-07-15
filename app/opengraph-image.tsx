import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={64} height={64} viewBox="0 0 24 24" fill="none">
            <rect x="7" y="7" width="10" height="10" stroke="black" strokeWidth="1.4" />
            <rect x="10.25" y="10.25" width="3.5" height="3.5" fill="black" />
            <line x1="12" y1="0.5" x2="12" y2="4.5" stroke="black" strokeWidth="1.4" />
            <line x1="12" y1="19.5" x2="12" y2="23.5" stroke="black" strokeWidth="1.4" />
            <line x1="0.5" y1="12" x2="4.5" y2="12" stroke="black" strokeWidth="1.4" />
            <line x1="19.5" y1="12" x2="23.5" y2="12" stroke="black" strokeWidth="1.4" />
          </svg>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#000" }}>
            CPU<span style={{ fontWeight: 300 }}>MASTER</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#737373" }}>
          Monte seu PC sem medo de incompatibilidade
        </div>
      </div>
    ),
    { ...size }
  );
}
