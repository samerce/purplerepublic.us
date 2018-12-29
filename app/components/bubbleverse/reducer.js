import {fromJS} from 'immutable'
import {OpenBubbleverse, CloseBubbleverse} from './actions'

const initialState = fromJS({
  dimension: null,
})

export default function bubbleverse(state = initialState, action) {
  switch (action.type) {
    case OpenBubbleverse:
      return state.set('dimension', action.dimension)
    case CloseBubbleverse:
      return state.set('dimension', null)
    default:
      return state
  }
}
