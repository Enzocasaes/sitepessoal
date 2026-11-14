import { useCallback, useEffect, useRef, useState } from 'react'

const PREFIX = '#projeto/'

const slugFromHash = () =>
  window.location.hash.startsWith(PREFIX) ? decodeURIComponent(window.location.hash.slice(PREFIX.length)) : null

/**
 * Liga o estudo de caso aberto ao endereço da página (/#projeto/<slug>):
 *  - cada projeto ganha um link direto, que pode ser compartilhado
 *  - o botão "voltar" do navegador (e do celular) fecha o estudo de caso
 */
export function useProjectRoute(sectionId: string) {
  const [slug, setSlug] = useState(slugFromHash)
  /** true quando a entrada do histórico foi criada por um clique dentro do site */
  const pushed = useRef(false)

  useEffect(() => {
    // Link direto: deixa a seção de projetos posicionada por trás do estudo de caso
    if (slugFromHash()) document.getElementById(sectionId)?.scrollIntoView({ behavior: 'instant' })

    const sync = () => {
      const next = slugFromHash()
      if (!next) pushed.current = false
      setSlug(next)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [sectionId])

  const open = useCallback((next: string) => {
    pushed.current = true
    window.location.hash = PREFIX + encodeURIComponent(next)
  }, [])

  const close = useCallback(() => {
    if (pushed.current) {
      // desfaz a entrada criada em open(); o evento hashchange atualiza o estado
      pushed.current = false
      window.history.back()
    } else {
      // chegou por link direto: não há para onde voltar dentro do site
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setSlug(null)
    }
  }, [])

  return { slug, open, close }
}
