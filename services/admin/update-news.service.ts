import { supabase } from "@/lib/supabase";

export async function updateNews(
  id: number,
  values: {
    title: string;
    excerpt: string;
    content: string;
    category_id: number | null;
    featured: boolean;
    featured_order: number | null;
  }
) {
  const { error } = await supabase
    .from("news")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}