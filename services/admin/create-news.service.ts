import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/calculate-reading-time";
import {
  normalizeFeatured,
  releaseFeaturedPosition,
} from "@/services/admin/featured-position";

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

    // 0 significa "não é destaque" (null no banco).
    ...normalizeFeatured(values.featured ? values.featured_order : null),

    read_time: calculateReadingTime(values.content),
  };

  // Se a notícia será destaque, libera a posição antes
  await releaseFeaturedPosition(supabase, payload.featured_order);

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