import NewsForm from "@/components/admin/news/NewsForm";

import { getNewsById } from "@/services/admin/news-details.service";
import { getAllCategories } from "@/services/admin/category.service";
import { getTeamMembers } from "@/services/admin/team-members.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;

  const [news, categories, teamMembers] = await Promise.all([
    getNewsById(Number(id)),
    getAllCategories(),
    getTeamMembers(),
  ]);

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">
        Editar notícia
      </h1>

      <p className="mb-8 text-slate-500">
        {news.title}
      </p>

      <NewsForm
        news={news}
        categories={categories}
        teamMembers={teamMembers}
      />
    </>
  );
}