import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | REC Comunicação",
  description:
    "Entre em contato com a REC Comunicação. Envie sugestões, dúvidas, propostas de parceria ou fale com nossa equipe editorial.",
};

export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">

      {/* Hero */}
      <section className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
          REC Comunicação
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Fale Conosco
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-700">
          Estamos sempre abertos ao diálogo, sugestões de pauta, entrevistas,
          parcerias e oportunidades de colaboração. Será um prazer conversar
          com você.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* Informações */}
        <section className="space-y-8 lg:col-span-1">

          <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Contato
            </h2>

            <p className="text-slate-700">
              <strong>E-mail</strong>
            </p>

            <p className="mt-1 text-slate-600">
              contato@reccomunicacao.com.br
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Atendimento
            </h2>

            <p className="text-slate-700">
              Segunda a sexta-feira
            </p>

            <p className="text-slate-600">
              Das 8h às 18h
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Parcerias
            </h2>

            <p className="text-slate-700">
              Empresas, instituições e profissionais podem entrar em contato
              para entrevistas, projetos e iniciativas de conteúdo.
            </p>
          </div>

        </section>

        {/* Formulário */}
        <section className="rounded-xl border border-slate-200 p-8 shadow-sm lg:col-span-2">

          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Envie uma mensagem
          </h2>

          <form className="space-y-6">

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Nome
              </label>

              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                E-mail
              </label>

              <input
                type="email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
                placeholder="voce@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Assunto
              </label>

              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
                placeholder="Assunto da mensagem"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Mensagem
              </label>

              <textarea
                rows={6}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
                placeholder="Escreva sua mensagem..."
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              Enviar mensagem
            </button>

          </form>

        </section>

      </div>

    </main>
  );
}