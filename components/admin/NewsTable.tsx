import Link from "next/link";

type News = {
  id: number;
  title: string;
  featured: boolean;
  featured_order: number | null;
  published_at: string;
  categories?: {
    name: string;
  } | null;
};

type Props = {
  news: News[];
};

function getFeaturedLabel(news: News) {
  if (!news.featured) return "—";

  switch (news.featured_order) {
    case 1:
      return "Hero";

    case 2:
      return "Destaque 1";

    case 3:
      return "Destaque 2";

    default:
      return "Sim";
  }
}

export default function NewsTable({ news }: Props) {
  return (
    <>
      {news.map((item) => (
        <tr
          key={item.id}
          className="border-t border-slate-200 hover:bg-slate-50"
        >
          <td className="px-6 py-4 font-medium text-slate-900">
            {item.title}
          </td>

          <td className="px-6 py-4 text-slate-600">
            {item.categories?.name ?? "Sem categoria"}
          </td>

          <td className="px-6 py-4 text-slate-500">
            {new Date(item.published_at).toLocaleDateString("pt-BR")}
          </td>

          <td className="px-6 py-4">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              {getFeaturedLabel(item)}
            </span>
          </td>

          <td className="px-6 py-4">
            <Link
              href={`/admin/news/${item.id}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Editar
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}