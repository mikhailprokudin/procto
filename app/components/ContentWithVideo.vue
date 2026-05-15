<script setup lang="ts">
import { joinURL } from 'ufo'

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    /** When true, `description` is rendered with `v-html` (only trusted markup). */
    descriptionIsHtml?: boolean
    /**
     * Public URL (site root), e.g. `/media/clip.mp4` → `public/media/clip.mp4`.
     * Named `mediaSrc` (not `videoSrc`) so the template attr `video-src` is never confused with a native video `src`.
     */
    mediaSrc: string
    /** Still image shown before playback; path under `public/` or absolute URL (`mediaSrc` rules). */
    videoPosterSrc?: string
    /** Use `h3` when a parent section already provides the page `h2`. */
    titleTag?: 'h2' | 'h3'
    /**
     * Desktop (`≥48rem`): `false` → text | video (`row`). `true` → video | text (`row-reverse`).
     * Mobile always stacks title/description then video.
     */
    desktopMediaFirst?: boolean
  }>(),
  { descriptionIsHtml: false, titleTag: 'h2', desktopMediaFirst: false }
)

const videoRef = ref<HTMLVideoElement | null>(null)
const playerWrapRef = ref<HTMLElement | null>(null)
const isPlaying = ref(false)
/** Set only after page is idle / element is visible, so initial load stays light (Web Vitals). */
const clientMediaSrc = ref<string | null>(null)
/**
 * `none` until we lazily enable the poster (first frame) — keeps LCP/FCP clean.
 * Switches to `metadata` when the player is visible and the page is idle:
 * browser then renders the first frame as a poster without downloading the full clip.
 */
const preloadMode = ref<'none' | 'metadata'>('none')

const runtimeConfig = useRuntimeConfig()

/** Path under `public/` (e.g. `/media/x.mp4`) with Nuxt `app.baseURL` when app is not at domain root. */
function publicMediaUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path
  }
  const trimmed = path.replace(/^\//, '')
  return joinURL(runtimeConfig.app.baseURL, trimmed)
}

const videoPosterUrl = computed(() =>
  props.videoPosterSrc ? publicMediaUrl(props.videoPosterSrc) : undefined
)

const { controllerId, registerExternalPause, takePlaybackLock, releasePlaybackLock } =
  useExclusiveVideoPlayback()

function pauseFromExternal() {
  const el = videoRef.value
  if (!el) return
  el.pause()
  isPlaying.value = false
}

function enablePosterPreload() {
  if (clientMediaSrc.value) return
  clientMediaSrc.value = publicMediaUrl(props.mediaSrc)
  preloadMode.value = 'metadata'
  nextTick(() => videoRef.value?.load())
}

function runWhenIdle(cb: () => void) {
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
  if (typeof ric === 'function') {
    ric(cb, { timeout: 2000 })
  } else {
    setTimeout(cb, 200)
  }
}

function scheduleAfterPageLoad(cb: () => void) {
  if (document.readyState === 'complete') {
    runWhenIdle(cb)
  } else {
    window.addEventListener('load', () => runWhenIdle(cb), { once: true })
  }
}

onMounted(() => {
  registerExternalPause(pauseFromExternal)

  if (typeof window === 'undefined') return
  const wrap = playerWrapRef.value
  if (!wrap) return

  if (typeof IntersectionObserver === 'undefined') {
    scheduleAfterPageLoad(enablePosterPreload)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      observer.disconnect()
      scheduleAfterPageLoad(enablePosterPreload)
    },
    { rootMargin: '200px' }
  )
  observer.observe(wrap)
  onScopeDispose(() => observer.disconnect())
})

async function startPlayback() {
  const el = videoRef.value
  if (!el) return
  const targetUrl = publicMediaUrl(props.mediaSrc)
  if (clientMediaSrc.value !== targetUrl) {
    clientMediaSrc.value = targetUrl
    await nextTick()
    el.load()
  }
  takePlaybackLock()
  try {
    if (el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      await new Promise<void>((resolve, reject) => {
        const onCanPlay = () => {
          el.removeEventListener('canplay', onCanPlay)
          el.removeEventListener('error', onError)
          resolve()
        }
        const onError = () => {
          el.removeEventListener('canplay', onCanPlay)
          el.removeEventListener('error', onError)
          reject(new Error('video load error'))
        }
        el.addEventListener('canplay', onCanPlay, { once: true })
        el.addEventListener('error', onError, { once: true })
      })
    }
    await el.play()
  } catch {
    releasePlaybackLock()
  }
}

async function onPlayerToggle() {
  const el = videoRef.value
  if (!el) return
  if (!el.paused) {
    el.pause()
    return
  }
  await startPlayback()
}

const playerAriaLabel = computed(() =>
  isPlaying.value ? 'Поставить видео на паузу' : 'Воспроизвести видео'
)

function onVideoPlay() {
  isPlaying.value = true
}

function onVideoPause() {
  isPlaying.value = false
  releasePlaybackLock()
}
</script>

<template>
  <section
    class="content-video"
    :class="{ 'content-video--desktop-media-first': desktopMediaFirst }"
    :aria-labelledby="`content-video-title-${controllerId}`"
  >
    <div class="content-video__text">
      <component
        :is="titleTag"
        :id="`content-video-title-${controllerId}`"
        class="content-video__title"
      >
        {{ title }}
      </component>
      <div
        v-if="descriptionIsHtml"
        class="content-video__description"
        v-html="description"
      />
      <p v-else class="content-video__description">
        {{ description }}
      </p>
    </div>
    <div
      ref="playerWrapRef"
      class="content-video__player-wrap"
      tabindex="0"
      :aria-label="playerAriaLabel"
      @click="onPlayerToggle"
      @keydown.enter.prevent="onPlayerToggle"
      @keydown.space.prevent="onPlayerToggle"
    >
      <video
        ref="videoRef"
        class="content-video__video"
        :poster="videoPosterUrl"
        playsinline
        loop
        :preload="preloadMode"
        @play="onVideoPlay"
        @pause="onVideoPause"
      >
        <source v-if="clientMediaSrc" :src="clientMediaSrc" type="video/mp4" />
      </video>
      <div v-show="!isPlaying" class="content-video__hint" aria-hidden="true">
        <span class="content-video__hint-circle">
          <span class="content-video__play-icon" />
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-video {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.content-video__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-width: 0;
}

@media (min-width: 48rem) {
  .content-video {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-lg);
  }

  .content-video--desktop-media-first {
    flex-direction: row-reverse;
  }

  .content-video__text {
    flex: 1 1 0;
  }

  .content-video__player-wrap {
    flex: 1 1 0;
    max-width: none;
    min-width: 0;
  }
}

.content-video__title {
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.25;
  color: var(--color-text);
}

.content-video__description {
  margin: 0;
  color: var(--color-text-muted);
  max-width: 42rem;
}

.content-video__player-wrap {
  position: relative;
  width: 100%;
  max-width: 48rem;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: pointer;
}

.content-video__player-wrap:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.content-video__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-video__hint {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.content-video__hint-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-accent) 92%, transparent);
  color: #fff;
  display: grid;
  place-items: center;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}

.content-video__player-wrap:hover .content-video__hint-circle {
  background: var(--color-accent-hover);
  transform: scale(1.05);
}

.content-video__play-icon {
  width: 0;
  height: 0;
  margin-left: 0.2rem;
  border-style: solid;
  border-width: 0.65rem 0 0.65rem 1.1rem;
  border-color: transparent transparent transparent currentColor;
}
</style>
