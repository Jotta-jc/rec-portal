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
    <article
      className="
        prose
        prose-lg
        lg:prose-xl
        prose-slate
        max-w-none

        prose-headings:font-bold
        prose-headings:text-slate-900
        prose-headings:tracking-tight

        prose-h1:mb-8
        prose-h1:text-5xl

        prose-h2:mt-16
        prose-h2:mb-6
        prose-h2:border-l-4
        prose-h2:border-cyan-600
        prose-h2:pl-4
        prose-h2:text-3xl

        prose-h3:mt-12
        prose-h3:mb-4
        prose-h3:text-2xl

        prose-p:my-6
        prose-p:text-slate-700
        prose-p:leading-9

        prose-strong:text-slate-900

        prose-ul:my-8
        prose-ol:my-8
        prose-li:my-2

        prose-blockquote:my-10
        prose-blockquote:border-l-4
        prose-blockquote:border-cyan-600
        prose-blockquote:bg-slate-50
        prose-blockquote:py-2
        prose-blockquote:px-6
        prose-blockquote:italic

        prose-img:my-10
        prose-img:rounded-2xl
        prose-img:shadow-lg

        prose-table:my-10
        prose-table:w-full

        prose-a:font-medium
        prose-a:text-cyan-700
        prose-a:no-underline
        hover:prose-a:underline

        prose-hr:my-12
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}