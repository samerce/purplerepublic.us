import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'

export const BubbleType = makeEnum([
  'gallery',
  'video',
  'writing',
  'shop',
  // 'music',
])

export const BubbleComponents = {}
Object.keys(BubbleType).forEach(type => {
  BubbleComponents[type] = require('./bubbleItems/' + type).default
})

export const BubbleButtonActions = {
  OpenLink: props => openInNewTab(props.url),
}

export const BubbleButtonActionList =
  Object.keys(BubbleButtonActions).reduce((list, k) => {
    list[k] = k
    return list
  }, {})
