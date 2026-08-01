"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

export default function MarkdownPreview({ content }: Props) {
  return (
    <div className="min-h-[700px] rounded-2xl border border-slate-200 bg-white p-8 text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 mt-10 text-3xl font-bold leading-tight text-slate-900 first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-4 mt-10 text-2xl font-bold leading-tight text-slate-900">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 text-xl font-bold text-slate-900">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-6 text-base leading-7 text-slate-700">
              {children}
            </p>
          ),

          ol: ({ children }) => (
            <ol className="mb-7 ml-6 list-decimal space-y-2 text-base leading-7">
              {children}
            </ol>
          ),

          ul: ({ children }) => (
            <ul className="mb-7 ml-6 list-disc space-y-2 text-base leading-7">
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li className="pl-1">
              {children}
            </li>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-cyan-600 bg-slate-50 px-6 py-4 italic text-slate-700">
              {children}
            </blockquote>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-2"
            >
              {children}
            </a>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">
              {children}
            </strong>
          ),

          hr: () => (
            <hr className="my-10 border-slate-200" />
          ),
        }}
      >
        {content || "_Comece a escrever para visualizar a matéria._"}
      </ReactMarkdown>
    </div>
  );
}