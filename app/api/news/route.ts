import { NextResponse } from "next/server";
import { getLatestNews } from "@/services/news.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") ?? 6);
  const offset = Number(searchParams.get("offset") ?? 0);

  try {
    const news = await getLatestNews(limit, offset);

    return NextResponse.json(news);
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);

    return NextResponse.json(
      { error: "Não foi possível carregar as notícias." },
      { status: 500 }
    );
  }
}