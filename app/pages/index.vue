<script setup lang="ts">
import { homeSections } from '~/constants/homeSections'

useHead({
  title: 'ПРОКТОБАБОЧКА',
  meta: [{ name: 'description', content: 'Одностраничный сайт ПРОКТОБАБОЧКА' }]
})
</script>

<template>
  <div class="page">
    <ContentWithVideo
      v-for="section in homeSections"
      :key="section.mediaSrc"
      :title="section.title"
      :description="section.description"
      :description-is-html="section.descriptionIsHtml"
      :media-src="section.mediaSrc"
      :poster-src="section.posterSrc"
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
