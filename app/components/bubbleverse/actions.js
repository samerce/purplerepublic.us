export const OpenBubbleverse = 'bubbleverse.open'
export const CloseBubbleverse = 'bubbleverse.close'

export function openBubbleverse(dimension) {
  return {
    dimension,
    type: OpenBubbleverse,
  }
}

export function closeBubbleverse() {
  return {
    type: CloseBubbleverse,
  }
}
