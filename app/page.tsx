import PcCaseViewer from "@/components/pc-case-viewer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Monte seu PC
        </h1>
        <p className="mt-2 text-zinc-400">
          Escolha as peças e veja a compatibilidade em tempo real
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <PcCaseViewer />
      </div>
    </div>
  );
}
