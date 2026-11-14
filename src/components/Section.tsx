import type { ReactNode } from 'react'
import { navigation } from '../data/navigation'
import { pad } from '../lib/content'
import type { SectionIntro } from '../types'
import { Reveal, Slash, T } from './ui'

type SectionId = (typeof navigation)[number]['id']

/**
 * Seção padrão do site: linha superior, número e rótulo (vindos de
 * src/data/navigation.ts), título em dois tons e descrição opcional.
 */
export function Section({ id, intro, children }: { id: SectionId; intro: SectionIntro; children: ReactNode }) {
  const index = navigation.findIndex((item) => item.id === id)
  const headingId = `${id}-titulo`

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <Reveal as="header" className="mb-12 max-w-4xl md:mb-16">
          <p className="label mb-5">
            <span className="text-accent-soft">{pad(index)}</span>
            <Slash />
            {navigation[index].label}
          </p>
          <h2 id={headingId} className="text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-5xl md:leading-[1.05]">
            <T>{intro.title}</T>
            {intro.accent && (
              <>
                {' '}
                <span className="text-subtle">
                  <T>{intro.accent}</T>
                </span>
              </>
            )}
          </h2>
          {intro.description && (
            <p className="mt-5 max-w-xl leading-relaxed text-pretty text-muted md:text-lg">
              <T>{intro.description}</T>
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
