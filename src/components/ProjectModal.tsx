import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useEscape } from '../hooks/useEscape'
import { useScrollLock } from '../hooks/useScrollLock'
import { hasUrl, pad } from '../lib/content'
import { ease } from '../lib/motion'
import type { Project } from '../types'
import { Gallery } from './Gallery'
import { SocialIcon } from './Icons'
import { ProjectCover } from './ProjectCover'
import { RichText } from './RichText'
import { BulletList, ExternalLink, Slash, T, TagList } from './ui'

/** Bloco do estudo de caso: rótulo à esquerda, conteúdo à direita. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[11rem_1fr] md:py-8">
      <h3 className="label pt-1">{title}</h3>
      <div className="leading-relaxed text-pretty text-muted">{children}</div>
    </section>
  )
}

/**
 * Estudo de caso de um projeto, em diálogo modal.
 * Ocupa a tela inteira no celular e vira um painel centralizado em telas maiores.
 */
export function ProjectModal({ project, index, onClose }: { project: Project | null; index: number; onClose: () => void }) {
  const open = !!project
  const closeRef = useRef<HTMLButtonElement>(null)
  useScrollLock(open)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) return
    // O diálogo é renderizado fora de #root. Tornando #root inerte, o foco do teclado e os
    // leitores de tela ficam contidos no estudo de caso; ao fechar, o foco volta para quem abriu.
    const root = document.getElementById('root')
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (root) root.inert = true
    closeRef.current?.focus()
    return () => {
      if (root) root.inert = false
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {project && (
        <m.div
          key={project.slug}
          className="fixed inset-0 z-[60] flex items-stretch justify-center sm:items-center sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div aria-hidden onClick={onClose} className="absolute inset-0 bg-bg/95" />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="projeto-titulo"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            exit={{ y: 12 }}
            transition={{ duration: 0.4, ease }}
            className="relative flex w-full max-w-5xl flex-col overflow-hidden bg-bg sm:max-h-full sm:rounded-2xl sm:border sm:border-line-strong"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line py-2 pr-2 pl-5 sm:pr-3 sm:pl-8 lg:pl-12">
              <p className="label truncate">
                <span className="text-accent-soft">{pad(index + 1)}</span>
                <Slash />
                Estudo de caso
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar estudo de caso"
                className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface hover:text-fg"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-8 pb-10 sm:px-8 lg:px-12 lg:pt-10 lg:pb-12">
              <p className="label">
                <T>{project.category}</T>
                <Slash />
                <T>{project.year}</T>
              </p>
              <h2 id="projeto-titulo" className="mt-4 text-3xl leading-tight font-medium tracking-[-0.03em] text-balance md:text-[2.5rem]">
                <T>{project.name}</T>
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
                <T>{project.description}</T>
              </p>

              {(hasUrl(project.liveUrl) || hasUrl(project.githubUrl)) && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {hasUrl(project.liveUrl) && <ExternalLink href={project.liveUrl}>Ver site publicado</ExternalLink>}
                  {hasUrl(project.githubUrl) && (
                    <ExternalLink href={project.githubUrl}>
                      <SocialIcon name="github" className="size-3.5" />
                      Código no GitHub
                    </ExternalLink>
                  )}
                </div>
              )}

              <TagList items={project.technologies} label="Tecnologias" className="mt-6" />

              <div className="mt-10">
                {project.details.gallery.length > 0 ? (
                  <Gallery images={project.details.gallery} name={project.name} layout={project.details.galleryLayout} />
                ) : (
                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                    <ProjectCover project={project} />
                  </div>
                )}
              </div>

              <div className="mt-10 border-b border-line">
                <Block title="Apresentação">
                  <RichText value={project.details.overview} />
                </Block>
                <Block title="Problema">
                  <RichText value={project.details.problem} />
                </Block>
                <Block title="Solução">
                  <RichText value={project.details.solution} />
                </Block>
                <Block title="Funcionalidades">
                  <BulletList items={project.details.features} emphasizeLead />
                </Block>
                <Block title="Desafios técnicos">
                  <BulletList items={project.details.challenges} emphasizeLead />
                </Block>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
