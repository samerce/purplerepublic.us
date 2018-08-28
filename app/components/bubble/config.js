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
  'moby\'s dick',
  'igbok',
  'sunrise folly',
  'unicorn-merman',
  'amy',
  'camus cabaret',
  'be',
  'jimmy',
  'the flight home',
  'liberate yourself',
  'train hoppin charlie',
  'nola porch',
  'dorothy',
  'b&w merman',
  'open minds v2',
  'queer',
  'submerged explorations v2',
  'di-no',
  'copacetic chaos',
  'dali dreams v2',
  'cosmic diversity v2',
  'jesus thorns',
  'floor',
  '1000 colors',
  'roark',
  'rose quartz',
  'always eat forbidden',
]
