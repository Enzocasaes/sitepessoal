import { skillCategories, skillsIntro } from '../data/skills'
import { pad } from '../lib/content'
import { Section } from './Section'
import { Reveal, T, TagList } from './ui'

export function Skills() {
  return (
    <Section id="habilidades" intro={skillsIntro}>
      {/* Uma linha por área: nome, o que faço nela e as tecnologias que uso */}
      <ul className="border-b border-line">
        {skillCategories.map((category, i) => (
          <Reveal as="li" key={category.id} className="grid gap-x-10 gap-y-4 border-t border-line py-8 md:grid-cols-12 md:py-10">
            <h3 className="flex items-baseline gap-4 text-xl font-medium tracking-tight md:col-span-4 lg:col-span-3">
              <span className="label w-6 shrink-0 text-accent-soft">{pad(i + 1)}</span>
              <T>{category.title}</T>
            </h3>
            <p className="leading-relaxed text-pretty text-muted md:col-span-8 lg:col-span-5">
              <T>{category.description}</T>
            </p>
            <TagList
              items={category.items}
              label={`Tecnologias de ${category.title}`}
              className="self-start md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-auto"
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
