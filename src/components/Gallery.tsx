import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type Props = { images: string[]; name: string; layout?: 'slider' | 'phones' }

/** Prints de celular lado a lado; em telas estreitas vira uma faixa com rolagem horizontal. */
function PhoneGallery({ images, name }: Omit<Props, 'layout'>) {
  return (
    <ul
      aria-label={`Telas de ${name}`}
      className="scrollbar-thin flex snap-x gap-4 overflow-x-auto rounded-xl border border-line bg-surface p-4 sm:justify-center sm:gap-6 sm:p-8"
    >
      {images.map((src, i) => (
        <li key={src} className="w-[44%] max-w-52 shrink-0 snap-center sm:w-52">
          <img
            src={src}
            alt={`${name} — tela ${i + 1} de ${images.length}`}
            loading="lazy"
            decoding="async"
            className="aspect-[1290/2796] w-full rounded-2xl border border-line object-cover"
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * Galeria do estudo de caso: uma imagem por vez, com setas e miniaturas.
 * Cada imagem aparece inteira, na sua própria proporção (sem cortes nem faixas vazias).
 */
export function Gallery({ images, name, layout = 'slider' }: Props) {
  const [current, setCurrent] = useState(0)
  if (layout === 'phones') return <PhoneGallery images={images} name={name} />

  const many = images.length > 1
  const go = (step: number) => setCurrent((value) => (value + step + images.length) % images.length)
  const arrow =
    'absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border border-line bg-bg/85 text-fg transition-colors duration-200 hover:bg-surface-2'

  return (
    <div>
      <div className="relative min-h-40 overflow-hidden rounded-xl border border-line bg-surface">
        {/* key: troca de imagem remonta o <img> e dispara o fade de entrada */}
        <img
          key={images[current]}
          src={images[current]}
          alt={`${name} — imagem ${current + 1} de ${images.length}`}
          decoding="async"
          className="block max-h-[75svh] w-full animate-fade-in object-contain"
        />
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Imagem anterior" className={`${arrow} left-3`}>
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próxima imagem" className={`${arrow} right-3`}>
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="scrollbar-thin mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === current}
              className={`aspect-video w-20 shrink-0 overflow-hidden rounded-md border transition-opacity duration-200 ${
                i === current ? 'border-accent-soft' : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              {/* As miniaturas carregam todas as imagens, então a troca no visor é imediata */}
              <img src={src} alt="" decoding="async" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
