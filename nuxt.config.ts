// https://nuxt.com/docs/api/nuxt-config
const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: !isProd },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          href: '/fonts/sbsanstext-medium.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  ...(isProd
    ? {}
    : {
        vite: {
          optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit']
          }
        }
      })
})
