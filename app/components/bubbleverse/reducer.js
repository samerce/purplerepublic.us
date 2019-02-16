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
})

export default function bubbleverse(state = initialState, action) {
  switch (action.type) {
    case BubbleverseOpen:
      const {dimension} = action
      const visibleBubbles = getBubblesByDimension(state, dimension)
      if (!state.get('isBubbleBuilderOpen')) {
        state = state.set('activeBubble', visibleBubbles[0])
      }
      return state
        .set('mouseLocation', action.mouseLocation)
        .set('visibleBubbles', visibleBubbles)
        .set('dimension', dimension)
    case BubbleverseClose:
      return state
        .set('dimension', null)
        .set('visibleBubbles', [])
        .set('activeBubble', null)
    case BubbleverseSetActiveBubble:
      if (!state.get('dimension')) {
        const dimension = action.nucleus.dimension.toLowerCase()
        state = state
          .set('dimension', dimension)
          .set('visibleBubbles', getBubblesByDimension(state, dimension))
      }
      return state
        .set('activeBubble', action.nucleus)
        .set('isBubbleGridFullscreen', false)
    case BubbleverseSetBubbles:
      state = state.set('bubbles', action.bubbles)
      const aDimension = state.get('dimension')
      if (aDimension) {
        state = state.set('visibleBubbles', getBubblesByDimension(state, aDimension))
      }
      return state
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
        state = state.set('activeBubble', {
          ...activeBubble,
          existingIndex: getExistingIndex(activeBubble, state.get('bubbles')),
        })
      } else state = state.set('activeBubble', getBuilderNucleus())
      return state
    case BubbleverseBubbleBuilderClose:
      return state
        .set('isBubbleBuilderOpen', false)
    case BubbleverseBubbleBuilderUpdateNucleus:
      return state.set('activeBubble', {
        ...state.get('activeBubble'),
        ...action.nucleus,
      })
    case BubbleverseBubbleBuilderDidPublish:
      const bubbles = state.get('bubbles')
      const {existingIndex} = state.get('activeBubble')
      const {nucleus} = action
      if (existingIndex >= 0) {
        bubbles[existingIndex] = nucleus
      } else {
        bubbles.push(nucleus)
      }
      state = state.set('bubbles', bubbles)
      return state
        .set('visibleBubbles', getBubblesByDimension(state, nucleus.dimension))
        .set('lastPublishedBubble', nucleus)
    default:
      return state
  }
}

function getBubblesByDimension(state, dimension) {
  return state.get('bubbles').filter(b => (
    b.dimension.toLowerCase() === dimension.toLowerCase()
  ))
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

function getBuilderNucleus() {
  return {
    title: 'i am a cosmic title waiting to happen',
    subtitle: 'click! make me pretty',
    type: 'words',
  }
}
