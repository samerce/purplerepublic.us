/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import appReducer from 'containers/App/reducer'
import quarkArtReducer from 'containers/quarkart/reducer'
import patreonReducer from 'components/bubble/redux/patreon'
import instagramReducer from 'components/bubble/redux/instagram'
import bubbleDetailsReducer from 'components/bubble/redux/details'
import topNavReducer from 'components/TopNav/reducer'
import bubbleverseReducer from 'components/bubbleverse/reducer'
import bubblesReducer from 'components/bubble/redux/reducer'
import introReducer from 'global/reducers/intro'
import gaiaverseReducer from 'components/gaiaverse/reducer'

export default function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducer,
    quarkArt: quarkArtReducer,
    patreonBubble: patreonReducer,
    instagramBubble: instagramReducer,
    bubbleDetails: bubbleDetailsReducer,
    topNav: topNavReducer,
    bubbleverse: bubbleverseReducer,
    bubbles: bubblesReducer,
    intro: introReducer,
    gaiaverse: gaiaverseReducer,
    ...asyncReducers,
  })
}
