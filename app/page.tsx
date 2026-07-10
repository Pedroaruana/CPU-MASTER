import PcCaseViewer from "@/components/pc-case-viewer";
import BuildSelector from "@/components/build-selector";
import Logo from "@/components/logo";
import SiteFooter from "@/components/site-footer";
import CornerFrame from "@/components/corner-frame";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between px-8 py-6">
        <Logo />
        <span className="hidden text-xs uppercase tracking-[0.3em] text-neutral-400 sm:block">
          v1.0
        </span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 p-6">
          <div className="flex items-center gap-2 self-start pl-1 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
            </span>
            Visualização 3D em tempo real
          </div>

          <div className="relative w-full max-w-2xl border border-black/10 p-2">
            <CornerFrame />
            <PcCaseViewer />
          </div>
        </main>

        <aside className="w-full shrink-0 overflow-y-auto border-black/10 p-8 md:w-[380px] md:border-l">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Monte seu PC
          </p>
          <BuildSelector />
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}
