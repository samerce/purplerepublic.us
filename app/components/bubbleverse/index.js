import React from 'react'
import {findDOMNode} from 'react-dom'
import BubbleBuilder from '../bubble/bubbleBuilder'
import BubbleGrid from '../bubbleGrid'
import {
  BubbleAddButton,
  BubbleArrangeButton,
} from '../bubble/bubbleBuilderButton'
import Spinnie from '../spinnie'
import SelectPill from '../unoSelectPill'

import {
  Root, BubbleEditingButtonsRoot, CloseButton, Background,
} from './styled'
import {
  MaskAbsoluteFillParent,
} from '../../global/styled'

import withTransitions from '../hocs/withTransitions'

import {SCREEN_WIDTH_M} from '../../global/constants'
import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {
  BubbleComponents, BubbleType, BubbleButtonComponents
} from '../bubble/config'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {closeBubbleverse} from './actions'

import latest from '../../../latest'

const Mode = makeEnum([
  'showGrid',
  'showBubble',
  'buildBubble',
  'arrange',
])
const SelectPillValues = [...Object.keys(BubbleType)]

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
}))
@withTransitions({prefix: 'bubbleverse'})
export default class Bubbleverse extends React.PureComponent {

  constructor() {
    super()
    fetchBubbles().then(bubbles => {
      this.bubbleConfig = bubbles
      this.setState({bubblePods: [...bubbles]})
    })

    this.timeouts = []
    this.state = {
      mode: Mode.enter,
      bubblePods: [],
      selectedTypes: [],
      arrangeSourceIndex: null,
      savingNewArrangement: false,
      focusedBubble: null,
    }
  }

  componentDidMount() {
    // this.timeouts.push(
      // setTimeout(this.startUrlWatcher, 5400),
    // )
    //
    // this.socialButtonsNode = document.getElementById('socialButtonsRoot')
  }

  componentWillReceiveProps(nextProps) {
    const {dimension, show, hide} = this.props
    if (nextProps.dimension !== dimension) {
      nextProps.dimension? show() : hide()
    }
  }

  @autobind
  startUrlWatcher() {
    this.urlWatcher = setInterval(() => {
      const {focusedBubble} = this.state
      const bubbleIdFromUrl = getBubbleIdFromUrl(this.bubbleConfig)
      if (bubbleIdFromUrl && (!focusedBubble || bubbleIdFromUrl !== focusedBubble.id)) {
        this.openBubble(bubbleIdFromUrl)
      }
      if (!bubbleIdFromUrl && focusedBubble) {
        this.closeBubble()
      }
      window.prerenderReady = true
    }, 250)
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
    clearInterval(this.urlWatcher)
  }

  render() {
    const {
      mode, bubblePods, selectedTypes, focusedBubble, savingNewArrangement,
      arrangeSourceIndex
    } = this.state
    return (
      <Root
        innerRef={r => this.root = r}
        className={`bubbleverse-${mode} ${this.props.className}`}>
        <Background />

        <CloseButton onClick={this.onClickClose}>
          <i className='fa fa-close' />
        </CloseButton>

        {canShowEditingTools() && mode !== Mode.buildBubble &&
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
            bubbleConfig={this.bubbleConfig}
          />
        }

        <BubbleGrid
          ref={r => this.bubbleGrid = r}
          bubbles={bubblePods}
          hidden={mode === Mode.buildBubble}
          onBubbleOpened={this.onBubbleOpened}
          onBubbleClosed={this.onBubbleClosed}
          onBubbleEdit={this.onBubbleEdit}
          isArranging={mode === Mode.arrange}
          onArrange={this.onArrange}
          arrangeSourceIndex={arrangeSourceIndex}
        />

        <MaskAbsoluteFillParent show={savingNewArrangement}>
          <Spinnie show={savingNewArrangement} />
        </MaskAbsoluteFillParent>
      </Root>
    )
  }

  @autobind
  onClickClose() {
    this.props.dispatch(closeBubbleverse())
  }

  @autobind
  onBubbleEdit() {
    this.openBubbleBuilder(true)
  }

  @autobind
  toggleArrangeMode() {
    this.setState({
      mode: (this.state.mode === Mode.arrange)? Mode.showGrid : Mode.arrange,
      arrangeSourceIndex: null,
    })
  }

  @autobind
  onChangeFilterList(selectedIndices) {
    this.setState({
      selectedTypes: selectedIndices.map(i => SelectPillValues[i])
    })
  }

  @autobind
  onBubblesChanged(bubbles) {
    this.setState({
      bubblePods: bubbles,
    })
  }

  @autobind
  openBubbleBuilder(shouldEditFocusedBubble) {
    let bubbleToEdit, index
    if (shouldEditFocusedBubble) {
      bubbleToEdit = this.state.focusedBubble
      index = this.bubbleConfig.findIndex(b => b.id === bubbleToEdit.id)
    }
    this.setState({
      mode: Mode.buildBubble,
      arrangeSourceIndex: null,
    })
    this.bubbleBuilder.show(bubbleToEdit, index)
    this.closeBubble()
  }

  @autobind
  closeBubbleBuilder(bubbleId, bubbleConfig) {
    const newState = {}
    if (bubbleConfig) {
      this.bubbleConfig = bubbleConfig
      newState.bubblePods = [...bubbleConfig]
    }
    this.setState({
      mode: Mode.showGrid,
      ...newState,
    }, () => setTimeout(() => {
      bubbleId && this.openBubble(bubbleId)
    }, 250))
  }

  @autobind
  onBubbleOpened(focusedBubbleId) {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble opened',
      eventLabel: focusedBubbleId,
    })

    window.location.hash = '#start/bubble/' + focusedBubbleId
    this.setState({
      focusedBubble: this.bubbleConfig.find(b => b.id === focusedBubbleId),
    })
    this.socialButtonsNode.style.zIndex = 2
    this.selectPill.style.zIndex = 0
  }

  @autobind
  onBubbleClosed() {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble closed',
      eventLabel: this.state.focusedBubble.id,
    })

    window.location.hash = '#start'
    this.setState({
      focusedBubble: null,
    })
    this.socialButtonsNode.style.zIndex = 4
    this.selectPill.style.zIndex = 2
  }

  @autobind
  openBubble(bubbleId) {
    this.bubbleGrid.openBubble(bubbleId)
  }

  @autobind
  closeBubble() {
    this.bubbleGrid.closeBubble()
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
    const {bubbleConfig} = this
    const destBubble = bubbleConfig[destIndex]
    const sourceBubble = bubbleConfig.splice(sourceIndex, 1)[0]
    const newDestBubbleIndex = bubbleConfig.findIndex(b => b.id === destBubble.id)
    bubbleConfig.splice(newDestBubbleIndex, 0, sourceBubble)

    this.setState({
      savingNewArrangement: true,
    })

    fetch('/bubbles.update.arrangement', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bubbleConfig),
    }).then(() => {
      this.setState({
        bubblePods: [...bubbleConfig],
        arrangeSourceIndex: null,
        savingNewArrangement: false
      })
    })
  }

}

function fetchBubbles() {
  return new Promise((resolve, reject) => {
    fetch('/bubbleStageDirection.js', {
      cache: 'no-cache',
    }).then((responseRaw) => {
      responseRaw.json().then(bubbles => {
        latest.forEach(bubble => {
          if (bubble.id === 'patreon') {
            bubble.buttonType = 'patreon'
          }
          if (bubble.id === 'shopArt') {
            bubble.type = 'words'
            bubble.buttonType = 'shop'
          }
          if (bubble.id === 'instagram') {
            bubble.buttonType = 'instagram'
          }
          if (bubble.id === 'buy-poetcards' || bubble.id === 'buy-postcards') {
            bubble.type = 'poetcards'
            bubble.buttonType = 'poetcards'
            bubble.actions = [
              {
                text: 'checkout',
                type: 'OrderPoetcards',
              },
              {
                text: 'continue journey...',
                type: 'OpenLinkInPlace',
                props: {
                  url: '/#start/bubble/' + bubble.nextBubbleId,
                },
              },
            ]
          }
          if (bubble.buttonType) {
            bubble.ButtonComponent = BubbleButtonComponents[bubble.buttonType]
          }
          bubble.Component = BubbleComponents[bubble.type]
          bubble.size = window.innerWidth <= SCREEN_WIDTH_M? 90 : 200
        })
        resolve(latest)
      }).catch(reject)
    }).catch(reject)
  })

}

function getBubbleIdFromUrl(bubbles) {
  const {hash} = window.location
  const hashParts = hash.split('/')
  if (hashParts.length > 1 && hashParts[1] === 'bubble') {
    const bubbleId = hashParts[2]
    if (bubbles.find(b => b.id === bubbleId)) {
      return bubbleId
    }
  }
}
