export function formatRecMarkdown(text: string): string {
  if (!text?.trim()) return "";

  let content = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  // 1 - Texto → 1. Texto
  content = content.replace(
    /^(\d+)\s*-\s+/gm,
    "$1. "
  );

  // • Texto → - Texto
  content = content.replace(
    /^•\s+/gm,
    "- "
  );

  const blocks = content.split(/\n\s*\n/);

  const formattedBlocks = blocks.map((block, index) => {
    const line = block.trim();

    // Primeiro bloco permanece como conteúdo normal
    if (index === 0) {
      return line;
    }

    // Preserva Markdown existente
    if (
      line.startsWith("#") ||
      line.startsWith(">") ||
      line.startsWith("-") ||
      /^\d+\.\s/.test(line)
    ) {
      return line;
    }

    // Detecta possíveis subtítulos
    const isSingleLine = !line.includes("\n");

    const looksLikeHeading =
      isSingleLine &&
      line.length >= 3 &&
      line.length <= 70 &&
      !/[.!?,;:]$/.test(line);

    if (looksLikeHeading) {
      return `## ${line}`;
    }

    return line;
  });

  return formattedBlocks.join("\n\n").trim();
}