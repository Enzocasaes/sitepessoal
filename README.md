# Portfólio — Enzo Casaes Figueiró

Site pessoal / portfólio construído com **React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide Icons**.

Todo o conteúdo é editado em arquivos de dados (`src/data/`) — você não precisa mexer nos componentes visuais.

## Rodando

```bash
npm install      # primeira vez
npm run dev      # desenvolvimento → http://localhost:5173
npm run build    # gera a pasta dist/ para publicar
npm run preview  # testa o build localmente
```

## Onde editar cada coisa

| O que                                              | Arquivo                               |
| -------------------------------------------------- | ------------------------------------- |
| Nome, cargo, foco, frase do Hero, currículo        | `src/data/profile.ts` → `profile`     |
| Fatos rápidos na base do Hero                      | `src/data/profile.ts` → `profile.facts` |
| Título, descrição e URL do site (SEO)              | `src/data/profile.ts` → `profile.seo` |
| Fotos (caminho, enquadramento, legenda)            | `src/data/profile.ts` → `photos`      |
| Seção "Sobre" (título, história, objetivo)         | `src/data/profile.ts` → `about`       |
| Textos da seção "Contato"                          | `src/data/profile.ts` → `contact`     |
| E-mail e redes sociais                             | `src/data/socials.ts`                 |
| Projetos (listagem + estudo de caso + galeria)     | `src/data/projects.ts`                |
| Habilidades por área                               | `src/data/skills.ts`                  |
| Experiência e formação                             | `src/data/experience.ts`              |
| Itens do menu e ordem/numeração das seções         | `src/data/navigation.ts`              |
| Cores e fontes                                     | `src/index.css` → `@theme`            |

Cada arquivo de seção (`projects.ts`, `skills.ts`, `experience.ts`) também exporta o cabeçalho da própria seção (`...Intro`: título, complemento e descrição).

## Placeholders

Qualquer texto escrito entre `[COLCHETES]` é tratado como **placeholder**: aparece destacado em azul no site para você localizar o que falta preencher. Ao substituir pelo texto real (sem colchetes), o destaque some sozinho.

Links vazios (`url: ''`) ficam automaticamente escondidos — isso vale para redes sociais, links de projeto e o currículo (`profile.resumeUrl`).

> Antes de publicar, vale procurar por `[` em `src/data/`: o que estiver em colchetes aparece para os visitantes.

## Imagens

```
public/images/profile/
  foto-principal.webp  → Hero
  foto-sobre.webp      → seção Sobre

public/images/projects/<slug-do-projeto>/
  capa.webp            → capa da listagem (16:10 recomendado)
  tela-1.webp, ...     → galeria do estudo de caso

public/og.jpg          → imagem das prévias de link (1200×630)
originais/             → arquivos originais em alta resolução (não são publicados)
```

- As imagens em `public/` são versões **otimizadas em WebP**; os originais ficam em `originais/`, fora da pasta publicada.
- Para adicionar uma imagem nova, exporte em `.webp` (o [Squoosh](https://squoosh.app) faz isso no navegador) com até ~1600px de largura e aponte o caminho no arquivo de dados. `.jpg` e `.png` também funcionam, só ficam mais pesados.
- Fotos: `orientation: 'portrait'` (4:5) ou `'landscape'` (4:3); `position` ajusta o enquadramento (`'50% 20%'`, `'top'`…); `caption` adiciona uma legenda; `src: null` mostra um fallback com o monograma.
- Capas de projeto: `coverPosition` ajusta o recorte (ex.: `'left center'`).

## Projetos

Em `src/data/projects.ts`, copie um bloco do array `projects` e preencha. A ordem do array é a ordem no site.

- **Desafios técnicos** (`details.challenges`): escreva como `"Título: explicação"`. Os títulos aparecem na listagem; a explicação completa, no estudo de caso.
- **Galeria** (`details.gallery`): `galleryLayout: 'phones'` mostra prints verticais de celular lado a lado; o padrão mostra uma imagem por vez.
- **Link direto**: cada projeto abre em `/#projeto/<slug>` — dá para compartilhar o estudo de caso, e o botão "voltar" do navegador o fecha.

## Experiência

Em `src/data/experience.ts`, o site separa `type: 'professional'` e `type: 'academic'` em dois grupos. O campo opcional `stack` lista as tecnologias usadas em cada experiência:

```ts
stack: ['Java', 'Spring Boot', 'PostgreSQL'],
```

## SEO e compartilhamento

O `<title>`, a descrição, as tags Open Graph, os dados estruturados (JSON-LD) e o conteúdo exibido sem JavaScript são **gerados no build** a partir de `src/data` (plugin `portfolio-seo` em `vite.config.ts`). Não edite essas tags no `index.html`.

Ao publicar, preencha `profile.seo.siteUrl` com o endereço do site (ex.: `'https://seudominio.com'`): isso ativa `canonical`, `og:url` e deixa o caminho da imagem de compartilhamento absoluto, como LinkedIn e WhatsApp exigem.

## Estrutura

```
src/
  data/         conteúdo do site
  components/   seções (Hero, About, Projects…) e peças de interface (ui.tsx, Section.tsx…)
  hooks/        comportamento reutilizável (scroll, Esc, trava de rolagem, rota do projeto)
  lib/          funções auxiliares (placeholders, redes, animação)
  index.css     tema (cores, fontes) e estilos base
```

## Publicação

O build gera arquivos estáticos em `dist/`. Funciona em Vercel, Netlify, GitHub Pages, Cloudflare Pages etc.
