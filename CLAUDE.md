@AGENTS.md

# CLAUDE.md — Portal REC

> Este arquivo é lido automaticamente pelo Claude Code em toda sessão aberta nesta pasta.
> O documento completo de transferência está em `ORIENTACOES_PROJETO_REC.md` — leia-o antes de qualquer tarefa nova.

## Projeto
**REC — Revista de Estratégia e Comportamento** (antigo REC Comunicação)
Domínio: https://www.reccomunicacao.com.br/
Portal editorial de conhecimento aplicado: empresas, gestão, liderança, comportamento, inovação, estratégia e casos reais.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Supabase (banco + Storage) — tabelas: `news`, `categories`, `comments`, `images`, `team_members`, `slug_redirects`
- Vercel (hospedagem) · Cloudflare (DNS) · Locaweb (registro do domínio) · Hostinger (e-mail)

## Atenção: projeto separado do JC Experiência
Este PC também roda o JC Experiência, que usa os mesmos serviços (Supabase, Vercel etc.).
- Antes de qualquer comando que toque Supabase, Vercel ou Git remoto, **confirme que o alvo é o projeto REC**, e não o JC.
- Nunca reutilize URLs, chaves, project refs ou configurações de MCP do JC neste projeto.

## Regras obrigatórias
1. Não reconstruir o projeto do zero nem criar outro projeto.
2. Não recriar, substituir ou apagar o banco Supabase, tabelas, notícias ou imagens.
3. Não modificar dados de produção sem autorização explícita.
4. Não trocar tecnologias sem justificativa e aprovação.
5. Não duplicar componentes/serviços nem recriar funcionalidades existentes.
6. Não alterar DNS, nameservers ou domínios na Vercel sem autorização.
7. Não remover integrações existentes.
8. Não publicar nem fazer push sem `npm run build` passando.
9. Nunca exibir, commitar ou documentar chaves, senhas ou tokens. Service role key jamais no frontend.
10. Mudanças no banco: inspecionar schema/RLS → avaliar impacto → migração versionada → backup → autorização.
11. Frontend: alterações pontuais, reutilizar componentes, validar desktop e mobile.
12. Documentar toda alteração (arquivos modificados e motivo).
13. SQL: nunca execute SQL no banco. Sempre entregue cada consulta em um bloco separado e numerado, pronto para o responsável copiar e rodar no SQL Editor do Supabase do REC. Identifique no início de cada bloco se ele é SOMENTE LEITURA ou se ALTERA DADOS. Consultas que alteram dados exigem backup e autorização explícita.

## Correções já feitas — preservar
- `/admin/news/page.tsx`: `export const dynamic = "force-dynamic";`
- `services/admin/create-news.service.ts`: notícias sem destaque usam `featured_order: null` (evita erro `23505 — news_featured_order_unique`); tempo de leitura calculado; erros do Supabase logados com detalhes.
- Atualização de notícia libera a posição de destaque ocupada antes de reatribuir.
- `NewsTable.tsx`: `—` sem destaque · 1 = Hero · 2 = Destaque 1 · 3 = Destaque 2.

## Pendências conhecidas
- Criação de notícia com posição de destaque já ocupada (replicar lógica da atualização).
- Rotas `/admin/categories`, `/admin/team`, `/admin/comments` — verificar se faltam, estão incompletas ou com problema de navegação.

## Forma de trabalho
- Sprints curtas; não avançar sem validar a anterior. Sprint atual: **Sprint 0 — Diagnóstico** (somente leitura).
- Para cada tarefa: objetivo, plano, arquivos envolvidos, impacto, prioridade, resultado esperado.
- Idioma: português do Brasil.
- Marcos do diário: v0.1 Arquitetura validada → v1.0 Portal consolidado (ver documento completo).
- Diretrizes editoriais: ver Padrao_Editorial_REC.txt na raiz.
