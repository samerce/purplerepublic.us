import {fromJS} from 'immutable'
import {SetActiveGratitude} from './actions'

const initialState = fromJS({
  activeGratitude: 0,
})

export default function patreon(state = initialState, action) {
  switch (action.type) {
    case SetActiveGratitude:
      return state.set('activeGratitude', action.activeGratitude)
    default:
      return state
  }
}
