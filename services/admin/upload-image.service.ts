import { createClient } from "@/lib/supabase/client";

export async function uploadImage(file: File) {
  const supabase = createClient();

  const extension = file.name.split(".").pop();
  const fileName = `news/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("rec imagens")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("rec imagens")
    .getPublicUrl(fileName);

  return {
    fileName,
    publicUrl,
  };
}