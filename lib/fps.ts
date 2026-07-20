import { Cpu, Gpu } from "./parts";

export type FpsGame = {
  id: string;
  name: string;
  weight: number;
};

export const fpsGames: FpsGame[] = [
  { id: "valorant", name: "Valorant", weight: 3.6 },
  { id: "cs2", name: "Counter-Strike 2", weight: 2.8 },
  { id: "fortnite", name: "Fortnite", weight: 1.7 },
  { id: "gta5", name: "GTA V", weight: 1.35 },
  { id: "cyberpunk", name: "Cyberpunk 2077", weight: 0.55 },
  { id: "alanwake2", name: "Alan Wake 2", weight: 0.4 },
];

export type FpsEstimate = {
  game: FpsGame;
  fps1080: number;
  fps1440: number;
  fps4k: number;
};

function roundFps(n: number) {
  return Math.max(12, Math.round(n / 5) * 5);
}

export function estimateFps(
  cpu: Cpu | null,
  gpu: Gpu | null
): FpsEstimate[] | null {
  if (!cpu || !gpu) return null;

  return fpsGames.map((game) => {
    const gpuFps1080 = gpu.tier * 21 * game.weight;
    const cpuCapFps = cpu.tier * 30 * Math.min(game.weight, 2);

    const fps1080 = roundFps(Math.min(gpuFps1080, cpuCapFps));
    const fps1440 = roundFps(Math.min(gpuFps1080 * 0.68, cpuCapFps));
    const fps4k = roundFps(Math.min(gpuFps1080 * 0.42, cpuCapFps));

    return { game, fps1080, fps1440, fps4k };
  });
}
