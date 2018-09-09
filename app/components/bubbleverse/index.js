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
  Root, BubbleEditingButtonsRoot,
} from './styled'
import {MaskAbsoluteFillParent} from '../../global/styled'

import {SCREEN_WIDTH_M} from '../../global/constants'
import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {
  BubbleComponents, BubbleType, BubbleButtonComponents
} from '../bubble/config'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'enter',
  'show',
  'showBubble',
  'buildBubble',
  'arrange',
])
const SelectPillValues = [...Object.keys(BubbleType)]

export default class Bubbleverse extends React.PureComponent {

  constructor() {
    super()
    fetchBubbles().then(bubbles => {
      this.bubbleConfig = bubbles
      if (this.state.readyForBubbles) {
        this.setState({bubblePods: [...bubbles]})
      }
    })

    this.timeouts = []
    this.selectPillOptions =
      SelectPillValues
      .filter(t => t !== 'shop' && t !== 'poetcards')
      .map(type => ({
        name: type,
        onClick: this.onClickFilter,
      }))
    this.state = {
      mode: Mode.enter,
      bubblePods: [],
      selectedTypes: [],
      arrangeSourceIndex: null,
      savingNewArrangement: false,
      focusedBubble: null,
      readyForBubbles: false,
    }
  }

  @autobind
  onClickFilter(index, selected) {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'filter ' + selected? 'picked' : 'unpicked',
      eventLabel: SelectPillValues[index],
    })
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(() => this.setState({mode: Mode.show})),
      setTimeout(() => {
        const newState = {readyForBubbles: true}
        if (this.bubbleConfig) {
          newState.bubblePods = [...this.bubbleConfig]
        }
        this.setState(newState)
      }, 2000),
      setTimeout(this.startUrlWatcher, 5400),
    )

    this.socialButtonsNode = document.getElementById('socialButtonsRoot')
    this.selectPill = findDOMNode(this.selectPillRef)
  }

  @autobind
  startUrlWatcher() {
    if (!getBubbleIdFromUrl(this.bubbleConfig)) {
      this.openBubble('welcome')
    }

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
        className={`start-${mode}`}>

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

        <SelectPill
          ref={r => this.selectPillRef = r}
          className='bubbleverseSelectPill'
          options={this.selectPillOptions}
          multiSelect={true}
          selectedList={[]}
          onChange={this.onChangeFilterList}
          collapsible={true}
        />

        <BubbleGrid
          ref={r => this.bubbleGrid = r}
          bubbles={bubblePods}
          filters={selectedTypes}
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
  onBubbleEdit() {
    this.openBubbleBuilder(true)
  }

  @autobind
  toggleArrangeMode() {
    this.setState({
      mode: (this.state.mode === Mode.arrange)? Mode.show : Mode.arrange,
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
      mode: Mode.show,
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
        bubbles.forEach(bubble => {
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
        resolve(bubbles)
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
