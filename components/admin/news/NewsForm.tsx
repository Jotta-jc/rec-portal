"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import NewsInfo from "./sections/NewsInfo";
import NewsContent from "./sections/NewsContent";
import NewsSidebar from "./sections/NewsSidebar";

import { updateNews } from "@/services/admin/update-news.service";
import { createNews } from "@/services/admin/create-news.service";

import {
  Category,
  News,
  NewsFormData,
} from "@/types/news";

type Props = {
  news: News | null;
  categories: Category[];
};

export default function NewsForm({
  news,
  categories,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState<NewsFormData>({
  title: news?.title ?? "",
  excerpt: news?.excerpt ?? "",
  content: news?.content ?? "",
  category_id: news?.category_id ?? null,
  featured: news?.featured ?? false,
  featured_order: news?.featured_order ?? 0,
  featured_image: news?.featured_image ?? "",
});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (news?.id) {
        await updateNews(news.id, formData);
      } else {
        const created = await createNews(formData);

        router.push(`/admin/news/${created.id}`);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <NewsInfo
            formData={formData}
            setFormData={setFormData}
          />

          <NewsContent
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <NewsSidebar
          categories={categories}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
        />
      </div>
    </form>
  );
}