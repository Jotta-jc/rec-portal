import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 text-center">

      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
        Erro 404
      </p>

      <h1 className="text-5xl font-bold text-slate-900 md:text-6xl">
        Página não encontrada
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        A página que você procura não existe, foi removida ou o endereço informado está incorreto.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700"
      >
        Voltar para a página inicial
      </Link>

    </main>
  );
}