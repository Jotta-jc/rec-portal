import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | REC Comunicação",
  description:
    "Conheça a REC Comunicação e a Revista de Estratégia & Comportamento, um portal dedicado à produção de conteúdo sobre empresas, gestão, liderança, inovação e comportamento organizacional.",
};

const temas = [
  "Empresas",
  "Gestão",
  "Liderança",
  "Estratégia",
  "Cultura Organizacional",
  "Comportamento",
  "Inovação",
  "Empreendedorismo",
  "Produtividade",
  "Educação Corporativa",
];

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">

      <section className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
          REC Comunicação
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Revista de Estratégia &amp; Comportamento
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-700">
          Produzimos conteúdo para quem acredita que conhecimento,
          estratégia e comportamento são pilares fundamentais para o
          desenvolvimento de empresas, profissionais e da sociedade.
        </p>
      </section>

      <section className="mb-14 space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Quem somos
        </h2>

        <p className="text-lg leading-8 text-slate-700">
          A REC Comunicação nasceu da convicção de que comunicar vai além
          de transmitir informações. Comunicar também é compartilhar
          conhecimento, aproximar pessoas e estimular o desenvolvimento.
        </p>

        <p className="text-lg leading-8 text-slate-700">
          A partir dessa visão surgiu a <strong>Revista de Estratégia &amp; Comportamento</strong>,
          um portal especializado na produção de conteúdo sobre empresas,
          gestão, liderança, inovação e comportamento organizacional.
        </p>

        <p className="text-lg leading-8 text-slate-700">
          Nosso propósito é transformar experiências reais em conhecimento
          aplicado, produzindo conteúdos que possam contribuir para decisões
          mais conscientes, organizações mais fortes e profissionais mais
          preparados para os desafios do mercado.
        </p>
      </section>

      <section className="mb-14 space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Nossa proposta
        </h2>

        <p className="text-lg leading-8 text-slate-700">
          Em um cenário onde informações são produzidas em grande volume,
          acreditamos que o verdadeiro diferencial está na qualidade do
          conteúdo e na capacidade de gerar aprendizado.
        </p>

        <p className="text-lg leading-8 text-slate-700">
          Por isso, buscamos publicar reportagens, entrevistas,
          análises, estudos de caso e conteúdos baseados em experiências
          reais, sempre procurando responder não apenas o que aconteceu,
          mas principalmente o que podemos aprender e como esse
          conhecimento pode ser aplicado na prática.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Nossa linha editorial
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {temas.map((tema) => (
            <div
              key={tema}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="font-semibold text-slate-800">
                {tema}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 grid gap-6 md:grid-cols-3">

        <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Missão
          </h3>

          <p className="leading-7 text-slate-700">
            Produzir conhecimento que inspire pessoas, fortaleça
            organizações e transforme experiências em aprendizado.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Visão
          </h3>

          <p className="leading-7 text-slate-700">
            Ser reconhecida como referência em conteúdo sobre estratégia,
            gestão e comportamento, contribuindo para o desenvolvimento de
            empresas e profissionais.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Valores
          </h3>

          <ul className="space-y-2 text-slate-700">
            <li>• Ética e responsabilidade</li>
            <li>• Credibilidade</li>
            <li>• Aprendizado contínuo</li>
            <li>• Inovação</li>
            <li>• Respeito às pessoas</li>
            <li>• Qualidade</li>
          </ul>
        </article>

      </section>

      <section className="rounded-2xl bg-slate-900 px-8 py-10 text-center text-slate-200">
        <h2 className="mb-5 text-3xl font-bold text-white">
          Nosso compromisso
        </h2>

        <p className="mx-auto max-w-3xl text-lg leading-8">
          Mais do que publicar conteúdos, buscamos construir uma fonte
          confiável de conhecimento para quem deseja compreender as
          transformações do mundo dos negócios e aplicar esse aprendizado
          em sua realidade. Acreditamos que compartilhar experiências,
          incentivar boas práticas e promover o desenvolvimento das pessoas
          é uma forma de contribuir para organizações mais fortes e uma
          sociedade mais preparada para o futuro.
        </p>
      </section>

    </main>
  );
}