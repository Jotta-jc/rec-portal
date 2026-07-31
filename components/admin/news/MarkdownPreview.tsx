"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

export default function MarkdownPreview({ content }: Props) {
  return (
    <div
      className="
        prose
        prose-slate
        prose-lg
        max-w-none
        min-h-[700px]
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content || "_Comece a escrever para visualizar a matéria._"}
      </ReactMarkdown>
    </div>
  );
}