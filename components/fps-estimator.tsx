"use client";

import type { Cpu, Gpu } from "@/lib/parts";
import { estimateFps } from "@/lib/fps";

export default function FpsEstimator({
  cpu,
  gpu,
}: {
  cpu: Cpu | null;
  gpu: Gpu | null;
}) {
  const estimates = estimateFps(cpu, gpu);
  if (!estimates) return null;

  return (
    <div className="animate-fade-in-up mt-6 border border-black/10">
      <div className="border-b border-black/10 px-4 py-3">
        <p className="text-sm font-medium text-black">FPS estimado</p>
        <p className="mt-0.5 text-xs text-neutral-400">
          Estimativa aproximada com base no processador e na GPU escolhidos —
          não substitui um benchmark real.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-black/10 px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-400">
        <span>Jogo</span>
        <span className="w-10 text-right">1080p</span>
        <span className="w-10 text-right">1440p</span>
        <span className="w-10 text-right">4K</span>
      </div>

      <div className="divide-y divide-black/10">
        {estimates.map(({ game, fps1080, fps1440, fps4k }, index) => (
          <div
            key={game.id}
            className="animate-fade-in-up grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 px-4 py-2.5 text-sm"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-black">{game.name}</span>
            <span className="w-10 text-right font-medium text-black">
              {fps1080}
            </span>
            <span className="w-10 text-right font-medium text-black">
              {fps1440}
            </span>
            <span className="w-10 text-right font-medium text-black">
              {fps4k}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
