import { experience, experienceIntro } from '../data/experience'
import { Section } from './Section'
import { BulletList, Reveal, T, TagList } from './ui'

/** Trabalho e formação aparecem em grupos separados, como em um currículo. */
const groups = [
  { type: 'professional', title: 'Experiência profissional' },
  { type: 'academic', title: 'Formação acadêmica' },
] as const

export function Experience() {
  return (
    <Section id="trajetoria" intro={experienceIntro}>
      <div className="space-y-14 md:space-y-20">
        {groups.map((group) => {
          const entries = experience.filter((entry) => entry.type === group.type)
          if (entries.length === 0) return null

          return (
            <div key={group.type} className="grid gap-x-10 gap-y-5 lg:grid-cols-12">
              <h3 className="label lg:col-span-3 lg:pt-9">{group.title}</h3>

              <ol className="border-b border-line lg:col-span-9">
                {entries.map((entry) => (
                  <Reveal
                    as="li"
                    key={`${entry.organization}-${entry.period}`}
                    className="grid gap-x-10 gap-y-4 border-t border-line py-8 md:grid-cols-[11rem_1fr]"
                  >
                    <div>
                      <p className="flex items-center gap-2 font-mono text-sm text-fg">
                        {entry.current && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent-soft" />}
                        <T>{entry.period}</T>
                      </p>
                      {entry.location && (
                        <p className="mt-1.5 font-mono text-xs text-subtle">
                          <T>{entry.location}</T>
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xl leading-snug font-medium tracking-tight">
                        <T>{entry.role}</T>
                      </h4>
                      <p className="mt-1 text-accent-soft">
                        <T>{entry.organization}</T>
                      </p>
                      <p className="mt-4 leading-relaxed text-pretty text-muted">
                        <T>{entry.description}</T>
                      </p>
                      {entry.activities.length > 0 && (
                        <BulletList items={entry.activities} className="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-muted" />
                      )}
                      {entry.stack && entry.stack.length > 0 && <TagList items={entry.stack} label="Tecnologias" className="mt-5" />}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
