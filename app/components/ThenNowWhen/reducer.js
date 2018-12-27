import {fromJS} from 'immutable'
import {TogglePastTimeline, ToggleFutureTimeline} from './actions'

const initialState = fromJS({
  pastTimelineVisible: false,
  futureTimelineVisible: false,
})

export default function timeline(state = initialState, action) {
  switch (action.type) {
    case TogglePastTimeline:
      return state.set('pastTimelineVisible', !state.get('pastTimelineVisible'))
    case ToggleFutureTimeline:
      return state.set('futureTimelineVisible', !state.get('futureTimelineVisible'))
    default:
      return state
  }
}
