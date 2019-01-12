import {makeEnum} from '../../utils/lang'

export const Mode = makeEnum([
  'ShowBubbleDetails',
  'ShowBubbleGrid',
  'BuildBubble',
])

export const Dimensions = {
  Business: {
    title: 'business',
    previewImages: ['senateWin', 'lampshade', 'takingUpCollection'],
  },
  Philosophy: {
    title: 'philosophy',
    previewImages: ['dragVote', 'proTip', 'dingell'],
  },
  Art: {
    title: 'art',
    previewImages: ['senateWin', 'jamaica', 'workAmerica']
  },
  Politics: {
    title: 'politics',
    previewImages: ['dragChurch', 'whatIsThis', 'purpleStump']
  },
  Play: {
    title: 'play',
    previewImages: ['equilibrium', 'lampshade', 'mission']
  },
  Film: {
    title: 'film',
    previewImages: ['godLovesFags', 'welcome', 'traderJoes']
  },
  Streets: {
    title: 'streets',
    previewImages: ['queen', 'washington', 'onTheIssues']
  },
}

export const DimensionTypes = makeEnum(Object.keys(Dimensions))

const BDBubbles = [
  'twinkle', 'jamaica', 'magic', 'beauty', 'queen',
  'buy-postcards',
]
