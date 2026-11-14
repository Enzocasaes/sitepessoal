import { about, photos } from '../data/profile'
import { PhotoFrame } from './PhotoFrame'
import { Section } from './Section'
import { Reveal, T, TagList } from './ui'

export function About() {
  return (
    <Section id="sobre" intro={about.intro}>
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        {/* No celular a história vem primeiro; no desktop a foto ocupa a coluna da esquerda */}
        <div className="lg:order-2 lg:col-span-7 lg:col-start-6">
          <div className="space-y-5 leading-relaxed text-pretty text-muted md:text-lg">
            {about.story.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className={i === 0 ? 'text-lg text-fg md:text-xl md:leading-relaxed' : undefined}>
                  <T>{paragraph}</T>
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <dl className="mt-12 border-t border-line">
              <div className="grid gap-x-10 gap-y-3 border-b border-line py-6 sm:grid-cols-[9rem_1fr]">
                <dt className="label pt-1">Objetivo</dt>
                <dd className="leading-relaxed text-pretty text-muted">
                  <T>{about.vision}</T>
                </dd>
              </div>
              {about.interests.length > 0 && (
                <div className="grid gap-x-10 gap-y-3 border-b border-line py-6 sm:grid-cols-[9rem_1fr]">
                  <dt className="label pt-1">Fora do trabalho</dt>
                  <dd>
                    <TagList items={about.interests} />
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        <Reveal className="lg:order-1 lg:col-span-4">
          <PhotoFrame photo={photos.about} className="max-w-sm lg:sticky lg:top-28 lg:max-w-none" />
        </Reveal>
      </div>
    </Section>
  )
}
