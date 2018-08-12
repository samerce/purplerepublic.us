import {SRC_URL} from '../../global/constants'

export function getButtonImageUrl(id) {
  return SRC_URL + `bubbles/buttonImages/${id}.jpg`
}

export function getFacebookUrl(bubbleId) {
  return window.location.origin + '/?_escaped_fragment_=start/bubble/' + bubbleId
}
