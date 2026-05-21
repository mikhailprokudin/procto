import {
  yandexMetrikaGoalFormSend,
  yandexMetrikaId,
  yandexMetrikaTagUrl,
} from '~/constants/analytics'

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      params?: Record<string, unknown> | string,
    ) => void
  }
}

/** Очередь вызовов до загрузки tag.js. */
export function ensureYandexMetrikaStub() {
  if (!import.meta.client) return

  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      const fn = window.ym as Window['ym'] & { a?: unknown[] }
      ;(fn.a = fn.a || []).push(args)
    }
}

export function loadYandexMetrikaTag() {
  if (!import.meta.client) return

  for (let j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j]!.src === yandexMetrikaTagUrl) return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = yandexMetrikaTagUrl
  const first = document.getElementsByTagName('script')[0]
  first?.parentNode?.insertBefore(script, first)
}

export function initYandexMetrika() {
  if (!import.meta.client) return

  ensureYandexMetrikaStub()
  loadYandexMetrikaTag()

  window.ym?.(yandexMetrikaId, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}

export function reachYandexMetrikaGoal(goal: string = yandexMetrikaGoalFormSend) {
  if (!import.meta.client) return

  ensureYandexMetrikaStub()
  window.ym?.(yandexMetrikaId, 'reachGoal', goal)
}
