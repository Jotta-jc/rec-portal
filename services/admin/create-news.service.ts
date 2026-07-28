import { supabase } from "@/lib/supabase";

type CreateNewsInput = {
  title: string;
  excerpt: string;
  content: string;
  category_id: number | null;
  featured: boolean;
  featured_order: number | null;
};

export async function createNews(values: CreateNewsInput) {
  const { data, error } = await supabase
    .from("news")
    .insert(values)
    .select("id")
    .single();

  if (error) throw error;

  return data;
}