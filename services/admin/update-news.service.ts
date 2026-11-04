import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/calculate-reading-time";
import {
  normalizeFeatured,
  releaseFeaturedPosition,
} from "@/services/admin/featured-position";

export async function updateNews(id: number, values: any) {
  const supabase = createClient();

  const payload = {
    ...values,

    // 0 significa "não é destaque" (null no banco).
    ...normalizeFeatured(values.featured_order),

    read_time: calculateReadingTime(values.content),
  };

  // Se a notícia será destaque, libera a posição antes
  await releaseFeaturedPosition(supabase, payload.featured_order, id);

  const { error } = await supabase
    .from("news")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
}