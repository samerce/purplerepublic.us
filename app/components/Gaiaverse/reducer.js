import {fromJS} from 'immutable'
import {
  GaiaverseActivatePortal,
} from './actions'
import PortalConfig from './config'

import {makeEnum} from '../../utils/lang'

const Mode = makeEnum([
  'seduction',
  'transition',
  'inTheDeep',
])

let initialState = fromJS({
  portals: {},
  mode: Mode.seduction,
})
initialState = initialState.set('portals', getPortals('jellyfish'))

export default function bubbleverse(state = initialState, action) {
  switch (action.type) {
    case GaiaverseActivatePortal:
      return state.set('portals', getPortals(action.portalId))
    default:
      return state
  }
}

function getPortals(centerPortalId) {
  const center = PortalConfig[centerPortalId]
  center.id = centerPortalId

  const peers = {}
  for (let spot in center.peers) {
    peers[spot] = PortalConfig[center.peers[spot]]
    peers[spot].id = center.peers[spot]
  }

  return {
    center,
    ...peers,
  }
}
