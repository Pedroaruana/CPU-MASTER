"use client";

import { useEffect, useMemo, useState } from "react";
import { checkBottleneck, checkCompatibility } from "@/lib/compatibility";
import {
  buildPresets,
  coolers,
  cpus,
  gpus,
  motherboards,
  psus,
  rams,
  ssds,
} from "@/lib/parts";
import type { GpuBrand } from "@/components/pc-case-viewer";
import PricePanel from "@/components/price-panel";

type Props = {
  onGpuBrandChange: (brand: GpuBrand) => void;
  onRamSelectedChange: (selected: boolean) => void;
  onSsdSelectedChange: (selected: boolean) => void;
  presetPick?: { id: string; n: number } | null;
};

const PARAM_KEYS = {
  motherboardId: "mb",
  cpuId: "cpu",
  coolerId: "cooler",
  gpuId: "gpu",
  ramId: "ram",
  ssdId: "ssd",
  psuId: "psu",
} as const;

export default function BuildSelector({
  onGpuBrandChange,
  onRamSelectedChange,
  onSsdSelectedChange,
  presetPick,
}: Props) {
  const [motherboardId, setMotherboardId] = useState("");
  const [cpuId, setCpuId] = useState("");
  const [coolerId, setCoolerId] = useState("");
  const [gpuId, setGpuId] = useState("");
  const [ramId, setRamId] = useState("");
  const [ssdId, setSsdId] = useState("");
  const [psuId, setPsuId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mb = params.get(PARAM_KEYS.motherboardId);
    const cpuParam = params.get(PARAM_KEYS.cpuId);
    const coolerParam = params.get(PARAM_KEYS.coolerId);
    const gpuParam = params.get(PARAM_KEYS.gpuId);
    const ramParam = params.get(PARAM_KEYS.ramId);
    const ssdParam = params.get(PARAM_KEYS.ssdId);
    const psuParam = params.get(PARAM_KEYS.psuId);

    if (mb) setMotherboardId(mb);
    if (cpuParam) setCpuId(cpuParam);
    if (coolerParam) setCoolerId(coolerParam);
    if (gpuParam) {
      setGpuId(gpuParam);
      const selected = gpus.find((g) => g.id === gpuParam);
      if (selected) onGpuBrandChange(selected.brand as GpuBrand);
    }
    if (ramParam) setRamId(ramParam);
    if (ssdParam) setSsdId(ssdParam);
    if (psuParam) setPsuId(psuParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (presetPick) applyPreset(presetPick.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetPick]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (motherboardId) params.set(PARAM_KEYS.motherboardId, motherboardId);
    if (cpuId) params.set(PARAM_KEYS.cpuId, cpuId);
    if (coolerId) params.set(PARAM_KEYS.coolerId, coolerId);
    if (gpuId) params.set(PARAM_KEYS.gpuId, gpuId);
    if (ramId) params.set(PARAM_KEYS.ramId, ramId);
    if (ssdId) params.set(PARAM_KEYS.ssdId, ssdId);
    if (psuId) params.set(PARAM_KEYS.psuId, psuId);

    const query = params.toString();
    const url = query ? `?${query}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [motherboardId, cpuId, coolerId, gpuId, ramId, ssdId, psuId]);

  const motherboard = motherboards.find((m) => m.id === motherboardId) ?? null;
  const cpu = cpus.find((c) => c.id === cpuId) ?? null;
  const cooler = coolers.find((c) => c.id === coolerId) ?? null;
  const gpu = gpus.find((g) => g.id === gpuId) ?? null;
  const ram = rams.find((r) => r.id === ramId) ?? null;

  useEffect(() => {
    onRamSelectedChange(Boolean(ram));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ram]);
  const ssd = ssds.find((s) => s.id === ssdId) ?? null;

  useEffect(() => {
    onSsdSelectedChange(Boolean(ssd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssd]);

  const psu = psus.find((p) => p.id === psuId) ?? null;

  const checks = useMemo(
    () => checkCompatibility(motherboard, cpu, cooler, gpu, ram, ssd, psu),
    [motherboard, cpu, cooler, gpu, ram, ssd, psu]
  );

  const bottleneck = useMemo(() => checkBottleneck(cpu, gpu), [cpu, gpu]);

  const allSelected = Boolean(
    motherboard && cpu && cooler && gpu && ram && ssd && psu
  );
  const allCompatible = checks.length > 0 && checks.every((c) => c.ok);

  const pricedItems = allSelected
    ? [
        { label: "Placa-mãe", name: motherboard!.name, priceBRL: motherboard!.priceBRL },
        { label: "Processador", name: cpu!.name, priceBRL: cpu!.priceBRL },
        { label: "Cooler", name: cooler!.name, priceBRL: cooler!.priceBRL },
        { label: "Placa de vídeo", name: gpu!.name, priceBRL: gpu!.priceBRL },
        { label: "Memória RAM", name: ram!.name, priceBRL: ram!.priceBRL },
        { label: "SSD", name: ssd!.name, priceBRL: ssd!.priceBRL },
        { label: "Fonte", name: psu!.name, priceBRL: psu!.priceBRL },
      ]
    : [];

  function handleGpuChange(id: string) {
    setGpuId(id);
    const selected = gpus.find((g) => g.id === id);
    onGpuBrandChange(selected ? (selected.brand as GpuBrand) : "none");
  }

  function applyPreset(presetId: string) {
    const preset = buildPresets.find((p) => p.id === presetId);
    if (!preset) return;
    setMotherboardId(preset.motherboardId);
    setCpuId(preset.cpuId);
    setCoolerId(preset.coolerId);
    setGpuId(preset.gpuId);
    setRamId(preset.ramId);
    setSsdId(preset.ssdId);
    setPsuId(preset.psuId);
    const selectedGpu = gpus.find((g) => g.id === preset.gpuId);
    onGpuBrandChange(selectedGpu ? (selectedGpu.brand as GpuBrand) : "none");
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-400">
          Builds prontos
        </p>
        <div className="flex flex-wrap gap-2">
          {buildPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="border border-black/20 px-3 py-1.5 text-xs uppercase tracking-wide text-black transition-all duration-150 hover:-translate-y-0.5 hover:border-black hover:shadow-sm"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Select
          label="Placa-mãe"
          value={motherboardId}
          onChange={setMotherboardId}
          options={motherboards.map((m) => ({ value: m.id, label: m.name }))}
        />
        <Select
          label="Processador"
          value={cpuId}
          onChange={setCpuId}
          options={cpus.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Select
          label="Cooler"
          value={coolerId}
          onChange={setCoolerId}
          options={coolers.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Select
          label="Placa de vídeo"
          value={gpuId}
          onChange={handleGpuChange}
          options={gpus.map((g) => ({ value: g.id, label: g.name }))}
        />
        <Select
          label="Memória RAM"
          value={ramId}
          onChange={setRamId}
          options={rams.map((r) => ({ value: r.id, label: r.name }))}
        />
        <Select
          label="SSD"
          value={ssdId}
          onChange={setSsdId}
          options={ssds.map((s) => ({ value: s.id, label: s.name }))}
        />
        <Select
          label="Fonte"
          value={psuId}
          onChange={setPsuId}
          options={psus.map((p) => ({ value: p.id, label: p.name }))}
        />
      </div>

      {bottleneck && (
        <div className="animate-fade-in-up mt-6 border border-black/20 bg-neutral-50 px-4 py-3 text-sm">
          <p className="font-medium text-black">⚠ Possível gargalo</p>
          <p className="mt-0.5 text-xs text-neutral-500">
            {bottleneck.message}
          </p>
        </div>
      )}

      {checks.length > 0 && (
        <div className="mt-6 space-y-px border border-black/10">
          {checks.map((check, index) => (
            <div
              key={check.label}
              className="animate-fade-in-up flex items-start gap-4 border-b border-black/10 bg-white px-5 py-4 text-sm last:border-b-0"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-xs font-bold text-black">
                {check.ok ? "✓" : "✕"}
              </span>
              <div>
                <p className="font-medium tracking-tight text-black">
                  {check.label}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {check.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {allCompatible && <PricePanel items={pricedItems} />}

      {allSelected && (
        <button
          onClick={handleShare}
          className="mt-3 w-full border border-black/20 px-4 py-2.5 text-xs uppercase tracking-widest text-black transition-all duration-150 hover:-translate-y-0.5 hover:border-black hover:shadow-sm"
        >
          {copied ? "Link copiado!" : "Compartilhar essa configuração"}
        </button>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-neutral-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-black/20 bg-white px-3 py-2.5 text-sm normal-case tracking-normal text-black outline-none transition-colors focus:border-black"
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
