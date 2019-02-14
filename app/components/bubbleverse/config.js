import {makeEnum} from '../../utils/lang'

export const Mode = makeEnum([
  'ShowBubbleDetails',
  'ShowBubbleGrid',
  'BuildBubble',
])

export const Dimensions = {
  Art: {
    title: 'art',
    previewImages: ['senateWin', 'jamaica', 'workAmerica']
  },
  Movement: {
    title: 'movement',
    previewImages: ['dragVote', 'proTip', 'dingell'],
  },
  Space: {
    title: 'space',
    previewImages: ['senateWin', 'lampshade', 'takingUpCollection'],
  },
}

export const DimensionTypes = makeEnum(Object.keys(Dimensions))

const BDBubbles = [
  'twinkle', 'jamaica', 'magic', 'beauty', 'queen',
  'buy-postcards',
]
