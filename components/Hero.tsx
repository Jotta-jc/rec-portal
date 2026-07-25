import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types/news";

type HeroProps = {
  news: News;
};

export default function Hero({ news }: HeroProps) {
  return (
    <Link
      href={`/noticia/${news.slug}`}
      className="block overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative h-72 md:h-full">
          <Image
            src={news.featured_image}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-8">
          <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-600">
            {news.categories?.name}
          </span>

          <h1 className="text-4xl font-bold leading-tight">
            {news.title}
          </h1>

          <p className="mt-5 text-slate-600">
            {news.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}