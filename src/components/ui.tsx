import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { isPlaceholder, splitLead } from '../lib/content'
import { ease } from '../lib/motion'

/** Renderiza um texto; se for placeholder [ASSIM], aplica destaque visual. */
export function T({ children }: { children: string }) {
  if (!isPlaceholder(children)) return <>{children}</>
  return (
    <span className="placeholder-text" title={import.meta.env.DEV ? 'Conteúdo editável — altere em src/data/' : undefined}>
      {children}
    </span>
  )
}

/** Animação de entrada ao aparecer na tela. `as` mantém a semântica (ex.: <li> dentro de listas). */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  className,
}: {
  children: ReactNode
  as?: 'div' | 'li' | 'header'
  delay?: number
  className?: string
}) {
  const Tag = m[as] as typeof m.div
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </Tag>
  )
}

/** Separador dos rótulos técnicos: "01 / Projetos". */
export function Slash() {
  return (
    <span aria-hidden className="mx-2 text-line-strong">
      /
    </span>
  )
}

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
} & (
  | {
      /** Com href, o botão é um link */
      href: string
      /** Abre em nova aba */
      external?: boolean
      /** Baixa o arquivo em vez de navegar */
      download?: boolean
      onClick?: never
    }
  | {
      /** Com onClick (sem href), o botão é um <button> */
      onClick: () => void
      href?: never
      external?: never
      download?: never
    }
)

/** Botão do site: mesma aparência para links (href) e ações (onClick). */
export function Button({ children, variant = 'primary', className = '', href, external, download, onClick }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-fg text-bg hover:bg-white'
      : 'border border-line-strong text-fg hover:border-subtle hover:bg-surface'
  const classes = `group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${styles} ${className}`

  if (href === undefined) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} download={download} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

/** Link de texto para destinos externos, com seta e aviso de nova aba para leitores de tela. */
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line-strong underline-offset-[5px] transition-colors duration-200 hover:decoration-accent-soft ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 text-subtle transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent-soft"
      />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}

/** Lista de tecnologias/assuntos em etiquetas monoespaçadas. */
export function TagList({ items, label, className = '' }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-muted">
          <T>{item}</T>
        </li>
      ))}
    </ul>
  )
}

/**
 * Lista com marcadores. Com `emphasizeLead`, itens no formato
 * "Título: explicação" ganham o título em destaque.
 */
export function BulletList({
  items,
  emphasizeLead,
  className = '',
}: {
  items: string[]
  emphasizeLead?: boolean
  className?: string
}) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => {
        const { lead, body } = emphasizeLead ? splitLead(item) : { lead: null, body: item }
        return (
          <li key={i} className="relative pl-5">
            <span aria-hidden className="absolute top-[0.8em] left-0 h-px w-2.5 bg-accent-soft" />
            {lead && <span className="font-medium text-fg">{lead}: </span>}
            <T>{body}</T>
          </li>
        )
      })}
    </ul>
  )
}
