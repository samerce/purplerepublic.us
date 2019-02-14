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

import {SRC_URL, SCREEN_WIDTH_M} from '../../global/constants'
import {DimensionTypes} from '../bubbleverse/config'

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
      <div>
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
  renderBubbleRow({image, title, status, render, actions}, i) {
    return (
      <BubbleRowRoot key={i} className={status === 'needs funding' && 'emphasis'}>
        <BubbleImage src={SRC_URL + 'commons/' + image + '.jpg'} />

        <BubbleRowContentRoot>
          <BubbleRowTitle>
            <div>{title}</div>
            <div>{status}</div>
          </BubbleRowTitle>

          <BubbleJuice>{render()}</BubbleJuice>

          <BubbleRowActionsRoot>
            {actions.map((ba, j) => (
              <BubbleRowAction onClick={ba.onClick} key={j}>
                {ba.text}
              </BubbleRowAction>
            ))}
          </BubbleRowActionsRoot>
        </BubbleRowContentRoot>
      </BubbleRowRoot>
    )
  }

  onClickNavTextButton(index) {
    this.tabBar.activateTab(index)
    this.tabBar.root_.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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
  }

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
    title: 'art',
    color: 'myrtle',
    dimension: DimensionTypes.Art,
    image: 'unicorn',
    preText: 'the only thing that touches the soul is',
    postText: (window.innerWidth <= SCREEN_WIDTH_M)? '' : '.',
    renderIntro: () => (
      <div>
        <p>we are all perfect. we are all artists.</p>
        <p>when you trust yourself enough to <i>express your mess</i>, your soul blossoms and the world swoons.</p>
        <p><i>art</i> is our direct line to source—and to <i>each other</i>.<br/>
          join us in making art <strong><i>the</i></strong> <i>reason</i> we collect ourselves into this thing called <span>civilization</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'collections',
        status: 'in progress',
        render: () => (
          <div>
            <p>our days are consumed with art: drag, poetry, books, photography, painting, dance, music, performance.</p>
            <p>here you'll find curated collections of our latest favorite works.</p>
          </div>
        ),
        image: 'shop-art',
        actions: [
          {
            text: 'join mailing list',
            onClick: () => {},
          },
          {
            text: 'view collections',
            onClick: () => {},
          },
        ],
      },
      {
        title: 'sacred gutter',
        status: 'in progress',
        render: () => (
          <div>
            <p>your favorite little bird takes to youtube!</p>
            <p>get a bi-weekly dose of the T, hennie. little bird takes you on a 9-minute journey on tuesdays and fridays. from drag to politics to philosophy and everywhere in between.</p>
            <p>coming february 2019.</p>
          </div>
        ),
        image: 'what-is-this',
        actions: [
          {
            text: 'learn more',
            onClick: () => {},
          },
          {
            text: 'subscribe',
            onClick: () => {},
          },
        ],
      },
      {
        title: 'prosapography',
        status: 'in progress',
        render: () => (
          <div>
            <p>the book that defines an age.</p>
            <p>a queer perspective in an excessively straight-laced, needlessly masculine world. this is the magnum opus. our bible. read it to see how and why we do what we do.</p>
            <p>coming february 2019.</p>
          </div>
        ),
        image: 'shop-art',
        actions: [
          {
            text: 'join mailing list',
            onClick: () => {},
          },
          {
            text: 'learn more',
            onClick: () => {},
          },
        ],
      },
    ],
  },
  {
    title: 'movement',
    color: 'flik',
    dimension: DimensionTypes.Movement,
    image: 'action',
    preText: ((window.innerWidth <= SCREEN_WIDTH_M)? '...' : '') + 'paired with organized',
    postText: 'you\'ll touch millions.',
    renderIntro: () => (
      <div>
        <p>we are given the gift of life, unasked. these waking moments are only process.</p>
        <p>breathe into the inescapable biological fact of movement and create the action that builds your ideal world. perhaps we can build one together?</p>
        <p>join us in creating action to <i>empower women, people of color, queers, and all minorities</i> to land <strong>leadership roles</strong> in our society and direct the course of our <span>collective evolution</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'faerie brigade',
        status: 'needs funding',
        render: () => (
          <div>
            <p>bringing joy to the streets!</p>
            <p>faerie brigades are groups all across the nation tasked with donning silly costumes, getting gorgeous and taking to the streets to spread music, love, wackiness and community.</p>
            <p>the brigades' walks are themed: from picking up trash, to serenading strangers, to free hugs, to flash mobs.</p>
          </div>
        ),
        image: 'unicorn',
        actions: [
          {
            text: 'learn more',
            onClick: () => {},
          },
          {
            text: 'donate',
            onClick: () => {},
          },
        ],
      },
    ],
  },
  {
    title: 'space',
    color: 'tweet',
    dimension: DimensionTypes.Space,
    image: 'lampshade tiny',
    preText: 'create',
    postText: 'for that duo to grow infinitely, and you\'ll change the world.',
    renderIntro: () => (
      <div>
        <p>we are each a plant. and we need space to grow.</p>
        <p>environment is an acutely important part of building new habits that break us out of sticky ruts.</p>
        <p>join us in building <i>expansive, gorgeous, celebration spaces</i> across the globe. places that offer room to breathe into your mess, to express your art, and to find your action—the perfect fusion of <span>community meet commodity</span>.</p>
      </div>
    ),
    bubbles: [
      {
        title: 'lampshade',
        status: 'completed',
        render: () => (
          <div>
            <p>lampshade was a brick & mortar space in ypsilanti, michigan</p>
            <p>the first space we built to fuse community & commodity was a massive success. named best coffee shop in the city only two months after opening, lampshade offered space to anyone and everyone looking for a place to just be and explore what it means to be alive, without the fear of ridicule, without the fear of rejection.</p>
          </div>
        ),
        image: 'unicorn',
        actions: [
          {
            text: 'see the blog',
            onClick: () => {},
          },
          {
            text: 'watch the video',
            onClick: () => {},
          },
        ],
      },
    ],
  },
]
