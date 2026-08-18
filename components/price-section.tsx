"use client";

import { useState } from "react";
import { priceSearchUrl } from "@/lib/parts";

export type PricedItem = {
  label: string;
  name: string;
  priceBRL: number;
};

type LivePrice = { price: number; updated: boolean };

function StoreLink({
  store,
  name,
}: {
  store: "kabum" | "amazon";
  name: string;
}) {
  return (
    <a
      href={priceSearchUrl(store, name)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-1.5 border border-black/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-150 hover:-translate-y-0.5 hover:border-black hover:shadow-sm"
    >
      {store === "kabum" ? "Kabum" : "Amazon"}
      <span aria-hidden className="text-neutral-400">
        ↗
      </span>
    </a>
  );
}

export default function PriceSection({ items }: { items: PricedItem[] }) {
  const [livePrices, setLivePrices] = useState<Record<string, LivePrice>>({});
  const [checking, setChecking] = useState(false);

  function priceFor(item: PricedItem) {
    return livePrices[item.name]?.price ?? item.priceBRL;
  }

  const total = items.reduce((sum, item) => sum + priceFor(item), 0);

  async function handleCheckPrices() {
    setChecking(true);
    const results = await Promise.allSettled(
      items.map(async (item) => {
        const res = await fetch(
          `/api/preco?nome=${encodeURIComponent(item.name)}`
        );
        const data: LivePrice = await res.json();
        return { name: item.name, data };
      })
    );

    const next: Record<string, LivePrice> = {};
    for (const result of results) {
      if (result.status === "fulfilled" && result.value.data.updated) {
        next[result.value.name] = result.value.data;
      }
    }
    setLivePrices(next);
    setChecking(false);
  }

  return (
    <section
      id="precos"
      className="relative overflow-hidden border-t border-black/10 px-8 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Onde comprar
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-black md:text-5xl">
              Menores preços
            </h3>
            <p className="mt-3 max-w-xl text-sm text-neutral-500">
              Preço de referência de cada peça da sua configuração, com link
              direto pra busca na loja. Confira o valor atual antes de fechar
              a compra.
            </p>
            <button
              type="button"
              onClick={handleCheckPrices}
              disabled={checking}
              className="mt-4 flex items-center gap-2 border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-150 hover:-translate-y-0.5 hover:border-black hover:shadow-sm disabled:opacity-50"
            >
              {checking ? "Consultando Kabum..." : "Atualizar preços agora"}
            </button>
          </div>
          <div className="shrink-0 text-left md:text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Total estimado
            </p>
            <p className="text-4xl font-bold tracking-tight text-black">
              R$ {total.toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="group animate-fade-in-up relative flex flex-col border border-black/12 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.3)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
                }}
              />
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  {item.label}
                </span>
                <span className="text-2xl font-bold text-black/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 min-h-10 text-sm font-medium text-black">
                {item.name}
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-black">
                R$ {priceFor(item).toLocaleString("pt-BR")}
              </p>
              <div className="mt-5 flex gap-2 border-t border-black/10 pt-4">
                <StoreLink store="kabum" name={item.name} />
                <StoreLink store="amazon" name={item.name} />
              </div>
            </div>
          ))}

          <div
            className="animate-fade-in-up relative flex flex-col justify-between overflow-hidden bg-black p-6 text-white"
            style={{ animationDelay: `${items.length * 80}ms` }}
          >
            <div
              className="absolute inset-x-0 top-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
              }}
            />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                Resumo
              </span>
              <p className="mt-2 text-sm text-white/70">
                {items.length} peças, todas compatíveis entre si.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                Total estimado
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight">
                R$ {total.toLocaleString("pt-BR")}
              </p>
              <p className="mt-3 text-[11px] text-white/40">
                *Valores de referência. Confira o preço atual na loja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
