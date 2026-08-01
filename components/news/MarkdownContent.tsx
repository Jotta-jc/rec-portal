import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

export default function MarkdownContent({
  content,
}: Props) {
  return (
    <article className="max-w-none text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 mt-12 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-5 mt-12 border-l-4 border-cyan-600 pl-4 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-4 mt-10 text-xl font-bold leading-tight text-slate-900 md:text-2xl">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-6 text-lg leading-8 text-slate-700">
              {children}
            </p>
          ),

          ol: ({ children }) => (
            <ol className="mb-8 ml-7 list-decimal space-y-3 text-lg leading-8 text-slate-700">
              {children}
            </ol>
          ),

          ul: ({ children }) => (
            <ul className="mb-8 ml-7 list-disc space-y-3 text-lg leading-8 text-slate-700">
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li className="pl-1">
              {children}
            </li>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">
              {children}
            </strong>
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

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              className="my-10 h-auto w-full rounded-2xl"
            />
          ),

          hr: () => (
            <hr className="my-10 border-slate-200" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}