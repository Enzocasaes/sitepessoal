import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navigation } from '../data/navigation'
import { brand, profile } from '../data/profile'
import { useEscape } from '../hooks/useEscape'
import { useScrollLock } from '../hooks/useScrollLock'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { pad } from '../lib/content'
import { primarySocials } from '../lib/socials'
import { SocialIcon } from './Icons'

const ids = navigation.map((item) => item.id)

export function Navbar() {
  const { active, scrolled } = useScrollSpy(ids)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useScrollLock(open)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])
  useEscape(open, close)

  useEffect(() => {
    if (!open) return
    // Com o menu aberto, o conteúdo atrás dele sai da navegação por teclado e leitores de tela
    const behind = document.querySelectorAll<HTMLElement>('main, footer')
    behind.forEach((el) => (el.inert = true))
    // Se a tela passar para o layout desktop (ex.: celular girado), o menu fecha sozinho
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onChange = () => desktop.matches && setOpen(false)
    desktop.addEventListener('change', onChange)
    return () => {
      behind.forEach((el) => (el.inert = false))
      desktop.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          open ? 'border-line bg-bg' : scrolled ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-18">
          <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label={`${profile.shortName} — voltar ao início`}>
            <img src={brand.mark} alt="" width={51} height={28} className="h-7 w-auto" />
            <span className="text-[0.8125rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase max-[22rem]:hidden md:hidden lg:block">
              {profile.shortName}
            </span>
          </a>

          {/* Desktop */}
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="group relative block px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:text-fg aria-[current=location]:text-fg"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 bottom-0.5 h-px origin-left scale-x-0 bg-accent-soft transition-transform duration-300 ease-out-expo group-aria-[current=location]:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={open ? 'menu-mobile' : undefined}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="-mr-2 flex size-11 items-center justify-center rounded-lg text-fg md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </header>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-bg md:hidden"
          >
            <div className="container-x flex min-h-full flex-col pt-2 pb-8">
              <nav aria-label="Menu">
                <ul>
                  {navigation.map((item, i) => (
                    <li key={item.id} className="border-b border-line">
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={active === item.id ? 'location' : undefined}
                        className="flex items-baseline gap-4 py-4 text-2xl font-medium tracking-tight text-muted aria-[current=location]:text-fg"
                      >
                        <span className="label w-6 text-accent-soft">{pad(i)}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto pt-10">
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {primarySocials.map((social) => (
                    <li key={social.key}>
                      <a
                        href={social.url}
                        {...(social.key !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="flex items-center gap-2 py-2 text-sm text-muted"
                      >
                        <SocialIcon name={social.key} />
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="label mt-6">{profile.role}</p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
