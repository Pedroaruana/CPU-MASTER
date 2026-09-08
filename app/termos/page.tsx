import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Termos de uso — CPU Master",
}

const TermosPage = () => {
  return (
    <LegalPage title="Termos de uso" updatedAt="setembro de 2026">
      <p>
        O CPU Master é uma ferramenta de simulação gratuita pra ajudar a montar
        um computador. Ao usar o site, você concorda com os termos abaixo.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        O que o site faz
      </h2>
      <p>
        Você escolhe peças de um catálogo, o site verifica compatibilidade
        entre elas (soquete, tipo de memória, tamanho da GPU, consumo de
        energia) e mostra uma visualização 3D do gabinete montado.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Precisão das informações
      </h2>
      <p>
        As checagens de compatibilidade e os preços exibidos são estimativas.
        O catálogo de peças é mantido manualmente e pode estar desatualizado.
        Os preços de referência e os valores buscados em tempo real na Kabum
        podem não refletir o valor final cobrado pela loja no momento da
        compra. Sempre confira as especificações reais do produto e o preço
        atual antes de fechar qualquer compra.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">
        Links externos
      </h2>
      <p>
        O site tem links pra Kabum e Amazon. Essas lojas são independentes do
        CPU Master, que não tem responsabilidade sobre preço, estoque, entrega
        ou qualquer questão relacionada à compra feita nelas.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">Sem garantias</h2>
      <p>
        O CPU Master é oferecido como está, sem garantia de disponibilidade
        contínua ou ausência de erros. O uso é por sua conta e risco.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">Mudanças</h2>
      <p>
        Esses termos podem mudar sem aviso prévio conforme o site evolui. A
        data no topo desta página indica a última atualização.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-black">Contato</h2>
      <p>
        Dúvidas ou problemas: abra uma issue no{" "}
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

export default TermosPage
