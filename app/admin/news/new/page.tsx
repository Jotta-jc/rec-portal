import NewsForm from "@/components/admin/news/NewsForm";

import { getAllCategories } from "@/services/admin/category.service";
import { getTeamMembers } from "@/services/admin/team-members.service";

export default async function NewNewsPage() {
  const [categories, teamMembers] = await Promise.all([
    getAllCategories(),
    getTeamMembers(),
  ]);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        Nova notícia
      </h1>

      <NewsForm
        news={null}
        categories={categories}
        teamMembers={teamMembers}
      />
    </>
  );
}