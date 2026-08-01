import Image from "next/image";
import Link from "next/link";

import { searchNews } from "@/services/news.service";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function BuscaPage({
  searchParams,
}: Props) {
  const { q } = await searchParams;

  const query = q?.trim() ?? "";

  const results = query
    ? await searchNews(query)
    : [];

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-5 py-12">

      {/* Cabeçalho da busca */}
      <div className="max-w-3xl">
        <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
          REC
        </span>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
          Buscar no REC
        </h1>

        <p className="mt-3 text-slate-600">
          Encontre conteúdos sobre estratégia, gestão, liderança,
          comportamento, empresas e negócios.
        </p>

        <form
          action="/busca"
          method="GET"
          className="mt-8 flex overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-cyan-600"
        >
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Digite o que você procura..."
            className="min-w-0 flex-1 px-5 py-4 text-base text-slate-900 outline-none"
          />

          <button
            type="submit"
            className="flex items-center gap-2 bg-slate-900 px-6 font-bold text-white transition hover:bg-cyan-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            Buscar
          </button>
        </form>
      </div>

      {/* Resultados */}
      {query && (
        <section className="mt-14">
          <div className="mb-8 border-b border-slate-200 pb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Resultados para &quot;{query}&quot;
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {results.length}{" "}
              {results.length === 1
                ? "publicação encontrada"
                : "publicações encontradas"}
            </p>
          </div>

          {results.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/noticia/${item.slug}`}
                  className="group block"
                >
                  <article className="grid gap-5 py-7 first:pt-0 sm:grid-cols-[240px_1fr]">

                    {item.featured_image && (
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 sm:aspect-auto sm:h-[150px]">
                        <Image
                          src={item.featured_image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 240px"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex flex-col justify-center">
                      {item.categories?.name && (
                        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
                          {item.categories.name}
                        </span>
                      )}

                      <h3 className="text-xl font-bold leading-tight text-slate-900 transition group-hover:text-cyan-700 md:text-2xl">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 md:text-base">
                          {item.excerpt}
                        </p>
                      )}

                      {item.published_at && (
                        <span className="mt-3 text-xs text-slate-500">
                          {new Date(
                            item.published_at
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>

                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-8">
              <h3 className="text-lg font-bold text-slate-900">
                Nenhuma publicação encontrada
              </h3>

              <p className="mt-2 text-slate-600">
                Tente pesquisar utilizando outras palavras-chave.
              </p>
            </div>
          )}
        </section>
      )}

    </main>
  );
}