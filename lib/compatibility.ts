import { CASE_MAX_GPU_LENGTH_MM, Gpu, Motherboard, Ram, Ssd } from "./parts";

export type CompatibilityCheck = {
  label: string;
  ok: boolean;
  reason: string;
};

export function checkCompatibility(
  motherboard: Motherboard | null,
  gpu: Gpu | null,
  ram: Ram | null,
  ssd: Ssd | null
): CompatibilityCheck[] {
  const checks: CompatibilityCheck[] = [];

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

  return checks;
}
