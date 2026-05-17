export interface ClinicPhone {
  /** Подпись (отделение, подсказка) */
  label: string
  /** Значение для href="tel:..." — только цифры и + */
  tel: string
  /** Как показывать пользователю */
  display: string
}

export const phones: ClinicPhone[] = [
  {
    label: 'Регистратура',
    tel: '+73832078386',
    display: '+7(383)207-83-86'
  },
]

export const primaryPhone = phones[0]!

/** Строка режима работы для шапки (моб.) */
export const workingHoursLine = 'Пн.–Вс., 8:00–20:00'
