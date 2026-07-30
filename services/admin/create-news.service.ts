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
};

export async function createNews(values: CreateNewsInput) {
  const supabase = createClient();

  const payload = {
    ...values,
    read_time: calculateReadingTime(values.content),
  };

  console.log("ENVIANDO:", payload);

  console.log("PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("news")
    .insert(payload)
    .select()
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}