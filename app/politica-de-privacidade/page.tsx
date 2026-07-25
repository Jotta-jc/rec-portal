import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | REC Comunicação",
  description:
    "Conheça a Política de Privacidade da REC Comunicação e saiba como tratamos os dados dos usuários do portal.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
          REC Comunicação
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Política de Privacidade
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-700">
          A REC Comunicação respeita a privacidade de seus usuários e está
          comprometida com a proteção dos dados pessoais coletados durante a
          utilização deste portal.
        </p>
      </section>

      <section className="space-y-10 text-slate-700 leading-8">

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Coleta de informações
          </h2>

          <p>
            Podemos coletar informações fornecidas voluntariamente pelos
            usuários por meio de formulários de contato, além de dados
            técnicos necessários para o funcionamento do portal, como
            endereço IP, navegador utilizado e estatísticas de acesso.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Uso das informações
          </h2>

          <p>
            As informações coletadas são utilizadas exclusivamente para
            melhorar a experiência dos usuários, responder solicitações,
            produzir estatísticas e aperfeiçoar nossos serviços.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Cookies
          </h2>

          <p>
            Este portal poderá utilizar cookies para melhorar a navegação,
            personalizar conteúdos e gerar informações estatísticas sobre a
            utilização do site.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Compartilhamento
          </h2>

          <p>
            A REC Comunicação não comercializa dados pessoais de seus
            usuários. Informações somente poderão ser compartilhadas quando
            exigidas por obrigação legal ou mediante autorização do titular.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Alterações
          </h2>

          <p>
            Esta Política poderá ser atualizada periodicamente para refletir
            mudanças legais ou melhorias em nossos processos.
          </p>
        </div>

      </section>
    </main>
  );
}