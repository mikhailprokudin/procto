import { yandexMetrikaWatchUrl } from '~/constants/analytics'
import { ensureYandexMetrikaStub, initYandexMetrika } from '~/utils/yandexMetrika'

export default defineNuxtPlugin(() => {
  // Очередь ym сразу — reachGoal на tel: до load страницы не теряется.
  ensureYandexMetrikaStub()

  useHead({
    noscript: [
      {
        key: 'yandex-metrika',
        innerHTML: `<div><img src="${yandexMetrikaWatchUrl}" style="position:absolute; left:-9999px;" alt="" /></div>`,
      },
    ],
  })

  const start = () => initYandexMetrika()

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }
})
