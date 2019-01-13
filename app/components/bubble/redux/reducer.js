import {fromJS} from 'immutable'
import {TogglePoetcardCheckout} from './actions'

const initialState = fromJS({
  isPoetcardCheckoutOpen: false,
})

export default function patreon(state = initialState, action) {
  switch (action.type) {
    case TogglePoetcardCheckout:
      return state.set('isPoetcardCheckoutOpen', !state.get('isPoetcardCheckoutOpen'))
    default:
      return state
  }
}
