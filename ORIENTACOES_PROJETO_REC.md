# PORTAL REC — DOCUMENTO DE TRANSFERÊNCIA TÉCNICA
## Orientações para continuidade do desenvolvimento com Claude Code

**Projeto:** REC — Revista de Estratégia e Comportamento  
**Domínio:** https://www.reccomunicacao.com.br/  
**Objetivo:** dar continuidade ao projeto existente, preservando arquitetura, dados, funcionalidades e identidade visual.

---

# 1. VISÃO GERAL DO PROJETO

O Portal REC está evoluindo de REC Comunicação para:

**REC — Revista de Estratégia e Comportamento**

O objetivo é construir um portal de conhecimento aplicado, com conteúdo próprio, experiências reais, entrevistas, visitas técnicas e reportagens sobre:

- Empresas e gestão;
- Liderança e cultura organizacional;
- Comportamento;
- Inovação e empreendedorismo;
- Estratégia e produtividade;
- Casos reais e experiências empresariais.

O REC não pretende ser apenas um portal de notícias. Cada publicação deve responder:

1. O que podemos aprender?
2. Como aplicar esse conhecimento?
3. Qual o impacto para empresas e pessoas?

A prioridade é construir autoridade editorial e uma experiência de leitura profissional.

# 2. ARQUITETURA E INFRAESTRUTURA

A infraestrutura existente está distribuída entre diferentes fornecedores.

| Camada | Tecnologia/Fornecedor | Função |
|---|---|---|
| Frontend | Next.js 16 | Aplicação web |
| Linguagem | TypeScript | Desenvolvimento |
| Estilização | Tailwind CSS | Interface visual |
| Hospedagem da aplicação | Vercel | Publicação do frontend |
| Banco de dados | Supabase | Dados do portal |
| Armazenamento | Supabase Storage | Imagens e arquivos |
| DNS | Cloudflare | Gerenciamento do domínio |
| Registro do domínio | Locaweb | Registro de `reccomunicacao.com.br` |
| E-mail | Hostinger | Serviço de e-mail |

## 2.1. Domínio e DNS

Domínio principal:

`reccomunicacao.com.br`

Nameservers identificados na Locaweb:

- `frank.ns.cloudflare.com`
- `monika.ns.cloudflare.com`

Registros DNS observados na Cloudflare:

- Domínio principal: CNAME para `3932411a131cda98.vercel-dns-017.com`.
- `www`: CNAME para `3932411a131cda98.vercel-dns-017.com`.
- Registros MX apontando para `mx1.hostinger.com` e `mx2.hostinger.com`.

Os registros do site aparecem como DNS only na Cloudflare.

**Conclusão:** a configuração DNS aponta para a Vercel. O projeto deverá ser conferido no painel da Vercel para confirmar o vínculo dos dois domínios e o deployment ativo.

Não modificar nameservers ou registros DNS sem necessidade.

## 2.2. Supabase

O Supabase é a infraestrutura central de dados.

Estrutura já identificada:

| Tabela | Finalidade |
|---|---|
| `news` | Notícias e publicações |
| `categories` | Categorias editoriais |
| `comments` | Comentários |
| `images` | Referências e informações de imagens |
| `team_members` | Autores e integrantes da equipe |
| `slug_redirects` | Redirecionamentos de URLs antigas |

Também existe Supabase Storage para armazenamento de imagens.

**REGRA FUNDAMENTAL:**

- Não recriar o banco.
- Não apagar tabelas.
- Não modificar dados existentes sem autorização.
- Não criar uma segunda estrutura de notícias.
- Não substituir o Supabase por outro banco.
- Inspecionar os relacionamentos, constraints, índices e políticas RLS antes de qualquer alteração.

O Claude Code deverá analisar o schema real do Supabase, pois os nomes das tabelas não são suficientes para conhecer todas as colunas e relacionamentos.

# 3. TECNOLOGIAS E FERRAMENTAS DO DESENVOLVIMENTO

O projeto utiliza ou possui integração com:

**Next.js 16**
- App Router.
- Páginas e layouts.
- Renderização de páginas.
- Rotas administrativas e públicas.

**TypeScript**
- Tipagem dos componentes.
- Serviços.
- Modelos e estruturas de dados.

**Tailwind CSS**
- Estilização.
- Layout responsivo.
- Componentes reutilizáveis.

**Supabase**
- Consultas ao banco.
- Cadastro e edição de notícias.
- Categorias.
- Autores.
- Comentários.
- Storage.

**Vercel**
- Deploy da aplicação.
- Vinculação de domínio.
- Ambiente de produção.

**Cloudflare**
- DNS.
- Gerenciamento de registros.
- Configurações de tráfego e segurança.

**Git/GitHub**
- O repositório e o fluxo de versionamento deverão ser identificados durante a inspeção inicial. Não presumir branch principal ou estratégia de deploy sem verificar.

# 4. FUNCIONALIDADES JÁ DESENVOLVIDAS

O projeto possui funcionalidades implementadas e não deve ser reconstruído sem antes verificar o código existente.

## 4.1. Portal público

Funcionalidades trabalhadas:

- Página inicial.
- Exibição das últimas notícias.
- Notícias em destaque.
- Busca de publicações.
- Página de categoria.
- Página individual da notícia.
- Conteúdo em Markdown.
- Renderização de imagens.
- Identificação de autor.
- Data de publicação.
- Tempo estimado de leitura.
- Notícias relacionadas.
- Listagem de mais publicações.
- Navegação para carregamento de mais notícias.

## 4.2. Painel administrativo

Existe um painel administrativo para gerenciamento das notícias.

Funcionalidades trabalhadas:

- Criar notícia.
- Editar notícia.
- Editor com toolbar.
- Visualização prévia.
- Conteúdo em Markdown.
- Cálculo de tempo de leitura.
- Seleção de destaque.
- Controle de posições de destaque.
- Listagem administrativa de notícias.

Existem pendências em rotas administrativas:

- `/admin/categories`
- `/admin/team`
- `/admin/comments`

Essas rotas devem ser inspecionadas para verificar se estão ausentes, incompletas ou apenas com problemas de navegação.

# 5. CORREÇÕES TÉCNICAS JÁ REALIZADAS

O Claude Code deverá preservar estas correções.

## 5.1. Listagem administrativa dinâmica

Arquivo:

`/admin/news/page.tsx`

Foi incluído:

`export const dynamic = "force-dynamic";`

Objetivo: evitar que a listagem administrativa apresente dados desatualizados por cache.

## 5.2. Criação de notícias e featured_order

Arquivo:

`services/admin/create-news.service.ts`

Foi corrigido um problema de constraint UNIQUE no Supabase.

Erro identificado:

`23505 — news_featured_order_unique`

Causa: notícias comuns recebiam `featured_order: 0`, gerando conflitos entre registros.

Correção implementada:

- Notícias sem destaque recebem `featured_order: null`.
- A posição de destaque determina o estado de destaque.
- O tempo de leitura é calculado.
- Os erros do Supabase são registrados com detalhes.

A criação de notícias comuns voltou a funcionar.

## 5.3. Atualização de destaques

A atualização de notícias já recebeu uma lógica para liberar uma posição de destaque ocupada antes de atribuí-la a outra notícia.

**Ponto pendente:** verificar e implementar, se necessário, o mesmo comportamento na criação de uma nova notícia com uma posição de destaque já ocupada.

A regra esperada é que não existam duas notícias ocupando a mesma posição exclusiva.

## 5.4. Identificação dos destaques

A tabela administrativa trabalha com a seguinte lógica:

- Sem destaque: `—`
- Posição 1: Hero
- Posição 2: Destaque 1
- Posição 3: Destaque 2

Arquivo a verificar:

`NewsTable.tsx`

Confirmar que os dados exibidos correspondem aos registros reais do Supabase.

# 6. IDENTIDADE VISUAL E EXPERIÊNCIA

A identidade deve manter a essência da marca REC, com modernização visual.

Nome institucional:

**REC — Revista de Estratégia e Comportamento**

Paleta:

- Branco.
- Azul.
- Turquesa.
- Cinza.
- Vermelho somente para destaques pontuais.

Referências de experiência:

- G1: organização editorial.
- CNN Brasil: clareza.
- Tecnoblog: tipografia.
- The Verge: identidade visual.
- InfoMoney: estrutura de conteúdo.

Não copiar layouts.

O portal deve transmitir:

- Credibilidade.
- Inteligência.
- Organização.
- Rapidez.
- Elegância.
- Modernidade.
- Facilidade de leitura.

Princípios obrigatórios:

- Mobile First.
- Componentes reutilizáveis.
- Boa legibilidade.
- Navegação intuitiva.
- Performance.
- Acessibilidade.
- Consistência visual.

A logomarca existente deve ser utilizada como referência.

# 7. SEO E MONETIZAÇÃO

Cada notícia deverá possuir progressivamente:

- Título.
- Linha fina.
- Slug.
- Meta description.
- Open Graph.
- Twitter Cards.
- Schema.org.
- Breadcrumb.
- Canonical.
- Imagem principal.
- Autor.
- Categoria.
- Tempo de leitura.
- Notícias relacionadas.

Também deverão ser implementados ou auditados:

- Sitemap XML.
- Robots.txt.
- Google Search Console.
- Google Analytics.
- Google Discover.
- Google News.

## Google AdSense

Existe uma conta AdSense que apresentou pendência de ativação e indicação de conteúdo de baixo valor.

Não priorizar anúncios neste momento.

Antes de solicitar nova avaliação, revisar:

- Qualidade editorial.
- Conteúdo original.
- Páginas institucionais.
- Sobre.
- Contato.
- Política de privacidade.
- Política de cookies.
- Navegação.
- Categorias.
- Autores.
- Responsabilidade editorial.

O espaço para publicidade deve ser planejado sem prejudicar a leitura.

# 8. ROADMAP DE CONTINUIDADE

A evolução deve acontecer em sprints pequenas, sem desenvolver várias funcionalidades grandes simultaneamente.

## Sprint 0 — Diagnóstico técnico

Objetivo: compreender integralmente o projeto existente.

Checklist:

- [ ] Inspecionar repositório.
- [ ] Identificar estrutura de pastas.
- [ ] Identificar dependências.
- [ ] Conferir package.json.
- [ ] Conferir configuração Next.js.
- [ ] Conferir Tailwind.
- [ ] Conferir integração Supabase.
- [ ] Conferir variáveis de ambiente.
- [ ] Conferir schema do banco.
- [ ] Conferir políticas RLS.
- [ ] Conferir buckets do Storage.
- [ ] Conferir rotas públicas.
- [ ] Conferir rotas administrativas.
- [ ] Conferir deploy na Vercel.
- [ ] Conferir domínio e DNS.

Resultado esperado: relatório técnico e arquitetura documentada.

## Sprint 1 — Branding e Design System

- Consolidar identidade visual.
- Definir paleta.
- Definir tipografia.
- Definir espaçamentos.
- Definir grid.
- Padronizar componentes.
- Criar padrões de cards.
- Criar padrões de títulos.
- Criar padrões editoriais.

Resultado: identidade visual consistente.

## Sprint 2 — Frontend

Auditar e concluir:

- Home.
- Categoria.
- Página da notícia.
- Busca.
- Autor.
- Sobre.
- Contato.
- Resultados.
- Página 404.

Resultado: portal público completo e responsivo.

## Sprint 3 — Integração

Conferir e concluir a integração com:

- Notícias.
- Categorias.
- Comentários.
- Storage.
- Autores.

Resultado: dados reais do Supabase em todas as áreas necessárias.

## Sprint 4 — Publicação

- Build de produção.
- Deploy.
- SSL.
- DNS.
- Performance.
- Links.
- SEO técnico.
- Sitemap.
- Robots.
- Search Console.

Resultado: portal estável em produção.

## Sprint 5 — Evolução

Implementar gradualmente:

- Analytics.
- Discover.
- Google News.
- AdSense.
- Newsletter.
- Moderação de comentários.
- Recursos de IA.
- Área premium.
- Dashboard.
- Melhorias SEO.

# 9. PRIMEIRA TAREFA DO CLAUDE CODE

Antes de programar, realizar uma auditoria completa do repositório.

O Claude Code deve:

1. Abrir o projeto existente.
2. Ler o `package.json`.
3. Examinar a estrutura de diretórios.
4. Identificar as rotas do App Router.
5. Identificar componentes.
6. Identificar serviços de acesso ao Supabase.
7. Identificar as variáveis de ambiente utilizadas, sem revelar seus valores.
8. Identificar as funcionalidades já implementadas.
9. Identificar erros e pendências.
10. Verificar se o projeto compila.

Ao final, produzir um documento chamado:

`DIAGNOSTICO_TECNICO_REC.md`

Esse documento deverá conter:

- Arquitetura atual.
- Tecnologias.
- Estrutura de diretórios.
- Rotas.
- Serviços.
- Componentes.
- Integrações.
- Banco de dados.
- Funcionalidades concluídas.
- Problemas encontrados.
- Pendências.
- Recomendações.

**Não executar grandes alterações nesta primeira etapa.**

# 10. REGRAS OBRIGATÓRIAS PARA O CLAUDE CODE

Estas regras devem ser respeitadas durante todo o desenvolvimento.

1. Não reconstruir o projeto do zero.
2. Não recriar o banco Supabase.
3. Não excluir tabelas.
4. Não apagar notícias ou imagens.
5. Não modificar registros de produção sem autorização.
6. Não trocar tecnologias sem justificativa e aprovação.
7. Não duplicar componentes ou serviços.
8. Não criar funcionalidades que já existem.
9. Não alterar DNS sem autorização.
10. Não remover integrações existentes.
11. Não publicar alterações sem verificar o build.
12. Não expor chaves, senhas ou tokens.
13. Não colocar credenciais em código-fonte.
14. Preservar compatibilidade com os dados existentes.
15. Documentar as alterações realizadas.

Para qualquer mudança no banco:

- Verificar o schema atual.
- Avaliar impacto.
- Criar migração versionada quando necessária.
- Fazer backup apropriado.
- Solicitar autorização antes de alterações destrutivas.

Para mudanças no frontend:

- Preferir alterações pontuais.
- Reutilizar componentes.
- Preservar o comportamento existente.
- Validar desktop e mobile.
- Testar as páginas afetadas.

# 11. SEGURANÇA E ACESSOS

O projeto utiliza serviços externos com credenciais próprias.

O Claude Code deverá trabalhar com as credenciais fornecidas pelo responsável, preferencialmente por meio de variáveis de ambiente locais.

Verificar:

- `.env.local`
- `.env.example`
- Configurações da Vercel.
- Supabase URL.
- Supabase anon/publishable key.
- Supabase service role key, quando realmente necessária.

Nunca compartilhar chaves privadas em mensagens, commits ou documentação.

Nunca colocar a service role key no frontend.

Não presumir que todas as variáveis necessárias estejam disponíveis no repositório.

# 12. DIÁRIO DE DESENVOLVIMENTO

Manter um histórico versionado da evolução:

- v0.1 — Arquitetura validada.
- v0.2 — Branding definido.
- v0.3 — Design System concluído.
- v0.4 — Home desenvolvida.
- v0.5 — Frontend completo.
- v0.6 — Integração Supabase.
- v0.7 — Portal publicado.
- v0.8 — SEO avançado.
- v0.9 — Monetização.
- v1.0 — Portal REC consolidado em produção.

As versões são marcos do roadmap, não uma afirmação de que todas as etapas já estejam concluídas.

# 13. ORIENTAÇÃO FINAL AO CLAUDE CODE

Você está assumindo a continuidade de um projeto existente chamado Portal REC.

Sua função é atuar como arquiteto de software e desenvolvedor responsável pela evolução do sistema.

A prioridade é preservar o que já foi construído e melhorar progressivamente a aplicação.

Não comece criando outro projeto.

Não substitua o banco.

Não reorganize toda a arquitetura por preferência pessoal.

Primeiro entenda o sistema. Depois identifique o menor ajuste capaz de gerar o maior avanço.

Trabalhe em sprints curtas.

Para cada tarefa, apresente:

- Objetivo.
- Planejamento.
- Implementação.
- Arquivos envolvidos.
- Impacto.
- Prioridade.
- Resultado esperado.

Ao alterar arquivos, informe exatamente quais foram modificados e o motivo.

Quando possível, apresente o conteúdo integral dos arquivos alterados, evitando instruções vagas.

Não avance para outra sprint sem validar a anterior.

**A primeira entrega obrigatória é o diagnóstico técnico do projeto.**

O objetivo final é transformar o REC em um portal editorial moderno, rápido, confiável, escalável e preparado para construir autoridade no mercado empresarial brasileiro.

**REC — Revista de Estratégia e Comportamento.**