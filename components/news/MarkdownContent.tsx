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
        prose-xl
        prose-slate
        max-w-none

        prose-p:leading-8
        prose-p:text-slate-700

        prose-h1:mt-10
        prose-h2:mt-12
        prose-h3:mt-10

        prose-img:rounded-2xl

        prose-a:text-cyan-600
        prose-a:no-underline
        hover:prose-a:underline

        prose-blockquote:border-cyan-600
        prose-blockquote:text-slate-700

        prose-table:w-full
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