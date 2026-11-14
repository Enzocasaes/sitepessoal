import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import { experience } from './src/data/experience.ts'
import { photos, profile } from './src/data/profile.ts'
import { skillCategories } from './src/data/skills.ts'
import { socials } from './src/data/socials.ts'
import { hasUrl } from './src/lib/content.ts'

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Gera os metadados do index.html a partir de src/data: <title>, descrição,
 * Open Graph, JSON-LD (schema.org/Person), preload da foto do Hero e o conteúdo
 * exibido sem JavaScript.
 *
 * É o HTML estático que buscadores e prévias de link (LinkedIn, WhatsApp) leem —
 * gerá-lo no build evita que ele fique dessincronizado do conteúdo do site.
 */
function portfolioSeo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      const { title, description, image, siteUrl } = profile.seo
      const base = siteUrl.replace(/\/+$/, '')
      const absolute = (path: string) => base + path
      const headline = [profile.role, profile.focus].filter(Boolean).join(' ')
      const links = socials.filter((social) => hasUrl(social.url))

      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })
      const tags: HtmlTagDescriptor[] = [
        { tag: 'title', children: escapeHtml(title), injectTo: 'head' },
        meta({ name: 'description', content: description }),
        meta({ name: 'author', content: profile.name }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: profile.name }),
        meta({ property: 'og:title', content: title }),
        meta({ property: 'og:description', content: description }),
        meta({ property: 'og:locale', content: 'pt_BR' }),
        meta({ property: 'og:image', content: absolute(image) }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: `${profile.name} — ${headline}` }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: title }),
        meta({ name: 'twitter:description', content: description }),
        meta({ name: 'twitter:image', content: absolute(image) }),
      ]

      // canonical e og:url só fazem sentido com a URL pública definida
      if (base) {
        tags.push(meta({ property: 'og:url', content: `${base}/` }))
        tags.push({ tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' })
      }

      if (photos.hero.src) {
        tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', href: photos.hero.src, fetchpriority: 'high' }, injectTo: 'head' })
      }

      // Dados estruturados: apenas o que está declarado em src/data
      const job = experience.find((entry) => entry.type === 'professional' && entry.current)
      const schools = experience.filter((entry) => entry.type === 'academic')
      const organization = (name: string) => ({ '@type': 'Organization', name })
      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        description,
        ...(base && { url: `${base}/`, ...(photos.hero.src && { image: absolute(photos.hero.src) }) }),
        homeLocation: { '@type': 'Place', name: profile.location },
        ...(job && { worksFor: organization(job.organization) }),
        // cursando → affiliation; concluído → alumniOf
        affiliation: schools.filter((entry) => entry.current).map((entry) => organization(entry.organization)),
        alumniOf: schools.filter((entry) => !entry.current).map((entry) => organization(entry.organization)),
        knowsAbout: skillCategories.flatMap((category) => category.items),
        sameAs: links.filter((social) => ['linkedin', 'github', 'instagram'].includes(social.key)).map((social) => social.url),
      }
      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(person).replace(/</g, '\\u003c'),
        injectTo: 'head',
      })

      // Sem JavaScript, o visitante (ou robô) ainda encontra quem é e como entrar em contato
      const contacts = links
        .filter((social) => social.primary)
        .map((social) => `<a href="${escapeHtml(social.url)}" style="color:#7fb0f5">${escapeHtml(social.label)}</a>`)
        .join(' · ')
      tags.push({
        tag: 'noscript',
        children: `<div style="max-width:40rem;margin:0 auto;padding:4rem 1.5rem;font-family:system-ui,sans-serif;line-height:1.6;color:#eaf0f9">
        <h1 style="margin:0;font-size:2rem;line-height:1.1">${escapeHtml(profile.name)}</h1>
        <p style="font-size:1.25rem">${escapeHtml(headline)}</p>
        <p style="color:#a3b0c6">${escapeHtml(profile.tagline)}</p>
        <p>${contacts}</p>
        <p style="color:#7c8ba8">Ative o JavaScript para ver o site completo.</p>
      </div>`,
        injectTo: 'body-prepend',
      })

      return tags
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioSeo()],
})
