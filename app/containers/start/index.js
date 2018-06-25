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
  'intro',
  'show',
  'buildBubble',
])

const kBubbleChunkAmount = 5

export default class Start extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.bubbles = {}
    this.focusedBubble = null
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
      setTimeout(() => this.setState({mode: Mode.intro})),
      setTimeout(() => this.setState({mode: Mode.show}), 5500),
      setTimeout(this.activateSpotlight, 5500),
      setTimeout(() => this.setState({
        bubblePods: Object.keys(bubbles).map(k => bubbles[k])
      }), 2000)
    )

    processBubbles()

    // let bubbleLoadInterval
    // bubbleLoadInterval = setInterval(() => {
    //   if (this.state.bubblePods.length + kBubbleChunkAmount >= Object.keys(bubbles).length) {
    //     clearInterval(bubbleLoadInterval)
    //   }
    //
    //   this.setState({
    //     bubblePods: [
    //       ...this.state.bubblePods,
    //       ...getNextBubbleChunk(this.state.bubblePods.length),
    //     ],
    //   })
    // }, 500)
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
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
                onOpen={this.onOpenBubble.bind(this, bubble.id)}
                onNext={bubbleId => {
                  this.bubbles[bubbleId].click()
                }}
                onClose={this.onCloseBubble}
                nucleus={bubble}
                isFullscreen={isFullscreen && this.focusedBubble === bubble.id}
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
  onOpenBubble(bubbleId) {
    this.focusedBubble = bubbleId
  }

  @autobind
  onCloseBubble() {
    findDOMNode(this.bubbles[this.focusedBubble]).scrollTo(0, 0)
    this.focusedBubble = null
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
        if (bubbles[spotlightParam]) {
          spotlight = spotlightParam
        }
      }
    }

    this.bubbles[spotlight].click()
  }

}

function processBubbles() {
  // bubbles is a global loaded in index.html
  Object.keys(bubbles).forEach(k => {
    bubbles[k].Component = BubbleComponents[bubbles[k].type]
  })
}

function getNextBubbleChunk(numLoadedBubbles) {
  return Object.keys(bubbles)
    .slice(numLoadedBubbles, numLoadedBubbles + kBubbleChunkAmount)
    .reduce((chunk, key) => {
      chunk.push(bubbles[key])
      return chunk
    }, [])
}
