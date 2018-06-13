import React from 'react'
import {findDOMNode} from 'react-dom'
import PayPalLink from '../../components/payPalLink'
import Backdrop from './backdrop'

import styled from 'styled-components'
import {
  Root,
  SocialRoot, SocialButtonsRoot, SocialIcon,
  BubbleGrid, BubbleGridItem,
} from './styled'
import Bubble from '../../components/bubble'
import LogoBubble from '../../components/logoBubble'

import {cx} from '../../utils/style'
import {makeEnum} from '../../utils/lang'
import {SRC_URL} from '../../global/constants'
import bubbles from '../../components/bubble/bubbles'

import SineWaves from 'sine-waves'
import {Motion, spring} from 'react-motion'
import autobind from 'autobind-decorator'

const ICON_URL = SRC_URL + 'icons/'
const bubbleKeys = Object.keys(bubbles)

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`
const getStarPos = () => `-${getRandInt(60) + 20}px`

const Mode = makeEnum([
  'enter',
  'intro',
  'loadBubbles',
  'show',
])

export default class Start extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.bubbles = []
    this.focusedBubble = null
    this.state = {
      mode: Mode.enter,
      collapsed: false,
      hovered: false,
      infoHover: false,
      isFullscreen: false,
    }
  }

  componentDidMount() {
    const onFullscreenChange = () => this.setState({
      isFullscreen: !this.state.isFullscreen
    })
    document.addEventListener('webkitfullscreenchange', onFullscreenChange, false)
    document.addEventListener('mozfullscreenchange', onFullscreenChange, false)
    document.addEventListener('msfullscreenchange', onFullscreenChange, false)
    document.addEventListener('fullscreenchange', onFullscreenChange, false)

    this.timeouts.push(
      setTimeout(() => this.setState({mode: Mode.intro})),
      setTimeout(() => this.setState({mode: Mode.loadBubbles}), 7300),
      setTimeout(() => this.setState({mode: Mode.show}), 8600),
      setTimeout(this.activateSpotlight, 9700),
    )
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {collapsed, hovered, mode, isFullscreen} = this.state
    const defaultSpring = {stiffness: 70, damping: 9}
    const scaleVal = collapsed? spring(0, {stiffness: 70, damping: 30}) : hovered? spring(.9,  defaultSpring) : spring(1, defaultSpring)
    const opacityVal = collapsed? spring(0, {stiffness: 70, damping: 60}) : 1
    return (
      <Root className={cx({
        'start-exit': collapsed,
        [`start-${mode}`]: true,
      })}>
        <Backdrop />

        <LogoBubble />

        {(mode === Mode.loadBubbles || mode === Mode.show) &&
          <BubbleGrid ref={r => this.bubbleGrid = r}>
            {bubbleKeys.map((key, index) => (
              <BubbleGridItem
                key={index}
                className={bubbles[key].size}>
                <Bubble
                  onOpen={this.onOpenBubble.bind(this, index)}
                  onClose={this.onCloseBubble}
                  nucleus={bubbles[key]}
                  isFullscreen={isFullscreen && this.focusedBubble === index}
                  ref={r => this.bubbles.push(r)}
                />
              </BubbleGridItem>
            ))}
          </BubbleGrid>
        }

        <SocialRoot>
          <SocialButtonsRoot>
            <a href='https://www.facebook.com/purplerepublic' target='_blank'>
              <SocialIcon className='fa fa-facebook-square i1' />
              <div className='tooltip'>facebook</div>
            </a>
            <a href='https://www.medium.com/the-purple-republic' target='_blank'>
              <SocialIcon className='fa fa-medium i6' />
              <div className='tooltip'>medium</div>
            </a>
            <a href='https://www.youtube.com/channel/UCne9Pv9CARxNz8rNMaDm7Dw' target='_blank'>
              <SocialIcon className='fa fa-youtube-square i5' />
              <div className='tooltip'>youtube</div>
            </a>
            <a href='https://www.etsy.com/shop/purplerepublic' target='_blank'>
              <SocialIcon className='fa fa-etsy i4' />
              <div className='tooltip'>etsy</div>
            </a>
            <a href='https://www.redbubble.com/people/purplerepublic/portfolio' target='_blank' className='i8'>
              <object data={ICON_URL + 'redbubble.svg'} type='image/svg+xml' />
              <div className='tooltip'>red bubble</div>
            </a>
            <a href='https://www.twitter.com/1purplerepublic' target='_blank'>
              <SocialIcon className='fa fa-twitter-square i2' />
              <div className='tooltip'>twitter</div>
            </a>
            <a href='https://www.instagram.com/purple.republic' target='_blank'>
              <SocialIcon className='fa fa-instagram i3' />
              <div className='tooltip'>instagram</div>
            </a>
            <a href='mailto:rise@purplerepublic.us' target='_blank'>
              <SocialIcon className='fa fa-envelope-o i4' />
              <div className='tooltip'>email</div>
            </a>
            <a href='https://www.patreon.com/purplerepublic' target='_blank' className='i10'>
              <object data={ICON_URL + 'patreon.svg'} type='image/svg+xml' />
              <div className='tooltip'>donate with patreon</div>
            </a>
            <a onClick={() => this.payPalLink.click()} className='i11'>
              <SocialIcon className='fa fa-paypal i9' />
              <PayPalLink ref={r => this.payPalLink = r} />
              <div className='tooltip'>donate with paypal</div>
            </a>
          </SocialButtonsRoot>
        </SocialRoot>

      </Root>
    )
  }

  @autobind
  onOpenBubble(index) {
    this.focusedBubble = index
  }

  @autobind
  onCloseBubble() {
    findDOMNode(this.bubbles[this.focusedBubble]).scrollTo(0, 0)
  }

  onLetsPlay() {
    this.setState({collapsed: true})
    this.timeouts.push(
      setTimeout(() => window.location = '#hello', 3000)
    )
  }

  @autobind
  activateSpotlight() {
    let spotlight = 'lampshade'

    const {hash} = window.location
    const hashParts = hash? hash.split('?') : []
    if (hashParts.length > 1) {
      const queryParts = hashParts[1].split('=')
      if (queryParts[0] === 'spotlight') {
        const spotlightParam = queryParts[1]
        if (bubbleKeys.includes(spotlightParam)) {
          spotlight = spotlightParam
        }
      }
    }

    const spotlightIndex = bubbleKeys.findIndex(k => k === spotlight)
    this.bubbles[spotlightIndex].click()
  }

}
