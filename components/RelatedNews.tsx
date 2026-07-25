import Link from "next/link";
import Image from "next/image";
import type { News } from "@/types/news";

type Props = {
  news: News[];
};

export default function RelatedNews({ news }: Props) {
  if (!news.length) return null;

  return (
    <section className="mt-20 border-t pt-10">
      <h2 className="mb-8 text-3xl font-bold">
        Continue lendo
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/noticia/${item.slug}`}
            className="group"
          >
            <article className="overflow-hidden rounded-xl border bg-white transition group-hover:shadow-lg">

              <div className="relative aspect-video">
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">

                <span className="text-xs font-semibold uppercase text-cyan-600">
                  {item.categories?.name}
                </span>

                <h3 className="mt-2 line-clamp-2 text-lg font-bold">
                  {item.title}
                </h3>

              </div>

            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}