export const SetActiveGratitude = 'patreon.setActiveGratitude'
export const SetActivePostIndex = 'instagram.SetActivePostIndex'
export const SetPosts = 'instagram.SetPosts'

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
