import {fromJS} from 'immutable'
import {
  BubbleverseOpen, BubbleverseClose, BubbleverseSetActiveBubble, BubbleverseSetBubbles,
  BubbleverseGoToNextBubble, BubbleverseGoToPrevBubble
} from './actions'

const initialState = fromJS({
  dimension: null,
  activeBubble: null,
  bubbles: [],
  visibleBubbles: [],
})

export default function bubbleverse(state = initialState, action) {
  switch (action.type) {
    case BubbleverseOpen:
      const {dimension} = action
      const visibleBubbles = getBubblesByDimension(state, dimension)
      return state
        .set('visibleBubbles', visibleBubbles)
        .set('dimension', dimension)
        .set('activeBubble', visibleBubbles[0])
    case BubbleverseClose:
      return state
        .set('dimension', null)
        .set('visibleBubbles', [])
        .set('activeBubble', null)
    case BubbleverseSetActiveBubble:
      if (!state.get('dimension')) {
        const {tags: dimension} = action.nucleus
        state = state
          .set('dimension', dimension)
          .set('visibleBubbles', getBubblesByDimension(state, dimension))
      }
      return state.set('activeBubble', action.nucleus)
    case BubbleverseSetBubbles:
      return state.set('bubbles', action.bubbles)
    case BubbleverseGoToNextBubble:
      return state.set('activeBubble', getNextActiveBubble(state))
    case BubbleverseGoToPrevBubble:
      return state.set('activeBubble', getPrevActiveBubble(state))
    default:
      return state
  }
}

function getBubblesByDimension(state, dimension) {
  return state.get('bubbles').filter(b => b.tags && b.tags.includes(dimension.toLowerCase()))
}

function getNextActiveBubble(state) {
  const visibleBubbles = state.get('visibleBubbles')
  const activeBubble = state.get('activeBubble')
  const activeBubbleIndex = visibleBubbles.findIndex(b => b.id === activeBubble.id)
  const nextIndex = (activeBubbleIndex + 1) % visibleBubbles.length
  return visibleBubbles[nextIndex]
}

function getPrevActiveBubble(state) {
  const visibleBubbles = state.get('visibleBubbles')
  const activeBubble = state.get('activeBubble')
  const activeBubbleIndex = visibleBubbles.findIndex(b => b.id === activeBubble.id)
  const prevIndex = ((activeBubbleIndex - 1) + visibleBubbles.length) % visibleBubbles.length
  return visibleBubbles[prevIndex]
}
