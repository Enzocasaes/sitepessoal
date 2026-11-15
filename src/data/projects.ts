import type { Project, SectionIntro } from '../types'

/**
 * ============================================================
 *  PROJETOS
 * ============================================================
 *  Para ADICIONAR um projeto: copie um bloco { ... } inteiro e cole no array.
 *  Para REMOVER: apague o bloco.
 *  A ordem do array é a ordem exibida no site.
 *
 *  Imagens: coloque em /public/images/projects/<slug>/ e referencie como
 *  '/images/projects/<slug>/capa.webp'. cover: null mostra um fallback visual.
 *  coverPosition ajusta o enquadramento da capa (ex.: 'left center', 'top').
 *
 *  Campos overview / problem / solution aceitam uma string (um parágrafo)
 *  ou um array de strings: cada item vira um parágrafo e itens iniciados
 *  com "- " viram uma lista com marcadores.
 *
 *  challenges: escreva no formato "Título: explicação". Os títulos aparecem
 *  na listagem de projetos; a explicação completa, no estudo de caso.
 *
 *  Cada projeto tem um link direto: /#projeto/<slug>
 */

/** Cabeçalho da seção */
export const projectsIntro: SectionIntro = {
  title: 'Trabalhos',
  accent: 'selecionados',
  description:
    'Alguns dos projetos que desenvolvi. Cada estudo de caso reúne o problema, a solução adotada e os desafios técnicos.',
}

/** Modelo genérico — duplique e preencha, ou apague quando não precisar mais. */
export const template = (n: number): Project => ({
  slug: `projeto-${n}`,
  name: `[NOME DO PROJETO ${n}]`,
  description: '[DESCRIÇÃO DO PROJETO — uma ou duas frases sobre o que ele faz e para quem.]',
  year: '[ANO]',
  category: '[CATEGORIA]',
  cover: null, // '[IMAGEM OU SCREENSHOT]' → ex.: '/images/projects/projeto-1/capa.webp'
  technologies: ['[TECNOLOGIA]', '[TECNOLOGIA]', '[TECNOLOGIA]'],
  liveUrl: '', // '[LINK DO PROJETO]'
  githubUrl: '', // '[LINK DO GITHUB]'
  details: {
    overview: '[APRESENTAÇÃO DO PROJETO — contexto, objetivo e público.]',
    problem: '[PROBLEMA IDENTIFICADO — qual dor ou necessidade motivou o projeto.]',
    solution: '[SOLUÇÃO DESENVOLVIDA — como você resolveu, decisões e arquitetura.]',
    features: ['[FUNCIONALIDADE 1]', '[FUNCIONALIDADE 2]', '[FUNCIONALIDADE 3]'],
    challenges: ['[DESAFIO TÉCNICO 1 — e como foi superado]', '[DESAFIO TÉCNICO 2]'],
    gallery: [], // ex.: ['/images/projects/projeto-1/tela-1.webp', '/images/projects/projeto-1/tela-2.webp']
  },
})

export const projects: Project[] = [
  {
    slug: 'duporco',
    name: 'DuPorco Alimentos',
    description:
      'Site institucional e catálogo digital para uma empresa de embutidos artesanais, com pedidos via WhatsApp e SEO técnico.',
    year: '2026',
    category: 'Site institucional',
    cover: '/images/projects/duporco/capa.webp',
    coverPosition: 'left center', // mantém o título do site visível no recorte
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'SEO Técnico', 'Schema.org'],
    liveUrl: 'https://duporcoalimentos.com.br/',
    githubUrl: 'https://github.com/Enzocasaes/SiteDuPorco',
    details: {
      overview: [
        'A DuPorco é uma empresa do ramo alimentício que atua na fabricação e comercialização de produtos derivados de carne. O projeto surgiu da necessidade de estabelecer uma presença digital profissional para a marca, permitindo que os clientes conheçam seus produtos, consultem as opções disponíveis e entrem em contato diretamente com a empresa.',
        'A plataforma foi pensada para proporcionar uma experiência simples, visual e intuitiva, valorizando os produtos e facilitando o processo de compra por encomenda.',
      ],
      problem: [
        'A empresa precisava ampliar sua presença digital e disponibilizar um canal próprio para apresentar seus produtos. Entre os principais pontos identificados estavam:',
        '- Ausência de uma plataforma própria para apresentação organizada dos produtos.',
        '- Necessidade de facilitar o contato entre clientes e empresa.',
        '- Falta de uma estrutura otimizada para mecanismos de busca (SEO).',
        '- Necessidade de apresentar informações comerciais sem expor preços diretamente no catálogo, já que os pedidos são realizados sob consulta pelo WhatsApp.',
      ],
      solution: [
        'Desenvolvimento de um site utilizando React, com foco em apresentação visual dos produtos, navegação intuitiva e conversão de visitantes em potenciais clientes.',
        'A solução contempla uma estrutura de catálogo digital, com informações sobre os produtos e direcionamento para atendimento via WhatsApp.',
        'Também foram trabalhadas estratégias de SEO técnico, incluindo otimização de conteúdo e implementação de dados estruturados para melhorar a compreensão do site pelos mecanismos de busca. Um cuidado importante foi garantir que os dados estruturados representassem apenas informações reais dos produtos, sem utilizar preços ou avaliações fictícias.',
      ],
      features: [
        'Catálogo digital para apresentação dos produtos da marca.',
        'Organização de produtos por opções e apresentações, incluindo embalagens de diferentes tamanhos.',
        'Integração com WhatsApp para facilitar pedidos e atendimento comercial.',
        'Páginas de apresentação dos produtos com informações relevantes.',
        'Interface visual voltada à valorização dos produtos e da identidade da marca.',
        'Otimizações de SEO para melhorar a indexação nos mecanismos de busca.',
      ],
      challenges: [
        'SEO em aplicações React: trabalhar a estrutura das páginas e os elementos necessários para melhorar a indexação e a visibilidade orgânica.',
        'Dados estruturados (Schema.org): implementar marcação de produtos sem declarar informações comerciais inexistentes, como preços e avaliações.',
        'Experiência de conversão: estruturar a apresentação dos produtos de maneira que o visitante consiga avançar facilmente do catálogo para o atendimento comercial.',
        'Organização das informações: apresentar diferentes produtos e variações de embalagens de maneira clara e consistente.',
      ],
      // Adicione capturas em /public/images/projects/duporco/ e liste aqui:
      // página inicial, catálogo, página de produto, versão mobile, direcionamento para WhatsApp.
      gallery: ['/images/projects/duporco/capa.webp'],
    },
  },

  {
    slug: 'druginfusion',
    name: 'DrugInfusion',
    description:
      'Aplicativo mobile que reúne cálculos de dosagem, diluição, concentração e velocidade de infusão de medicamentos intravenosos para profissionais de saúde.',
    year: '2026',
    category: 'Aplicativo mobile',
    cover: '/images/projects/druginfusion/capa.webp',
    technologies: ['React Native', 'Expo SDK 54', 'TypeScript', 'React 19', 'Expo Router 6', 'Clean Architecture', 'i18n (pt-BR, en-US, es-ES)'],
    liveUrl: '', // '[LINK DO APP — loja ou página]'
    githubUrl: '', // '[LINK DO GITHUB]'
    details: {
      overview: [
        'O DrugInfusion é um aplicativo mobile voltado à área da saúde, desenvolvido para facilitar o acesso a ferramentas de cálculo e informações medicamentosas diretamente pelo smartphone.',
        'O objetivo é oferecer uma experiência prática, intuitiva e organizada, auxiliando profissionais de saúde em atividades que exigem precisão e agilidade.',
      ],
      problem: [
        'Em ambientes como UTIs e emergências, profissionais de saúde precisam converter prescrições de medicamentos em velocidades de infusão (mL/h) para configurar bombas de infusão. Esse processo envolve diferentes unidades de medida, peso do paciente e concentrações das soluções preparadas, tornando os cálculos complexos e suscetíveis a erros.',
        'Além disso, a necessidade de consultar informações medicamentosas durante atendimentos exige acesso rápido e confiável aos dados, inclusive em ambientes com conectividade limitada.',
      ],
      solution: [
        'Foi desenvolvido um aplicativo mobile utilizando React Native e Expo, com uma arquitetura organizada em camadas inspirada em Clean Architecture, separando regras de negócio, interface, dados e infraestrutura.',
        'A solução conta com um motor próprio de cálculos, catálogo estruturado de apresentações medicamentosas e mecanismos de sincronização de dados com funcionamento local-first. As regras de negócio foram isoladas em funções independentes da interface, permitindo maior facilidade de manutenção, validação e testes.',
        'O projeto também contempla autenticação, gerenciamento de assinaturas, internacionalização e mecanismos de persistência local, proporcionando uma aplicação estruturada e preparada para evolução.',
      ],
      features: [
        'Calculadora de infusão: conversão de doses medicamentosas em velocidades de infusão (mL/h), considerando peso, concentração e diferentes unidades de medida, com cálculo inverso de equivalência.',
        'Preparo de soluções: seleção de apresentações medicamentosas e criação de soluções personalizadas, com cálculo automático da concentração final.',
        'Validação de doses: verificação de faixas terapêuticas, limites de dose diária, alertas de diluição e consulta de referências medicamentosas.',
        'Calculadora de intubação: cálculo de volumes de medicamentos utilizados em protocolos de sequência rápida de intubação.',
        'Catálogo medicamentoso: consulta de informações e apresentações de medicamentos, com sincronização versionada e armazenamento local para acesso sem conexão.',
        'Gestão de usuários e assinaturas: autenticação, gerenciamento de perfil, recuperação de senha e integração com pagamentos nativos das lojas.',
      ],
      challenges: [
        'Precisão e confiabilidade dos cálculos: migração das regras de cálculo do aplicativo original para funções puras em TypeScript, preservando fórmulas e critérios de arredondamento. Foram implementados testes automatizados de referência e validação, totalizando 1.421 testes distribuídos em 27 suítes.',
        'Sincronização e integridade dos dados: implementação de um mecanismo de atualização incremental do catálogo medicamentoso, utilizando versionamento, ETag, retomada de downloads, verificação de integridade por SHA-256 e armazenamento local.',
        'Arquitetura e manutenção: separação das regras de negócio da interface e da infraestrutura, permitindo testar cálculos e validações independentemente do React Native.',
        'Resiliência e funcionamento offline: implementação de persistência local, atualização otimista e filas de operações pendentes para preservar informações e sincronizá-las quando a conexão for restabelecida.',
      ],
      gallery: [
        '/images/projects/druginfusion/tela-1.webp', // tela inicial
        '/images/projects/druginfusion/tela-2.webp', // lista de soluções
        '/images/projects/druginfusion/tela-3.webp', // login
      ],
      galleryLayout: 'phones', // prints verticais lado a lado
    },
  },

  // ---- Modelo genérico (substitua ou apague) ----
  // template(3),
]
