const DEFAULT_DURATION_MS = 1400

/** Быстрый старт, плавное замедление в конце. */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

function scrollMarginTop(el: HTMLElement): number {
  return parseFloat(getComputedStyle(el).scrollMarginTop) || 0
}

/** Обход `scroll-behavior: smooth` на `html`, иначе каждый кадр «залипает». */
function scrollToY(y: number) {
  window.scrollTo({ top: y, left: 0, behavior: 'instant' })
}

function targetScrollY(target: HTMLElement): number {
  return target.getBoundingClientRect().top + window.scrollY - scrollMarginTop(target)
}

let activeScrollFrame = 0

/** Плавный скролл к элементу с настраиваемой длительностью. */
export function smoothScrollToElement(
  target: HTMLElement,
  { durationMs = DEFAULT_DURATION_MS }: { durationMs?: number } = {}
) {
  const prefersReducedMotion =
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches

  const targetY = targetScrollY(target)
  const startY = window.scrollY
  const distance = targetY - startY

  if (Math.abs(distance) < 1 || prefersReducedMotion) {
    scrollToY(targetY)
    return
  }

  const frameId = ++activeScrollFrame
  const startTime = performance.now()

  function step(now: number) {
    if (frameId !== activeScrollFrame) return

    const progress = Math.min((now - startTime) / durationMs, 1)
    scrollToY(startY + distance * easeOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  // Сразу заметный сдвиг, без ожидания первого rAF и без progress = 0.
  scrollToY(startY + distance * easeOutCubic(1 / 60))
  requestAnimationFrame(step)
}
