import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/calculate-reading-time";

type CreateNewsInput = {
  title: string;
  excerpt: string;
  content: string;
  category_id: number | null;
  featured: boolean;
  featured_order: number | null;
  featured_image?: string;
  author?: string;
};

export async function createNews(values: CreateNewsInput) {
  const supabase = createClient();

  const payload = {
    ...values,

    // 0 significa "não é destaque".
    // No banco, usamos null para não conflitar com a restrição UNIQUE.
    featured_order:
      values.featured && values.featured_order && values.featured_order > 0
        ? values.featured_order
        : null,

    featured:
      values.featured &&
      values.featured_order !== null &&
      values.featured_order > 0,

    read_time: calculateReadingTime(values.content),
  };

  const { data, error } = await supabase
    .from("news")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("ERRO COMPLETO AO CRIAR NOTÍCIA:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw error;
  }

  return data;
}