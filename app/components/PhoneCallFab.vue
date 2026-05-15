<script setup lang="ts">
import { primaryPhone } from '~/constants/contacts'
</script>

<template>
  <a
    class="phone-fab"
    :href="`tel:${primaryPhone.tel}`"
    :aria-label="`Позвонить: ${primaryPhone.display}`"
  >
    <svg
      class="phone-fab__icon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </svg>
  </a>
</template>

<style scoped>
@keyframes phone-fab-pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4px 14px rgba(195, 45, 105, 0.42);
  }
  50% {
    transform: scale(1.07);
    box-shadow:
      0 8px 24px rgba(195, 45, 105, 0.52),
      0 0 0 3px rgba(195, 45, 105, 0.12);
  }
}

.phone-fab {
  position: fixed;
  right: max(var(--space-md), env(safe-area-inset-right));
  bottom: calc(max(var(--space-md), env(safe-area-inset-bottom)) + var(--space-md));
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #fff;
  background: var(--color-accent);
  box-shadow: 0 4px 14px rgba(195, 45, 105, 0.45);
  text-decoration: none;
  animation: phone-fab-pulse 2.4s ease-in-out infinite;
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

@media (prefers-reduced-motion: reduce) {
  .phone-fab {
    animation: none;
  }
}

.phone-fab:hover {
  background: var(--color-accent-hover);
  color: #fff;
  text-decoration: none;
  animation: none;
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(165, 38, 89, 0.5);
}

.phone-fab:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  animation: none;
}

.phone-fab:active {
  animation: none;
  transform: scale(0.98);
}

.phone-fab__icon {
  flex-shrink: 0;
}
</style>
