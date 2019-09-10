import {fromJS} from 'immutable'
import {
  StartSetView, StartSetFruitScrolled,
} from './actions.coffee'

import {makeEnum} from '../../utils/lang'

export View = makeEnum [
  'intro',
  'cosmos',
  'triangle',
  'quark',
]
initialState = fromJS {
  view: View.intro,
  energy: 'sun',
  quark: '',
  portal: '',
}

export default (state = initialState, action) ->
  switch action.type
    when StartSetView
      state.set 'view', action.view
           .set 'energy', action.energy
           .set 'quark', action.quark
           .set 'anchor', action.anchor
    when StartSetFruitScrolled
      state.set 'fruitScrolled', action.scrolled
    else state
