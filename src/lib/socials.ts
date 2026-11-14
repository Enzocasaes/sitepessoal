import { socials } from '../data/socials'
import { hasUrl } from './content'

/** Redes com URL preenchida — as demais ficam escondidas no site inteiro. */
const available = socials.filter((s) => hasUrl(s.url))

/** Canais profissionais (primary: true) */
export const primarySocials = available.filter((s) => s.primary)

/** Demais redes */
export const secondarySocials = available.filter((s) => !s.primary)

/** Item de e-mail, fonte única do endereço usado no Contato */
export const emailSocial = available.find((s) => s.key === 'email')
