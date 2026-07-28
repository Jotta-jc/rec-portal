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