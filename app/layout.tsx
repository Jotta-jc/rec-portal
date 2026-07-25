import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://reccomunicacao.com.br"),

  title: {
    default: "REC | Revista de Estratégia & Comportamento",
    template: "%s | REC",
  },

  description:
    "Portal especializado em estratégia, liderança, gestão, comportamento organizacional, inovação e empreendedorismo.",

  keywords: [
    "estratégia",
    "gestão",
    "liderança",
    "comportamento",
    "empreendedorismo",
    "inovação",
    "empresas",
    "produtividade",
    "revista",
    "REC",
  ],

  authors: [
    {
      name: "REC Comunicação",
    },
  ],

  creator: "REC Comunicação",

  publisher: "REC Comunicação",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://reccomunicacao.com.br",
    siteName: "REC",
    title: "REC | Revista de Estratégia & Comportamento",
    description:
      "Portal especializado em estratégia, liderança, gestão e comportamento organizacional.",

    images: [
      {
        url: "/logo-rec.png",
        width: 1200,
        height: 630,
        alt: "REC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "REC | Revista de Estratégia & Comportamento",
    description:
      "Portal especializado em estratégia, liderança, gestão e comportamento organizacional.",

    images: ["/logo-rec.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 text-slate-900">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}