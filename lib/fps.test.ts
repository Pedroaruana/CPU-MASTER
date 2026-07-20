import { describe, expect, it } from "vitest";
import { estimateFps, fpsGames } from "./fps";
import type { Cpu, Gpu } from "./parts";

const strongCpu: Cpu = {
  id: "cpu-strong",
  brand: "intel",
  name: "CPU forte",
  socket: "LGA1851",
  tdpW: 150,
  priceBRL: 4000,
  tier: 10,
};

const weakCpu: Cpu = { ...strongCpu, id: "cpu-weak", tier: 3 };

const strongGpu: Gpu = {
  id: "gpu-strong",
  brand: "nvidia",
  name: "GPU forte",
  lengthMm: 340,
  recommendedPsuW: 1000,
  tdpW: 450,
  priceBRL: 10000,
  tier: 10,
};

const weakGpu: Gpu = { ...strongGpu, id: "gpu-weak", tier: 3 };

describe("estimateFps", () => {
  it("retorna null se faltar CPU ou GPU", () => {
    expect(estimateFps(null, strongGpu)).toBeNull();
    expect(estimateFps(strongCpu, null)).toBeNull();
    expect(estimateFps(null, null)).toBeNull();
  });

  it("retorna uma estimativa para cada jogo do catálogo", () => {
    const result = estimateFps(strongCpu, strongGpu);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(fpsGames.length);
  });

  it("gera FPS maior em 1080p do que em 1440p e 4K para a mesma peça", () => {
    const [first] = estimateFps(strongCpu, strongGpu)!;
    expect(first.fps1080).toBeGreaterThanOrEqual(first.fps1440);
    expect(first.fps1440).toBeGreaterThanOrEqual(first.fps4k);
  });

  it("hardware mais forte gera FPS igual ou maior que hardware mais fraco", () => {
    const strongResult = estimateFps(strongCpu, strongGpu)!;
    const weakResult = estimateFps(weakCpu, weakGpu)!;

    strongResult.forEach((strongEstimate, i) => {
      expect(strongEstimate.fps1080).toBeGreaterThanOrEqual(
        weakResult[i].fps1080
      );
    });
  });

  it("nunca retorna FPS abaixo do piso mínimo", () => {
    const result = estimateFps(weakCpu, weakGpu)!;
    result.forEach((estimate) => {
      expect(estimate.fps1080).toBeGreaterThanOrEqual(12);
      expect(estimate.fps1440).toBeGreaterThanOrEqual(12);
      expect(estimate.fps4k).toBeGreaterThanOrEqual(12);
    });
  });

  it("um processador fraco limita o FPS mesmo com uma GPU forte em jogos leves", () => {
    const result = estimateFps(weakCpu, strongGpu)!;
    const esportsGame = result.find((r) => r.game.id === "valorant")!;
    const gpuOnlyEstimate = estimateFps(strongCpu, strongGpu)!.find(
      (r) => r.game.id === "valorant"
    )!;
    expect(esportsGame.fps1080).toBeLessThan(gpuOnlyEstimate.fps1080);
  });
});
