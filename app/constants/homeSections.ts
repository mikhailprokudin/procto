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
  posterSrc?: string
}

export const homeSections: HomeSection[] = [
  {
    title: "Как избежать боли?",
    description: "Проктолог <br> Хирургическое лечение в Новосибирске",
    descriptionIsHtml: true,
    mediaSrc: "/media/section-1.mp4",
  },
  {
    title: "Геморроидальная болезнь",
    description: "Аппаратное хирургическое лечение под наркозом в стационаре",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-2.mp4",
  },
  {
    title: "Анальная трещина ",
    description: "Устранение лазером с инъекцией ботулотоксина",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-3.mp4",
  },
  {
    title: "Эпителиальный копчиковый ход",
    description: "Хирургическое лечение",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-4.mp4",
  },
  {
    title: "Свищ заднего прохода",
    description: "Закрытие свища без нарушения функции держания",
    descriptionIsHtml: false,
    mediaSrc: "/media/section-4.mp4",
  },
];
