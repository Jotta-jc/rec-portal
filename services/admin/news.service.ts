import { supabase } from "@/lib/supabase";

export async function getAllNews() {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name)
    `)
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function searchNews(query: string) {
  const term = query.trim();

  if (!term) {
    return [];
  }

  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name)
    `)
    .or(
      `title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`
    )
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}