import React from 'react'
import {findDOMNode} from 'react-dom'
import Bubble from '../bubble'
import BubbleBuilder from '../bubble/bubbleBuilder'
import {
  BubbleAddButton,
  BubbleArrangeButton,
} from '../bubble/bubbleBuilderButton'
import Spinnie from '../spinnie'
import SelectPill from '../unoSelectPill'

import {
  Root, BubbleGrid, BubbleGridItem, ArrangeButton, BubbleEditingButtonsRoot,
  ArrangeIcon,
} from './styled'
import {MaskAbsoluteFillParent} from '../../global/styled'

import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {BubbleComponents, BubbleType} from '../bubble/config'
import autobind from 'autobind-decorator'
import {cx} from '../../utils/style'

const Mode = makeEnum([
  'enter',
  'show',
  'buildBubble',
  'arrange',
])
const BDBubbles = ['twinkle', 'jamaica', 'magic', 'beauty', 'queen']
const SelectPillValues = [...Object.keys(BubbleType)]

export default class Bubbleverse extends React.PureComponent {

  constructor() {
    super()
    fetchBubbles().then(bubbles => this.bubbleConfig = bubbles)

    this.timeouts = []
    this.bubbles = {}
    this.focusedBubbleId = null
    this.selectPillOptions =
      SelectPillValues
      .filter(t => t !== 'shop')
      .map(type => ({
        name: type,
        onClick: this.onClickFilter,
      }))
    this.state = {
      mode: Mode.enter,
      isFullscreen: false,
      bubblePods: [],
      savingNewArrangement: false,
      selectedTypes: [],
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
        bubblePods: [...this.bubbleConfig],
      }), 2000),
      setTimeout(this.startUrlWatcher, 6000),
    )

    this.rootNode = findDOMNode(this.root)
    this.selectPill = findDOMNode(this.selectPillRef)
  }

  @autobind
  startUrlWatcher() {
    if (!getBubbleIdFromUrl(this.bubbleConfig)) {
      this.bubbles['postcards'].open()
    }

    this.urlWatcher = setInterval(() => {
      if (this.isFocusLocked) return

      const {focusedBubbleId} = this
      const bubbleIdFromUrl = getBubbleIdFromUrl(this.bubbleConfig)
      if (bubbleIdFromUrl && bubbleIdFromUrl !== focusedBubbleId) {
        this.openBubble(bubbleIdFromUrl)
      }
      if (!bubbleIdFromUrl && focusedBubbleId) {
        this.bubbles[focusedBubbleId].close()
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
      mode, isFullscreen, bubblePods, arrangeSourceIndex,
      savingNewArrangement, selectedTypes,
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
        />

        <BubbleGrid
          id='bubbleGrid'
          hidden={mode === Mode.buildBubble}
          ref={r => this.bubbleGrid = r}>
          {bubblePods.map((bubble, index) => (
            <BubbleGridItem
              className={cx({
                hidden: bubble.id !== 'logo' && (BDBubbles.includes(bubble.id) || (selectedTypes.length && !selectedTypes.includes(bubble.type)))
              })}
              key={bubble.id}
              size={bubble.size}>

              {mode === Mode.arrange && (index !== 0) &&
                <ArrangeButton onClick={this.onArrange.bind(this, index)}>
                  <ArrangeIcon className={`fa
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

        <MaskAbsoluteFillParent show={savingNewArrangement}>
          <Spinnie show={savingNewArrangement} />
        </MaskAbsoluteFillParent>
      </Root>
    )
  }

  @autobind
  onChangeFilterList(selectedIndices) {
    this.setState({
      selectedTypes: selectedIndices.map(i => SelectPillValues[i])
    })
  }

  @autobind
  openBubbleBuilder(bubbleToEdit, index) {
    this.setState({
      mode: Mode.buildBubble,
      arrangeSourceIndex: null,
    })
    this.bubbleBuilder.show(bubbleToEdit, index)
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
  onBubbleOpened(bubbleId) {
    this.isFocusLocked = true
    this.focusedBubbleId = bubbleId
    window.location.hash = '#start/bubble/' + bubbleId
    this.rootNode.style.zIndex = 7
    this.selectPill.style.zIndex = 0
    this.isFocusLocked = false
  }

  @autobind
  onBubbleClosed() {
    this.isFocusLocked = true
    this.focusedBubbleId = null
    window.location.hash = '#start'
    this.rootNode.style.zIndex = 5
    this.selectPill.style.zIndex = 2
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
      responseRaw.text().then(bubblesText => {
        bubblesText = bubblesText.replace('window.bubbles=', '')
        const bubbles = JSON.parse(bubblesText)
        bubbles.forEach(bubbleProps => {
          bubbleProps.Component = BubbleComponents[bubbleProps.type]
        })
        resolve(bubbles)
      // responseRaw.json().then(bubbles => {
      //   bubbles.forEach(bubbleProps => {
      //     bubbleProps.Component = BubbleComponents[bubbleProps.type]
      //   })
      //   resolve(bubbles)
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
