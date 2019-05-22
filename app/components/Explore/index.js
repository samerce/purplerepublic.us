import React from 'react'
import {MDCTabBar} from '@material/tab-bar'
import Gallery from 'react-image-gallery'
import Business from '../bubble/bubbleItems/business'

import '@material/tab-bar/dist/mdc.tab-bar.css'
import '@material/tab-scroller/dist/mdc.tab-scroller.css'
import '@material/tab-indicator/dist/mdc.tab-indicator.css'
import '@material/tab/dist/mdc.tab.css'

import {
  Root, EntryButton, Background, CloseButton, ContentRoot,
  NavTextButton, NavParagraphRoot, TabBarTabText, TabBarRoot, TabButton,
  TabContentRoot, TabImage, TabDetailsRoot,
  TabHeader, TabHeaderImage, TabIntro, BubbleRowRoot, BubbleImage,
  BubbleRowContentRoot, BubbleRowTitle, BubbleRowActionsRoot, BubbleRowAction,
  BubbleJuice, DiveRoot, DiveText, DiveButton,
} from './styled'

import withTransitions from '../hocs/withTransitions'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {getButtonImageUrl} from '../../utils/bubbleverse'
import {openBubbleverse} from '../bubbleverse/actions'
import {
  toggleFutureTimeline
} from '../ThenNowWhen/actions'
import {addHashHandler} from '../../containers/App/actions'

import Tabs from './config'
import {SRC_URL, SCREEN_WIDTH_M} from '../../global/constants'

@connect(d => ({
  isVisible: d.get('timeline').get('futureTimelineVisible')
}))
@withTransitions({prefix: 'hire'})
export default class FutureTimeline extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0,
    }
  }

  componentDidMount() {
    this.tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'))
    window.addEventListener('MDCTabBar:activated', this.onTabActivated)

    this.props.dispatch(addHashHandler({
      trigger: '#start/explore',
      onEnter: this.toggle,
      onChange: () => {},
      onExit: this.toggle,
    }))
  }

  componentWillUnmount() {
    window.removeEventListener('MDCTabBar:activated', this.onTabActivated)
  }

  componentWillReceiveProps(nextProps) {
    const {isVisible, show, hide} = this.props
    if (nextProps.isVisible !== isVisible) {
      nextProps.isVisible? show() : hide()
    }
  }

  render() {
    return (
      <Root className={this.props.className}>
        {this.renderNavParagraph()}
        {this.renderTabBar()}
        {this.renderTabContent()}
      </Root>
    )
  }

  renderNavParagraph() {
    return (
      <NavParagraphRoot>
        {Tabs.map(this.renderNavText)}
      </NavParagraphRoot>
    )
  }

  @autobind
  renderNavText(tab, index) {
    return (
      <div key={index}>
        {tab.preText}
        <NavTextButton
          color={tab.color}
          className={(index === this.state.activeTabIndex) && 'active'}
          onClick={() => this.onClickNavTextButton(index)}>
          {tab.title}
        </NavTextButton>
        {tab.postText}
      </div>
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
      <TabButton key={i} className={'mdc-tab ' + classes} role="tab" ariaSelected="true" tabindex="0">
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
    const {image, renderIntro, bubbles} = Tabs[activeTabIndex]
    return (
      <TabContentRoot>
        <TabHeader>
          <TabIntro>
            {renderIntro()}
          </TabIntro>
          <TabHeaderImage src={SRC_URL + 'commons/' + image + '.jpg'} />
        </TabHeader>


        <TabDetailsRoot>
          {bubbles.map(this.renderBubbleRow)}
        </TabDetailsRoot>

        <DiveRoot>
          <DiveText>go deeper...</DiveText>
          <DiveButton onClick={this.onClickDive}>dive</DiveButton>
        </DiveRoot>
      </TabContentRoot>
    )
  }

  @autobind
  renderBubbleRow({image, title, status, render, actions, className = ''}, i) {
    return (
      <BubbleRowRoot key={i} className={className}>
        <BubbleImage src={SRC_URL + 'commons/' + image + '.jpg'} />

        <BubbleRowContentRoot>
          <BubbleRowTitle>
            <div>{title}</div>
            <div>{status}</div>
          </BubbleRowTitle>

          <BubbleJuice>{render()}</BubbleJuice>

          <BubbleRowActionsRoot>
            {actions.map((ba, j) => (
              <BubbleRowAction onClick={() => this.onClickBubbleRowAction(ba)} key={j}>
                {ba.text}
              </BubbleRowAction>
            ))}
          </BubbleRowActionsRoot>
        </BubbleRowContentRoot>
      </BubbleRowRoot>
    )
  }

  onClickBubbleRowAction(action) {
    action.onClick()

    ga('send', 'event', {
      eventCategory: 'explore',
      eventAction: 'bubble row action clicked',
      eventLabel: action.text,
    })
  }

  onClickNavTextButton(index) {
    this.tabBar.activateTab(index)
    this.tabBar.root_.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    })

    ga('send', 'event', {
      eventCategory: 'explore',
      eventAction: 'nav text button clicked',
      eventLabel: Tabs[index].title,
    })
  }

  @autobind
  onTabActivated(e) {
    this.setState({activeTabIndex: e.detail.index})
  }

  @autobind
  onClickDive() {
    const tab = Tabs[this.state.activeTabIndex]
    this.props.dispatch(openBubbleverse(tab.dimension))

    ga('send', 'event', {
      eventCategory: 'explore',
      eventAction: 'dive clicked',
      eventLabel: tab.title,
    })
  }

  @autobind
  toggle() {
    this.props.dispatch(toggleFutureTimeline())
  }

}

function renderTabContentText(text) {
  return (
    <div>
      {text}
    </div>
  )
}
