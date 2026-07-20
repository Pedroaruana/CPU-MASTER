import { describe, expect, it } from "vitest";
import { checkBottleneck, checkCompatibility, estimateTotalPowerW } from "./compatibility";
import type { Cooler, Cpu, Gpu, Motherboard, Psu, Ram, Ssd } from "./parts";

const motherboardAm5: Motherboard = {
  id: "mb-am5",
  brand: "amd",
  name: "Placa AM5",
  socket: "AM5",
  ramType: "DDR5",
  formFactor: "ATX",
  m2Slots: 2,
  priceBRL: 1000,
};

const motherboardAm4: Motherboard = {
  ...motherboardAm5,
  id: "mb-am4",
  socket: "AM4",
  ramType: "DDR4",
  m2Slots: 0,
};

const cpuAm5: Cpu = {
  id: "cpu-am5",
  brand: "amd",
  name: "Ryzen AM5",
  socket: "AM5",
  tdpW: 105,
  priceBRL: 1500,
  tier: 8,
};

const coolerAm5: Cooler = {
  id: "cooler-am5",
  name: "Cooler AM5",
  type: "Air",
  sockets: ["AM5"],
  priceBRL: 300,
};

const coolerAio280: Cooler = {
  id: "cooler-aio",
  name: "AIO 280mm",
  type: "AIO",
  sockets: ["AM5"],
  radiatorMm: 280,
  priceBRL: 700,
};

const coolerAio360: Cooler = {
  ...coolerAio280,
  id: "cooler-aio-360",
  radiatorMm: 360,
};

const gpuFits: Gpu = {
  id: "gpu-fits",
  brand: "nvidia",
  name: "RTX Fits",
  lengthMm: 300,
  recommendedPsuW: 650,
  tdpW: 220,
  priceBRL: 3000,
  tier: 6,
};

const gpuTooLong: Gpu = { ...gpuFits, id: "gpu-long", lengthMm: 350 };

const ramDdr5: Ram = {
  id: "ram-ddr5",
  name: "RAM DDR5",
  type: "DDR5",
  capacityGb: 32,
  priceBRL: 600,
};

const ssdM2: Ssd = {
  id: "ssd-m2",
  name: "SSD M.2",
  interface: "NVMe M.2",
  capacityGb: 1000,
  priceBRL: 500,
};

const psuStrong: Psu = {
  id: "psu-strong",
  name: "Fonte 750W",
  wattage: 750,
  priceBRL: 500,
};

const psuWeak: Psu = { ...psuStrong, id: "psu-weak", wattage: 450 };

describe("checkCompatibility", () => {
  it("aprova uma combinação totalmente compatível", () => {
    const checks = checkCompatibility(
      motherboardAm5,
      cpuAm5,
      coolerAio280,
      gpuFits,
      ramDdr5,
      ssdM2,
      psuStrong
    );
    expect(checks.length).toBeGreaterThan(0);
    expect(checks.every((c) => c.ok)).toBe(true);
  });

  it("reprova processador com soquete diferente da placa-mãe", () => {
    const checks = checkCompatibility(
      motherboardAm4,
      cpuAm5,
      null,
      null,
      null,
      null,
      null
    );
    const socketCheck = checks.find((c) => c.label === "Processador x Placa-mãe");
    expect(socketCheck?.ok).toBe(false);
  });

  it("reprova cooler que não suporta o soquete do processador", () => {
    const coolerAm4: Cooler = { ...coolerAm5, sockets: ["AM4"] };
    const checks = checkCompatibility(null, cpuAm5, coolerAm4, null, null, null, null);
    const coolerCheck = checks.find((c) => c.label === "Cooler x Processador");
    expect(coolerCheck?.ok).toBe(false);
  });

  it("reprova radiador de AIO maior que o gabinete suporta", () => {
    const checks = checkCompatibility(null, null, coolerAio360, null, null, null, null);
    const radiatorCheck = checks.find((c) => c.label === "Cooler x Gabinete");
    expect(radiatorCheck?.ok).toBe(false);
  });

  it("reprova memória com tipo diferente do suportado pela placa-mãe", () => {
    const ramDdr4: Ram = { ...ramDdr5, id: "ram-ddr4", type: "DDR4" };
    const checks = checkCompatibility(motherboardAm5, null, null, null, ramDdr4, null, null);
    const ramCheck = checks.find((c) => c.label === "Memória RAM x Placa-mãe");
    expect(ramCheck?.ok).toBe(false);
  });

  it("reprova GPU maior que o espaço do gabinete", () => {
    const checks = checkCompatibility(null, null, null, gpuTooLong, null, null, null);
    const gpuCheck = checks.find((c) => c.label === "Placa de vídeo x Gabinete");
    expect(gpuCheck?.ok).toBe(false);
  });

  it("reprova SSD M.2 quando a placa-mãe não tem slot disponível", () => {
    const checks = checkCompatibility(motherboardAm4, null, null, null, null, ssdM2, null);
    const ssdCheck = checks.find((c) => c.label === "SSD x Placa-mãe");
    expect(ssdCheck?.ok).toBe(false);
  });

  it("reprova fonte fraca para o consumo estimado de CPU + GPU", () => {
    const checks = checkCompatibility(null, cpuAm5, null, gpuFits, null, null, psuWeak);
    const psuCheck = checks.find((c) => c.label === "Fonte x Consumo total");
    expect(psuCheck?.ok).toBe(false);
  });

  it("não gera nenhum check quando nada foi selecionado", () => {
    const checks = checkCompatibility(null, null, null, null, null, null, null);
    expect(checks).toHaveLength(0);
  });
});

describe("estimateTotalPowerW", () => {
  it("retorna null se faltar CPU ou GPU", () => {
    expect(estimateTotalPowerW(null, gpuFits)).toBeNull();
    expect(estimateTotalPowerW(cpuAm5, null)).toBeNull();
  });

  it("soma TDP da CPU, da GPU e o consumo base do sistema", () => {
    const total = estimateTotalPowerW(cpuAm5, gpuFits);
    expect(total).toBe(cpuAm5.tdpW + gpuFits.tdpW + 100);
  });
});

describe("checkBottleneck", () => {
  it("retorna null se faltar CPU ou GPU", () => {
    expect(checkBottleneck(null, gpuFits)).toBeNull();
    expect(checkBottleneck(cpuAm5, null)).toBeNull();
  });

  it("avisa gargalo de processador quando a GPU está muito acima do tier da CPU", () => {
    const weakCpu: Cpu = { ...cpuAm5, tier: 2 };
    const strongGpu: Gpu = { ...gpuFits, tier: 9 };
    const warning = checkBottleneck(weakCpu, strongGpu);
    expect(warning).not.toBeNull();
    expect(warning?.message).toContain("gargalo de processador");
  });

  it("avisa GPU fraca quando o processador está muito acima do tier da GPU", () => {
    const strongCpu: Cpu = { ...cpuAm5, tier: 10 };
    const weakGpu: Gpu = { ...gpuFits, tier: 3 };
    const warning = checkBottleneck(strongCpu, weakGpu);
    expect(warning).not.toBeNull();
    expect(warning?.message).toContain("abaixo do nível");
  });

  it("não avisa nada quando CPU e GPU estão equilibradas", () => {
    const balancedGpu: Gpu = { ...gpuFits, tier: cpuAm5.tier };
    expect(checkBottleneck(cpuAm5, balancedGpu)).toBeNull();
  });
});
