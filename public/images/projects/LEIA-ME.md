# Imagens dos projetos

Crie uma subpasta por projeto, por exemplo:

    public/images/projects/meu-projeto/capa.webp
    public/images/projects/meu-projeto/tela-1.webp

E referencie em `src/data/projects.ts` assim:

    cover: '/images/projects/meu-projeto/capa.webp'
    gallery: ['/images/projects/meu-projeto/tela-1.webp']

Dica: capas em 16:10 (ex.: 1600x1000), exportadas em .webp (https://squoosh.app),
abaixo de ~150 KB. Os originais em alta resolução ficam em `originais/`,
na raiz do projeto.
