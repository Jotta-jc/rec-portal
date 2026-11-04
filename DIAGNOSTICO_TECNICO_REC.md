# DIAGNÓSTICO TÉCNICO — Portal REC

**Projeto:** REC — Revista de Estratégia e Comportamento
**Sprint:** 0 — Diagnóstico técnico (somente leitura)
**Data:** 2026-11-03
**Base analisada:** branch `main`, commit `606a04f`
**Escopo:** código do repositório, build de produção, consulta somente leitura à API REST do Supabase (anon key).

> Nenhum arquivo de código, configuração ou dado foi alterado nesta sprint.
> Este documento não contém chaves, senhas ou tokens. Refs de projeto aparecem abreviados.

---

## 1. Resumo executivo

O portal está funcional e **compila sem erros** (Next.js 16.2.11 / Turbopack / TypeScript). O portal público (home, notícia, categoria, busca, páginas institucionais) e o CRUD de notícias no admin funcionam com dados reais do Supabase. As conexões (Git, Supabase) foram confirmadas como sendo do **REC**, separadas do JC Experiência. A Vercel não pôde ser verificada localmente.

Pontos mais críticos:

1. **Destaques (`featured_order`)** — o update grava `0` em vez de `null`, e a criação não libera posição ocupada. A definição real da constraint `news_featured_order_unique` precisa ser confirmada (há 11 registros com `0` coexistindo, o que indica constraint parcial).
2. **`/admin/news/new` é estática** — categorias e autores ficam congelados no momento do build.
3. **Rotas admin inexistentes** — `/admin/categories`, `/admin/team`, `/admin/comments` levam a 404.
4. **Notícia/categoria inexistente gera erro 500** em vez de 404.
5. **SEO** — canonical `/` herdado por todas as páginas, títulos duplicados e sitemap sem notícias.

---

## 2. Arquitetura e tecnologias

| Camada | Tecnologia | Versão / detalhe |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | `16.2.11` |
| UI | React / React DOM | `19.2.4` |
| Linguagem | TypeScript | `^5` (strict) |
| Estilo | Tailwind CSS (via `@tailwindcss/postcss`) | `^4` |
| Banco / Auth / Storage | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) | `^2.110.8` / `^0.12.4` |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-raw` | `^10.1.0` |
| Ícones | `lucide-react`, `react-icons` | — |
| Lint | ESLint 9 + `eslint-config-next` | — |
| Hospedagem | Vercel | não verificada localmente |
| DNS / Domínio / E-mail | Cloudflare / Locaweb / Hostinger | conforme orientações (não alterado) |

### Fluxo de dados

```
Navegador ──► Next.js (Server Components) ──► lib/supabase.ts (anon, sem sessão) ──► Supabase (leituras)
     │
     └──► Client Components (admin) ──► lib/supabase/client.ts (anon + sessão do usuário) ──► Supabase (escritas, Storage)

middleware.ts ──► lib/supabase/middleware.ts ──► auth.getUser() ──► protege /admin/* (redireciona para /login)
```

### Clientes Supabase (dois padrões coexistem)

| Arquivo | Tipo | Sessão | Usado por |
|---|---|---|---|
| `lib/supabase.ts` | `createClient` (supabase-js) | **não** | serviços públicos e serviços admin de leitura (server) |
| `lib/supabase/client.ts` | `createBrowserClient` (ssr) | sim (cookies) | create/update de notícia, upload, team members, login/logout |
| `lib/supabase/server.ts` | `createServerClient` (ssr) | sim (cookies) | **não utilizado** em nenhum arquivo |
| `lib/supabase/middleware.ts` | `createServerClient` (ssr) | sim | `middleware.ts` |

Configuração Next (`next.config.ts`): `images.remotePatterns` libera `donnde…wtul.supabase.co` (REC) e `images.unsplash.com`. Não há `cacheComponents`, portanto `export const dynamic` continua válido (modelo anterior de cache).

---

## 3. Estrutura de diretórios

```
rec-portal/
├── app/                         # App Router
│   ├── layout.tsx               # layout raiz (Header + Footer + metadata global)
│   ├── page.tsx                 # Home (force-dynamic)
│   ├── noticia/[slug]/page.tsx  # página da notícia (force-dynamic)
│   ├── categoria/[slug]/page.tsx
│   ├── busca/page.tsx
│   ├── sobre/ contato/ politica-de-privacidade/ termos-de-uso/   # institucionais (estáticas)
│   ├── login/page.tsx           # login Supabase Auth (client)
│   ├── admin/
│   │   ├── layout.tsx           # sidebar + header admin
│   │   ├── page.tsx             # dashboard (números fixos)
│   │   └── news/ page.tsx · new/page.tsx · [id]/page.tsx
│   ├── api/news/route.ts        # GET paginado ("carregar mais")
│   ├── sitemap.ts · robots.ts · manifest.ts · not-found.tsx
│   └── globals.css · favicon.ico
├── components/                  # componentes públicos
│   ├── admin/                   # componentes do painel
│   │   └── news/ (NewsForm, ImageUpload, MarkdownPreview, sections/)
│   └── news/MarkdownContent.tsx
├── lib/                         # clientes Supabase + utilitários (tempo de leitura, formatador REC)
├── services/                    # acesso a dados
│   ├── admin/                   # serviços do painel
│   └── public/                  # (arquivos vazios)
├── types/                       # News, Category, NewsFormData, props admin
├── public/                      # logo, favicons, SVGs padrão do create-next-app
├── middleware.ts                # proteção de /admin/*
└── docs/sql/inspecao_schema.sql # consultas somente leitura (Sprint 0)
```

---

## 4. Rotas

Resultado do `npm run build` (ƒ = dinâmica, ○ = estática):

### Públicas

| Rota | Tipo | Fonte de dados | Observação |
|---|---|---|---|
| `/` | ƒ | categorias, destaques, últimas, mais notícias | `force-dynamic` |
| `/noticia/[slug]` | ƒ | `getNewsBySlug`, `getRelatedNews` | `force-dynamic`; 500 se slug não existe |
| `/categoria/[slug]` | ƒ | `getCategoryBySlug`, `getNewsByCategory` | 500 se slug não existe |
| `/busca?q=` | ƒ | `searchNews` (ilike em título, linha fina, conteúdo) | — |
| `/sobre`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso` | ○ | conteúdo fixo | — |
| `/login` | ○ | Supabase Auth (e-mail/senha) | — |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | ○ | fixo | sitemap só com 3 URLs |
| `/api/news?limit&offset` | ƒ | `getLatestNews` | usado por `MoreNewsList` |

### Administrativas (protegidas por `middleware.ts` → `/admin/:path*`)

| Rota | Tipo | Estado |
|---|---|---|
| `/admin` | ○ | Dashboard com números **fixos** (28/7/4/12) |
| `/admin/news` | ƒ | Listagem real (`force-dynamic`) ✅ |
| `/admin/news/new` | **○** | Formulário de criação — **estático** (dados congelados no build) |
| `/admin/news/[id]` | ƒ | Edição ✅ |
| `/admin/categories` | — | **não existe** (link no menu → 404) |
| `/admin/team` | — | **não existe** (link no menu → 404) |
| `/admin/comments` | — | **não existe** (link no menu → 404) |

---

## 5. Serviços

| Arquivo | Função | Tabela / recurso | Cliente | Executa em |
|---|---|---|---|---|
| `services/news.service.ts` | `getFeaturedNews`, `getLatestNews`, `getNewsBySlug`, `getRelatedNews`, `searchNews` | `news` + `categories` | `lib/supabase` | server |
| `services/category.service.ts` | `getCategories`, `getCategoryBySlug`, `getNewsByCategory` | `categories`, `news` | `lib/supabase` | server |
| `services/admin/news.service.ts` | `getAllNews`, `searchNews` | `news` | `lib/supabase` | server |
| `services/admin/news-details.service.ts` | `getNewsById` | `news` | `lib/supabase` | server |
| `services/admin/category.service.ts` | `getAllCategories` | `categories` | `lib/supabase` | server |
| `services/admin/team-members.service.ts` | `getTeamMembers` | `team_members` | `lib/supabase/client` | server (chamado de Server Component com cliente de browser) |
| `services/admin/create-news.service.ts` | `createNews` | `news` (insert) | `lib/supabase/client` | browser |
| `services/admin/update-news.service.ts` | `updateNews` | `news` (update) | `lib/supabase/client` | browser |
| `services/admin/upload-image.service.ts` | `uploadImage` | Storage bucket `rec imagens`, pasta `news/` | `lib/supabase/client` | browser |
| `services/public/news.service.ts` | — | — | — | **arquivo vazio** |
| `services/public/category.service.ts` | — | — | — | **arquivo vazio** |

**Duplicações:** `searchNews` existe em `services/news.service.ts` e `services/admin/news.service.ts` (diferem só no `select` de categoria). `getCategories` (ordenado por id) e `getAllCategories` (ordenado por nome) são equivalentes.

---

## 6. Componentes

### Públicos (`components/`)

| Componente | Função |
|---|---|
| `Header`, `Footer` | cabeçalho e rodapé globais (incluídos no layout raiz) |
| `CategoryMenu` | menu de categorias |
| `Hero` | destaque principal (featured_order 1) |
| `FeaturedCard` | destaques 1 e 2 (featured_order 2 e 3) |
| `NewsCard` | card de notícia (grids) |
| `MoreNewsList` | lista "Mais publicações" com "carregar mais" via `/api/news` |
| `RelatedNews` | notícias relacionadas (mesma categoria) |
| `ShareButtons` | compartilhamento |
| `BackButton` | voltar |
| `news/MarkdownContent` | renderização do conteúdo Markdown |
| `MobileMenu`, `SearchBar`, `TopBar` | **arquivos vazios (0 linhas)** |

### Admin (`components/admin/`)

| Componente | Função |
|---|---|
| `AdminSidebar` | menu lateral (5 itens; 3 apontam para rotas inexistentes) |
| `AdminHeader` | cabeçalho fixo ("Administrador") |
| `AdminCard` | card do dashboard |
| `AdminTable` | tabela genérica |
| `NewsTable` | linhas da listagem de notícias com rótulo de destaque |
| `LogoutButton` | logout |
| `news/NewsForm` | formulário criar/editar |
| `news/sections/NewsInfo` | título e linha fina |
| `news/sections/NewsContent` | editor Markdown com toolbar + "Formatar para REC" + pré-visualização |
| `news/sections/NewsSidebar` | salvar, categoria, autor, imagem, destaque |
| `news/ImageUpload` | upload para Storage |
| `news/MarkdownPreview` | pré-visualização |

---

## 7. Integrações e confirmação REC × JC

| Item | REC (este projeto) | JC Experiência | Status |
|---|---|---|---|
| Git remoto | `github.com/Jotta-jc/rec-portal` (branch `main`, sincronizada com `origin/main`) | `github.com/Jotta-jc/jc-experiencia` | ✅ distinto |
| Supabase (ref) | `donnde…wtul` — idêntico em `.env.local` e `next.config.ts` | `easpag…mont` | ✅ distinto |
| Vercel | sem `.vercel/` local, CLI não instalada | — | ⏳ **pendente** (conferência no painel pelo responsável) |
| MCP (Supabase/Vercel) | nenhum servidor MCP configurado | — | ✅ sem risco de alvo cruzado |
| Segredos no histórico Git | nenhum (`.env*` ignorado; único "match" era hash do `package-lock.json`) | — | ✅ |

DNS/Cloudflare/Locaweb/Hostinger: não inspecionados nesta sprint (fora do repositório); sem alterações.

---

## 8. Variáveis de ambiente

| Variável | Onde é usada | Exposição |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts`, `lib/supabase/client.ts`, `server.ts`, `middleware.ts` | pública (esperado) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem | pública (esperado) |

- Apenas `.env.local` existe; **não há `.env.example`**.
- **Service role key não é usada** em nenhum ponto do código ✅.
- Variáveis na Vercel: não verificadas (pendência).

---

## 9. Banco de dados

### 9.1 Observado via API REST (anon key, somente leitura)

O endpoint de schema (`/rest/v1/` OpenAPI) retornou **401** para anon — schema completo não exposto. Foi feita leitura mínima por tabela (contagem e nomes de colunas, sem conteúdo):

| Tabela | Acesso anon | Linhas visíveis | Colunas |
|---|---|---|---|
| `news` | ✅ 200 | 42 | id, title, subtitle, excerpt, content, image_url, author, read_time, is_breaking, category_id, created_at, published_at, slug, featured_image, meta_description, featured, featured_order |
| `categories` | ✅ 200 | 7 | id, name, slug, created_at |
| `team_members` | ✅ 200 | 1 | id, name, role, description, image_url, display_order, created_at |
| `comments` | ✅ 200 | 0 | (vazia ou oculta por RLS) |
| `slug_redirects` | ✅ 200 | 0 | (vazia ou oculta por RLS) |
| `images` | ❌ 404 | — | **tabela não encontrada em `public`** (diverge das orientações) |

Categorias (slugs): fundamentos, organizacao, lideranca, mercado, processos, financas, opiniao.

**Distribuição de destaques em `news`:**

| featured | featured_order | qtd |
|---|---|---|
| false | null | 28 |
| false | **0** | **11** |
| true | 1 | 1 |
| true | 2 | 1 |
| true | 3 | 1 |

- Todas as 42 notícias têm `slug` e `published_at` preenchidos.
- 38 imagens destacadas no Storage do REC, 4 no Unsplash.
- 31 registros ainda têm `image_url` (coluna legada; o código atual usa `featured_image`).
- 1 notícia com `is_breaking = true` (coluna não usada pelo código).
- Listagem de buckets via anon retorna lista vazia (esperado — precisa de SQL).

**Conclusão importante:** como 11 linhas com `featured_order = 0` coexistem, a constraint `news_featured_order_unique` **não é um UNIQUE simples** sobre `featured_order`. Provavelmente é parcial (ex.: `WHERE featured = true`) ou composta. Isso muda a gravidade do problema P1 — ver seção 11.

### 9.2 Deduzido do código

- `news.category_id` → FK para `categories.id` (join `categories(name, slug)`).
- `news.author` é **texto** (nome), não FK para `team_members`.
- `createNews` **não envia `slug`** nem `published_at` → devem ser gerados no banco (default/trigger). A confirmar.
- `read_time` é texto (`"N min"`), calculado no app a 200 palavras/min.

### 9.3 Pendente — via `docs/sql/inspecao_schema.sql`

Constraints (definição real de `news_featured_order_unique`), índices, triggers e funções (geração de slug), políticas RLS, GRANTs de anon/authenticated, buckets e políticas do Storage, integridade (slugs duplicados, autores órfãos), localização da tabela `images`.

---

## 10. Funcionalidades concluídas

### Portal público
- [x] Página inicial (Hero + 2 destaques + últimas + mais publicações)
- [x] Notícias em destaque por posição (1 Hero, 2 e 3 destaques)
- [x] Busca (`/busca`)
- [x] Página de categoria
- [x] Página individual da notícia
- [x] Conteúdo em Markdown (GFM + HTML)
- [x] Renderização de imagens (`next/image`)
- [x] Autor, data de publicação, tempo de leitura
- [x] Notícias relacionadas
- [x] "Carregar mais" (`/api/news`)
- [x] Breadcrumb visual na notícia e categoria
- [x] Compartilhamento
- [x] Páginas institucionais: Sobre, Contato, Privacidade, Termos
- [x] 404 personalizada
- [x] `robots.txt`, `sitemap.xml` (incompleto), manifest
- [x] Open Graph / Twitter Card (global e por notícia)

### Painel administrativo
- [x] Login / logout (Supabase Auth) e proteção de `/admin/*`
- [x] Criar notícia
- [x] Editar notícia
- [x] Editor Markdown com toolbar e pré-visualização
- [x] "Formatar para REC"
- [x] Cálculo de tempo de leitura
- [x] Seleção e controle de posição de destaque
- [x] Upload de imagem destacada (Storage)
- [x] Listagem administrativa com rótulo de destaque
- [ ] Dashboard com dados reais
- [ ] Gestão de categorias, autores e comentários

---

## 11. Problemas encontrados

Severidade: 🔴 Alta · 🟠 Média · 🟡 Baixa

| # | Sev. | Arquivo:linha | Problema | Impacto |
|---|---|---|---|---|
| P1 | 🔴 | `services/admin/update-news.service.ts:18` · `components/admin/news/NewsForm.tsx:43` · `components/admin/news/sections/NewsSidebar.tsx:115` | Update grava `featured_order: 0` (ao liberar a posição de outra notícia e quando "Nenhum" é escolhido), enquanto a criação usa `null`. | Dois estados para "sem destaque" (`0` e `null`) — já há 11 registros com `0`. Se a constraint for UNIQUE simples ou incluir linhas não destacadas, o update falha com `23505`. Gravidade final depende da definição real da constraint (SQL bloco 03/04). |
| P2 | 🔴 | `services/admin/create-news.service.ts:22-31` | Criar notícia numa posição de destaque já ocupada não libera a posição anterior. | Com constraint parcial em `featured = true`, a criação falha com `23505`; sem constraint, surgiriam duas notícias na mesma posição. |
| P3 | 🔴 | `app/admin/news/new/page.tsx:6` | Página prerenderizada no build (○): categorias e autores congelados. | Categoria/autor novos não aparecem no formulário de criação até o próximo deploy. |
| P4 | 🟠 | `components/admin/AdminSidebar.tsx:17,21,25` | Links para `/admin/categories`, `/admin/team`, `/admin/comments` sem rota. | 404 no painel; gestão de categorias/autores/comentários inexistente. |
| P5 | 🟠 | `services/news.service.ts:45` · `services/category.service.ts:19` | `.single()` lança erro quando o slug não existe; o `if (!news)` (`app/noticia/[slug]/page.tsx:30,64`) e `if (!category)` (`app/categoria/[slug]/page.tsx:32,56`) nunca é alcançado. | URL inválida/antiga retorna **500** em vez de 404 (ruim para SEO e usuário). `slug_redirects` não é consultado. |
| P6 | 🟠 | `components/admin/news/NewsForm.tsx:65` | Erro ao salvar vai só para o console. | O editor não sabe que a notícia não foi salva. |
| P7 | 🟠 | `app/admin/page.tsx:23,29,35,41` | Dashboard com números fixos (28/7/4/12). | Informação falsa (reais: 42 notícias, 7 categorias, 1 autor visível). |
| P8 | 🟠 | `app/layout.tsx:42` | `alternates.canonical: "/"` no layout raiz é herdado por todas as páginas que não definem o próprio. | Notícias e categorias declaram a home como canonical — Google pode não indexá-las. |
| P9 | 🟠 | `app/layout.tsx:12` · `app/noticia/[slug]/page.tsx:37` · `app/categoria/[slug]/page.tsx:39` | Template `"%s \| REC"` + título que já termina em `\| REC`. | Títulos duplicados ("X \| REC \| REC"). |
| P10 | 🟠 | `app/sitemap.ts:6-19` | Sitemap só tem home, sobre e contato. | Notícias e categorias não são descobertas via sitemap. |
| P11 | 🟠 | `app/layout.tsx:86,90` · `app/admin/layout.tsx` | Admin herda Header e Footer públicos do layout raiz, além do próprio layout `h-screen`. | Layout do painel duplicado/quebrado; carrega componentes públicos no admin. |
| P12 | 🟠 | `services/admin/news.service.ts:1` · `news-details.service.ts:1` · `category.service.ts:1` | Leituras do admin no servidor usam cliente anon sem sessão. | Se RLS restringir leitura a `authenticated` (ex.: rascunhos), o admin não verá os dados. Hoje funciona porque `news` é legível por anon. |
| P13 | 🟡 | `services/admin/team-members.service.ts:1` | Cliente de browser (`createBrowserClient`) chamado em Server Component. | Funciona, mas sem sessão e fora do padrão; mistura de responsabilidades. |
| P14 | 🟡 | `middleware.ts:4` | Convenção `middleware` depreciada no Next 16 (aviso no build); nome novo é `proxy`. | Sem impacto imediato; quebra em versão futura. |
| P15 | 🟡 | `app/layout.tsx:74` | `apple-touch-icon.png` referenciado mas inexistente em `public/`. | 404 em iOS / auditorias. |
| P16 | 🟡 | `app/layout.tsx:8` | `metadataBase` sem `www`; domínio canônico a definir. | Possível divergência www × sem-www em OG/canonical. |
| P17 | 🟡 | `components/news/MarkdownContent.tsx:16` · `components/admin/news/MarkdownPreview.tsx:16` | `rehype-raw` renderiza HTML bruto do conteúdo. | Risco de XSS se uma conta admin for comprometida ou conteúdo colado trouxer scripts. |
| P18 | 🟡 | `services/news.service.ts:86` · `services/admin/news.service.ts:33` | Termo de busca interpolado no filtro `.or()` sem escapar `,` `(` `)`. | Buscas com esses caracteres quebram o filtro (erro 500 na busca). |
| P19 | 🟡 | `services/admin/update-news.service.ts:4` · `components/admin/news/sections/*` | Uso de `any` em `values`, `formData`, `setFormData`. | Perde a proteção do TypeScript. |
| P20 | 🟡 | `components/MobileMenu.tsx`, `SearchBar.tsx`, `TopBar.tsx`, `services/public/*.ts`, `lib/supabase/server.ts` | Arquivos vazios ou sem uso. | Ruído; risco de duplicação futura. |
| P21 | 🟡 | `package.json:14,15,24` | `csv-parser`, `dotenv`, `tsx` em `dependencies` sem uso no app. | Dependências desnecessárias em produção (provável resto de script de importação). |
| P22 | 🟡 | `README.md` | README padrão do create-next-app. | Sem documentação de setup. |
| P23 | 🟡 | `services/news.service.ts:52` · `app/noticia/[slug]/page.tsx` | `getRelatedNews` com `category_id` nulo; `getNewsBySlug` usa `featured_image` sem fallback. | Possível erro em notícia sem categoria ou imagem. |

---

## 12. Pendências

| Pendência | Responsável | Como |
|---|---|---|
| Definição de constraints, índices, triggers (geração de slug), RLS, GRANTs | Responsável do projeto | Rodar `docs/sql/inspecao_schema.sql` no SQL Editor do Supabase **do REC** e devolver resultados |
| Buckets e políticas do Storage (`rec imagens`) | Responsável do projeto | Mesmo arquivo, blocos 09–11 |
| Localização da tabela `images` (não existe em `public`) | Responsável do projeto | Bloco 14 |
| `comments` e `slug_redirects` vazias ou ocultas por RLS | — | Blocos 01, 07 e 12 |
| Vercel: domínios `reccomunicacao.com.br` e `www`, deployment ativo, variáveis de ambiente | Responsável do projeto | Conferência no painel da Vercel |
| DNS / Cloudflare | — | Fora do escopo; sem alterações |
| Validação visual desktop/mobile | — | Sprint 2 |
| Pendência conhecida (CLAUDE.md): criação com posição de destaque ocupada | — | Proposta Sprint 0.5 (P2) |

---

## 13. Recomendações (priorizadas)

1. **Sprint 0.5 — bugs críticos do admin (P1, P2, P3).** Pequena, isolada, sem mudança de schema. Executar só depois da inspeção SQL confirmar a constraint.
2. **Sprint 0.6 — robustez pública (P5, P6, P18, P23).** 404 correto, uso de `slug_redirects`, aviso de erro no admin, busca segura.
3. **SEO técnico (P8, P9, P10, P15, P16)** — pode entrar na Sprint 4 ou antes, por ser barato e de alto impacto na indexação.
4. **Admin (P4, P7, P11, P12, P13)** — rotas de categorias/autores/comentários, dashboard real, layout do admin separado (route groups), padronizar cliente server com sessão.
5. **Higiene (P14, P17, P19–P22)** — migrar para `proxy`, sanitizar HTML, tipagem, remover arquivos vazios/deps, `.env.example`, README.
6. Normalizar dados de destaque (`0` → `null`) **somente** com migração versionada, backup e autorização (regra 10).

---

## 14. O que não mexer

Correções já feitas e que devem ser preservadas em qualquer alteração futura:

| Arquivo | Correção | Por quê |
|---|---|---|
| `app/admin/news/page.tsx:1` | `export const dynamic = "force-dynamic";` | Evita listagem administrativa desatualizada por cache. |
| `services/admin/create-news.service.ts:22-31` | Notícia sem destaque grava `featured_order: null`; `featured` deriva da posição (> 0). | Corrigiu o erro `23505 — news_featured_order_unique` na criação. |
| `services/admin/create-news.service.ts:33` | `read_time: calculateReadingTime(values.content)` | Tempo de leitura calculado automaticamente. |
| `services/admin/create-news.service.ts:42-50` | Log detalhado do erro Supabase (`message`, `details`, `hint`, `code`). | Diagnóstico de falhas na criação. |
| `services/admin/update-news.service.ts:12-23` | Libera a posição de destaque ocupada por outra notícia antes de atribuí-la. | Garante uma notícia por posição exclusiva. (Pode ser ajustado para `null`, mas a lógica deve permanecer.) |
| `components/admin/NewsTable.tsx:18-33` | `—` sem destaque · 1 = Hero · 2 = Destaque 1 · 3 = Destaque 2. | Mapeamento visual acordado das posições. |
| `app/page.tsx:1`, `app/noticia/[slug]/page.tsx:1` | `force-dynamic` | Home e notícia sempre com dados atuais. |
| Supabase (banco, tabelas, Storage) | Nenhuma recriação, exclusão ou alteração sem migração + backup + autorização. | Regras obrigatórias do projeto. |

---

## 15. Checklist da Sprint 0

- [x] Inspecionar repositório
- [x] Identificar estrutura de pastas
- [x] Identificar dependências
- [x] Conferir `package.json`
- [x] Conferir configuração Next.js
- [x] Conferir Tailwind (v4 via PostCSS; `globals.css` ainda com tokens padrão e fonte Arial)
- [x] Conferir integração Supabase (código)
- [x] Conferir variáveis de ambiente (nomes)
- [~] Conferir schema do banco (parcial via REST; completo pendente do SQL)
- [ ] Conferir políticas RLS (pendente — SQL)
- [ ] Conferir buckets do Storage (pendente — SQL)
- [x] Conferir rotas públicas
- [x] Conferir rotas administrativas
- [ ] Conferir deploy na Vercel (pendente — painel)
- [ ] Conferir domínio e DNS (fora do repositório)
- [x] Verificar se o projeto compila (`npm run build` ✅, 1 aviso)

---

## 16. Diário de desenvolvimento

| Versão | Data | Entrada |
|---|---|---|
| v0.1 | 2026-11-03 | **Em validação.** Diagnóstico técnico do código concluído; build OK; conexões Git/Supabase confirmadas como REC. Marco será considerado validado após retorno do `inspecao_schema.sql` e conferência da Vercel. |

### Arquivos criados nesta sprint

| Arquivo | Motivo |
|---|---|
| `DIAGNOSTICO_TECNICO_REC.md` | Entrega obrigatória da Sprint 0. |
| `docs/sql/inspecao_schema.sql` | Consultas somente leitura para inspeção de schema, RLS, constraints, triggers e Storage. |
