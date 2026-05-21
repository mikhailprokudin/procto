import { reachYandexMetrikaGoal } from '~/utils/yandexMetrika'

export function useYandexMetrika() {
  function trackPhoneClick() {
    reachYandexMetrikaGoal()
  }

  return { trackPhoneClick }
}
