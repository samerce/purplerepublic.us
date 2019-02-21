import {fromJS} from 'immutable'
import {makeEnum} from '../../utils/lang'

export const IntroMode = makeEnum([
  'birth',
  'splash',
  'settle',
  'chill',
])
export const SetIntroMode = 'intro.setIntroMode'

const initialState = fromJS({
  mode: IntroMode.birth,
})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SetIntroMode:
      return state.set('mode', action.mode)
    default:
      return state
  }
}

export function setIntroMode(mode) {
  return {
    type: SetIntroMode,
    mode,
  }
}
