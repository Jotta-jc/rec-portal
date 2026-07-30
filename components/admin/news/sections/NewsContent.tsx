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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Conteúdo
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Escreva utilizando Markdown.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
          Markdown
        </span>
      </div>

      <textarea
        rows={28}
        spellCheck={false}
        placeholder={`# Título

Introdução do artigo...

## Subtítulo

Texto em **negrito**

Texto em *itálico*

- Item 1
- Item 2
- Item 3

> Citação

[Link](https://...)

![Legenda](https://...)`}
        value={formData.content}
        onChange={(e) =>
          setFormData({
            ...formData,
            content: e.target.value,
          })
        }
        className="min-h-[700px] w-full rounded-2xl border border-slate-300 bg-slate-50 p-6 font-mono text-[15px] leading-7 outline-none transition focus:border-cyan-600 focus:bg-white"
      />
    </section>
  );
}