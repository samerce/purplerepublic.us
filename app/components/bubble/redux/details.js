import {fromJS} from 'immutable'
import {OnClickBubbleAction} from './actions'

const initialState = fromJS({
  lastClickedAction: {}
})

export default function bubbleDetails(state = initialState, action) {
  switch (action.type) {
    case OnClickBubbleAction:
      return state.set('lastClickedAction', {
        ...action
      })
    default:
      return state
  }
}
