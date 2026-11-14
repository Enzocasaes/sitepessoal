import { ArrowRight } from 'lucide-react'
import { projects, projectsIntro } from '../data/projects'
import { useProjectRoute } from '../hooks/useProjectRoute'
import { hasUrl, pad, splitLead } from '../lib/content'
import type { Project } from '../types'
import { SocialIcon } from './Icons'
import { ProjectCover } from './ProjectCover'
import { ProjectModal } from './ProjectModal'
import { Section } from './Section'
import { ExternalLink, Reveal, Slash, T, TagList } from './ui'

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  // Títulos dos desafios ("Título: explicação") viram os destaques técnicos da listagem
  const highlights = project.details.challenges.flatMap((challenge) => splitLead(challenge).lead ?? [])

  return (
    <Reveal as="li">
      <article className="group relative grid gap-x-10 gap-y-7 border-t border-line py-10 md:py-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="label">
            <span className="text-accent-soft">{pad(index + 1)}</span>
            <Slash />
            <T>{project.category}</T>
            <Slash />
            <T>{project.year}</T>
          </p>

          <h3 className="mt-4 text-2xl leading-tight font-medium tracking-tight md:text-[2rem]">
            {/* O ::after estende a área de clique para a linha inteira */}
            <button type="button" onClick={onOpen} aria-haspopup="dialog" className="rounded-sm text-left after:absolute after:inset-0">
              <T>{project.name}</T>
              <span className="sr-only">: ver estudo de caso</span>
            </button>
          </h3>

          <p className="mt-3 leading-relaxed text-pretty text-muted">
            <T>{project.description}</T>
          </p>

          {highlights.length > 0 && (
            <div className="mt-6">
              <p className="label">Desafios técnicos</p>
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-muted sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-5">
                    <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent-soft" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <TagList items={project.technologies} label="Tecnologias" className="mt-6" />

          {/* Acima da área de clique: os links externos continuam clicáveis */}
          <div className="pointer-events-none relative z-10 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span aria-hidden className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft">
              Ver estudo de caso
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            {hasUrl(project.liveUrl) && (
              <ExternalLink href={project.liveUrl} className="pointer-events-auto">
                Ver site
              </ExternalLink>
            )}
            {hasUrl(project.githubUrl) && (
              <ExternalLink href={project.githubUrl} className="pointer-events-auto">
                <SocialIcon name="github" className="size-3.5" />
                Código
              </ExternalLink>
            )}
          </div>
        </div>

        <div className="order-first lg:order-none lg:col-span-7">
          <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
            <ProjectCover project={project} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]" />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  const { slug, open, close } = useProjectRoute('projetos')
  const selectedIndex = projects.findIndex((project) => project.slug === slug)

  return (
    <Section id="projetos" intro={projectsIntro}>
      <ol className="border-b border-line">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} onOpen={() => open(project.slug)} />
        ))}
      </ol>

      <ProjectModal project={projects[selectedIndex] ?? null} index={selectedIndex} onClose={close} />
    </Section>
  )
}
