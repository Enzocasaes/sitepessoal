import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../data/profile'
import { copyText, hasUrl } from '../lib/content'
import { emailSocial, primarySocials, secondarySocials } from '../lib/socials'
import { SocialIcon } from './Icons'
import { Section } from './Section'
import { Button, ExternalLink, Reveal } from './ui'

/** LinkedIn, GitHub etc. — o e-mail tem destaque próprio ao lado. */
const channels = primarySocials.filter((social) => social.key !== 'email')

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    if (!emailSocial || !(await copyText(emailSocial.handle))) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="contato" intro={contact.intro}>
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        {emailSocial && (
          <Reveal className="lg:col-span-6">
            <p className="label">{emailSocial.label}</p>
            <p className="mt-3 text-xl font-medium tracking-tight break-all md:text-2xl">{emailSocial.handle}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={emailSocial.url}>
                <Mail aria-hidden className="size-4" />
                {contact.ctaLabel}
              </Button>
              <Button variant="secondary" onClick={copyEmail}>
                {copied ? <Check aria-hidden className="size-4 text-emerald-400" /> : <Copy aria-hidden className="size-4" />}
                {copied ? 'Endereço copiado' : 'Copiar endereço'}
              </Button>
              {hasUrl(profile.resumeUrl) && (
                <Button href={profile.resumeUrl} variant="secondary" download>
                  <Download aria-hidden className="size-4" />
                  Baixar currículo
                </Button>
              )}
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? 'E-mail copiado para a área de transferência.' : ''}
            </p>
          </Reveal>
        )}

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <ul className="border-t border-line">
            {channels.map((social) => (
              <li key={social.key} className="border-b border-line">
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-5">
                  <span className="flex items-center gap-4 text-xl font-medium tracking-tight">
                    <SocialIcon name={social.key} className="size-5 text-subtle transition-colors duration-200 group-hover:text-accent-soft" />
                    {social.label}
                  </span>
                  <span className="flex min-w-0 items-center gap-3 font-mono text-sm text-muted">
                    <span className="truncate">{social.handle}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-soft"
                    />
                  </span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>

          {secondarySocials.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="label">Também em</p>
              {secondarySocials.map((social) => (
                <ExternalLink key={social.key} href={social.url}>
                  <SocialIcon name={social.key} className="size-3.5" />
                  {social.label}
                </ExternalLink>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
