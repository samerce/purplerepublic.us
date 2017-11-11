import {fromJS} from 'immutable'
import {SELECT_NEW_QUARK_MOTHER, SET_QUARK_MOTHER_IMAGE_INDEX} from './actions'
import quarkMothers from '../../utils/quarkart/quarkMothers'
import {getMotherImageIndex} from '../../utils/quarkart'
import {SRC_URL} from '../../global/constants'

const BASE_IMAGE_URL = SRC_URL + 'quark-art/mothers/'
const initialImageIndex = getMotherImageIndex()
const initialState = fromJS({
  motherImageIndex: initialImageIndex,
  motherImageUrl: getQuarkImageUrl(initialImageIndex),
  motherMultipleChoiceOptions: getMultipleChoiceOptions(initialImageIndex),
  themeColor: getThemeColor(initialImageIndex),
})

export default function quarkArtReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_NEW_QUARK_MOTHER:
      return selectNewQuarkMother(state)
    case SET_QUARK_MOTHER_IMAGE_INDEX:
      return setQuarkMother(action.motherImageIndex, state)
    default:
      return state
  }
}

function selectNewQuarkMother(state) {
  const imageIndex = getMotherImageIndex()
  return setQuarkMother(imageIndex, state)
}

function setQuarkMother(imageIndex, state) {
  state.set('motherImageIndex', imageIndex)
  state.set('motherMultipleChoiceOptions', getMultipleChoiceOptions(imageIndex))
  state.set('themeColor', getThemeColor(imageIndex))
  return state.set('motherImageUrl', getQuarkImageUrl(imageIndex))
}

function getQuarkImageUrl(imageIndex) {
  const name = quarkMothers[imageIndex].name.split(' ').join('+')
  return BASE_IMAGE_URL + name + '.jpg'
}

function getMultipleChoiceOptions(imageIndex) {
  return quarkMothers[imageIndex].multipleChoiceOptions
}

function getThemeColor(imageIndex) {
  return quarkMothers[imageIndex].color
}
