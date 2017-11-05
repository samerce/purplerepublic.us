import {fromJS} from 'immutable'
import {SELECT_NEW_QUARK_MOTHER} from './actions'
import quarkMothers from './quarkMothers'

const BASE_IMAGE_URL = 'https://s3.amazonaws.com/purplerepublic/quark-art-mothers/'
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
    default:
      return state
  }
}

function selectNewQuarkMother(state) {
  const imageIndex = getMotherImageIndex()
  state.set('motherImageIndex', imageIndex)
  state.set('motherMultipleChoiceOptions', getMultipleChoiceOptions(imageIndex))
  state.set('themeColor', getThemeColor(imageIndex))
  return state.set('motherImageUrl', getQuarkImageUrl(imageIndex))
}

function getMotherImageIndex() {
  return Math.round(Math.random() * (quarkMothers.length - 1))
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
