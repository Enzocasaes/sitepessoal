import type { Fact, Photo, SectionIntro } from '../types'

/**
 * ============================================================
 *  INFORMAÇÕES PESSOAIS
 * ============================================================
 *  Tudo entre [COLCHETES] é um placeholder editável.
 *  Textos em colchetes aparecem destacados no site para você
 *  identificar facilmente o que ainda falta preencher.
 */
export const profile = {
  name: 'Enzo Casaes Figueiró',
  /** Versão curta usada na navbar */
  shortName: 'Enzo Casaes',
  /** Cargo principal: aparece no Hero, no menu e nos metadados */
  role: 'Desenvolvedor Full Stack',
  /** Complemento do cargo, exibido logo depois dele no Hero. Deixe '' para esconder. */
  focus: '',
  /** Frase de apresentação do Hero */
  tagline: 'Curioso por natureza, desenvolvedor por escolha. Sempre buscando transformar boas ideias em projetos reais.',
  location: 'Belo Horizonte, Brasil',
  /** Status exibido no Hero (ex.: 'Disponível para novos projetos'). Deixe '' para esconder. */
  availability: '',
  /** Link do currículo em PDF (coloque o arquivo em /public). '' = esconde o botão */
  resumeUrl: '',

  /**
   * Fatos rápidos na base do Hero — o que um recrutador procura primeiro.
   * Só dados reais. Deixe o array vazio [] para esconder a faixa.
   */
  facts: [
    { label: 'Atualmente', value: 'Desenvolvedor Full Stack', detail: 'SmartMedic · desde 2025' },
    { label: 'Formação', value: 'Engenharia de Software', detail: 'PUC Minas · 6º período · previsão 2027' },
    { label: 'Stack', value: 'React · Java · Node.js', detail: 'TypeScript · Spring Boot · PostgreSQL' },
    { label: 'Local', value: 'Belo Horizonte', detail: 'Minas Gerais, Brasil' },
  ] satisfies Fact[],

  /**
   * SEO — título, descrição, Open Graph e JSON-LD do index.html são gerados
   * a partir daqui no build (plugin "portfolio-seo" em vite.config.ts).
   */
  seo: {
    title: 'Enzo Casaes Figueiró — Desenvolvedor Full Stack',
    description:
      'Desenvolvedor Full Stack. Projetos, tecnologias, trajetória e contato de Enzo Casaes Figueiró, estudante de Engenharia de Software na PUC Minas.',
    /** Imagem dos cards de compartilhamento (1200×630), a partir de /public */
    image: '/og.jpg',
    /**
     * URL pública do site, sem barra no final. Ex.: 'https://seudominio.com'.
     * Enquanto estiver '', canonical e og:url não são gerados.
     */
    siteUrl: '',
  },
}

/**
 * ============================================================
 *  LOGO / MARCA
 * ============================================================
 *  Arquivos em /public/images/brand/ (fundo transparente).
 *  mark → monograma "EC" (navbar e fallback das fotos)
 *  full → logo completa com o nome (disponível, ainda não usada no site)
 */
export const brand = {
  mark: '/images/brand/monogram.webp',
  full: '/images/brand/logo-full.png',
}

/**
 * ============================================================
 *  FOTOGRAFIAS
 * ============================================================
 *  Coloque os arquivos em /public/images/profile/
 *  Use src: null para exibir o fallback (monograma).
 */
export const photos: { hero: Photo; about: Photo } = {
  hero: {
    src: '/images/profile/foto-principal.webp',
    alt: 'Retrato de Enzo Casaes Figueiró',
    position: '50% 30%',
    orientation: 'portrait',
  },
  about: {
    src: '/images/profile/foto-sobre.webp',
    alt: 'Enzo Casaes Figueiró em frente ao palco do IA Summit',
    position: '50% 0%', // ancora no topo para manter o rosto e o telão
    orientation: 'portrait',
    caption: 'No IA Summit',
  },
}

/**
 * ============================================================
 *  SOBRE MIM
 * ============================================================
 */
export const about = {
  /**
   * Título da seção. `accent` continua a frase em tom mais suave.
   * (\u00a0 é um espaço que não quebra linha: mantém "na graduação," e "Full Stack" juntos.)
   */
  intro: {
    title: 'Engenharia de Software na\u00a0graduação,',
    accent: 'Full\u00a0Stack no dia a dia.',
  } satisfies SectionIntro,
  /** Cada item vira um parágrafo; o primeiro ganha destaque. */
  story: [
    'Sou desenvolvedor Full Stack na SmartMedic, onde trabalho na evolução de uma plataforma de tecnologia para a área da saúde, e curso Engenharia de Software na PUC Minas.',
    'Meu caminho até aqui começou pela infraestrutura: trabalhei como técnico em telecomunicações, instalando e mantendo redes, antes de ter o primeiro contato com programação no curso técnico em Informática do IFNMG. Foi lá que decidi seguir no desenvolvimento de software.',
    'Hoje atuo do frontend ao backend: interfaces, regras de negócio, APIs REST, autenticação e integração entre serviços. Também dou apoio aos ambientes de desenvolvimento, com containers e CI/CD. Gosto de código organizado e de entender bem o problema antes de propor a solução.',
  ],
  /** Objetivo de carreira */
  vision:
    'Quero crescer como desenvolvedor de software, com cada vez mais profundidade técnica e em arquitetura, participando de projetos desafiadores que resolvam problemas reais. No futuro, pretendo liderar projetos e compartilhar o que aprendi pelo caminho.',
  interests: ['Games', 'Futebol', 'Motocross', 'Livros'],
}

/**
 * ============================================================
 *  CONTATO
 * ============================================================
 *  O e-mail e as redes vêm de src/data/socials.ts.
 */
export const contact = {
  intro: {
    title: 'Vamos conversar',
    accent: 'sobre oportunidades e projetos.',
    description:
      'Estou aberto a novas oportunidades, desafios profissionais e colaborações em projetos de tecnologia. Também gosto de trocar ideias sobre desenvolvimento de software e arquitetura.',
  } satisfies SectionIntro,
  ctaLabel: 'Enviar e-mail',
}
