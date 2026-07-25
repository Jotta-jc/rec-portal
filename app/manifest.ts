import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REC - Revista de Estratégia & Comportamento",
    short_name: "REC",
    description:
      "Portal especializado em estratégia, gestão, liderança e comportamento organizacional.",

    start_url: "/",

    display: "standalone",

    background_color: "#ffffff",

    theme_color: "#0891b2",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}