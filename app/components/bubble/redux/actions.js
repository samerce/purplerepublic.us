export const SetActiveGratitude = 'patreon.setActiveGratitude'
export const SetActivePostIndex = 'instagram.SetActivePostIndex'
export const SetPosts = 'instagram.SetPosts'
export const OnClickBubbleAction = 'details.OnClickBubbleAction'
export const TogglePoetcardCheckout = 'poetcard.checkout.willOpen'

export function setActiveGratitude(activeGratitude) {
  return {
    type: SetActiveGratitude,
    activeGratitude,
  }
}

export function setActiveInstagramPostIndex(activePostIndex) {
  return {
    type: SetActivePostIndex,
    activePostIndex,
  }
}

export function setInstagramPosts(posts) {
  return {
    type: SetPosts,
    posts,
  }
}

export function onClickBubbleAction(bubbleId, action) {
  return {
    type: OnClickBubbleAction,
    bubbleId,
    action,
  }
}

export function togglePoetcardCheckout() {
  return {
    type: TogglePoetcardCheckout,
  }
}
