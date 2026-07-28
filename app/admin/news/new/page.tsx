import NewsForm from "@/components/admin/news/NewsForm";

import { getAllCategories } from "@/services/admin/category.service";

export default async function NewNewsPage() {
  const categories = await getAllCategories();

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        Nova notícia
      </h1>

      <NewsForm
        news={null}
        categories={categories}
      />
    </>
  );
}