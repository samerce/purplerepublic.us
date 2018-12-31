export const BubbleverseOpen = 'bubbleverse.open'
export const BubbleverseClose = 'bubbleverse.close'
export const BubbleverseSetActiveBubble = 'bubbleverse.setActiveBubble'
export const BubbleverseSetBubbles = 'bubbleverse.setBubbles'
export const BubbleverseGoToNextBubble = 'bubbleverse.goToNextBubble'
export const BubbleverseGoToPrevBubble = 'bubbleverse.goToPrevBubble'
export const BubbleverseToggleFullscreenBubbleGrid = 'bubbleverse.toggleFullscreenBubbleGrid'

export function openBubbleverse(dimension) {
  return {
    dimension,
    type: BubbleverseOpen,
  }
}

export function closeBubbleverse() {
  return {
    type: BubbleverseClose,
  }
}

export function setActiveBubble(nucleus) {
  return {
    nucleus,
    type: BubbleverseSetActiveBubble,
  }
}

export function setBubbles(bubbles) {
  return {
    bubbles,
    type: BubbleverseSetBubbles,
  }
}

export function goToNextBubble() {
  return {
    type: BubbleverseGoToNextBubble,
  }
}

export function goToPrevBubble() {
  return {
    type: BubbleverseGoToPrevBubble,
  }
}

export function toggleFullscreenBubbleGrid() {
  return {
    type: BubbleverseToggleFullscreenBubbleGrid,
  }
}
