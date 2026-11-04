import { createClient } from "@/lib/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

// 0 (ou vazio) significa "não é destaque".
// No banco, usamos null para não conflitar com a restrição UNIQUE.
export function normalizeFeatured(featuredOrder: number | null | undefined) {
  const order =
    featuredOrder && featuredOrder > 0 ? featuredOrder : null;

  return {
    featured: order !== null,
    featured_order: order,
  };
}

// Libera a posição de destaque ocupada por outra notícia,
// garantindo uma única notícia por posição (Hero, Destaque 1, Destaque 2).
export async function releaseFeaturedPosition(
  supabase: SupabaseClient,
  featuredOrder: number | null,
  exceptId?: number
) {
  if (featuredOrder === null) return;

  let query = supabase
    .from("news")
    .update({
      featured: false,
      featured_order: null,
    })
    .eq("featured_order", featuredOrder);

  if (exceptId !== undefined) {
    query = query.neq("id", exceptId);
  }

  const { error } = await query;

  if (error) {
    console.error("ERRO AO LIBERAR POSIÇÃO DE DESTAQUE:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw error;
  }
}
