<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
    <PhoneCallFab />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1 0 auto;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md) var(--space-xl);
}
</style>
