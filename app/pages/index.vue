<script setup lang="ts">
import { homeSections } from '~/constants/homeSections'

useHead({
  title: 'ПРОКТОБАБОЧКА',
  meta: [{ name: 'description', content: 'Одностраничный сайт ПРОКТОБАБОЧКА' }],
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/media/posters/section-1.webp',
      fetchpriority: 'high'
    }
  ]
})
</script>

<template>
  <div class="page">
    <ContentWithVideo
      v-for="(section, index) in homeSections"
      :key="index"
      :desktop-media-first="index % 2 === 1"
      :title="section.title"
      :description="section.description"
      :description-is-html="section.descriptionIsHtml"
      :media-src="section.mediaSrc"
      :media-src-mobile="section.mediaSrcMobile"
      :video-poster-src="section.videoPosterSrc"
      :priority-lcp="index === 0"
    />
    <ContentPortrait
      class="page__portrait"
      src="/media/portrait.webp"
      alt="Портрет врача в тёмно-синих медицинских скрабах"
    />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.page > * {
  width: min(100vw, 1196px);
  margin-left: calc(50% - min(50vw, 598px));
  padding: var(--space-lg);
}

.page > *:nth-child(even):not(.page__portrait) {
  background: rgba(195, 45, 105, 0.112);
}

.page > .page__portrait {
  background: transparent;
}

@media (max-width: 47.99rem) {
  .page > .page__portrait {
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0;
  }
}
</style>
