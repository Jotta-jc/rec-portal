import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/calculate-reading-time";

export async function updateNews(id: number, values: any) {
  const supabase = createClient();

  const payload = {
    ...values,
    read_time: calculateReadingTime(values.content),
  };

  // Se a notícia será destaque, libera a posição antes
  if (payload.featured && payload.featured_order > 0) {
    const { error: clearError } = await supabase
      .from("news")
      .update({
        featured: false,
        featured_order: 0,
      })
      .eq("featured_order", payload.featured_order)
      .neq("id", id);

    if (clearError) throw clearError;
  }

const { error } = await supabase
  .from("news")
  .update(payload)
  .eq("id", id)
  .select();

if (error) throw error;
}