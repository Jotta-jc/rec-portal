import { supabase } from "../lib/supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function getNewsByCategory(
  categoryId: number,
  limit = 12
) {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}