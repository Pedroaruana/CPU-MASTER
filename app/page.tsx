"use client";

import { useState } from "react";
import PcCaseViewer, { GpuBrand } from "@/components/pc-case-viewer";
import BuildSelector from "@/components/build-selector";
import Logo from "@/components/logo";
import SiteFooter from "@/components/site-footer";
import CornerFrame from "@/components/corner-frame";
import GpuAnimation from "@/components/gpu-animation";
import BuildScrollSection from "@/components/build-scroll-section";

const steps = [
  {
    number: "01",
    title: "Escolha as peças",
    text: "Placa-mãe, processador, GPU, RAM, SSD e fonte, das marcas que você já conhece.",
  },
  {
    number: "02",
    title: "Veja em 3D",
    text: "Gire o gabinete com o mouse e veja as peças aparecerem de verdade.",
  },
  {
    number: "03",
    title: "Confira a compatibilidade",
    text: "Descubra na hora se tudo funciona junto, antes de comprar.",
  },
  {
    number: "04",
    title: "Veja os preços",
    text: "Compare o valor de cada peça e compre com confiança direto na loja.",
  },
];

export default function Home() {
  const [gpuBrand, setGpuBrand] = useState<GpuBrand>("none");
  const [ramSelected, setRamSelected] = useState(false);
  const [ssdSelected, setSsdSelected] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex w-full flex-1 flex-col">
        <header className="mx-auto flex w-full max-w-[1400px] shrink-0 items-center justify-between px-8 py-6">
          <Logo />
          <span className="hidden text-xs uppercase tracking-[0.3em] text-neutral-400 sm:block">
            v1.0
          </span>
        </header>

        <section className="relative overflow-hidden border-b border-black/10 px-8 pb-14 pt-6 md:pb-20 md:pt-10">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 140px)",
            }}
          />

          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-start justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  Simulador de compatibilidade
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-black md:text-6xl">
                  Monte seu PC sem medo de incompatibilidade
                </h2>
                <p className="mt-4 max-w-xl text-sm text-neutral-500 md:text-base">
                  Escolha placa-mãe, processador, cooler, GPU, RAM, SSD e
                  fonte, veja o gabinete em 3D e confira se tudo funciona
                  junto antes de gastar um centavo.
                </p>
              </div>

              <div className="hidden shrink-0 md:block">
                <GpuAnimation />
              </div>
            </div>

            <div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number}>
                  <span className="text-4xl font-bold text-black/10">
                    {step.number}
                  </span>
                  <p className="mt-1 text-sm font-medium text-black">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BuildScrollSection />

        <div className="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col md:flex-row md:items-start">
          <main className="flex min-w-0 flex-1 flex-col items-center gap-6 p-6 pt-10 md:sticky md:top-6 md:self-start md:pt-16">
            <div className="flex items-center gap-2 self-start pl-1 text-xs uppercase tracking-[0.3em] text-neutral-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
              </span>
              Visualização 3D em tempo real
            </div>

            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-x-8 top-10 -z-10 h-3/4 bg-gradient-to-b from-black/[0.07] to-transparent blur-2xl" />
              <div className="relative border border-black/10 p-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.35)]">
                <CornerFrame />
                <PcCaseViewer
                  gpuBrand={gpuBrand}
                  ramSelected={ramSelected}
                  ssdSelected={ssdSelected}
                />
              </div>
            </div>

            <p className="max-w-lg text-center text-sm text-neutral-500">
              Simule a montagem do seu computador peça por peça: veja se o
              processador combina com a placa-mãe, se a memória é compatível,
              se a placa de vídeo cabe no gabinete e se a fonte aguenta o
              consumo — tudo antes de gastar um centavo real.
            </p>
          </main>

          <aside className="w-full shrink-0 border-black/10 p-8 md:w-[380px] md:border-l">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
              Monte seu PC
            </p>
            <BuildSelector
              onGpuBrandChange={setGpuBrand}
              onRamSelectedChange={setRamSelected}
              onSsdSelectedChange={setSsdSelected}
            />
          </aside>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
