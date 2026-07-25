import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types/news";

export default function NewsCard({ news }: { news: News }) {
  return (
    <Link href={`/noticia/${news.slug}`}>

      <article className="overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl">

        <div className="relative h-56">

          <Image
            src={news.featured_image}
            alt={news.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="p-5">

          <span className="text-xs font-semibold uppercase text-cyan-600">
            {news.categories?.name}
          </span>

          <h3 className="mt-2 text-xl font-bold">
            {news.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-slate-600">
            {news.excerpt}
          </p>

        </div>

      </article>

    </Link>
  );
}