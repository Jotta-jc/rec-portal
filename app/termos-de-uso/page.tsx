import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | REC Comunicação",
  description:
    "Conheça os Termos de Uso da REC Comunicação para utilização do portal e de seus conteúdos.",
};

export default function TermosUsoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
          REC Comunicação
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Termos de Uso
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-700">
          Ao acessar este portal, o usuário concorda com os presentes Termos
          de Uso e compromete-se a utilizar os conteúdos de forma ética e
          responsável.
        </p>
      </section>

      <section className="space-y-10 text-slate-700 leading-8">

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Conteúdo
          </h2>

          <p>
            Todo o conteúdo publicado pela REC Comunicação possui finalidade
            informativa e educativa. Embora busquemos manter as informações
            atualizadas e corretas, não garantimos sua integralidade ou
            adequação para situações específicas.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Direitos autorais
          </h2>

          <p>
            Os textos, imagens, marcas e demais elementos do portal são
            protegidos pela legislação de direitos autorais e não podem ser
            reproduzidos sem autorização, salvo nos casos previstos em lei.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Responsabilidades
          </h2>

          <p>
            O usuário compromete-se a utilizar este portal de forma lícita,
            respeitando a legislação vigente e os direitos de terceiros.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Atualizações
          </h2>

          <p>
            A REC Comunicação poderá alterar estes Termos de Uso a qualquer
            momento, sendo recomendada sua consulta periódica.
          </p>
        </div>

      </section>
    </main>
  );
}