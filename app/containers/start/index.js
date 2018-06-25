import React from 'react'
import {findDOMNode} from 'react-dom'
import Backdrop from './backdrop'
import Bubble from '../../components/bubble'
import LogoBubble from '../../components/logoBubble'
import BubbleBuilderButton from '../../components/bubble/bubbleBuilderButton'
import BubbleBuilder from '../../components/bubble/bubbleBuilder'
import GetSocialWithUs from '../../components/getSocialWithUs'

import styled from 'styled-components'
import {
  Root, BubbleGrid, BubbleGridItem,
} from './styled'

import {cx} from '../../utils/style'
import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {BubbleComponents} from '../../components/bubble/bubbles'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'enter',
  'show',
  'buildBubble',
])

const kBubbleChunkAmount = 5

export default class Start extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.bubbles = {}
    this.focusedBubbleId = null
    this.state = {
      mode: Mode.enter,
      hovered: false,
      infoHover: false,
      isFullscreen: false,
      bubblePods: [],
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
      setTimeout(() => this.setState({mode: Mode.show})),
      setTimeout(() => this.setState({
        bubblePods: Object.keys(bubbles).map(k => bubbles[k])
      }), 2000),
      setTimeout(this.startUrlWatcher, 5000),
    )

    processBubbles()
  }

  @autobind
  startUrlWatcher() {
    if (!getBubbleIdFromUrl()) {
      this.bubbles['lampshade'].open()
    }

    this.urlWatcher = setInterval(() => {
      if (this.isFocusLocked) return

      const {focusedBubbleId} = this
      const bubbleIdFromUrl = getBubbleIdFromUrl()
      if (bubbleIdFromUrl && bubbleIdFromUrl !== focusedBubbleId) {
        this.openBubble(bubbleIdFromUrl)
      }
      if (!bubbleIdFromUrl && focusedBubbleId) {
        this.bubbles[focusedBubbleId].close()
      }
    }, 500)
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
    clearInterval(this.urlWatcher)
  }

  render() {
    const {mode, isFullscreen, bubblePods} = this.state

    return (
      <Root className={`start-${mode}`}>
        <Backdrop />
        <LogoBubble />

        {mode !== Mode.buildBubble && canShowEditingTools() &&
          <BubbleBuilderButton onClick={this.openBubbleBuilder} />
        }

        {canShowEditingTools() &&
          <BubbleBuilder
            ref={r => this.bubbleBuilder = r}
            onClose={() => {
              this.setState({mode: Mode.show})
              this.forceUpdate(() => setTimeout(this.activateSpotlight, 1000))
            }}
            visible={mode === Mode.buildBubble} />
        }

        <BubbleGrid
          hidden={mode === Mode.buildBubble}
          ref={r => this.bubbleGrid = r}>
          {this.state.bubblePods.map(bubble => (
            <BubbleGridItem
              key={bubble.id}
              size={bubble.size}>
              <Bubble
                onOpen={this.onBubbleOpened.bind(this, bubble.id)}
                onNext={this.openBubble}
                onClose={this.onBubbleClosed}
                nucleus={bubble}
                isFullscreen={isFullscreen && this.focusedBubbleId === bubble.id}
                ref={r => this.bubbles[bubble.id] = r}
              />
            </BubbleGridItem>
          ))}
        </BubbleGrid>

        <GetSocialWithUs />
      </Root>
    )
  }

  @autobind
  openBubbleBuilder() {
    this.setState({
      mode: Mode.buildBubble,
    })
    this.bubbleBuilder.show()
  }

  @autobind
  onBubbleOpened(bubbleId) {
    this.isFocusLocked = true
    this.focusedBubbleId = bubbleId
    window.location.hash = '#start?bubble=' + bubbleId
    this.isFocusLocked = false
  }

  @autobind
  onBubbleClosed() {
    this.isFocusLocked = true
    this.focusedBubbleId = null
    window.location.hash = '#start'
    this.isFocusLocked = false
  }

  @autobind
  openBubble(bubbleId) {
    if (this.focusedBubbleId) {
      this.bubbles[this.focusedBubbleId].close()
    }
    this.bubbles[bubbleId].open()
  }

}

function processBubbles() {
  // bubbles is a global loaded in index.html
  Object.keys(bubbles).forEach(k => {
    bubbles[k].Component = BubbleComponents[bubbles[k].type]
  })
}

function getBubbleIdFromUrl() {
  const {hash} = window.location
  const hashParts = hash? hash.split('?') : []

  if (hashParts.length > 1) {
    const queryParts = hashParts[1].split('=')
    if (queryParts[0] === 'bubble') {

      const spotlightParam = queryParts[1]
      if (bubbles[spotlightParam]) {
        return spotlightParam
      }
    }
  }
}
