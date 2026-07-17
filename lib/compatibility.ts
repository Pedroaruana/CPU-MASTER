import {
  BASE_SYSTEM_W,
  CASE_MAX_GPU_LENGTH_MM,
  CASE_MAX_RADIATOR_MM,
  Cooler,
  Cpu,
  Gpu,
  Motherboard,
  PSU_HEADROOM,
  Psu,
  Ram,
  Ssd,
} from "./parts";

export type CompatibilityCheck = {
  label: string;
  ok: boolean;
  reason: string;
};

export function checkCompatibility(
  motherboard: Motherboard | null,
  cpu: Cpu | null,
  cooler: Cooler | null,
  gpu: Gpu | null,
  ram: Ram | null,
  ssd: Ssd | null,
  psu: Psu | null
): CompatibilityCheck[] {
  const checks: CompatibilityCheck[] = [];

  if (motherboard && cpu) {
    const ok = motherboard.socket === cpu.socket;
    checks.push({
      label: "Processador x Placa-mãe",
      ok,
      reason: ok
        ? `${cpu.name} usa soquete ${cpu.socket}, compatível com a ${motherboard.name}`
        : `${cpu.name} usa soquete ${cpu.socket}, mas a ${motherboard.name} é soquete ${motherboard.socket}`,
    });
  }

  if (cpu && cooler) {
    const ok = cooler.sockets.includes(cpu.socket);
    checks.push({
      label: "Cooler x Processador",
      ok,
      reason: ok
        ? `${cooler.name} suporta o soquete ${cpu.socket}`
        : `${cooler.name} não tem suporte para o soquete ${cpu.socket} do ${cpu.name}`,
    });
  }

  if (cooler && cooler.type === "AIO" && cooler.radiatorMm) {
    const ok = cooler.radiatorMm <= CASE_MAX_RADIATOR_MM;
    checks.push({
      label: "Cooler x Gabinete",
      ok,
      reason: ok
        ? `Radiador de ${cooler.radiatorMm}mm cabe no gabinete (máx. ${CASE_MAX_RADIATOR_MM}mm)`
        : `Radiador de ${cooler.radiatorMm}mm não cabe no gabinete (máx. ${CASE_MAX_RADIATOR_MM}mm)`,
    });
  }

  if (motherboard && ram) {
    const ok = motherboard.ramType === ram.type;
    checks.push({
      label: "Memória RAM x Placa-mãe",
      ok,
      reason: ok
        ? `${ram.type} é compatível com o soquete de memória da ${motherboard.name}`
        : `${ram.name} é ${ram.type}, mas a ${motherboard.name} aceita apenas ${motherboard.ramType}`,
    });
  }

  if (gpu) {
    const ok = gpu.lengthMm <= CASE_MAX_GPU_LENGTH_MM;
    checks.push({
      label: "Placa de vídeo x Gabinete",
      ok,
      reason: ok
        ? `${gpu.name} (${gpu.lengthMm}mm) cabe no gabinete (máx. ${CASE_MAX_GPU_LENGTH_MM}mm)`
        : `${gpu.name} (${gpu.lengthMm}mm) é maior que o espaço do gabinete (máx. ${CASE_MAX_GPU_LENGTH_MM}mm)`,
    });
  }

  if (motherboard && ssd) {
    const ok = ssd.interface !== "NVMe M.2" || motherboard.m2Slots > 0;
    checks.push({
      label: "SSD x Placa-mãe",
      ok,
      reason: ok
        ? `${motherboard.name} tem slot compatível com ${ssd.interface}`
        : `${motherboard.name} não tem slot M.2 disponível para o ${ssd.name}`,
    });
  }

  if (cpu && gpu && psu) {
    const totalDrawW = cpu.tdpW + gpu.tdpW + BASE_SYSTEM_W;
    const recommendedW = Math.ceil(totalDrawW * PSU_HEADROOM);
    const ok = psu.wattage >= recommendedW;
    checks.push({
      label: "Fonte x Consumo total",
      ok,
      reason: ok
        ? `${psu.name} (${psu.wattage}W) cobre o consumo estimado de ${totalDrawW}W (processador + GPU + sistema), com margem de segurança`
        : `${psu.name} (${psu.wattage}W) pode não ser suficiente para o consumo estimado de ${totalDrawW}W (processador + GPU + sistema). Recomendado: pelo menos ${recommendedW}W`,
    });
  }

  return checks;
}

export function estimateTotalPowerW(
  cpu: Cpu | null,
  gpu: Gpu | null
): number | null {
  if (!cpu || !gpu) return null;
  return cpu.tdpW + gpu.tdpW + BASE_SYSTEM_W;
}

export type BottleneckWarning = {
  message: string;
};

export function checkBottleneck(
  cpu: Cpu | null,
  gpu: Gpu | null
): BottleneckWarning | null {
  if (!cpu || !gpu) return null;

  const diff = gpu.tier - cpu.tier;

  if (diff >= 4) {
    return {
      message: `${cpu.name} pode segurar o desempenho da ${gpu.name} (gargalo de processador). Considere um processador mais forte para aproveitar toda a GPU.`,
    };
  }

  if (diff <= -5) {
    return {
      message: `${gpu.name} está bem abaixo do nível da ${cpu.name}. Uma GPU mais forte aproveitaria melhor esse processador.`,
    };
  }

  return null;
}
