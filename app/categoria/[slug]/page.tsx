import Link from "next/link";
import NewsCard from "@/components/NewsCard";


import {
  getCategoryBySlug,
  getNewsByCategory,
} from "@/services/category.service";

import { notFound } from "next/navigation";

import type { Metadata } from "next";

import BackButton from "@/components/BackButton";

import CategoryMenu from "@/components/CategoryMenu";
import { getCategories } from "@/services/category.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Categoria | REC Comunicação",
    };
  }

  return {
    title: `${category.name} | REC – Revista de Estratégia & Comportamento`,
    description: `Artigos, entrevistas e análises sobre ${category.name}.`,
    openGraph: {
      title: `${category.name} | REC `,
      description: `Artigos, entrevistas e análises sobre ${category.name}.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const news = await getNewsByCategory(category.id);

  const categories = await getCategories();

  return (
<main className="mx-auto max-w-7xl px-6 py-10">

  <CategoryMenu categories={categories} />

   <BackButton />

  <nav className="mt-8 mb-4 text-sm text-slate-500">

    <Link
      href="/"
      className="hover:text-cyan-600"
    >
      Home
    </Link>

    <span className="mx-2">/</span>

    <span className="text-cyan-600">
      {category.name}
    </span>

  </nav>

 

  <span className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
        Categoria
      </span>

      <h1 className="mt-3 text-5xl font-extrabold">
        {category.name}
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        Conteúdos publicados na categoria {category.name}.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {news.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
          />
        ))}

      </div>

    </main>
  );
}