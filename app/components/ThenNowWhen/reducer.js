import {fromJS} from 'immutable'
import {TogglePastTimeline, ToggleFutureTimeline} from './actions'

const initialState = fromJS({
  pastTimelineVisible: false,
  futureTimelineVisible: false,
})

export default function timeline(state = initialState, action) {
  switch (action.type) {
    case TogglePastTimeline:
      state = state.set('futureTimelineVisible', false)
      return state.set('pastTimelineVisible', !state.get('pastTimelineVisible'))
    case ToggleFutureTimeline:
      state = state.set('pastTimelineVisible', false)
      return state.set('futureTimelineVisible', !state.get('futureTimelineVisible'))
    default:
      return state
  }
}
