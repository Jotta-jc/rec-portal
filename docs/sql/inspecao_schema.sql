-- =====================================================================
-- Portal REC — Inspeção de schema (SOMENTE LEITURA)
-- Sprint 0 — Diagnóstico técnico
--
-- Como usar:
--   1. Abra o SQL Editor do projeto Supabase do REC (ref donnde…wtul).
--      Confira o ref antes de rodar — NÃO é o projeto do JC Experiência.
--   2. Rode cada bloco separadamente (o editor mostra só o último resultado).
--   3. Exporte/copie o resultado de cada bloco e devolva para análise.
--
-- Todas as consultas são SELECT em catálogos do Postgres/Supabase.
-- Nenhuma consulta altera dados, estrutura ou permissões.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 01. [SOMENTE LEITURA] Tabelas e views do schema public (com RLS ativo ou não)
-- ---------------------------------------------------------------------
SELECT
  c.relname                      AS tabela,
  CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view'
                 WHEN 'm' THEN 'matview' WHEN 'p' THEN 'partitioned' END AS tipo,
  c.relrowsecurity               AS rls_ativo,
  c.relforcerowsecurity          AS rls_forcado,
  c.reltuples::bigint            AS linhas_estimadas
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind IN ('r', 'v', 'm', 'p')
ORDER BY c.relname;


-- ---------------------------------------------------------------------
-- 02. [SOMENTE LEITURA] Colunas (tipo, nulidade, default) de todas as tabelas public
--     Obs.: o default revela se o slug/published_at/read_time é gerado.
-- ---------------------------------------------------------------------
SELECT
  table_name,
  ordinal_position AS pos,
  column_name,
  data_type,
  udt_name,
  is_nullable,
  column_default,
  is_generated,
  generation_expression
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;


-- ---------------------------------------------------------------------
-- 03. [SOMENTE LEITURA] Constraints (PK, FK, UNIQUE, CHECK, EXCLUDE) com definição completa
--     Importante: mostra a definição real de news_featured_order_unique.
-- ---------------------------------------------------------------------
SELECT
  rel.relname                       AS tabela,
  con.conname                       AS constraint_name,
  CASE con.contype WHEN 'p' THEN 'PRIMARY KEY' WHEN 'f' THEN 'FOREIGN KEY'
                   WHEN 'u' THEN 'UNIQUE' WHEN 'c' THEN 'CHECK'
                   WHEN 'x' THEN 'EXCLUDE' ELSE con.contype::text END AS tipo,
  con.condeferrable                 AS deferrable,
  pg_get_constraintdef(con.oid)     AS definicao
FROM pg_constraint con
JOIN pg_class rel     ON rel.oid = con.conrelid
JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE nsp.nspname = 'public'
ORDER BY rel.relname, con.contype, con.conname;


-- ---------------------------------------------------------------------
-- 04. [SOMENTE LEITURA] Índices (inclui índices UNIQUE parciais, ex.: WHERE featured = true)
-- ---------------------------------------------------------------------
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;


-- ---------------------------------------------------------------------
-- 05. [SOMENTE LEITURA] Triggers nas tabelas public (ex.: geração de slug, updated_at)
-- ---------------------------------------------------------------------
SELECT
  c.relname                     AS tabela,
  t.tgname                      AS trigger_name,
  CASE t.tgenabled WHEN 'O' THEN 'enabled' WHEN 'D' THEN 'disabled'
                   WHEN 'R' THEN 'replica' WHEN 'A' THEN 'always' END AS estado,
  pg_get_triggerdef(t.oid)      AS definicao,
  p.proname                     AS funcao
FROM pg_trigger t
JOIN pg_class c     ON c.oid = t.tgrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
JOIN pg_proc p      ON p.oid = t.tgfoid
WHERE n.nspname = 'public'
  AND NOT t.tgisinternal
ORDER BY c.relname, t.tgname;


-- ---------------------------------------------------------------------
-- 06. [SOMENTE LEITURA] Funções do schema public (código-fonte — ex.: gerador de slug)
-- ---------------------------------------------------------------------
SELECT
  p.proname                              AS funcao,
  pg_get_function_identity_arguments(p.oid) AS argumentos,
  pg_get_function_result(p.oid)          AS retorno,
  l.lanname                              AS linguagem,
  p.prosecdef                            AS security_definer,
  pg_get_functiondef(p.oid)              AS definicao
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
JOIN pg_language l  ON l.oid = p.prolang
WHERE n.nspname = 'public'
  AND p.prokind = 'f'
ORDER BY p.proname;


-- ---------------------------------------------------------------------
-- 07. [SOMENTE LEITURA] Políticas RLS das tabelas public
-- ---------------------------------------------------------------------
SELECT
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual        AS using_expr,
  with_check  AS with_check_expr
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;


-- ---------------------------------------------------------------------
-- 08. [SOMENTE LEITURA] Privilégios (GRANTs) de anon / authenticated nas tabelas public
-- ---------------------------------------------------------------------
SELECT
  table_name,
  grantee,
  string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privilegios
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND grantee IN ('anon', 'authenticated')
GROUP BY table_name, grantee
ORDER BY table_name, grantee;


-- ---------------------------------------------------------------------
-- 09. [SOMENTE LEITURA] Buckets do Storage
-- ---------------------------------------------------------------------
SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
ORDER BY name;


-- ---------------------------------------------------------------------
-- 10. [SOMENTE LEITURA] Políticas RLS do Storage (storage.objects)
-- ---------------------------------------------------------------------
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual        AS using_expr,
  with_check  AS with_check_expr
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY cmd, policyname;


-- ---------------------------------------------------------------------
-- 11. [SOMENTE LEITURA] Volume de objetos por bucket e pasta de primeiro nível
-- ---------------------------------------------------------------------
SELECT
  bucket_id,
  split_part(name, '/', 1)                     AS pasta,
  count(*)                                     AS arquivos,
  pg_size_pretty(sum(coalesce((metadata->>'size')::bigint, 0))) AS tamanho
FROM storage.objects
GROUP BY bucket_id, split_part(name, '/', 1)
ORDER BY bucket_id, pasta;


-- ---------------------------------------------------------------------
-- 12. [SOMENTE LEITURA] Distribuição de destaques em news (valida a lógica de featured_order)
-- ---------------------------------------------------------------------
SELECT
  featured,
  featured_order,
  count(*) AS qtd
FROM public.news
GROUP BY featured, featured_order
ORDER BY featured, featured_order NULLS FIRST;


-- ---------------------------------------------------------------------
-- 13. [SOMENTE LEITURA] Integridade básica de news (slugs duplicados, FKs órfãs, campos vazios)
-- ---------------------------------------------------------------------
SELECT 'slugs duplicados' AS verificacao, count(*) AS qtd
FROM (SELECT slug FROM public.news GROUP BY slug HAVING count(*) > 1) s
UNION ALL
SELECT 'news sem categoria válida', count(*)
FROM public.news n
LEFT JOIN public.categories c ON c.id = n.category_id
WHERE c.id IS NULL
UNION ALL
SELECT 'news com author fora de team_members', count(*)
FROM public.news n
LEFT JOIN public.team_members t ON t.name = n.author
WHERE t.id IS NULL
UNION ALL
SELECT 'news sem featured_image', count(*)
FROM public.news WHERE coalesce(featured_image, '') = ''
UNION ALL
SELECT 'news sem meta_description', count(*)
FROM public.news WHERE coalesce(meta_description, '') = '';


-- ---------------------------------------------------------------------
-- 14. [SOMENTE LEITURA] Tabelas fora do public que possam conter "images" (a tabela
--     public.images citada nas orientações não foi encontrada via API)
-- ---------------------------------------------------------------------
SELECT table_schema, table_name, table_type
FROM information_schema.tables
WHERE table_name ILIKE '%image%'
   OR table_name ILIKE '%imag%'
ORDER BY table_schema, table_name;


-- ---------------------------------------------------------------------
-- 15. [SOMENTE LEITURA] Extensões instaladas
-- ---------------------------------------------------------------------
SELECT extname, extversion
FROM pg_extension
ORDER BY extname;
