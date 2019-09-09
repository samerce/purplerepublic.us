import {fromJS} from 'immutable'
import {
  GaiaverseActivatePortal, GaiaverseDive
} from './actions'
import Portals from './config'

import {makeEnum} from '../../utils/lang'

export const Mode = makeEnum([
  'seduction',
  'inTheDeep',
])

let initialState = fromJS({
  portals: {},
  mode: Mode.seduction,
})
initialState = initialState.set('portals', getPortals('underwater'))

export default function gaiaverseReducer(state = initialState, action) {
  switch (action.type) {
    case GaiaverseActivatePortal:
      const centerPortal = state.get('portals').center
      if (state.get('mode') === Mode.inTheDeep) {
        return state.set('mode', Mode.seduction)
      }
      if (centerPortal && action.portalId === centerPortal.id &&
          state.get('mode') === Mode.seduction) {
        return state
      }
      return state
        .set('portals', getPortals(action.portalId))
        .set('mode', Mode.seduction)
    case GaiaverseDive:
      return state.set('mode', Mode.inTheDeep)
    default:
      return state
  }
}

function getPortals(centerPortalId) {
  const center = Portals[centerPortalId]
  center.id = centerPortalId

  const peers = {}
  for (let spot in center.peers) {
    peers[spot] = Portals[center.peers[spot]]
    peers[spot].id = center.peers[spot]
  }

  return {
    center,
    ...peers,
  }
}
