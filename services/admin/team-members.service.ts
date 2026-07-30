import { createClient } from "@/lib/supabase/client";

export async function getTeamMembers() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name")
    .order("display_order");

  if (error) throw error;

  return data;
}