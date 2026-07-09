import PcCaseViewer from "@/components/pc-case-viewer";
import BuildSelector from "@/components/build-selector";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 py-16">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
          Monte seu PC
        </p>
        <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
          CPU MASTER
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-black" />
        <p className="mt-4 text-sm text-neutral-500">
          Escolha as peças e veja a compatibilidade em tempo real
        </p>
      </header>

      <div className="w-full max-w-4xl border border-black/10 p-2">
        <PcCaseViewer />
      </div>

      <div className="mt-14">
        <BuildSelector />
      </div>
    </div>
  );
}
