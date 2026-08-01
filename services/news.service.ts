import { supabase } from "../lib/supabase";

export async function getFeaturedNews() {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("featured", true)
    .order("featured_order", { ascending: true })
    .limit(3);

  if (error) throw error;

  return data;
}

export async function getLatestNews(
  limit = 6,
  offset = 0
) {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return data;
}

export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function getRelatedNews(
  categoryId: number,
  currentNewsId: number
) {
  const { data, error } = await supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("category_id", categoryId)
    .neq("id", currentNewsId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) throw error;

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
      categories(name, slug)
    `)
    .or(
      `title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`
    )
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}