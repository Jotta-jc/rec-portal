type Props = {
  formData: any;
  setFormData: any;
};

export default function NewsInfo({
  formData,
  setFormData,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Informações
      </h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Título
          </label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Linha fina
          </label>

          <textarea
            rows={3}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600"
          />
        </div>
      </div>
    </section>
  );
}