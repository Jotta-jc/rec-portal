"use client";

type Props = {
  categories: any[];
  formData: any;
  setFormData: any;
  loading: boolean;
};

export default function NewsSidebar({
  categories,
  formData,
  setFormData,
  loading,
}: Props) {
  return (
    <aside className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Publicação
        </h2>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Categoria
        </h2>

        <select
          value={formData.category_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              category_id: Number(e.target.value),
            })
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600"
        >
          <option value="">Selecione...</option>

          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Destaque na Home
        </h2>

        <select
          value={formData.featured_order}
          onChange={(e) =>
            setFormData({
              ...formData,
              featured_order: Number(e.target.value),
              featured: Number(e.target.value) > 0,
            })
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600"
        >
          <option value={0}>Nenhum</option>
          <option value={1}>Hero</option>
          <option value={2}>Destaque 1</option>
          <option value={3}>Destaque 2</option>
        </select>
      </section>
    </aside>
  );
}