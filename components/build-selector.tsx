"use client";

import { useEffect, useMemo, useState } from "react";
import { checkCompatibility } from "@/lib/compatibility";
import { coolers, cpus, gpus, motherboards, rams, ssds } from "@/lib/parts";
import type { GpuBrand } from "@/components/pc-case-viewer";

type Props = {
  onGpuBrandChange: (brand: GpuBrand) => void;
  onRamSelectedChange: (selected: boolean) => void;
  onSsdSelectedChange: (selected: boolean) => void;
};

export default function BuildSelector({
  onGpuBrandChange,
  onRamSelectedChange,
  onSsdSelectedChange,
}: Props) {
  const [motherboardId, setMotherboardId] = useState("");
  const [cpuId, setCpuId] = useState("");
  const [coolerId, setCoolerId] = useState("");
  const [gpuId, setGpuId] = useState("");
  const [ramId, setRamId] = useState("");
  const [ssdId, setSsdId] = useState("");

  const motherboard = motherboards.find((m) => m.id === motherboardId) ?? null;
  const cpu = cpus.find((c) => c.id === cpuId) ?? null;
  const cooler = coolers.find((c) => c.id === coolerId) ?? null;
  const gpu = gpus.find((g) => g.id === gpuId) ?? null;
  const ram = rams.find((r) => r.id === ramId) ?? null;
  const ssd = ssds.find((s) => s.id === ssdId) ?? null;

  const checks = useMemo(
    () => checkCompatibility(motherboard, cpu, cooler, gpu, ram, ssd),
    [motherboard, cpu, cooler, gpu, ram, ssd]
  );

  useEffect(() => {
    onRamSelectedChange(Boolean(ram));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ram]);

  useEffect(() => {
    onSsdSelectedChange(Boolean(ssd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssd]);

  function handleGpuChange(id: string) {
    setGpuId(id);
    const selected = gpus.find((g) => g.id === id);
    onGpuBrandChange(selected ? (selected.brand as GpuBrand) : "none");
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      {checks.length > 0 && (
        <div className="mt-8 space-y-px border border-black/10">
          {checks.map((check) => (
            <div
              key={check.label}
              className="flex items-start gap-4 border-b border-black/10 bg-white px-5 py-4 text-sm last:border-b-0"
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
