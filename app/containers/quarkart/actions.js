export const SELECT_NEW_QUARK_MOTHER = 'quarkArt.selectNewQuarkMother'
export const SET_QUARK_MOTHER_IMAGE_INDEX = 'quarkArt.setQuarkMotherImageIndex'

export function selectNewQuarkMother() {
  return {
    type: SELECT_NEW_QUARK_MOTHER,
  }
}

export function setQuarkMotherImageIndex(index) {
  return {
    type: SET_QUARK_MOTHER_IMAGE_INDEX,
    motherImageIndex: index,
  }
}
