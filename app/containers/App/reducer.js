import { fromJS } from 'immutable'

import { LOCATION_CHANGE } from 'react-router-redux'
import {
  REQUEST_ROUTE_PRELOAD,
  CLEAR_PRELOAD_ROUTE
} from './actions'

const initialState = fromJS({
  router: {
    locationBeforeTransitions: null,
    preloadRoute: null,
  },
  preloadRoute: null,
})

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ROUTE_PRELOAD:
      return state.set('preloadRoute', action.preloadRoute)
    case CLEAR_PRELOAD_ROUTE:
      return state.set('router.preloadRoute', null)
    case LOCATION_CHANGE:
      return state.merge({
        router: {
          locationBeforeTransitions: action.payload,
        }
      })
    default:
      return state
  }
}
