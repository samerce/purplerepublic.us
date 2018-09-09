import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'
import {SCREEN_WIDTH_M, SCREEN_WIDTH_S, SRC_URL} from '../../global/constants'

export const BubbleType = makeEnum([
  'gallery',
  'video',
  'words',
  'poetcards',
  // 'music',
])

export const BubbleComponents = {}
Object.keys(BubbleType).forEach(type => {
  BubbleComponents[type] = require('./bubbleItems/' + type).default
})
BubbleComponents.writing = BubbleComponents.words

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
}

export const BubbleButtonActionList =
  Object.keys(BubbleButtonActions).reduce((list, k) => {
    list[k] = k
    return list
  }, {})

export const HeroBubbleConfig = {
  shopArt: {
    width: 540,
  },
  instagram: {
    width: 540,
  },
  patreon: {
    width: (window.innerWidth <= SCREEN_WIDTH_S)? 240 :
      (window.innerWidth <= SCREEN_WIDTH_M)? 320 : 540,
    leftSide: true,
    gratitude: [
      {
        text: 'blowing unicorn kisses to carl!',
        image: {
          src: SRC_URL + 'bubbles/buttonImages/postcards.jpg',
          width: 71.28,
        },
      },
      {
        text: 'jewnicorn dave and his mustachioed carrot!',
        image: {
          src: SRC_URL + 'bubbles/patreon/dave-carrot.jpg',
          width: 122,
        },
      },
    ]
  }
}
Object.keys(HeroBubbleConfig).forEach(bid => {
  HeroBubbleConfig[bid].Component = require('./hero/' + bid).default
})

export const Poetcards = [
  'front v2 tiny',
  'dreams of lucy',
  'and go',
  'sunrise folly',
  'unicorn-merman',
  'moby\'s dick',
  'nola porch',
  'dorothy',
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
  'always eat forbidden',
  'cosmic diversity',
  'dali dreams',
  'ideals',
  'wrong more',
  'dressin pretty',
  'recycle fucker',
]
