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
    tel: '+74951234567',
    display: '+7 (495) 123-45-67'
  },
  {
    label: 'Экстренная линия',
    tel: '+74957654321',
    display: '+7 (495) 765-43-21'
  },
  {
    label: 'Справочная',
    tel: '+78001234567',
    display: '8 (800) 123-45-67'
  }
]

export const primaryPhone = phones[0]!

/** Строка режима работы для шапки (моб.) */
export const workingHoursLine = 'Пн.–Вс., 8:00–20:00'
