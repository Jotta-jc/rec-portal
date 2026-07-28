import Link from "next/link";

import AdminTable from "@/components/admin/AdminTable";
import NewsTable from "@/components/admin/NewsTable";

import { getAllNews } from "@/services/admin/news.service";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notícias
          </h1>

          <p className="mt-2 text-slate-600">
            Gerencie todas as publicações do Portal REC.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          + Nova notícia
        </Link>
      </div>

      <AdminTable
        headers={[
          "Título",
          "Categoria",
          "Publicação",
          "Destaque",
          "Ações",
        ]}
      >
        <NewsTable news={news} />
      </AdminTable>
    </div>
  );
}