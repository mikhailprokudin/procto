/**
 * Параметры разделов главной страницы для `ContentWithVideo`.
 *
 * Каждый объект — пропсы одного `ContentWithVideo` (порядок = порядок отображения).
 * `mediaSrc` указывает на файл в `public/`, например `/media/section-1.mp4` → `public/media/section-1.mp4`.
 */
export interface HomeSection {
  title: string
  description: string
  /** Если `true`, `description` рендерится через `v-html` (только доверенная разметка). */
  descriptionIsHtml?: boolean
  mediaSrc: string
  /** Облегчённый MP4 для узких экранов (`<48rem`), если задан. */
  mediaSrcMobile?: string
  /** Кадр до воспроизведения (`/media/poster.webp` → `public/media/poster.webp`). */
  videoPosterSrc?: string
}

export const homeSections: HomeSection[] = [
  {
    title: "Как избежать боли?",
    description: "Проктолог <br> Хирургическое лечение в Новосибирске",
    descriptionIsHtml: true,
    mediaSrc: "/media/section-1.mp4",
    mediaSrcMobile: "/media/section-1-mobile.mp4",
    videoPosterSrc: "/media/posters/section-1.webp",
  },
  {
    title: "Геморроидальная болезнь",
    description: "Аппаратное хирургическое лечение под наркозом в стационаре",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-2.mp4",
    mediaSrcMobile: "/media/section-2-mobile.mp4",
    videoPosterSrc: "/media/posters/section-2.webp",
  },
  {
    title: "Анальная трещина ",
    description: "Устранение лазером с инъекцией ботулотоксина",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-3.mp4",
    mediaSrcMobile: "/media/section-3-mobile.mp4",
    videoPosterSrc: "/media/posters/section-3.webp",
  },
  {
    title: "Эпителиальный копчиковый ход",
    description: "Хирургическое лечение",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-4.mp4",
    mediaSrcMobile: "/media/section-4-mobile.mp4",
    videoPosterSrc: "/media/posters/section-4.webp",
  },
  {
    title: "Свищ заднего прохода",
    description: "Закрытие свища без нарушения функции держания",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-4.mp4",
    mediaSrcMobile: "/media/section-4-mobile.mp4",
    videoPosterSrc: "/media/posters/section-5.webp",
  },
];
