"use client";

import { useRef } from "react";
import MarkdownPreview from "../MarkdownPreview";

type Props = {
  formData: any;
  setFormData: any;
};

export default function NewsContent({
  formData,
  setFormData,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertMarkdown(before: string, after = "") {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = formData.content.substring(start, end);

    const text =
      formData.content.substring(0, start) +
      before +
      selected +
      after +
      formData.content.substring(end);

    setFormData({
      ...formData,
      content: text,
    });

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
    });
  }

  const Button = ({
    label,
    before,
    after = "",
  }: {
    label: string;
    before: string;
    after?: string;
  }) => (
    <button
      type="button"
      onClick={() => insertMarkdown(before, after)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
    >
      {label}
    </button>
  );

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

      {/* Barra de ferramentas */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button label="B" before="**" after="**" />
        <Button label="I" before="*" after="*" />
        <Button label="H2" before="\n## " />
        <Button label="H3" before="\n### " />
        <Button label="• Lista" before="\n- " />
        <Button label="1." before="\n1. " />
        <Button
          label="Link"
          before="["
          after="](https://)"
        />
        <Button
          label="Imagem"
          before="![Legenda]("
          after=")"
        />
        <Button label="Citação" before="\n> " />
      </div>

      {/* Editor + Preview */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Editor */}
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Editor
          </div>

          <textarea
            ref={textareaRef}
            rows={28}
            spellCheck={false}
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
            className="min-h-[700px] w-full rounded-2xl border border-slate-300 bg-slate-50 p-6 font-mono text-[15px] leading-7 outline-none transition focus:border-cyan-600 focus:bg-white"
          />
        </div>

        {/* Preview */}
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Pré-visualização
          </div>

          <MarkdownPreview
            content={formData.content}
          />
        </div>
      </div>
    </section>
  );
}