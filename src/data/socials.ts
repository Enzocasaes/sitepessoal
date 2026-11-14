import type { Social } from '../types'

/**
 * ============================================================
 *  REDES SOCIAIS
 * ============================================================
 *  - url: link completo. Se ficar '' o link é escondido automaticamente.
 *  - handle: texto exibido na seção de contato.
 *  - primary: canal profissional — aparece no Hero, no menu mobile e em
 *    destaque no Contato. Os demais ficam em uma linha secundária.
 *
 *  O item 'email' é a fonte do e-mail usado no botão principal do Contato.
 *
 *  Formatos:
 *   email     → 'mailto:voce@email.com'
 *   whatsapp  → 'https://wa.me/55DDDNUMERO' (só números, com código do país)
 */
export const socials: Social[] = [
  {
    key: 'email',
    label: 'E-mail',
    handle: 'enzocasais0802@gmail.com',
    url: 'mailto:enzocasais0802@gmail.com',
    primary: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/enzo-casaes',
    url: 'https://www.linkedin.com/in/enzo-casaes-77a469301',
    primary: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    handle: '@Enzocasaes',
    url: 'https://github.com/Enzocasaes',
    primary: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    handle: '@enzo_figueiro',
    url: 'https://www.instagram.com/enzo_figueiro',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    handle: '+55 (33) 98730-6864',
    url: 'https://wa.me/5533987306864',
  },
]
