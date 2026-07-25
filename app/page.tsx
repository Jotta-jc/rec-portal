import CategoryMenu from "../components/CategoryMenu";
import FeaturedCard from "../components/FeaturedCard";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";

import { getCategories } from "../services/category.service";
import {
  getFeaturedNews,
  getLatestNews,
} from "../services/news.service";

export default async function Home() {
  const categories = await getCategories();
  const featuredNews = await getFeaturedNews();
  const latestNews = await getLatestNews();

  const hero = featuredNews[0];
  const destaque1 = featuredNews[1];
  const destaque2 = featuredNews[2];

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">

      <CategoryMenu categories={categories} />

      {hero && (
<Hero news={hero} />
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {destaque1 && (
<FeaturedCard news={destaque1} />
        )}

        {destaque2 && (
<FeaturedCard news={destaque2} />
        )}

      </div>

<section className="mt-20">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
        REC
      </span>

      <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
        Últimas Publicações
      </h2>

      <p className="mt-2 text-slate-600">
        Conteúdo produzido a partir de experiências reais, estudos e casos aplicados.
      </p>

    </div>

  </div>



        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {latestNews.map((news) => (

            <NewsCard
              key={news.id}
              news={news}
            />

          ))}

        </div>

      </section>

    </main>
  );
}