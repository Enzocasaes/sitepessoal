import { Camera } from 'lucide-react'
import { useState } from 'react'
import { brand } from '../data/profile'
import type { Photo } from '../types'

type Props = {
  photo: Photo
  /** Imagem acima da dobra: carrega com prioridade em vez de lazy */
  priority?: boolean
  className?: string
}

/**
 * Fotografia com o mesmo tratamento em todo o site:
 *  - proporção retrato (4:5) ou paisagem (4:3)
 *  - canto chanfrado, ecoando o corte diagonal do monograma
 *  - legenda opcional (photo.caption)
 *  - fallback automático quando não há foto (ou o arquivo não existe)
 */
export function PhotoFrame({ photo, priority, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const showImage = photo.src && !failed
  const ratio = photo.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[4/5]'

  return (
    <figure className={className}>
      <div className={`chamfer @container relative overflow-hidden bg-surface ${ratio}`}>
        {showImage ? (
          <img
            src={photo.src!}
            alt={photo.alt}
            onError={() => setFailed(true)}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            style={{ objectPosition: photo.position ?? 'center' }}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 p-4 text-center">
            <img src={brand.mark} alt="" className="w-2/5 opacity-50" />
            <span className="hidden items-center gap-2 font-mono text-[0.6875rem] text-subtle @[14rem]:flex">
              <Camera className="size-3.5 shrink-0" aria-hidden /> adicione sua foto em /public/images/profile
            </span>
          </div>
        )}
      </div>
      {photo.caption && <figcaption className="label mt-3">{photo.caption}</figcaption>}
    </figure>
  )
}
