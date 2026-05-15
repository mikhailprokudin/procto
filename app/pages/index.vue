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

.page > *:nth-child(even) {
  background: rgba(195, 45, 105, 0.112);
}
</style>
