import { ImageIcon } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../types'

/** Capa do projeto, com fallback quando não há imagem (ou o arquivo não existe). */
export function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (project.cover && !failed) {
    return (
      <img
        src={project.cover}
        alt={`Tela do projeto ${project.name}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ objectPosition: project.coverPosition ?? 'center' }}
        className={`size-full object-cover ${className}`}
      />
    )
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 text-subtle">
      <ImageIcon className="size-5" aria-hidden />
      <span className="placeholder-text font-mono text-xs">[IMAGEM OU SCREENSHOT]</span>
    </div>
  )
}
