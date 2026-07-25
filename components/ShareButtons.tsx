"use client";

import { useEffect, useState } from "react";

import {
  Share2,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({
  title,
}: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(
    `${title}\n${url}`
  )}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao copiar o link:", error);
    }
  }

  return (
    <section className="mt-10 border-y border-slate-200 py-6">

      <div className="flex flex-wrap items-center gap-8">

        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Share2 size={18} />
          <span>Compartilhar</span>
        </div>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-600 transition hover:text-green-600"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-2 text-slate-600 transition hover:text-cyan-600"
        >
          {copied ? (
            <>
              <Check size={18} />
              <span>Link copiado</span>
            </>
          ) : (
            <>
              <Link2 size={18} />
              <span>Copiar link</span>
            </>
          )}
        </button>

      </div>

    </section>
  );
}