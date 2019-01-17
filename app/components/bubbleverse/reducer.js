import {fromJS} from 'immutable'
import {
  BubbleverseOpen, BubbleverseClose, BubbleverseSetActiveBubble, BubbleverseSetBubbles,
  BubbleverseGoToNextBubble, BubbleverseGoToPrevBubble, BubbleverseToggleFullscreenBubbleGrid, BubbleverseBubbleBuilderOpen,
  BubbleverseBubbleBuilderClose, BubbleverseBubbleBuilderUpdateNucleus,
  BubbleverseBubbleBuilderDidPublish,
} from './actions'

const initialState = fromJS({
  dimension: null,
  activeBubble: null,
  bubbles: [],
  visibleBubbles: [],
  isBubbleGridFullscreen: false,
  mouseLocation: null,
  isBubbleBuilderOpen: false,
}).set('builderNucleus', getDefaultBuilderNucleus())

export default function bubbleverse(state = initialState, action) {
  switch (action.type) {
    case BubbleverseOpen:
      const {dimension} = action
      const visibleBubbles = getBubblesByDimension(state, dimension)
      return state
        .set('mouseLocation', action.mouseLocation)
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
      return state
        .set('activeBubble', action.nucleus)
        .set('isBubbleGridFullscreen', false)
    case BubbleverseSetBubbles:
      return state.set('bubbles', action.bubbles)
    case BubbleverseGoToNextBubble:
      return state.set('activeBubble', getNextActiveBubble(state))
    case BubbleverseGoToPrevBubble:
      return state.set('activeBubble', getPrevActiveBubble(state))
    case BubbleverseToggleFullscreenBubbleGrid:
      return state.set('isBubbleGridFullscreen', !state.get('isBubbleGridFullscreen'))
    case BubbleverseBubbleBuilderOpen:
      state = state.set('isBubbleBuilderOpen', true)
      if (action.shouldEditActiveBubble) {
        const activeBubble = state.get('activeBubble')
        state = state.set('builderNucleus', {
          ...state.get('builderNucleus'),
          ...activeBubble,
          existingIndex: getExistingIndex(activeBubble, state.get('bubbles')),
        })
      }
      return state
    case BubbleverseBubbleBuilderClose:
      return state
        .set('isBubbleBuilderOpen', false)
        .set('builderNucleus', getDefaultBuilderNucleus())
    case BubbleverseBubbleBuilderUpdateNucleus:
      const builderNucleus = {
        ...state.get('builderNucleus'),
        ...action.nucleus,
      }
      return state
        .set('builderNucleus', builderNucleus)
        .set('activeBubble', builderNucleus)
    case BubbleverseBubbleBuilderDidPublish:
      const bubbles = state.get('bubbles')
      const {existingIndex} = state.get('builderNucleus')
      if (existingIndex >= 0) {
        bubbles[existingIndex] = action.nucleus
      } else {
        bubbles.unshift(action.nucleus)
      }
      return state
        .set('bubbles', bubbles)
        .set('lastPublishedBubble', action.nucleus)
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

function getExistingIndex(bubble, bubbles) {
  return bubbles.findIndex(b => b.id === bubble.id)
}

function getDefaultBuilderNucleus() {
  return {
    title: 'i am a cosmic title waiting to happen',
    subtitle: 'click! make me pretty',
    type: 'words',
  }
}
