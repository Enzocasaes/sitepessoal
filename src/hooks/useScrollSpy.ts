import { useEffect, useState } from 'react'

/**
 * Acompanha a rolagem da página em um único listener (limitado a uma leitura por frame):
 *  - active: id da seção visível no momento, para destacar na navbar
 *  - scrolled: true depois que a página sai do topo
 */
export function useScrollSpy(ids: readonly string[]) {
  const [state, setState] = useState({ active: ids[0], scrolled: false })

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let active = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) active = id
      }
      // fim da página → última seção
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        active = ids[ids.length - 1]
      }
      const scrolled = window.scrollY > 8
      setState((prev) => (prev.active === active && prev.scrolled === scrolled ? prev : { active, scrolled }))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return state
}
