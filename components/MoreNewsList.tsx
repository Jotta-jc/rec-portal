"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  news: any[];
};

export default function MoreNewsList({ news }: Props) {
  const [items, setItems] = useState(news);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function handleLoadMore() {
    try {
      setLoading(true);

      // 6 notícias já aparecem em "Últimas Publicações".
      // items.length representa as que já aparecem em "Mais publicações".
      const offset = 6 + items.length;

      const response = await fetch(
        `/api/news?limit=6&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar mais notícias");
      }

      const newItems = await response.json();

      setItems((current) => [
        ...current,
        ...newItems,
      ]);

      if (newItems.length < 6) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar mais notícias:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!items?.length) return null;

  return (
    <section className="mt-20">
      <div className="mb-8 border-b border-slate-200 pb-5">
        <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
          REC
        </span>

        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          Mais publicações
        </h2>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/noticia/${item.slug}`}
            className="group block"
          >
            <article className="grid gap-5 py-7 first:pt-0 sm:grid-cols-[240px_1fr]">
              
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 sm:aspect-auto sm:h-[150px]">
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

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
                    {new Date(item.published_at).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>

            </article>
          </Link>
        ))}
      </div>

    {hasMore && (
  <div className="mt-10 flex justify-center">
    <button
      type="button"
      onClick={handleLoadMore}
      disabled={loading}
      className="rounded-xl bg-slate-900 px-7 py-3 font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Carregando..." : "Carregar mais"}
    </button>
  </div>
)}
    </section>
  );
}