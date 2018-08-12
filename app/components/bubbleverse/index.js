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

import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import {BubbleComponents, BubbleType} from '../bubble/config'
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
    fetchBubbles().then(bubbles => this.bubbleConfig = bubbles)

    this.timeouts = []
    this.selectPillOptions =
      SelectPillValues
      .filter(t => t !== 'shop')
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
      setTimeout(() => this.setState({
        bubblePods: [...this.bubbleConfig],
      }), 2000),
      setTimeout(this.startUrlWatcher, 6000),
    )

    this.socialButtonsNode = document.getElementById('socialButtonsRoot')
    this.selectPill = findDOMNode(this.selectPillRef)
  }

  @autobind
  startUrlWatcher() {
    if (!getBubbleIdFromUrl(this.bubbleConfig)) {
      // this.openBubble('welcome')
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
    if (this.state.focusedBubble) {
      this.closeBubble()
    }
    this.bubbleGrid.openBubble(bubbleId)
  }

  @autobind
  closeBubble() {
    this.bubbleGrid.closeBubble()
    this.focusedBubbleRef.close()
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
          bubbleProps.size = 200
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
