import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Cookies — CPU Master",
}

const CookiesPage = () => {
  return (
    <LegalPage title="Cookies" updatedAt="setembro de 2026">
      <p>O CPU Master não usa cookies.</p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Como o site guarda estado, então?
      </h2>
      <p>
        A configuração de peças que você monta fica salva na própria URL da
        página (na query string), não em cookie nem em armazenamento local.
        É por isso que dá pra compartilhar a build por link — quem abre o
        link recebe a mesma seleção de peças.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Vercel Web Analytics
      </h2>
      <p>
        O serviço de estatísticas de visita usado no site (Vercel Web
        Analytics) é cookieless por padrão: ele não grava nem lê cookies no
        seu navegador.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Sites de terceiros
      </h2>
      <p>
        Os links pra Kabum e Amazon abrem sites de terceiros, que podem usar
        cookies próprios seguindo as políticas deles — isso é independente do
        CPU Master.
      </p>
    </LegalPage>
  )
}

export default CookiesPage
