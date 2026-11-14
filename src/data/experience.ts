import type { ExperienceEntry, SectionIntro } from '../types'

/**
 * ============================================================
 *  EXPERIÊNCIA E TRAJETÓRIA
 * ============================================================
 *  type: 'academic' (formação) ou 'professional' (trabalho) — o site
 *  separa os dois em grupos, mantendo a ordem do array dentro de cada um.
 *  Para ADICIONAR: copie um bloco { ... } e cole no array.
 *  Ordem: do mais recente para o mais antigo.
 *  current: true → exibe o indicador de "atual".
 *  stack (opcional): tecnologias usadas naquela experiência,
 *  ex.: stack: ['Java', 'Spring Boot', 'PostgreSQL'].
 */

/** Cabeçalho da seção */
export const experienceIntro: SectionIntro = {
  title: 'Experiência',
  accent: 'e formação',
  description: 'Onde trabalhei e estudei até aqui.',
}

export const experience: ExperienceEntry[] = [
  {
    type: 'professional',
    organization: 'SmartMedic',
    role: 'Desenvolvedor Full Stack',
    period: '2025 — Atual',
    location: 'Belo Horizonte, MG',
    description:
      'Atuação no desenvolvimento e evolução de uma plataforma de tecnologia voltada à área da saúde, contribuindo para a construção de funcionalidades, integração entre sistemas e melhoria da arquitetura da aplicação. Participação no desenvolvimento de soluções utilizando tecnologias modernas, com foco em qualidade de código, escalabilidade, segurança e organização dos serviços.',
    activities: [
      'Desenvolvimento e manutenção de funcionalidades da aplicação, trabalhando na integração entre frontend, backend e APIs.',
      'Implementação e integração de mecanismos de autenticação, autorização e controle de acesso entre serviços.',
      'Apoio na configuração e manutenção de ambientes de desenvolvimento, utilizando containers, CI/CD e ferramentas de infraestrutura.',
    ],
    current: true,
  },
  {
    type: 'academic',
    organization: 'PUC Minas',
    role: 'Bacharelado em Engenharia de Software',
    period: '2024 — 2027 (previsão)',
    location: 'Belo Horizonte, MG',
    description:
      'Graduação com foco na concepção, desenvolvimento, arquitetura e manutenção de sistemas de software. Formação voltada à aplicação de boas práticas de engenharia, estruturas de dados, banco de dados, testes de software e metodologias ágeis. Durante o curso, desenvolvo projetos práticos que conectam conhecimentos acadêmicos a desafios reais do mercado, explorando principalmente o desenvolvimento Full Stack, com maior interesse em Backend.',
    activities: [
      'Desenvolvimento de projetos acadêmicos envolvendo aplicações web e mobile, APIs, integração de sistemas e modelagem de bancos de dados.',
      'Aplicação de conceitos de engenharia de software, arquitetura de sistemas, versionamento de código, testes e metodologias ágeis em projetos colaborativos.',
    ],
    current: true,
  },
  {
    type: 'academic',
    organization: 'IFNMG — Campus Teófilo Otoni',
    role: 'Técnico em Informática',
    period: '2021 — 2023',
    location: 'Teófilo Otoni, MG',
    description:
      'Formação técnica com foco em tecnologia, desenvolvimento de sistemas e fundamentos da computação. Proporcionou minha primeira experiência prática com programação, resolução de problemas e construção de soluções tecnológicas, despertando meu interesse pela área de desenvolvimento de software e abrindo caminho para minha graduação em Engenharia de Software.',
    activities: [
      'Desenvolvimento de aplicações e projetos práticos, aplicando lógica de programação e fundamentos de desenvolvimento de software.',
      'Estudo de tecnologias, bancos de dados e conceitos de sistemas, desenvolvendo habilidades de raciocínio lógico e resolução de problemas.',
    ],
  },
  {
    type: 'professional',
    organization: 'Supernet Telecom',
    role: 'Técnico em Telecomunicações',
    period: 'Jan 2020 — Jun 2021',
    location: 'Setubinha, MG',
    description:
      'Atuação na área de telecomunicações, com foco em instalação, configuração e manutenção de infraestrutura de redes. Experiência com suporte técnico, diagnóstico de falhas e resolução de problemas relacionados à conectividade, desenvolvendo conhecimentos em redes, infraestrutura e atendimento técnico.',
    activities: [
      'Instalação, configuração e manutenção de equipamentos e infraestrutura de redes de telecomunicações.',
      'Diagnóstico e resolução de problemas de conectividade, realizando suporte técnico e manutenção preventiva e corretiva.',
    ],
  },
]
