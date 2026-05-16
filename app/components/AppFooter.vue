<script setup lang="ts">
import { phones } from '~/constants/contacts'
</script>

<template>
  <footer id="contacts" class="footer">
    <div class="footer__inner">
      <p class="footer__title">Телефоны</p>
      <ul class="footer__phones">
        <li v-for="p in phones" :key="p.tel" class="footer__phone-row">
          <span class="footer__label">{{ p.label }}</span>
          <a class="footer__tel" :href="`tel:${p.tel}`">{{ p.display }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  scroll-margin-top: 6.5rem;
  flex-shrink: 0;
  margin-top: auto;
  padding: var(--space-xl) var(--space-md);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  max-width: 72rem;
  margin: 0 auto;
}

.footer__title {
  margin: 0 0 var(--space-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.footer__phones {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer__phone-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer__label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer__tel {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
}

.footer__tel:hover {
  text-decoration: underline;
}

@media (min-width: 48rem) {
  .footer {
    scroll-margin-top: 4.5rem;
  }

  .footer__phone-row {
    flex-direction: row;
    align-items: baseline;
    gap: var(--space-lg);
  }

  .footer__label {
    min-width: 10rem;
  }
}
</style>
