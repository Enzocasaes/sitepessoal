import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-8 text-center text-sm text-subtle">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
