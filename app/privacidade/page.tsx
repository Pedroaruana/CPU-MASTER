import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Política de privacidade — CPU Master",
}

const PrivacidadePage = () => {
  return (
    <LegalPage title="Política de privacidade" updatedAt="setembro de 2026">
      <p>
        O CPU Master não pede cadastro, login nem qualquer dado pessoal pra
        funcionar. Esta página resume o que é coletado e o que não é.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        O que não coletamos
      </h2>
      <p>
        Não há criação de conta, formulário de contato, newsletter ou
        qualquer campo pedindo nome, e-mail ou dado pessoal. As peças que você
        seleciona ficam só na URL da página (query string) e no seu
        navegador — não são enviadas pra nenhum banco de dados.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Vercel Web Analytics
      </h2>
      <p>
        Usamos o Vercel Web Analytics pra saber quantas pessoas visitam o
        site e quais páginas são mais acessadas. Ele funciona sem cookies e
        sem identificar visitantes individualmente — os dados são agregados
        e anônimos.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Consulta de preços
      </h2>
      <p>
        Quando você clica em &quot;Atualizar preços agora&quot;, o servidor
        do CPU Master busca o preço atual na Kabum pra cada peça da sua
        build. Essa busca não salva nada — não fica histórico de qual build
        você montou nem de quando consultou o preço.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Links pra terceiros
      </h2>
      <p>
        Os links de &quot;Kabum&quot; e &quot;Amazon&quot; levam pra sites de
        terceiros, que têm suas próprias políticas de privacidade. O CPU
        Master não tem controle sobre o que essas lojas fazem com seus dados.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">Mudanças</h2>
      <p>
        Essa política pode ser atualizada conforme o site muda. A data no
        topo desta página indica a última revisão.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">Contato</h2>
      <p>
        Dúvidas: abra uma issue no{" "}
        <a
          href="https://github.com/Pedroaruana/CPU-MASTER"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black"
        >
          repositório do projeto no GitHub
        </a>
        .
      </p>
    </LegalPage>
  )
}

export default PrivacidadePage
