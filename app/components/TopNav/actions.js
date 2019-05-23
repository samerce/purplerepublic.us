export const ToggleShop = 'topNav.past.toggle'
export const ToggleExplore = 'topNav.future.toggle'

export function toggleShop() {
  return {
    type: ToggleShop,
  }
}

export function toggleExplore() {
  return {
    type: ToggleExplore,
  }
}
