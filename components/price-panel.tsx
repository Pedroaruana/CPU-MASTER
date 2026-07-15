"use client";

import { useState } from "react";
import { priceSearchUrl } from "@/lib/parts";

export type PricedItem = {
  label: string;
  name: string;
  priceBRL: number;
};

export default function PricePanel({ items }: { items: PricedItem[] }) {
  const [open, setOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.priceBRL, 0);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full border border-black bg-black px-4 py-3 text-xs font-medium uppercase tracking-widest text-white transition-all duration-150 hover:-translate-y-0.5 hover:opacity-80"
      >
        {open ? "Ocultar preços" : "Ver menores preços"}
      </button>

      {open && (
        <div className="animate-fade-in-up mt-4 border border-black/10">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="animate-fade-in-up flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 text-sm last:border-b-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div>
                <p className="text-black">{item.name}</p>
                <p className="text-xs text-neutral-400">{item.label}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="whitespace-nowrap text-sm font-medium text-black">
                  R$ {item.priceBRL.toLocaleString("pt-BR")}
                </span>
                <a
                  href={priceSearchUrl("kabum", item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 underline hover:text-black"
                >
                  buscar
                </a>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="font-medium text-black">Total estimado</span>
            <span className="font-medium text-black">
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>
          <p className="border-t border-black/10 px-4 py-3 text-xs text-neutral-400">
            *Valores de referência. Clique em &quot;buscar&quot; para conferir o
            preço atual na loja.
          </p>
        </div>
      )}
    </div>
  );
}
