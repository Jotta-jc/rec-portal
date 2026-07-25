import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types/news";

export default function FeaturedCard({ news }: { news: News }) {
  return (
    <Link href={`/noticia/${news.slug}`}>

      <article className="overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl">

        <div className="relative h-60">

          <Image
            src={news.featured_image}
            alt={news.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="p-5">

          <span className="text-xs uppercase font-semibold text-cyan-600">
            {news.categories?.name}
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            {news.title}
          </h2>

        </div>

      </article>

    </Link>
  );
}