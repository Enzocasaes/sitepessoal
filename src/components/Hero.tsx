import { m } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { photos, profile } from '../data/profile'
import { hasUrl } from '../lib/content'
import { ease } from '../lib/motion'
import { primarySocials } from '../lib/socials'
import { SocialIcon } from './Icons'
import { PhotoFrame } from './PhotoFrame'
import { Button, T } from './ui'

/** Entrada em cascata: cada bloco de texto sobe e aparece em sequência. */
const cascade = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="flex min-h-svh flex-col pt-16 md:pt-18">
      <div className="container-x flex flex-1 items-center py-10 md:py-16">
        {/*
          Uma única grade para todos os tamanhos:
          - celular: foto pequena ao lado do nome; texto e ações logo abaixo, ainda na primeira tela
          - a partir de md: texto à esquerda e foto grande à direita, ocupando as duas linhas
        */}
        <m.div
          variants={cascade}
          initial="hidden"
          animate="show"
          className="grid w-full grid-cols-[auto_1fr] items-center gap-x-5 md:grid-cols-12 md:gap-x-10"
        >
          <m.h1
            id="inicio-titulo"
            variants={rise}
            className="col-start-2 row-start-1 text-[clamp(1.625rem,8vw,2.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance md:col-span-7 md:col-start-1 md:self-end md:text-6xl md:leading-[0.98] lg:text-7xl xl:text-[5rem]"
          >
            {profile.name}
          </m.h1>

          <PhotoFrame
            photo={photos.hero}
            priority
            className="col-start-1 row-start-1 w-20 [--chamfer:0.75rem] md:col-span-5 md:col-start-8 md:row-span-2 md:w-full md:[--chamfer:2rem] lg:col-span-4 lg:col-start-9"
          />

          <div className="col-span-2 row-start-2 mt-7 md:col-span-7 md:col-start-1 md:mt-8 md:self-start">
            <m.p variants={rise} className="text-xl leading-snug font-medium tracking-tight text-balance md:text-2xl lg:text-[1.75rem]">
              <T>{profile.role}</T>
              {profile.focus && (
                <>
                  {' '}
                  <span className="text-accent-soft">
                    <T>{profile.focus}</T>
                  </span>
                </>
              )}
            </m.p>

            <m.p variants={rise} className="mt-4 max-w-xl leading-relaxed text-pretty text-muted md:mt-5 md:text-lg">
              <T>{profile.tagline}</T>
            </m.p>

            {profile.availability && (
              <m.p variants={rise} className="mt-5 flex items-center gap-2.5 text-sm text-muted">
                <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
                <T>{profile.availability}</T>
              </m.p>
            )}

            <m.div variants={rise} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#projetos">
                Ver projetos
                <ArrowDown aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </Button>
              <Button href="#contato" variant="secondary">
                Entrar em contato
              </Button>
              {hasUrl(profile.resumeUrl) && (
                <Button href={profile.resumeUrl} variant="secondary" download>
                  <Download aria-hidden className="size-4" />
                  Baixar currículo
                </Button>
              )}
            </m.div>

            {primarySocials.length > 0 && (
              <m.ul variants={rise} className="mt-7 flex flex-wrap gap-x-6 gap-y-2" aria-label="Redes profissionais">
                {primarySocials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.url}
                      {...(social.key !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-2 py-1.5 text-sm text-muted transition-colors duration-200 hover:text-fg"
                    >
                      <SocialIcon name={social.key} />
                      {social.label}
                    </a>
                  </li>
                ))}
              </m.ul>
            )}
          </div>
        </m.div>
      </div>

      {/* Fatos rápidos: a mesma informação vira colunas no desktop e linhas no celular */}
      {profile.facts.length > 0 && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="border-t border-line">
          <dl className="container-x grid sm:grid-cols-2 lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none">
            {profile.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4 last:border-b-0 sm:block sm:border-b-0 sm:py-6 sm:pr-6 sm:[&:nth-child(n+3)]:border-t lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(n+3)]:border-t-0"
              >
                <dt className="label shrink-0">
                  <T>{fact.label}</T>
                </dt>
                <dd className="text-right text-sm leading-relaxed sm:mt-2.5 sm:text-left">
                  <span className="block font-medium text-fg">
                    <T>{fact.value}</T>
                  </span>
                  {fact.detail && (
                    <span className="block text-muted">
                      <T>{fact.detail}</T>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </m.div>
      )}
    </section>
  )
}
