import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Acessibilidade — CPU Master",
}

const AcessibilidadePage = () => {
  return (
    <LegalPage title="Acessibilidade" updatedAt="setembro de 2026">
      <p>
        O CPU Master tenta ser utilizável pelo maior número possível de
        pessoas, mas ainda tem limitações — principalmente na parte 3D.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        O que já está implementado
      </h2>
      <p>
        HTML semântico nas seções e formulários, contraste alto (texto preto
        sobre fundo branco) na maior parte do conteúdo, e navegação por
        teclado nos campos de seleção de peças.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Limitações conhecidas
      </h2>
      <p>
        O visualizador 3D do gabinete e a animação de montagem controlada por
        scroll são essencialmente visuais e não têm uma alternativa em texto
        equivalente — leitores de tela não conseguem descrever o que está
        acontecendo nelas. A checagem de compatibilidade e os preços, que são
        a parte funcional do site, continuam disponíveis em texto normal fora
        dessas seções.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Reportar um problema
      </h2>
      <p>
        Se algo no site te impede de usar, avise abrindo uma issue no{" "}
        <a
          href="https://github.com/Pedroaruana/CPU-MASTER"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black"
        >
          repositório do projeto no GitHub
        </a>
        . Isso ajuda a priorizar o que corrigir primeiro.
      </p>
    </LegalPage>
  )
}

export default AcessibilidadePage
