export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/news/MarkdownContent";

import {
  getNewsBySlug,
  getRelatedNews,
} from "@/services/news.service";

import RelatedNews from "@/components/RelatedNews";

import BackButton from "@/components/BackButton";

import { Metadata } from "next";

import ShareButtons from "@/components/ShareButtons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Notícia não encontrada | REC",
    };
  }

  return {
    title: `${news.title} | REC`,
    description: news.meta_description || news.excerpt,

    openGraph: {
      title: news.title,
      description: news.meta_description || news.excerpt,
      images: [news.featured_image],
    },

    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.meta_description || news.excerpt,
      images: [news.featured_image],
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);

  if (!news) notFound();

 const relatedNews = await getRelatedNews(
  news.category_id,
  news.id
); 

  return (
<main className="mx-auto max-w-6xl px-6 py-10">

<div className="mb-6">
  <BackButton />
</div>

<nav className="mb-8 flex flex-wrap items-center gap-2 text-base text-slate-600">

  <Link
    href="/"
    className="hover:text-cyan-600"
  >
    Home
  </Link>

  <span>/</span>

  <Link
    href={`/categoria/${news.categories?.slug}`}
    className="hover:text-cyan-600"
  >
    {news.categories?.name}
  </Link>

  <span>/</span>

  <span className="line-clamp-1 text-slate-700">
    {news.title}
  </span>

</nav>

<h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
  {news.title}
</h1>

<p className="mt-6 max-w-4xl text-xl leading-8 text-slate-600">
  {news.excerpt}
</p>

      <div className="mt-8 flex flex-wrap items-center gap-5 rounded-lg bg-slate-50 px-5 py-4 text-sm text-slate-600">
  <span>
    <strong>Autor:</strong> {news.author}
  </span>

  <span>•</span>

  <span>
    <strong>Publicado:</strong>{" "}
    {new Date(news.published_at).toLocaleDateString("pt-BR")}
  </span>

  <span>•</span>

<span>⏱️ {news.read_time} de leitura</span>
</div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">

        <Image
          src={news.featured_image}
          alt={news.title}
          fill
          className="object-cover"
        />

      </div>

<div className="mt-12">
  <MarkdownContent
    content={news.content ?? ""}
  />
</div>

     
<ShareButtons title={news.title} />

<RelatedNews news={relatedNews ?? []} />

    </main>
  );
}