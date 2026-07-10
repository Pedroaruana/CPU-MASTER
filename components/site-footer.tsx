export default function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-black/10 px-8 py-5">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-neutral-400 md:flex-row">
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
      </div>
    </footer>
  );
}
