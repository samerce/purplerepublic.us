import BubbleVideo from './bubbleItems/video'
import BubbleGallery from './bubbleItems/gallery'

import {SRC_URL} from '../../global/constants'
const PIC_SRC = SRC_URL + 'quark-art/mothers/'

export default {
  logo: require('./bubbleItems/logo'),
  traderJoes: new BubbleVideo({
    className: 'bubbleButton-traderJoes',
    title: 'wig trader joe\'s!',
    subtitle: 'little bird & bubbles',
    size: 'xlarge',
    videoId: 'rmXjuF1GLK0',
  }),
  equilibrium: new BubbleVideo({
    className: 'bubbleButton-equilibrium',
    title: 'equilibrium',
    subtitle: 'an endless chase',
    size: 'small',
    videoId: 'RTmW_nTDuXk',
  }),
  selfNotActor: new BubbleVideo({
    className: 'bubbleButton-selfNotActor',
    title: 'the self is not the actor',
    subtitle: 'power is in focus',
    size: 'medium',
    videoId: 's2gGuBA_acg',
  }),
  mission: require('./bubbleItems/mission'),
  washington: new BubbleVideo({
    className: 'bubbleButton-washington',
    title: 'visit washington DC',
    subtitle: 'little bird & bubbles',
    size: 'medium',
    videoId: 'GKvrUeSVnWQ',
  }),
  purpleStump: new BubbleVideo({
    className: 'bubbleButton-purpleStump',
    title: 'purple stump',
    subtitle: 'little bird presents',
    size: 'xlarge',
    videoId: 'ZPkcFPn_Eb8',
  }),
  play: require('./bubbleItems/play'),
  guns: new BubbleVideo({
    className: 'bubbleButton-guns',
    title: 'drugs, drag queens, guns, & corruption',
    subtitle: 'little bird talks',
    size: 'xlarge',
    videoId: '89KE9NknQ8c',
  }),
  toughQuestion: new BubbleVideo({
    className: 'bubbleButton-toughQuestions',
    title: 'handling the tough questions',
    subtitle: 'little bird',
    size: 'small',
    videoId: 'OzH2G27qxhs',
  }),
  lampshade: new BubbleVideo({
    className: 'bubbleButton-lampshade',
    title: 'lampshade',
    subtitle: 'our last project',
    size: 'medium',
    videoId: 'ljrsFO7VZro',
  }),
  takingUpCollection: new BubbleVideo({
    className: 'bubbleButton-takingUpCollection',
    title: 'taking up collection',
    subtitle: 'always find myself',
    size: 'small',
    videoId: 'C59QSCVpSuY',
  }),
  dragVote: new BubbleVideo({
    className: 'bubbleButton-dragVote',
    title: 'would you vote for a drag queen?',
    subtitle: 'we took to the streets asking',
    size: 'medium',
    videoId: '8xExiMisNsc',
  }),
  dingell: new BubbleVideo({
    className: 'bubbleButton-dingell',
    title: 'congresswoman dingell',
    subtitle: 'a chat with',
    size: 'small',
    videoId: 'fnnR-9JmAjE',
  }),
  dragChurch: new BubbleVideo({
    className: 'bubbleButton-dragChurch',
    title: '(drag queen) church',
    subtitle: 'take me to',
    size: 'medium',
    videoId: 'a9FHAUAqyDA',
  }),
  seeingGrace: new BubbleVideo({
    className: 'bubbleButton-seeingGrace',
    title: 'seeing grace',
    subtitle: 'surrender to',
    size: 'small',
    videoId: 'S5LiwweHd1w',
  }),
  workAmerica: new BubbleVideo({
    className: 'bubbleButton-workAmerica',
    title: 'we\'ll work for you america',
    subtitle: 'little bird talks',
    size: 'small',
    videoId: 'y_CX3yzMCF8',
  }),
  senatorWins: new BubbleVideo({
    className: 'bubbleButton-senateWin',
    title: 'drag queen wins senate seat!',
    subtitle: 'surprise landslide victory',
    size: 'xlarge',
    videoId: '0iAe2JrH4ck',
  }),
  godLovesFags: new BubbleVideo({
    className: 'bubbleButton-godLovesFags',
    title: 'god loves fags',
    subtitle: 'god is for everyone',
    size: 'small',
    videoId: '0kfwMU7HmzE',
  }),
  gallery: new BubbleGallery({
    className: 'merman-gallery',
    title: 'merman',
    subtitle: 'little bird finds',
    size: 'medium',
    images: [
      {
        src: PIC_SRC + 'bust-me-open.jpg',
        thumbnail: PIC_SRC + 'bust-me-open.jpg',
        thumbnailWidth: 264,
        thumbnailHeight: 220,
        caption: 'bust me open!',
      },
      {
        src: PIC_SRC + 'carrying-the-weight.jpg',
        thumbnail: PIC_SRC + 'carrying-the-weight.jpg',
        thumbnailWidth: 264,
        thumbnailHeight: 220,
      },
      {
        src: PIC_SRC + 'curious-nebulae.jpg',
        thumbnail: PIC_SRC + 'curious-nebulae.jpg',
        thumbnailWidth: 264,
        thumbnailHeight: 220,
      },
    ],
  })
}
