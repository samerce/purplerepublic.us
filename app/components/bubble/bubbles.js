import BubbleVideo from './bubbleItems/video'
import BubbleGallery from './bubbleItems/gallery'
import BubbleWriting from './bubbleItems/writing'

import {makeEnum} from '../../utils/lang'

import {SRC_URL} from '../../global/constants'
const PIC_SRC = SRC_URL + 'quark-art/mothers/'

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

// const bubbles = {
//   logo: {
//     className: 'bubbleButton-logo',
//     title: 'what is this anyway?',
//     subtitle: 'you may be asking',
//     size: 'medium',
//     type: BubbleType.logo,
//   },
//   shop: {
//     type: BubbleType.shop,
//     className: 'bubbleButton-shop-art',
//     title: 'isness with purpose',
//     subtitle: 'vive la revolution',
//     size: 'medium',
//   },
//   traderJoes: {
//     className: 'bubbleButton-traderJoes',
//     title: 'wig trader joe\'s!',
//     subtitle: 'little bird & bubbles',
//     size: 'xlarge',
//     videoId: 'rmXjuF1GLK0',
//     type: BubbleType.video,
//   },
//   equilibrium: {
//     className: 'bubbleButton-equilibrium',
//     title: 'equilibrium',
//     subtitle: 'an endless chase',
//     size: 'small',
//     videoId: 'RTmW_nTDuXk',
//     type: BubbleType.video,
//   },
//   whatIsThis: {
//     type: BubbleType.writing,
//     className: 'bubbleButton-whatIsThis',
//     title: 'what the hell is this, anyhow?',
//     subtitle: 'you may be wondering',
//     size: 'medium',
//     blogLink: 'https://medium.com/the-purple-republic/what-the-hell-is-this-anyhow-65700351727c',
//     teaserText: 'when contemplating the exact moment each of us shot out of our mother’s love canal & into this shared sensory world, we must ask ourselves: did we sprout from the same infinity (that may or may not exist outside of space-time as we’ve come to know it)?',
//   },
//   selfNotActor: {
//     className: 'bubbleButton-selfNotActor',
//     title: 'the self is not the actor',
//     subtitle: 'power is in focus',
//     size: 'medium',
//     videoId: 's2gGuBA_acg',
//     type: BubbleType.video,
//   },
//   mission: {
//     type: BubbleType.writing,
//     className: 'bubbleButton-mission',
//     title: 'mission',
//     subtitle: 'purple republic\'s',
//     size: 'large',
//     blogLink: 'https://medium.com/the-purple-republic/our-mission-42292958700d',
//     teaserText: 'can love go viral?<br /><br />from cabaret to congress — we’re here to unify the human race. to perpetually empower a collectively-cultivated conversation. to inspire women, minorities, and queer candidates to find leadership roles and support them on their journey.<br /><br />if not us, who? if not now, when?',
//   },
//   washington: {
//     className: 'bubbleButton-washington',
//     title: 'visit washington DC',
//     subtitle: 'little bird & bubbles',
//     size: 'medium',
//     videoId: 'GKvrUeSVnWQ',
//     type: BubbleType.video,
//   },
//   onTheIssues: {
//     type: BubbleType.writing,
//     className: 'bubbleButton-onTheIssues',
//     title: 'on the issues',
//     subtitle: 'a jumping off point',
//     size: 'small',
//     blogLink: 'https://medium.com/the-purple-republic/25-issue-overview-1f0ab2812036',
//     teaserText: 'life is exploration. we must be willing to continually edit our perspective. here are some jumping off points for dialogue. together we’ll create our platform.',
//   },
//   purpleStump: {
//     type: BubbleType.video,
//     className: 'bubbleButton-purpleStump',
//     title: 'purple stump',
//     subtitle: 'little bird presents',
//     size: 'xlarge',
//     videoId: 'ZPkcFPn_Eb8',
//   },
//   play: {
//     type: BubbleType.play,
//     className: 'bubbleButton-play',
//     title: 'wanna play?',
//     subtitle: 'hey there',
//     size: 'medium',
//   },
//   guns: {
//     className: 'bubbleButton-guns',
//     title: 'drugs, drag queens, guns, & corruption',
//     subtitle: 'little bird talks',
//     size: 'xlarge',
//     videoId: '89KE9NknQ8c',
//     type: BubbleType.video,
//   },
//   proTip: {
//     type: BubbleType.writing,
//     className: 'bubbleButton-proTip',
//     title: 'feeling like a million bucks',
//     subtitle: 'a pro tip',
//     size: 'small',
//     blogLink: 'https://medium.com/@purpleperson/pro-tip-to-feel-like-a-million-bucks-on-a-nickel-budget-98f6aa572dbd',
//     teaserText: 'go to the sexiest, swankiest most chic hotels and have a beer in their bar. it never gets old. i’ve done it hundreds of times. i’ll be on a road trip in australia',
//   },
//   toughQuestion: {
//     className: 'bubbleButton-toughQuestions',
//     title: 'handling the tough questions',
//     subtitle: 'little bird',
//     size: 'small',
//     videoId: 'OzH2G27qxhs',
//     type: BubbleType.video,
//   },
//   lampshade: {
//     className: 'bubbleButton-lampshade',
//     title: 'lampshade',
//     subtitle: 'our last project',
//     size: 'medium',
//     videoId: 'ljrsFO7VZro',
//     type: BubbleType.video,
//   },
//   takingUpCollection: {
//     className: 'bubbleButton-takingUpCollection',
//     title: 'taking up collection',
//     subtitle: 'always find myself',
//     size: 'small',
//     videoId: 'C59QSCVpSuY',
//     type: BubbleType.video,
//   },
//   dragVote: {
//     className: 'bubbleButton-dragVote',
//     title: 'would you vote for a drag queen?',
//     subtitle: 'we took to the streets asking',
//     size: 'medium',
//     videoId: '8xExiMisNsc',
//     type: BubbleType.video,
//   },
//   dingell: {
//     className: 'bubbleButton-dingell',
//     title: 'congresswoman dingell',
//     subtitle: 'a chat with',
//     size: 'small',
//     videoId: 'fnnR-9JmAjE',
//     type: BubbleType.video,
//   },
//   dragChurch: {
//     className: 'bubbleButton-dragChurch',
//     title: '(drag queen) church',
//     subtitle: 'take me to',
//     size: 'medium',
//     videoId: 'a9FHAUAqyDA',
//     type: BubbleType.video,
//   },
//   seeingGrace: {
//     className: 'bubbleButton-seeingGrace',
//     title: 'seeing grace',
//     subtitle: 'surrender to',
//     size: 'small',
//     videoId: 'S5LiwweHd1w',
//     type: BubbleType.video,
//   },
//   workAmerica: {
//     className: 'bubbleButton-workAmerica',
//     title: 'we\'ll work for you america',
//     subtitle: 'little bird talks',
//     size: 'small',
//     videoId: 'y_CX3yzMCF8',
//     type: BubbleType.video,
//   },
//   senatorWins: {
//     className: 'bubbleButton-senateWin',
//     title: 'drag queen wins senate seat!',
//     subtitle: 'surprise landslide victory',
//     size: 'xlarge',
//     videoId: '0iAe2JrH4ck',
//     type: BubbleType.video,
//   },
//   godLovesFags: {
//     className: 'bubbleButton-godLovesFags',
//     title: 'god loves fags',
//     subtitle: 'god is for everyone',
//     size: 'small',
//     videoId: '0kfwMU7HmzE',
//     type: BubbleType.video,
//   },
//   // gallery: {
//   //   type: BubbleType.gallery,
//   //   className: 'merman-gallery',
//   //   title: 'merman',
//   //   subtitle: 'little bird finds',
//   //   size: 'medium',
//   //   images: [
//   //     {
//   //       src: PIC_SRC + 'bust-me-open.jpg',
//   //       thumbnail: PIC_SRC + 'bust-me-open.jpg',
//   //       thumbnailWidth: 264,
//   //       thumbnailHeight: 220,
//   //       caption: 'bust me open!',
//   //     },
//   //     {
//   //       src: PIC_SRC + 'carrying-the-weight.jpg',
//   //       thumbnail: PIC_SRC + 'carrying-the-weight.jpg',
//   //       thumbnailWidth: 264,
//   //       thumbnailHeight: 220,
//   //     },
//   //     {
//   //       src: PIC_SRC + 'curious-nebulae.jpg',
//   //       thumbnail: PIC_SRC + 'curious-nebulae.jpg',
//   //       thumbnailWidth: 264,
//   //       thumbnailHeight: 220,
//   //     },
//   //   ],
//   // },
// }
//
