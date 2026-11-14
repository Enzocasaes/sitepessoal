import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="label">React · TypeScript · Tailwind CSS</p>
        <a href="#inicio" className="group inline-flex items-center gap-1.5 self-start transition-colors duration-200 hover:text-fg sm:self-auto">
          Voltar ao topo
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
