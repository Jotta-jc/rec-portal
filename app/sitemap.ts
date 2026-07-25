import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://reccomunicacao.com.br",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: "https://reccomunicacao.com.br/sobre",
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: "https://reccomunicacao.com.br/contato",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}