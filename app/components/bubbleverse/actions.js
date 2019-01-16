export const BubbleverseOpen = 'bubbleverse.open'
export const BubbleverseClose = 'bubbleverse.close'
export const BubbleverseSetActiveBubble = 'bubbleverse.setActiveBubble'
export const BubbleverseSetBubbles = 'bubbleverse.setBubbles'
export const BubbleverseGoToNextBubble = 'bubbleverse.goToNextBubble'
export const BubbleverseGoToPrevBubble = 'bubbleverse.goToPrevBubble'
export const BubbleverseToggleFullscreenBubbleGrid = 'bubbleverse.toggleFullscreenBubbleGrid'
export const BubbleverseBubbleBuilderOpen = 'bubbleverse.bubbleBuilder.open'
export const BubbleverseBubbleBuilderClose = 'bubbleverse.bubbleBuilder.close'
export const BubbleverseBubbleBuilderUpdateNucleus = 'bubbleverse.bubbleBuilder.updateNucleus'
export const BubbleverseBubbleBuilderDidPublish = 'bubbleverse.bubbleBuilder.didPublish'

export function openBubbleverse(dimension, mouseLocation) {
  return {
    dimension,
    mouseLocation,
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

export function openBubbleBuilder(shouldEditActiveBubble) {
  return {
    type: BubbleverseBubbleBuilderOpen,
    shouldEditActiveBubble,
  }
}

export function closeBubbleBuilder() {
  return {
    type: BubbleverseBubbleBuilderClose,
  }
}

export function updateBuilderNucleus(nucleus) {
  return {
    type: BubbleverseBubbleBuilderUpdateNucleus,
    nucleus,
  }
}

export function didPublishBubble(nucleus) {
  return {
    type: BubbleverseBubbleBuilderDidPublish,
    nucleus,
  }
}
