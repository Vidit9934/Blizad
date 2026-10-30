import { Head } from 'vite-react-ssg'
import { site } from '../content/site'
import { founders } from '../content/founders'

interface SeoProps {
  title: string
  description: string
  /** Route path, e.g. "/services/hosting". */
  path: string
  jsonLd?: object[]
  noindex?: boolean
}

export const absoluteUrl = (path: string) => `${site.url.value.replace(/\/$/, '')}${path === '/' ? '/' : path}`

/** The business entity, reused by every page's structured data. */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${absoluteUrl('/')}#organization`,
  name: site.name,
  legalName: site.legalName.value,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/favicon.svg'),
  slogan: site.tagline,
  description: site.description,
  email: site.email.value,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  parentOrganization: { '@type': 'Organization', name: site.parentCompany.value },
  founder: founders.map((founder) => ({
    '@type': 'Person',
    name: founder.name,
    ...(founder.alsoKnownAs ? { alternateName: founder.alsoKnownAs } : {}),
    jobTitle: founder.role,
    knowsAbout: founder.knowsAbout,
  })),
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

/** JSON-LD must not let a "</script>" sequence in content close the tag early. */
const safeJson = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')

export function Seo({ title, description, path, jsonLd = [], noindex }: SeoProps) {
  const url = absoluteUrl(path)
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`
  return (
    <Head>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteUrl('/og.png')} />
      <meta name="twitter:card" content="summary_large_image" />
      {[organizationLd, ...jsonLd].map((data, index) => (
        <script key={index} type="application/ld+json">
          {safeJson(data)}
        </script>
      ))}
    </Head>
  )
}
