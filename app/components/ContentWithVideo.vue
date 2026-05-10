<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  /** URL from site root, e.g. `/media/clip.mp4` → file `public/media/clip.mp4` */
  videoSrc: string
  /** Optional poster image, same rules as `videoSrc` */
  posterSrc?: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const { controllerId, registerExternalPause, takePlaybackLock, releasePlaybackLock } =
  useExclusiveVideoPlayback()

function pauseFromExternal() {
  const el = videoRef.value
  if (!el) return
  el.pause()
  isPlaying.value = false
}

onMounted(() => {
  registerExternalPause(pauseFromExternal)
})

async function onPlayClick() {
  const el = videoRef.value
  if (!el) return
  takePlaybackLock()
  try {
    await el.play()
  } catch {
    releasePlaybackLock()
  }
}

function onVideoPlay() {
  isPlaying.value = true
}

function onVideoPause() {
  isPlaying.value = false
  releasePlaybackLock()
}
</script>

<template>
  <section class="content-video" :aria-labelledby="`content-video-title-${controllerId}`">
    <h2 :id="`content-video-title-${controllerId}`" class="content-video__title">
      {{ title }}
    </h2>
    <p class="content-video__description">
      {{ description }}
    </p>
    <div class="content-video__player-wrap">
      <video
        ref="videoRef"
        class="content-video__video"
        :src="videoSrc"
        :poster="posterSrc"
        playsinline
        loop
        preload="metadata"
        @play="onVideoPlay"
        @pause="onVideoPause"
      />
      <button
        v-show="!isPlaying"
        type="button"
        class="content-video__play"
        aria-label="Воспроизвести видео"
        @click="onPlayClick"
      >
        <span class="content-video__play-icon" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.content-video {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
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
}

.content-video__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-video__play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-accent) 92%, transparent);
  color: #fff;
  display: grid;
  place-items: center;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}

.content-video__play:hover {
  background: var(--color-accent-hover);
  transform: scale(1.05);
}

.content-video__play:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
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
