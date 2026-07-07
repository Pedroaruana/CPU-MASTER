"use client";

import { useMemo, useState } from "react";
import { checkCompatibility } from "@/lib/compatibility";
import { gpus, motherboards, rams, ssds } from "@/lib/parts";

export default function BuildSelector() {
  const [motherboardId, setMotherboardId] = useState("");
  const [gpuId, setGpuId] = useState("");
  const [ramId, setRamId] = useState("");
  const [ssdId, setSsdId] = useState("");

  const motherboard = motherboards.find((m) => m.id === motherboardId) ?? null;
  const gpu = gpus.find((g) => g.id === gpuId) ?? null;
  const ram = rams.find((r) => r.id === ramId) ?? null;
  const ssd = ssds.find((s) => s.id === ssdId) ?? null;

  const checks = useMemo(
    () => checkCompatibility(motherboard, gpu, ram, ssd),
    [motherboard, gpu, ram, ssd]
  );

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Placa-mãe"
          value={motherboardId}
          onChange={setMotherboardId}
          options={motherboards.map((m) => ({ value: m.id, label: m.name }))}
        />
        <Select
          label="Placa de vídeo"
          value={gpuId}
          onChange={setGpuId}
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
        <div className="mt-6 space-y-2">
          {checks.map((check) => (
            <div
              key={check.label}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                check.ok
                  ? "border-green-900 bg-green-950/40 text-green-300"
                  : "border-red-900 bg-red-950/40 text-red-300"
              }`}
            >
              <span>{check.ok ? "✅" : "❌"}</span>
              <div>
                <p className="font-medium">{check.label}</p>
                <p className="text-xs opacity-80">{check.reason}</p>
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
    <label className="flex flex-col gap-1.5 text-sm text-zinc-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-zinc-400"
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
