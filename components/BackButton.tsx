"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        mb-8
        inline-flex
        items-center
        gap-2
        rounded-lg
        border
        border-slate-200
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-slate-600
        shadow-sm
        transition-all
        hover:border-cyan-600
        hover:text-cyan-600
        hover:shadow-md
      "
    >
      <span className="text-base">←</span>

      <span>Voltar</span>
    </button>
  );
}