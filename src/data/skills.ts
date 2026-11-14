import type { SectionIntro, SkillCategory } from '../types'

/**
 * ============================================================
 *  HABILIDADES E TECNOLOGIAS
 * ============================================================
 *  - Sem níveis ou porcentagens: liste apenas o que você usa.
 *  - A ordem do array é a ordem no site.
 *  - Para adicionar uma tecnologia, inclua o nome em `items`.
 */

/** Cabeçalho da seção */
export const skillsIntro: SectionIntro = {
  title: 'Tecnologias',
  accent: 'e competências',
  description: 'As tecnologias com que trabalho, organizadas por área.',
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description:
      'Desenvolvimento de interfaces modernas, responsivas e intuitivas, com foco na experiência do usuário, componentização e integração com APIs.',
    items: ['React.js', 'JavaScript / TypeScript', 'HTML5 / CSS3', 'Flutter'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description:
      'Desenvolvimento de aplicações e serviços backend, com foco em regras de negócio, arquitetura, APIs REST, autenticação e integração entre sistemas.',
    items: ['Java / Spring Boot', 'Node.js', 'TypeScript', 'APIs REST / JWT'],
  },
  {
    id: 'database',
    title: 'Banco de dados',
    description:
      'Modelagem, estruturação e gerenciamento de dados relacionais, com foco em integridade, consultas e persistência de informações.',
    items: ['PostgreSQL', 'SQL'],
  },
  {
    id: 'devops',
    title: 'DevOps e infraestrutura',
    description:
      'Automação de processos de desenvolvimento, integração contínua, conteinerização e gerenciamento de ambientes.',
    items: ['Docker', 'GitHub Actions', 'GitLab CI/CD', 'Kubernetes / Okteto'],
  },
  {
    id: 'tools',
    title: 'Ferramentas e metodologias',
    description:
      'Utilização de ferramentas e boas práticas para organização, desenvolvimento colaborativo, qualidade e manutenção de software.',
    items: ['Git / GitHub / GitLab', 'Postman', 'Clean Architecture', 'Scrum / Kanban'],
  },
]
