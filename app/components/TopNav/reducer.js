import {fromJS} from 'immutable'
import {ToggleShop, ToggleExplore} from './actions'

const initialState = fromJS({
  isShopOpen: false,
  isExploreOpen: false,
})

export default function topNav(state = initialState, action) {
  switch (action.type) {
    case ToggleShop:
      state = state.set('isExploreOpen', false)
      return state.set('isShopOpen', !state.get('isShopOpen'))
    case ToggleExplore:
      state = state.set('isShopOpen', false)
      return state.set('isExploreOpen', !state.get('isExploreOpen'))
    default:
      return state
  }
}
