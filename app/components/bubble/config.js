import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'

export const BubbleType = makeEnum([
  'gallery',
  'video',
  'words',
  'shop',
  // 'music',
])

export const BubbleComponents = {}
Object.keys(BubbleType).forEach(type => {
  BubbleComponents[type] = require('./bubbleItems/' + type).default
})
BubbleComponents.writing = BubbleComponents.words

export const BubbleButtonActions = {
  OpenLink: props => openInNewTab(props.url),
}

export const BubbleButtonActionList =
  Object.keys(BubbleButtonActions).reduce((list, k) => {
    list[k] = k
    return list
  }, {})

export const HeroBubbleConfig = {
  shopArt: {
    width: 540,
  }
}
Object.keys(HeroBubbleConfig).forEach(bid => {
  HeroBubbleConfig[bid].Component = require('./hero/' + bid).default
})
