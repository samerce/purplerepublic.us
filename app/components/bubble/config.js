import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'
import {SCREEN_WIDTH_M, SCREEN_WIDTH_S, SRC_URL} from '../../global/constants'

export const BubbleType = makeEnum([
  'poetcards',
  'business',
])
export const BubbleComponents = {}
Object.keys(BubbleType).forEach(type => {
  BubbleComponents[type] = require('./bubbleItems/' + type).default
})
BubbleComponents.UnicornBubble = require('../UnicornBubble').default

const BubbleButtonTypes = [
  'patreon',
  'shop',
  'instagram',
  'poetcards',
]
export const BubbleButtonComponents = {}
BubbleButtonTypes.forEach(t => {
  BubbleButtonComponents[t] = require('./bubbleButton/' + t).default
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

export const Poetcards = [
  'front v2 tiny',
  'moby\'s dick',
  'and go',
  'sunrise folly',
  'unicorn-merman',
  'nola porch',
  'dorothy',
  'dreams of lucy',
  'camus cabaret',
  'arctic cries',
  'liberate yourself',
  'the flight home',
  'igbok',
  'ice cream poop',
  'eat less meat',
  'now_',
  'be your own therapy',
  'open minds v2',
  'amy',
  'prance',
  'train hoppin charlie',
  'dreams require teams',
  'b&w merman',
  'silence',
  'be',
  'dali dreams v2',
  'queer',
  'beautifully lost',
  'copacetic chaos',
  'birth is your permission',
  'di-no',
  'cosmic diversity v2',
  'diamonds',
  'submerged explorations',
  'death breath',
  'hearing voices',
  'jesus thorns',
  '1000 colors',
  'heart on fire',
  'beyond dogma',
  'use your brain',
  'fascists reign',
  'jimmy',
  'floor',
  'roark',
  'rose quartz',
  'recycle fucker',
  'always eat forbidden',
  'wrong more',
  'cosmic diversity',
  'dali dreams',
  // 'ideals',
  'dressin pretty',
]
