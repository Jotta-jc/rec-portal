type Props = {
  formData: any;
  setFormData: any;
};

export default function NewsContent({
  formData,
  setFormData,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-bold">
        Conteúdo
      </h2>

      <textarea
        rows={24}
        value={formData.content}
        onChange={(e) =>
          setFormData({
            ...formData,
            content: e.target.value,
          })
        }
        className="w-full rounded-xl border p-4"
      />
    </section>
  );
}