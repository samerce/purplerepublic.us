import {
  SRC_URL, GalleryBaseUrl
} from '../global/constants'

export function pcUrl(id) {
  return SRC_URL + 'poetcards/' + id + '.jpg'
}

export function galleryImageUrl(bubbleId, imageId) {
  return GalleryBaseUrl + bubbleId + `/${imageId}.jpg`
}
