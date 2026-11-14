/**
 * Tipos de todo o conteúdo do site.
 * Você normalmente NÃO precisa editar este arquivo — edite os arquivos em src/data/.
 */

export type Photo = {
  /** Caminho a partir de /public. Ex.: '/images/profile/foto.webp'. Use null para mostrar o fallback. */
  src: string | null
  /** Texto alternativo (acessibilidade) */
  alt: string
  /** Enquadramento da imagem (CSS object-position). Ex.: 'center', '50% 20%', 'top' */
  position?: string
  /** 'portrait' (vertical, 4:5) ou 'landscape' (horizontal, 4:3) */
  orientation?: 'portrait' | 'landscape'
  /** Legenda curta exibida abaixo da foto (opcional) */
  caption?: string
}

/** Fato rápido exibido na base do Hero. */
export type Fact = {
  label: string
  value: string
  /** Linha de apoio (opcional) */
  detail?: string
}

/** Cabeçalho de uma seção. `accent` continua o título em tom mais suave. */
export type SectionIntro = {
  title: string
  accent?: string
  description?: string
}

export type SocialKey = 'email' | 'linkedin' | 'github' | 'instagram' | 'whatsapp'

export type Social = {
  key: SocialKey
  label: string
  /** Texto exibido (ex.: @usuario). */
  handle: string
  /** URL completa. Deixe '' para esconder o link automaticamente. */
  url: string
  /** Canal profissional: aparece no Hero, no menu mobile e em destaque no Contato. */
  primary?: boolean
}

/**
 * Texto longo: uma string (um parágrafo) ou um array de strings.
 * No array, cada item vira um parágrafo; itens começando com "- " viram lista.
 */
export type RichText = string | string[]

export type Project = {
  /** Identificador único, sem espaços. Ex.: 'meu-app'. Também vira o link direto: /#projeto/meu-app */
  slug: string
  name: string
  /** Frase curta exibida na listagem */
  description: string
  /** Ano ou período */
  year: string
  /** Categoria / tipo. Ex.: 'Web App', 'API', 'Mobile' */
  category: string
  /** Imagem de capa (16:10). null = fallback visual */
  cover: string | null
  /** Enquadramento da capa (CSS object-position). Padrão: 'center' */
  coverPosition?: string
  technologies: string[]
  /** Link do projeto publicado. '' = esconde o link */
  liveUrl: string
  /** Link do repositório. '' = esconde o link */
  githubUrl: string
  details: {
    overview: RichText
    problem: RichText
    solution: RichText
    features: string[]
    /**
     * Use o formato "Título: explicação". O título aparece na listagem de projetos
     * e em destaque no estudo de caso.
     */
    challenges: string[]
    /** Imagens do estudo de caso */
    gallery: string[]
    /**
     * 'slider' (padrão): imagens horizontais, uma por vez, com setas.
     * 'phones': prints verticais de celular exibidos lado a lado.
     */
    galleryLayout?: 'slider' | 'phones'
  }
}

export type SkillCategory = {
  id: string
  title: string
  description: string
  /** Tecnologias e práticas da área */
  items: string[]
}

export type ExperienceEntry = {
  type: 'academic' | 'professional'
  organization: string
  role: string
  period: string
  location?: string
  description: string
  activities: string[]
  /** Tecnologias usadas nessa experiência (opcional). Ex.: ['Java', 'Spring Boot'] */
  stack?: string[]
  /** Marque true para o registro atual (exibe um indicador) */
  current?: boolean
}
