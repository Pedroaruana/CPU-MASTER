"use client";

import { useEffect, useRef, useState } from "react";
import {
  BuildPreset,
  buildPresets,
  coolers,
  cpus,
  gpus,
  motherboards,
  psus,
  rams,
  ssds,
} from "@/lib/parts";

const descriptions: Record<string, string> = {
  "custo-beneficio": "Para jogar em Full HD sem pesar no bolso",
  gamer: "Roda tudo em 1440p com folga",
  extremo: "4K, ray tracing e o que mais aparecer",
};

function presetParts(preset: BuildPreset) {
  return [
    { cat: "Processador", part: cpus.find((p) => p.id === preset.cpuId) },
    { cat: "Placa de vídeo", part: gpus.find((p) => p.id === preset.gpuId) },
    { cat: "Placa-mãe", part: motherboards.find((p) => p.id === preset.motherboardId) },
    { cat: "Cooler", part: coolers.find((p) => p.id === preset.coolerId) },
    { cat: "Memória", part: rams.find((p) => p.id === preset.ramId) },
    { cat: "SSD", part: ssds.find((p) => p.id === preset.ssdId) },
    { cat: "Fonte", part: psus.find((p) => p.id === preset.psuId) },
  ];
}

function presetTotal(preset: BuildPreset) {
  return presetParts(preset).reduce(
    (sum, { part }) => sum + (part?.priceBRL ?? 0),
    0
  );
}

export default function FeaturedBuilds({
  onPick,
}: {
  onPick: (presetId: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-black/10 px-8 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 140px)",
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          Builds prontos
        </p>
        <h3 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-black md:text-5xl">
          Não sabe por onde começar? Escolhe um desses.
        </h3>
        <p className="mt-3 max-w-xl text-sm text-neutral-500">
          Três configurações completas e 100% compatíveis, montadas com as
          peças do catálogo. Um clique e ela abre no simulador.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {buildPresets.map((preset, i) => {
            const featured = preset.id === "gamer";
            const total = presetTotal(preset);
            return (
              <div
                key={preset.id}
                className="group relative flex flex-col bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
                  transitionDelay: `${i * 140}ms`,
                  ...(featured
                    ? {
                        border: "1px solid transparent",
                        backgroundImage:
                          "linear-gradient(white, white), linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }
                    : { border: "1px solid rgba(0,0,0,0.12)" }),
                }}
              >
                {featured && (
                  <span
                    className="absolute -top-3 left-7 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    }}
                  >
                    Mais escolhido
                  </span>
                )}

                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 text-2xl font-bold text-black">
                  {preset.label}
                </h4>
                <p className="mt-1 text-xs text-neutral-500">
                  {descriptions[preset.id]}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 border-t border-black/10 pt-5">
                  {presetParts(preset).map(({ cat, part }) => (
                    <div
                      key={cat}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                        {cat}
                      </span>
                      <span className="truncate text-right text-xs text-black">
                        {part?.name ?? "—"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-black/10 pt-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Total estimado
                  </span>
                  <span className="text-xl font-bold text-black">
                    R${" "}
                    {total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>

                <button
                  onClick={() => onPick(preset.id)}
                  className="mt-6 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:gap-3"
                  style={
                    featured
                      ? {
                          background:
                            "linear-gradient(135deg, #a855f7, #ec4899)",
                          color: "white",
                        }
                      : { background: "black", color: "white" }
                  }
                >
                  Montar essa build
                  <span aria-hidden>→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
