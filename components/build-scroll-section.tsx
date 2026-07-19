"use client";

import { useEffect, useRef, useState } from "react";

const labels = [
  "Gabinete vazio",
  "Instalando a placa-mãe",
  "Encaixando processador e cooler",
  "Colocando as memórias RAM",
  "Montando a placa de vídeo",
  "Fechando o painel de vidro",
  "Sistema ligado",
];

const sideSteps = [
  "Gabinete",
  "Placa-mãe",
  "Processador e cooler",
  "Memória RAM",
  "Placa de vídeo",
  "Painel de vidro",
  "Sistema ligado",
];

const checklist = [
  { label: "Placa-mãe parafusada", stage: 2 },
  { label: "Cooler instalado", stage: 3 },
  { label: "Memórias encaixadas", stage: 4 },
  { label: "GPU na vertical", stage: 5 },
  { label: "Painel fechado", stage: 6 },
];

const bootLog = [
  { text: "gabinete detectado", stage: 1 },
  { text: "placa-mae: socket ok", stage: 2 },
  { text: "cooler: fan ativo", stage: 3 },
  { text: "memoria: 4 modulos", stage: 4 },
  { text: "gpu: conectada", stage: 5 },
  { text: "painel: fechado", stage: 6 },
];

const bounds = [0.05, 0.22, 0.38, 0.52, 0.7, 0.84];

function stageT(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function SpinFan({
  size,
  dur,
  glow,
}: {
  size: number;
  dur: string;
  glow: number;
}) {
  return (
    <div className="relative rounded-full" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 ${8 + glow * 22}px rgba(168,85,247,${0.25 + glow * 0.55}), inset 0 0 ${5 + glow * 12}px rgba(236,72,153,${0.2 + glow * 0.6})`,
        }}
      />
      <div className="absolute inset-0 rounded-full border border-black/40 bg-white/90" />
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[6%] top-[6%] h-[88%] w-[88%] animate-spin"
        style={{ animationDuration: dur }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="27"
            rx="8.5"
            ry="20"
            fill="black"
            fillOpacity="0.62"
            transform={`rotate(${i * 40} 50 50)`}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black" />
    </div>
  );
}

const centered: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
};

const metal = "linear-gradient(180deg, #f7f7f9 0%, #e2e2e7 55%, #c9c9cf 100%)";
const metalSide = "linear-gradient(180deg, #ececef 0%, #cfcfd6 60%, #b4b4bc 100%)";
const pcb = "linear-gradient(160deg, #14231a 0%, #0a130e 70%, #060b08 100%)";

export default function BuildScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(p);
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const board = ease(stageT(progress, bounds[0], bounds[1]));
  const cooler = ease(stageT(progress, bounds[1], bounds[2]));
  const ram = stageT(progress, bounds[2], bounds[3]);
  const gpu = ease(stageT(progress, bounds[3], bounds[4]));
  const glass = ease(stageT(progress, bounds[4], bounds[5]));
  const power = ease(stageT(progress, bounds[5], 0.97));

  let stageIndex = 0;
  for (let i = 0; i < bounds.length; i++) {
    if (progress >= bounds[i]) stageIndex = i + 1;
  }

  const rotY = -36 + progress * 20;
  const rotX = -10 + progress * 3;

  return (
    <div ref={containerRef} style={{ height: "500vh" }} className="relative bg-white">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden border-y border-black/10 bg-white px-4">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none absolute h-[460px] w-[460px] -translate-x-24 rounded-full bg-fuchsia-400 blur-[130px]"
          style={{ opacity: 0.08 + power * 0.22 }}
        />
        <div
          className="pointer-events-none absolute h-[460px] w-[460px] translate-x-32 rounded-full bg-purple-500 blur-[140px]"
          style={{ opacity: 0.07 + power * 0.2 }}
        />

        {/* side hud */}
        <div className="absolute left-10 top-1/2 z-10 hidden -translate-y-1/2 flex-col lg:flex xl:left-20">
          <div className="flex flex-col gap-4">
            {sideSteps.map((step, i) => {
              const done = stageIndex > i;
              const active = stageIndex === i;
              return (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: done || active ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(0,0,0,0.12)",
                      boxShadow: active ? "0 0 10px rgba(217,70,239,0.7)" : "none",
                      transform: active ? "scale(1.35)" : "scale(1)",
                    }}
                  >
                    {active && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400/60" />
                    )}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.25em] transition-colors duration-300"
                    style={{
                      color: active ? "#000" : done ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.22)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {step}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-2.5">
            {checklist.map((item) => {
              const on = stageIndex >= item.stage;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 transition-opacity duration-500"
                  style={{ opacity: on ? 1 : 0.18 }}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                    <circle cx="8" cy="8" r="7" stroke={on ? "#a855f7" : "rgba(0,0,0,0.3)"} strokeWidth="1.4" />
                    <path d="M5 8.2 L7.2 10.4 L11 6.2" stroke={on ? "#ec4899" : "rgba(0,0,0,0.3)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs text-neutral-500">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-8 flex w-fit items-center gap-2 rounded-full border px-4 py-2 transition-all duration-500"
            style={{
              opacity: power > 0.4 ? 1 : 0.15,
              borderColor: power > 0.4 ? "rgba(34,197,94,0.6)" : "rgba(0,0,0,0.15)",
              boxShadow: power > 0.4 ? "0 0 18px rgba(34,197,94,0.25)" : "none",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "#22c55e",
                boxShadow: power > 0.4 ? "0 0 8px rgba(34,197,94,0.9)" : "none",
              }}
            />
            <span className="text-xs font-medium text-black">Sistema ligado</span>
          </div>
        </div>

        {/* right hud: boot log + telemetry */}
        <div className="absolute right-10 top-1/2 z-10 hidden w-56 -translate-y-1/2 flex-col lg:flex xl:right-20">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            Monitoramento
          </p>

          <div className="flex flex-col gap-2 font-mono text-[11px]">
            {bootLog.map((line) => {
              const on = stageIndex >= line.stage;
              return (
                <div
                  key={line.text}
                  className="flex items-center justify-between gap-3 transition-opacity duration-500"
                  style={{ opacity: on ? 1 : 0.15 }}
                >
                  <span className="text-neutral-600">&gt; {line.text}</span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: on ? "#22c55e" : "rgba(0,0,0,0.25)" }}
                  >
                    OK
                  </span>
                </div>
              );
            })}
            <div
              className="flex items-center gap-1 transition-opacity duration-500"
              style={{ opacity: power > 0.3 ? 1 : 0.15 }}
            >
              <span className="text-neutral-600">&gt; boot: sistema ligado</span>
              <span className="inline-block h-3 w-1.5 animate-pulse bg-fuchsia-500" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                label: "Consumo",
                value: `${Math.round(power * 420)}W`,
                pct: power,
              },
              {
                label: "Fans",
                value: `${Math.round(900 + power * 1100)} RPM`,
                pct: 0.4 + power * 0.6,
              },
              {
                label: "Temp. CPU",
                value: `${Math.round(power * 34)}°C`,
                pct: power * 0.34,
              },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {m.label}
                  </span>
                  <span className="font-mono text-xs text-black">{m.value}</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round(m.pct * 100)}%`,
                      background: "linear-gradient(90deg, #a855f7, #ec4899)",
                      boxShadow: power > 0.4 ? "0 0 8px rgba(217,70,239,0.5)" : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 mb-2 text-xs uppercase tracking-[0.4em] text-neutral-400">
          {labels[stageIndex]}
        </p>

        <div className="relative scale-[0.55] sm:scale-75 lg:scale-100">
          {/* ground shadow */}
          <div
            className="absolute left-1/2 top-[calc(50%+235px)] h-16 w-[560px] -translate-x-1/2 rounded-[50%] bg-black blur-2xl"
            style={{ opacity: 0.16 + power * 0.08 }}
          />

          <div
            className="relative"
            style={{
              width: 660,
              height: 560,
              perspective: 1500,
              perspectiveOrigin: "50% 42%",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              }}
            >
              {/* ── case shell ── */}

              {/* motherboard tray (back wall) */}
              <div
                style={{
                  ...centered,
                  width: 380,
                  height: 420,
                  transform: "translate(-50%, -50%) translateZ(-95px)",
                  background: "linear-gradient(160deg, #e8e8ec 0%, #d2d2d8 60%, #bebec6 100%)",
                  border: "1px solid rgba(0,0,0,0.35)",
                }}
              >
                {/* cable grommets */}
                {[70, 180, 290].map((y) => (
                  <div
                    key={y}
                    className="absolute right-3 rounded-full bg-black/70"
                    style={{ top: y, width: 12, height: 46 }}
                  />
                ))}
                {/* rgb strip along the top, lights on power */}
                <div
                  className="absolute left-2 right-2 top-1.5 h-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
                    opacity: power,
                    boxShadow: `0 0 ${14 * power}px rgba(217,70,239,${0.8 * power})`,
                  }}
                />
              </div>

              {/* top panel */}
              <div
                style={{
                  ...centered,
                  width: 380,
                  height: 190,
                  transform: "translate(-50%, -50%) translateY(-210px) rotateX(90deg)",
                  background: metal,
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute left-8 right-8 top-1/2 h-16 -translate-y-1/2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 2px, transparent 2px 10px)",
                  }}
                />
              </div>

              {/* bottom panel */}
              <div
                style={{
                  ...centered,
                  width: 380,
                  height: 190,
                  transform: "translate(-50%, -50%) translateY(210px) rotateX(90deg)",
                  background: "linear-gradient(180deg, #b8b8bf, #97979f)",
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              />

              {/* front panel (right side) with intake fans behind mesh */}
              <div
                style={{
                  ...centered,
                  width: 190,
                  height: 420,
                  transform: "translate(-50%, -50%) translateX(190px) rotateY(90deg)",
                  background: metalSide,
                  border: "1px solid rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="absolute inset-2"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1.4px)",
                    backgroundSize: "7px 7px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <SpinFan size={116} dur="1.35s" glow={0.3 + power * 0.7} />
                  <SpinFan size={116} dur="1.6s" glow={0.3 + power * 0.7} />
                  <SpinFan size={116} dur="1.5s" glow={0.3 + power * 0.7} />
                </div>
              </div>

              {/* rear panel (left side) */}
              <div
                style={{
                  ...centered,
                  width: 190,
                  height: 420,
                  transform: "translate(-50%, -50%) translateX(-190px) rotateY(90deg)",
                  background: "linear-gradient(180deg, #c9c9cf, #a8a8b0)",
                  border: "1px solid rgba(0,0,0,0.35)",
                }}
              />

              {/* psu shroud shelf */}
              <div
                style={{
                  ...centered,
                  width: 380,
                  height: 190,
                  transform: "translate(-50%, -50%) translateY(115px) rotateX(90deg)",
                  background: metal,
                  border: "1px solid rgba(0,0,0,0.25)",
                }}
              />

              {/* psu shroud front */}
              <div
                className="flex items-center justify-between px-5"
                style={{
                  ...centered,
                  width: 380,
                  height: 95,
                  transform: "translate(-50%, -50%) translateY(162px) translateZ(88px)",
                  background: metal,
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-black/60">
                  CPU Master
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: "#22c55e",
                    opacity: 0.25 + power * 0.75,
                    boxShadow: `0 0 ${10 * power}px rgba(34,197,94,${power})`,
                  }}
                />
              </div>

              {/* shroud rgb underglow on power */}
              <div
                style={{
                  ...centered,
                  width: 340,
                  height: 10,
                  transform: "translate(-50%, -50%) translateY(112px) translateZ(70px)",
                  background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
                  filter: "blur(7px)",
                  opacity: power * 0.9,
                }}
              />

              {/* ── parts ── */}

              {/* motherboard */}
              <div
                style={{
                  ...centered,
                  width: 250,
                  height: 250,
                  transform: `translate(-50%, -50%) translateX(-45px) translateY(-55px) translateZ(${-88 + (1 - board) * 380}px) rotateY(${(1 - board) * -25}deg)`,
                  opacity: Math.min(1, board * 2.5),
                  background: pcb,
                  border: "1px solid rgba(0,0,0,0.5)",
                  borderRadius: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                {/* io + vrm heatsink */}
                <div
                  className="absolute left-3 top-3 h-16 w-9 rounded-sm"
                  style={{ background: metalSide, border: "1px solid rgba(0,0,0,0.3)" }}
                />
                <div
                  className="absolute left-14 top-3 h-7 w-24 rounded-sm"
                  style={{ background: metalSide, border: "1px solid rgba(0,0,0,0.3)" }}
                />
                {/* socket */}
                <div className="absolute left-[72px] top-[62px] h-14 w-14 border border-white/25 bg-black/40" />
                {/* ram slots */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute top-8 h-40 w-1.5 rounded-full bg-black/70"
                    style={{ right: 14 + i * 10, border: "1px solid rgba(255,255,255,0.14)" }}
                  />
                ))}
                {/* chipset heatsink */}
                <div
                  className="absolute bottom-6 right-6 h-14 w-14 rounded-sm"
                  style={{ background: metalSide, border: "1px solid rgba(0,0,0,0.3)" }}
                >
                  <div
                    className="absolute inset-1 rounded-sm"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 5px)",
                    }}
                  />
                </div>
                {/* pcie slots */}
                <div className="absolute bottom-16 left-4 h-2 w-36 rounded-full bg-black/80" />
                <div className="absolute bottom-9 left-4 h-2 w-24 rounded-full bg-black/80" />
                {/* m.2 heatsink */}
                <div
                  className="absolute bottom-24 left-8 h-5 w-28 rounded-sm"
                  style={{ background: metalSide, border: "1px solid rgba(0,0,0,0.3)" }}
                />
                {/* traces */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0 17px, rgba(212,175,55,0.25) 17px 18px), repeating-linear-gradient(90deg, transparent 0 23px, rgba(212,175,55,0.18) 23px 24px)",
                  }}
                />
              </div>

              {/* cooler fin stack */}
              <div
                style={{
                  ...centered,
                  width: 104,
                  height: 118,
                  transform: `translate(-50%, -50%) translateX(-52px) translateY(-92px) translateZ(${-50 + (1 - cooler) * 420}px)`,
                  opacity: Math.min(1, cooler * 2.5),
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #d6d6db 0 3px, #9a9aa2 3px 5px)",
                  border: "1px solid rgba(0,0,0,0.4)",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              />
              {/* cooler fan */}
              <div
                style={{
                  ...centered,
                  transform: `translate(-50%, -50%) translateX(-52px) translateY(-92px) translateZ(${-16 + (1 - cooler) * 460}px)`,
                  opacity: Math.min(1, cooler * 2.5),
                }}
              >
                <SpinFan size={112} dur="1.05s" glow={0.35 + power * 0.65} />
              </div>

              {/* ram sticks */}
              {[0, 1, 2, 3].map((i) => {
                const st = ease(Math.min(1, Math.max(0, ram * 1.45 - i * 0.12)));
                return (
                  <div
                    key={i}
                    style={{
                      ...centered,
                      width: 10,
                      height: 150,
                      transform: `translate(-50%, -50%) translateX(${34 + i * 15}px) translateY(${-70 + (1 - st) * -340}px) translateZ(-78px)`,
                      opacity: Math.min(1, st * 3),
                      background: "linear-gradient(180deg, #3a3a40 0%, #1c1c21 100%)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 2,
                    }}
                  >
                    <div
                      className="absolute -top-0.5 left-0 right-0 h-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #a855f7, #ec4899)",
                        opacity: 0.5 + power * 0.5,
                        boxShadow: `0 0 ${4 + 10 * power}px rgba(217,70,239,${0.5 + 0.5 * power})`,
                      }}
                    />
                  </div>
                );
              })}

              {/* gpu, vertical mount */}
              <div
                style={{
                  ...centered,
                  width: 300,
                  height: 120,
                  transform: `translate(-50%, -50%) translateX(${20 + (1 - gpu) * 480}px) translateY(40px) translateZ(20px) rotateY(${(1 - gpu) * 30}deg)`,
                  opacity: Math.min(1, gpu * 2.5),
                  background: "linear-gradient(180deg, #2e2e34 0%, #151518 70%, #0a0a0c 100%)",
                  border: "1px solid rgba(0,0,0,0.6)",
                  borderRadius: 8,
                  boxShadow: "0 14px 34px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute -top-1 left-2 right-2 h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
                    opacity: 0.5 + power * 0.5,
                    boxShadow: `0 0 ${5 + 12 * power}px rgba(217,70,239,${0.5 + 0.5 * power})`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <SpinFan size={88} dur="1.25s" glow={0.3 + power * 0.7} />
                  <SpinFan size={88} dur="1.45s" glow={0.3 + power * 0.7} />
                  <SpinFan size={88} dur="1.35s" glow={0.3 + power * 0.7} />
                </div>
                <span className="absolute bottom-1.5 right-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                  GPU
                </span>
              </div>

              {/* tempered glass side panel */}
              <div
                style={{
                  ...centered,
                  width: 380,
                  height: 420,
                  transform: `translate(-50%, -50%) translateZ(${95 + (1 - glass) * 380}px) rotateY(${(1 - glass) * -28}deg)`,
                  opacity: glass * 0.96,
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.08) 30%, rgba(230,230,240,0.05) 55%, rgba(255,255,255,0.16) 100%)",
                  border: "1px solid rgba(0,0,0,0.4)",
                  borderRadius: 4,
                  backdropFilter: "blur(0.5px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 42%, transparent 50%)",
                  }}
                />
                {[
                  { left: 8, top: 8 },
                  { right: 8, top: 8 },
                  { left: 8, bottom: 8 },
                  { right: 8, bottom: 8 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute h-2.5 w-2.5 rounded-full border border-black/40 bg-neutral-300"
                    style={pos}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-2 flex items-center gap-2 lg:hidden">
          {labels.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-7 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: i <= stageIndex ? "black" : "rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
