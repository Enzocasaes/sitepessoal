/** Texto entre [COLCHETES] = placeholder ainda não preenchido. */
export const isPlaceholder = (value?: string | null) => {
  if (!value) return false
  const v = value.trim()
  return v.startsWith('[') && v.endsWith(']')
}

/** URL preenchida de verdade (não vazia e não placeholder). */
export const hasUrl = (value?: string | null): value is string => !!value && value.trim() !== '' && !isPlaceholder(value)

/** Número com dois dígitos: 1 → "01". */
export const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Separa um item no formato "Título: explicação".
 * Sem dois-pontos (ou se for placeholder), lead fica null e body é o texto inteiro.
 */
export function splitLead(text: string): { lead: string | null; body: string } {
  const at = text.indexOf(': ')
  if (at < 1 || at > 60 || isPlaceholder(text)) return { lead: null, body: text }
  return { lead: text.slice(0, at), body: text.slice(at + 2) }
}

/** Copia um texto para a área de transferência. Retorna false se o navegador não permitir. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* sem permissão: tenta o método antigo abaixo */
  }
  // navigator.clipboard só existe em contexto seguro (https/localhost)
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}
