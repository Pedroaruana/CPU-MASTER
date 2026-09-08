import Link from "next/link"
import Logo from "@/components/logo"
import SiteFooter from "@/components/site-footer"

type LegalPageProps = {
  title: string
  updatedAt: string
  children: React.ReactNode
}

const LegalPage = ({ title, updatedAt, children }: LegalPageProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex w-full flex-1 flex-col">
        <header className="mx-auto flex w-full max-w-[1400px] shrink-0 items-center justify-between px-8 py-6">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-black"
          >
            Voltar
          </Link>
        </header>

        <main className="mx-auto w-full max-w-[760px] flex-1 px-8 py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Última atualização: {updatedAt}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-black md:text-4xl">
            {title}
          </h1>
          <div className="prose-legal mt-8 flex flex-col gap-5 text-sm leading-relaxed text-neutral-600">
            {children}
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

export default LegalPage
