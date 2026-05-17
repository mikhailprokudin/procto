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
    <figcaption class="content-portrait__caption">
      <span class="content-portrait__caption-line">Лёвкин Олег Юрьевич</span>
      <span class="content-portrait__caption-line">кандидат медицинских наук</span>
    </figcaption>
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

.content-portrait__caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin: 0;
  padding: var(--space-md) var(--space-lg);
  text-align: center;
  line-height: 1.4;
  color: var(--color-text);
}

.content-portrait__caption-line {
  font-size: 0.875rem;
}

.content-portrait__caption-line:first-child {
  font-size: 1.25rem;
}

@media (min-width: 48rem) {
  .content-portrait {
    box-sizing: border-box;
    max-height: 700px;
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    overflow: hidden;
  }

  .content-portrait__img {
    display: block;
    width: auto;
    max-width: 100%;
    max-height: calc(700px - 4.5rem);
    margin-inline: auto;
    object-fit: cover;
    object-position: top center;
  }

  .content-portrait__caption {
    padding-block: var(--space-sm);
  }
}
</style>
