import { supabase } from "@/lib/supabase";

export async function getNewsById(id: number) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}