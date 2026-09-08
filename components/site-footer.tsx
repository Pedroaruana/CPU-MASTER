import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-black/10 px-8 py-5">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 text-xs text-neutral-400 md:flex-row md:justify-between">
        <p>© 2026 CPU Master. Todos os direitos reservados.</p>
        <p>
          Modelo 3D &quot;Custom Gaming PC&quot; por{" "}
          <a
            href="https://skfb.ly/oKFC6"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            Yolala3D
          </a>
          , licenciado sob{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            CC BY 4.0
          </a>
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link href="/termos" className="hover:text-black">
            Termos de uso
          </Link>
          <Link href="/privacidade" className="hover:text-black">
            Privacidade
          </Link>
          <Link href="/cookies" className="hover:text-black">
            Cookies
          </Link>
          <Link href="/acessibilidade" className="hover:text-black">
            Acessibilidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
