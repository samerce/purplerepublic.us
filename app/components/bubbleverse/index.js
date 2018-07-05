import React from 'react'
import Bubble from '../bubble'
import BubbleBuilder from '../bubble/bubbleBuilder'
import {
  BubbleAddButton,
  BubbleArrangeButton,
} from '../bubble/bubbleBuilderButton'
import Spinnie from '../spinnie'

import {
  Root, BubbleGrid, BubbleGridItem, ArrangeButton, BubbleEditingButtonsRoot,
} from './styled'
import {MaskAbsoluteFillParent} from '../../global/styled'

import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {BubbleComponents} from '../bubble/config'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'enter',
  'show',
  'buildBubble',
  'arrange',
])

export default class Bubbleverse extends React.PureComponent {

  constructor() {
    super()

    this.timeouts = []
    this.bubbles = {}
    this.focusedBubbleId = null
    this.state = {
      mode: Mode.enter,
      isFullscreen: false,
      bubblePods: [],
      savingNewArrangement: false,
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
        bubblePods: [...bubbles],
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
    }, 250)
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
    clearInterval(this.urlWatcher)
  }

  render() {
    const {
      mode, isFullscreen, bubblePods, arrangeSourceIndex,
      savingNewArrangement,
    } = this.state
    return (
      <Root className={`start-${mode}`}>
        {mode !== Mode.buildBubble && canShowEditingTools() &&
          <BubbleEditingButtonsRoot>
            <BubbleAddButton
              onClick={() => this.openBubbleBuilder()} />
            <BubbleArrangeButton
              isArranging={mode === Mode.arrange}
              onClick={this.toggleArrangeMode} />
          </BubbleEditingButtonsRoot>
        }

        {canShowEditingTools() &&
          <BubbleBuilder
            ref={r => this.bubbleBuilder = r}
            onClose={this.closeBubbleBuilder}
            visible={mode === Mode.buildBubble}
          />
        }

        <BubbleGrid
          hidden={mode === Mode.buildBubble}
          ref={r => this.bubbleGrid = r}>
          {bubblePods.map((bubble, index) => (
            <BubbleGridItem
              key={bubble.id}
              size={bubble.size}>

              {mode === Mode.arrange && (index !== 0) &&
                <ArrangeButton onClick={this.onArrange.bind(this, index)}>
                  <i className={`fa
                    ${arrangeSourceIndex? 'fa-map-pin' : 'fa-bullseye'}`
                  } />
                </ArrangeButton>
              }

              <Bubble
                disabled={mode === Mode.arrange}
                onOpen={this.onBubbleOpened.bind(this, bubble.id)}
                onNext={this.openBubble}
                onClose={this.onBubbleClosed}
                onEdit={this.openBubbleBuilder.bind(this, bubble, index)}
                nucleus={bubble}
                isFullscreen={isFullscreen && this.focusedBubbleId === bubble.id}
                ref={r => this.bubbles[bubble.id] = r}
              />
            </BubbleGridItem>
          ))}
        </BubbleGrid>

        <MaskAbsoluteFillParent id='bubbleMask' show={savingNewArrangement}>
          <Spinnie show={savingNewArrangement} />
        </MaskAbsoluteFillParent>
      </Root>
    )
  }

  @autobind
  openBubbleBuilder(bubbleToEdit, index) {
    if (this.focusedBubbleId) {
      this.bubbles[this.focusedBubbleId].close()
    }
    this.setState({
      mode: Mode.buildBubble,
      arrangeSourceIndex: null,
    })
    this.bubbleBuilder.show(bubbleToEdit, index)
  }

  @autobind
  closeBubbleBuilder(bubbleId) {
    this.setState({
      mode: Mode.show,
      bubblePods: [...bubbles],
    }, () => setTimeout(() => {
      bubbleId && this.openBubble(bubbleId)
    }, 250))
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

  @autobind
  toggleArrangeMode() {
    this.setState({
      mode: (this.state.mode === Mode.arrange)? Mode.show : Mode.arrange,
      arrangeSourceIndex: null,
    })
  }

  @autobind
  onArrange(index) {
    const {arrangeSourceIndex} = this.state

    if (arrangeSourceIndex) {
      this.rearrangeBubbles(arrangeSourceIndex, index)
    } else {
      this.setState({arrangeSourceIndex:  index})
    }
  }

  rearrangeBubbles(sourceIndex, destIndex) {
    const destBubble = bubbles[destIndex]
    const sourceBubble = bubbles.splice(sourceIndex, 1)[0]
    const newDestBubbleIndex = bubbles.findIndex(b => b.id === destBubble.id)
    bubbles.splice(newDestBubbleIndex, 0, sourceBubble)

    this.setState({
      savingNewArrangement: true,
    })

    fetch('/bubbles.update.arrangement', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bubbles),
    }).then(() => {
      this.setState({
        bubblePods: [...bubbles],
        arrangeSourceIndex: null,
        savingNewArrangement: false
      })
    })
  }

}

function processBubbles() {
  // bubbles is a global loaded in index.html
  bubbles.forEach(bubbleProps => {
    bubbleProps.Component = BubbleComponents[bubbleProps.type]
  })
}

function getBubbleIdFromUrl() {
  const {hash} = window.location
  const hashParts = hash? hash.split('?') : []

  if (hashParts.length > 1) {
    const queryParts = hashParts[1].split('=')
    if (queryParts[0] === 'bubble') {

      const bubbleId = queryParts[1]
      if (bubbles.find(b => b.id === bubbleId)) {
        return bubbleId
      }
    }
  }
}
