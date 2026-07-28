import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("news")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("news")
    .getPublicUrl(fileName);

  return {
    fileName,
    publicUrl,
  };
}