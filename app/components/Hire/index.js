import React from 'react'
import {MDCTabBar} from '@material/tab-bar'
import Business from '../bubble/bubbleItems/business'
import Gallery from 'react-image-gallery'

import '@material/tab-bar/dist/mdc.tab-bar.css'
import '@material/tab-scroller/dist/mdc.tab-scroller.css'
import '@material/tab-indicator/dist/mdc.tab-indicator.css'
import '@material/tab/dist/mdc.tab.css'

import {
  Root, EntryButton, Background, CloseButton, ContentRoot,
  NavTextButton, NavParagraphRoot, TabBarTabText, TabBarRoot, TabButton,
  TabContentRoot, TabImage, TabDetailsRoot, GalleryOverlay,
} from './styled'

import withTransitions from '../hocs/withTransitions'
import autobind from 'autobind-decorator'
import {getButtonImageUrl} from '../../utils/bubbleverse'

@withTransitions({prefix: 'hire'})
export default class Hire extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0,
    }
  }

  componentDidMount() {
    this.tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'))
    window.addEventListener('MDCTabBar:activated', this.onTabActivated)
  }

  componentWillUnmount() {
    window.removeEventListener('MDCTabBar:activated', this.onTabActivated)
  }

  render() {
    const {show, hide, className} = this.props
    return (
      <Root className={className}>
        <Background leftCorner />
        <EntryButton onClick={() => show()}>
          <i className='fa fa-coffee' />
          <span>hire us</span>
        </EntryButton>
        <CloseButton onClick={() => hide()}>
          <i className='fa fa-close' />
        </CloseButton>

        <ContentRoot>

        </ContentRoot>
      </Root>
    )
  }



}

function getGalleryImages(imagesRaw) {
  const images = []
  imagesRaw.forEach(img => {
    images.push({
      original: img.src,
      thumbnail: img.src,
      description: img.caption,
    })
  })
  return images
}

function renderTabContentText(text) {
  return (
    <div>
      {text}
    </div>
  )
}

var Tabs = [
  {
    title: 'talk',
    images: [
      {
        src: getButtonImageUrl('washington'),
        caption: 'a chat with the big wigs in washington',
        onClick: () => window.location = '/#start/bubble/washington'
      },
      {
        src: getButtonImageUrl('wannaPlay'),
        caption: 'a message of transformation',
        onClick: () => window.location = '/#start/bubble/wannaPlay'
      }
    ],
    render: () => renderTabContentText('Book us for a talk. From politics to philosophy to drag to education, we\'ll give you something completely new to think about.'),
  },
  {
    title: 'think',
    images: [
      {
        src: getButtonImageUrl('selfNotActor'),
        caption: 'multi-million dollar startup',
        onClick: () => window.location = '/#start/bubble/selfNotActor'
      },
    ],
    render: () => renderTabContentText('We have the big ideas. Schedule time to have us help you grow your idea-seeds into an orchard of fruit-filled trees. Got an incredible idea that will push us into a more mindful future? Let\'s work together! We can help you develop and produce your next big project.'),
  },
  {
    title: 'create',
    images: [getButtonImageUrl('purpleStump'),],
    render: () => renderTabContentText('Need something made? We take commissions for painting and photography, plus we offer basic website design & programming.'),
  },
  {
    title: 'sell',
    images: [getButtonImageUrl('whatIsThis'),],
    render: () => <Business />,
  },
  {
    title: 'transform',
    images: [getButtonImageUrl('stare-off-into-space'),],
    render: () => renderTabContentText('We specialize in transformation. From business culture, to classrooms, to your own bedroom.'),
  },
  {
    title: 'celebrate',
    images: [getButtonImageUrl('goo'),],
    render: () => renderTabContentText('If you wanna celebrate, we can throw you a party, hennie.'),
  },
]
