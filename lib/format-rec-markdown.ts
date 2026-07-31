export function formatRecMarkdown(text: string): string {
  let content = text.trim();

  // Normaliza quebras de linha
  content = content.replace(/\r\n/g, "\n");

  // Converte listas: 1 -  => 1.
  content = content.replace(/^(\d+)\s*-\s*/gm, "$1. ");

  // Converte marcadores • em -
  content = content.replace(/^•\s+/gm, "- ");

  // Adiciona H2 em linhas isoladas
  const lines = content.split("\n");

  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      result.push("");
      continue;
    }

    const next = lines[i + 1]?.trim() ?? "";

    const isAlreadyMarkdown =
      line.startsWith("#") ||
      line.startsWith("-") ||
      /^\d+\./.test(line) ||
      line.startsWith(">");

    const looksLikeTitle =
      !isAlreadyMarkdown &&
      line.length < 80 &&
      next.length > 80;

    if (looksLikeTitle) {
      result.push(`## ${line}`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}