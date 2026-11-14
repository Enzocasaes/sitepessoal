import type { RichText as RichTextValue } from '../types'
import { BulletList, T } from './ui'

type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

/**
 * Renderiza um RichText: string → parágrafo; array → parágrafos,
 * onde itens iniciados com "- " são agrupados em listas.
 */
export function RichText({ value }: { value: RichTextValue }) {
  const blocks: Block[] = []

  for (const raw of Array.isArray(value) ? value : [value]) {
    if (!raw.startsWith('- ')) {
      blocks.push({ type: 'p', text: raw })
      continue
    }
    const last = blocks[blocks.length - 1]
    if (last?.type === 'ul') last.items.push(raw.slice(2))
    else blocks.push({ type: 'ul', items: [raw.slice(2)] })
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) =>
        block.type === 'p' ? (
          <p key={i}>
            <T>{block.text}</T>
          </p>
        ) : (
          <BulletList key={i} items={block.items} />
        ),
      )}
    </div>
  )
}
