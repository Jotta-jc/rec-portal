"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/services/admin/upload-image.service";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    try {
      setUploading(true);

      const { publicUrl } = await uploadImage(file);

      onChange(publicUrl);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          JSON.stringify(error, null, 2)
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-cyan-500 hover:bg-cyan-50"
      >
        {uploading ? (
          <p className="text-slate-600">
            Enviando imagem...
          </p>
        ) : (
          <>
            <p className="mb-3 text-5xl">📷</p>

            <p className="font-semibold text-slate-800">
              Clique para selecionar uma imagem
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Em seguida adicionaremos o recurso de arrastar e soltar.
            </p>
          </>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />
      </div>

      {value && (
        <img
          src={value}
          alt="Imagem destacada"
          className="w-full rounded-xl border object-cover"
        />
      )}
    </div>
  );
}