import {
  organizationAddress,
  organizationLegalName,
  siteDescription,
  siteName,
  siteOgImageAlt,
  siteOgImageHeight,
  siteOgImagePath,
  siteOgImageWidth,
  siteTitle,
} from '~/constants/site'
import { primaryPhone, workingHoursLine } from '~/constants/contacts'

export interface SiteSeoOptions {
  title?: string
  description?: string
  /** Путь к OG-изображению от корня сайта, например `/media/posters/section-1.webp`. */
  ogImagePath?: string
  ogImageAlt?: string
  ogImageWidth?: number
  ogImageHeight?: number
  /** Путь страницы для canonical и og:url, по умолчанию `/`. */
  path?: string
}

function absoluteUrl(origin: string, path: string) {
  if (path === '/' || path === '') return `${origin}/`
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

function buildJsonLd(origin: string, pageUrl: string) {
  const clinicId = `${origin}/#clinic`
  const websiteId = `${origin}/#website`
  const webpageId = `${pageUrl}#webpage`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${origin}/`,
        name: siteName,
        description: siteDescription,
        inLanguage: 'ru-RU',
        publisher: { '@id': clinicId },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: pageUrl,
        name: siteTitle,
        description: siteDescription,
        isPartOf: { '@id': websiteId },
        about: { '@id': clinicId },
        inLanguage: 'ru-RU',
      },
      {
        '@type': 'MedicalClinic',
        '@id': clinicId,
        name: siteName,
        legalName: organizationLegalName,
        url: `${origin}/`,
        telephone: primaryPhone.tel,
        image: absoluteUrl(origin, siteOgImagePath),
        address: {
          '@type': 'PostalAddress',
          ...organizationAddress,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '08:00',
            closes: '20:00',
          },
        ],
        description: `${siteDescription} ${workingHoursLine}.`,
        medicalSpecialty: 'Proctology',
      },
    ],
  }
}

export function useSiteSeo(options: SiteSeoOptions = {}) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const origin = (config.public.siteUrl as string).replace(/\/$/, '')
  const path = options.path ?? route.path
  const pageUrl = absoluteUrl(origin, path)

  const title = options.title ?? siteTitle
  const description = options.description ?? siteDescription
  const ogImagePath = options.ogImagePath ?? siteOgImagePath
  const ogImageUrl = absoluteUrl(origin, ogImagePath)
  const ogImageAlt = options.ogImageAlt ?? siteOgImageAlt
  const ogImageWidth = options.ogImageWidth ?? siteOgImageWidth
  const ogImageHeight = options.ogImageHeight ?? siteOgImageHeight

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: pageUrl,
    ogSiteName: siteName,
    ogLocale: 'ru_RU',
    ogImage: ogImageUrl,
    ogImageSecureUrl: ogImageUrl,
    ogImageType: 'image/webp',
    ogImageWidth,
    ogImageHeight,
    ogImageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImageUrl,
  })

  useHead({
    htmlAttrs: { lang: 'ru' },
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
      {
        type: 'application/ld+json',
        key: 'site-json-ld',
        innerHTML: JSON.stringify(buildJsonLd(origin, pageUrl)),
      },
    ],
  })
}
