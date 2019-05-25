import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'
import {SCREEN_WIDTH_M, SCREEN_WIDTH_S, SRC_URL} from '../../global/constants'
import Generic from './content/Generic'
import Poetcards from './content/Poetcards'
import Business from './content/Business'
import UnicornSecret from './content/UnicornSecret'
import ArtSplash from './content/ArtSplash'

export const BubbleComponents = {
  Generic,
  Poetcards,
  Business,
  UnicornSecret,
  ArtSplash,
}
export const BubbleType = makeEnum(Object.keys(BubbleComponents))

const BubbleButtonTypes = [
  'patreon',
  'shop',
  'instagram',
  'poetcards',
]
export const BubbleButtonComponents = {}
BubbleButtonTypes.forEach(t => {
  BubbleButtonComponents[t] = require('./button/' + t).default
})

export const BubbleButtonActions = {
  OpenLink: props => openInNewTab(props.url),
  OrderPoetcards: props => {},
  OpenLinkInPlace: props => window.location = props.url,
}
export const BubbleButtonActionList =
  Object.keys(BubbleButtonActions).reduce((list, k) => {
    list[k] = k
    return list
  }, {})
