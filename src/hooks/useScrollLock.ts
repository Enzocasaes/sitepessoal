import { useEffect } from 'react'

/**
 * Bloqueia o scroll da página enquanto `locked` for true (menu mobile e modal).
 * O espaço da barra de rolagem já é reservado por `scrollbar-gutter: stable`
 * no CSS, então travar o scroll não desloca o layout.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [locked])
}
