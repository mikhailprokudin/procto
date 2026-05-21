<script setup lang="ts">
import { burgerMenuLinks } from '~/constants/homeSections'
import { primaryPhone, workingHoursLine } from '~/constants/contacts'
import { smoothScrollToElement } from '~/utils/smoothScroll'

const { trackPhoneClick } = useYandexMetrika()

const menuOpen = ref(false)
/** Drawer ещё уезжает — держим visibility, чтобы transition был виден. */
const menuClosing = ref(false)
const drawerRef = ref<HTMLElement | null>(null)

function openMenu() {
  menuClosing.value = false
  menuOpen.value = true
}

function closeMenu() {
  const wasOpen = menuOpen.value
  menuOpen.value = false
  if (wasOpen) menuClosing.value = true
}

function toggleMenu() {
  if (menuOpen.value) closeMenu()
  else openMenu()
}

function onDrawerTransitionEnd(event: TransitionEvent) {
  if (event.target !== drawerRef.value || event.propertyName !== 'transform') return
  menuClosing.value = false
}

function onMenuSectionClick(event: MouseEvent, href: string) {
  if (!import.meta.client || !href.startsWith('#')) {
    closeMenu()
    return
  }

  const id = decodeURIComponent(href.slice(1))
  const target = document.getElementById(id)
  if (!target) {
    closeMenu()
    return
  }

  event.preventDefault()
  document.body.style.overflow = ''
  closeMenu()
  smoothScrollToElement(target)
}

watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__top">
        <NuxtLink class="header__logo" to="/" @click="closeMenu">
          <img
            class="header__logo-img"
            src="/sign.svg"
            width="40"
            height="40"
            alt=""
            aria-hidden="true"
          />
          <span class="header__logo-text">ПРОКТОБАБОЧКА</span>
        </NuxtLink>

        <div class="header__trailing">
          <div class="header__contact">
            <a class="header__phone" :href="`tel:${primaryPhone.tel}`" @click="trackPhoneClick">
              {{ primaryPhone.display }}
            </a>
            <p class="header__hours">{{ workingHoursLine }}</p>
          </div>
          <NuxtLink class="header__cta header__cta--desktop" to="/#contacts" @click="closeMenu">
            <svg class="header__cta-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
            </svg>
            Записаться
          </NuxtLink>
        </div>
      </div>

      <div class="header__toolbar" aria-label="Быстрые действия">
        <NuxtLink class="header__cta header__cta--toolbar" to="/#contacts" @click="closeMenu">
          <svg class="header__cta-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
          Записаться
        </NuxtLink>

        <div class="header__toolbar-icons">
          <button
            type="button"
            class="header__icon-btn header__icon-btn--burger"
            :aria-expanded="menuOpen"
            aria-controls="site-menu"
            :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
            @click="toggleMenu"
          >
            <span class="header__burger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <button
        v-if="menuOpen"
        type="button"
        class="header__backdrop"
        aria-label="Закрыть меню"
        @click="closeMenu"
      />
    </Transition>

    <nav
      id="site-menu"
      ref="drawerRef"
      class="header__drawer"
      :class="{
        'header__drawer--open': menuOpen,
        'header__drawer--closing': menuClosing,
      }"
      aria-label="Мобильное меню"
      :aria-hidden="!menuOpen && !menuClosing"
      @transitionend="onDrawerTransitionEnd"
    >
      <ul class="header__drawer-list">
        <li v-for="item in burgerMenuLinks" :key="item.href">
          <a
            class="header__drawer-link"
            :href="item.href"
            @click="onMenuSectionClick($event, item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  box-shadow: var(--shadow-header);
  border-radius: 0 0 1.25rem 1.25rem;
}

.header__inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-sm) var(--space-md) var(--space-md);
}

.header__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
}

.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
  flex: 1 1 auto;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.header__logo:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.header__logo-img {
  flex-shrink: 0;
  display: block;
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

.header__logo-text {
  font-family: 'Onest', var(--font-sans);
  font-weight: 700;
  font-size: clamp(0.8125rem, 3.2vw, 1.0625rem);
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.header__logo:hover .header__logo-text {
  color: var(--color-accent);
}

.header__trailing {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-sm);
  text-align: right;
}

.header__contact {
  text-align: right;
}

.header__phone {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  white-space: nowrap;
}

.header__phone:hover {
  text-decoration: underline;
}

.header__hours {
  margin: 0.125rem 0 0;
  max-width: 11rem;
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.header__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  background: var(--color-accent);
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.header__cta:hover {
  background: var(--color-accent-hover);
  color: #fff;
  text-decoration: none;
}

.header__cta--desktop {
  display: none;
}

.header__cta-icon {
  flex-shrink: 0;
  opacity: 0.95;
}

.header__toolbar {
  --toolbar-gap: 0.75rem;
  display: flex;
  align-items: center;
  gap: var(--toolbar-gap);
  margin-top: var(--space-sm);
  padding: 0.35rem 0.4rem 0.35rem 0.35rem;
  background: var(--color-bg);
  border-radius: 9999px;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
}

.header__cta--toolbar {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.55rem 0.625rem;
  font-size: 0.8125rem;
}

.header__toolbar-icons {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--toolbar-gap);
}

.header__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
}

.header__icon-btn:hover {
  border-color: var(--color-text-muted);
  color: var(--color-accent);
  text-decoration: none;
}

.header__icon-btn--burger {
  border-color: var(--color-border);
}

.header__burger-lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 1.125rem;
}

.header__burger-lines span {
  display: block;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
}

.header__backdrop {
  position: fixed;
  inset: 0;
  z-index: 101;
  border: none;
  padding: 0;
  background: rgba(0, 0, 0, 0.35);
  cursor: pointer;
}

.header__drawer {
  display: block;
  position: fixed;
  z-index: 102;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(17.5rem, 86vw);
  padding: 10.5rem var(--space-lg) var(--space-lg);
  background: var(--color-bg);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.08);
  transform: translateX(-100%);
  transition: transform 0.2s ease;
  pointer-events: none;
  visibility: hidden;
}

.header__drawer--open,
.header__drawer--closing {
  visibility: visible;
}

.header__drawer--open {
  transform: translateX(0);
  pointer-events: auto;
}

.header__drawer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header__drawer-list li + li {
  margin-top: var(--space-xs);
}

.header__drawer-link {
  display: block;
  padding: var(--space-sm) 0;
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
}

.header__drawer-link:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 48rem) {
  .header {
    border-radius: 0;
  }

  .header__inner {
    padding: 0.625rem var(--space-md);
  }

  .header__top {
    align-items: center;
    flex-wrap: nowrap;
  }

  .header__logo {
    flex: 0 0 auto;
    letter-spacing: -0.02em;
  }

  .header__logo-img {
    width: 2.25rem;
    height: 2.25rem;
  }

  .header__logo-text {
    font-size: 1.125rem;
    white-space: nowrap;
  }

  .header__trailing {
    flex-direction: row;
    align-items: center;
    gap: var(--space-md);
  }

  .header__contact {
    text-align: right;
  }

  .header__hours {
    font-size: 0.6875rem;
    max-width: none;
  }

  .header__phone {
    font-size: 1rem;
  }

  .header__cta--desktop {
    display: inline-flex;
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .header__toolbar {
    display: none;
  }

  .header__backdrop,
  .header__drawer {
    display: none;
  }
}
</style>
