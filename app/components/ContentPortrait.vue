<script setup lang="ts">
defineProps<{
  /** Public path, e.g. `/media/portrait.webp` → `public/media/portrait.webp`. */
  src: string
  alt: string
}>()
</script>

<template>
  <figure class="content-portrait">
    <img
      class="content-portrait__img"
      :src="src"
      :alt="alt"
      width="1600"
      height="2400"
      decoding="async"
      loading="lazy"
    />
  </figure>
</template>

<style scoped>
.content-portrait {
  margin: 0;
  width: 100%;
}

.content-portrait__img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
