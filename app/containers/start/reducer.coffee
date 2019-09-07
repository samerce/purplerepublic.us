import {fromJS} from 'immutable'
import {
  StartSetView,
} from './actions.coffee'

import {makeEnum} from '../../utils/lang'

export View = makeEnum [
  'cosmos',
  'triangle',
  'quark',
]
initialState = fromJS {
  view: View.triangle,
  energy: 'sun',
}

export default (state = initialState, action) ->
  switch action.type
    when StartSetView
      state = state.set 'view', action.view
      state.set 'energy', action.energy
    else state
