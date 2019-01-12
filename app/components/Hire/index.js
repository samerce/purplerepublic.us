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
          {this.renderNavParagraph()}
          {this.renderTabBar()}
          {this.renderTabContent()}
        </ContentRoot>
      </Root>
    )
  }

  renderNavParagraph() {
    return (
      <NavParagraphRoot>
        we like to
        {this.renderNavTextButton(0)}
        . we like to
        {this.renderNavTextButton(1)}
        even more. we vacation from concepts to
        {this.renderNavTextButton(2)}
        . and to the highest bidder we
        {this.renderNavTextButton(3)}
        our souls. we take every chance to
        {this.renderNavTextButton(4)}
        . because life is about your ability to
        {this.renderNavTextButton(5)}
        . our goal is to
        {this.renderNavTextButton(6)}
        a new paradise—join us!
      </NavParagraphRoot>
    )
  }

  renderNavTextButton(index) {
    return (
      <NavTextButton
        className={(index === this.state.activeTabIndex) && 'active'}
        onClick={() => this.setTab(index)}>
        {Tabs[index].title}
      </NavTextButton>
    )
  }

  renderTabBar() {
    return (
      <TabBarRoot className="mdc-tab-bar" role="tablist">
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area">
            <div className="mdc-tab-scroller__scroll-content">
              {Tabs.map(this.renderTab)}
            </div>
          </div>
        </div>
      </TabBarRoot>
    )
  }

  @autobind
  renderTab(tab, i) {
    const {activeTabIndex} = this.state
    const classes = (activeTabIndex === i)? 'mdc-tab--active' : ''
    return (
      <TabButton className={'mdc-tab ' + classes} role="tab" ariaSelected="true" tabindex="0">
        <span className="mdc-tab__content">
          <TabBarTabText className="mdc-tab__text-label">{tab.title}</TabBarTabText>
        </span>
        <span className="mdc-tab-indicator">
          <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
        </span>
        <span className="mdc-tab__ripple"></span>
      </TabButton>
    )
  }

  renderTabContent() {
    const {activeTabIndex} = this.state
    const {images, render} = Tabs[activeTabIndex]
    return (
      <TabContentRoot>
        <Gallery
          ref={r => this.gallery = r}
          onClick={this.onClickGalleryImage}
          lazyLoad={true}
          showPlayButton={false}
          showIndex={images.length > 1}
          showThumbnails={false}
          showNav={images.length > 1}
          swipeThreshold={5}
          flickThreshold={.1}
          slideInterval={1000}
          stopPropagation={true}
          useBrowserFullscreen={false}
          items={getGalleryImages(images)} />
        <GalleryOverlay />

        <TabDetailsRoot>
          {render()}
        </TabDetailsRoot>
      </TabContentRoot>
    )
  }

  setTab(index) {
    this.tabBar.activateTab(index)
  }

  @autobind
  onTabActivated(e) {
    this.setState({activeTabIndex: e.detail.index})
  }

  @autobind
  onClickGalleryImage() {
    const imageIndex = this.gallery.getCurrentIndex()
    const image = Tabs[this.state.activeTabIndex].images[imageIndex]
    image.onClick()
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
    render: () => renderTabContentText('We have the big ideas. Schedule time to have us help you grow your idea-seeds into an orchard of fruit-filled trees.'),
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
    title: 'celebrate',
    images: [getButtonImageUrl('goo'),],
    render: () => renderTabContentText('If you wanna celebrate, we can throw you a party, hennie.'),
  },
  {
    title: 'transform',
    images: [getButtonImageUrl('stare-off-into-space'),],
    render: () => renderTabContentText('We specialize in transformation. From business culture, to classrooms, to your own bedroom.'),
  },
  {
    title: 'develop',
    images: [getButtonImageUrl('the-faces'),],
    render: () => renderTabContentText('Got an incredible idea that will push us into a more mindful future? Let\'s work together! We can help you develop and produce your next big project.')
  },
]
