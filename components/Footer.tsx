import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-3">

        {/* Marca */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            REC Comunicação
          </h2>

          <p className="mt-2 text-lg text-slate-300">
            Revista de Estratégia &amp; Comportamento
          </p>

          <p className="mt-6 leading-7 text-slate-400">
            Produzimos conteúdo sobre empresas, gestão,
            liderança, estratégia, inovação e comportamento
            organizacional, transformando experiências em
            conhecimento aplicado.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Portal
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="transition hover:text-cyan-400">
                Início
              </Link>
            </li>

            <li>
              <Link
                href="/categoria/empresas"
                className="transition hover:text-cyan-400"
              >
                Empresas
              </Link>
            </li>

            <li>
              <Link
                href="/categoria/gestao"
                className="transition hover:text-cyan-400"
              >
                Gestão
              </Link>
            </li>

            <li>
              <Link
                href="/categoria/lideranca"
                className="transition hover:text-cyan-400"
              >
                Liderança
              </Link>
            </li>

            <li>
              <Link
                href="/sobre"
                className="transition hover:text-cyan-400"
              >
                Sobre
              </Link>
            </li>

            <li>
              <Link
                href="/contato"
                className="transition hover:text-cyan-400"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Institucional
          </h3>

          <ul className="space-y-3">
            <li>
              <Link
                href="/politica-de-privacidade"
                className="transition hover:text-cyan-400"
              >
                Política de Privacidade
              </Link>
            </li>

            <li>
              <Link
                href="/termos-de-uso"
                className="transition hover:text-cyan-400"
              >
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} REC Comunicação. Todos os direitos reservados.
          </p>

          <p>
            Conteúdo desenvolvido pela REC Comunicação.
          </p>

        </div>
      </div>
    </footer>
  );
}