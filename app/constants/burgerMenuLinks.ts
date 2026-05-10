export interface BurgerMenuLink {
  label: string
  /** URL или путь; пока пусто — замените, когда появятся страницы */
  href: string
}

/** Пункты мобильного меню (бургер) — направления / заболевания */
export const burgerMenuConditionLinks: BurgerMenuLink[] = [
  { label: 'Геморрой', href: '' },
  { label: 'Трещина', href: '' },
  { label: 'Копчиковый ход', href: '' },
  { label: 'Свищ', href: '' }
]
