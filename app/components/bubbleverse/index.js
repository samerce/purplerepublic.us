import React from 'react'
import {findDOMNode} from 'react-dom'
import BubbleBuilder from '../bubble/bubbleBuilder'
import BubbleGrid from '../bubbleGrid'
import {
  BubbleAddButton,
  BubbleArrangeButton,
} from '../bubble/bubbleBuilderButton'
import BubbleDetails from '../bubble/bubbleDetails'
import Spinnie from '../spinnie'
import SelectPill from '../unoSelectPill'

import {
  Root, BubbleEditingButtonsRoot, CloseButton, Background, Header,
  BubbleHeader, Title, Subtitle, Dimension,
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
import {
  closeBubbleverse, setBubbles, setActiveBubble,
} from './actions'

import latest from '../../../latest'

const Mode = makeEnum([
  'showGrid',
  'showBubble',
  'buildBubble',
  'arrange',
])

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  bubbles: d.get('bubbleverse').get('bubbles'),
}))
@withTransitions({prefix: 'bubbleverse'})
export default class Bubbleverse extends React.PureComponent {

  constructor(props) {
    super(props)
    fetchBubbles().then(bubbles => {
      props.dispatch(setBubbles(bubbles))
    })

    this.timeouts = []
    this.state = {
      mode: Mode.enter,
      arrangeSourceIndex: null,
      savingNewArrangement: false,
      focusedBubble: null,
    }
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(this.startUrlWatcher, 400),
    )
  }

  componentWillReceiveProps(nextProps) {
    const {dimension, show, hide, activeBubble} = this.props
    if (nextProps.dimension !== dimension) {
      nextProps.dimension? show() : hide()
    }

    const {activeBubble: nextActiveBubble} = nextProps
    if (nextActiveBubble) {
      if (!activeBubble || activeBubble.id !== nextActiveBubble.id) {
        this.onBubbleOpened(nextActiveBubble)
      }
    } else if (activeBubble) {
      this.onBubbleClosed()
    }
  }

  @autobind
  startUrlWatcher() {
    this.urlWatcher = setInterval(() => {
      const {focusedBubble} = this.state
      const bubbleFromUrl = getBubbleFromUrl(this.props.bubbles)
      if (bubbleFromUrl && (!focusedBubble || bubbleFromUrl.id !== focusedBubble.id)) {
        this.openBubble(bubbleFromUrl)
      }
      if (!bubbleFromUrl && focusedBubble) {
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
      mode, focusedBubble, savingNewArrangement, arrangeSourceIndex
    } = this.state
    const {dimension, activeBubble} = this.props
    return (
      <Root className={`bubbleverse-${mode} ${this.props.className}`}>
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
            bubbleConfig={this.props.bubbles}
          />
        }

        <Header>
          <Dimension>{dimension}</Dimension>
          <BubbleHeader>
            <Subtitle
              onBlur={e => onEditingChange({subtitle: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({subtitle: e.target.value})}
              value={activeBubble && activeBubble.subtitle}
            />
            <Title
              onBlur={e => onEditingChange({title: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({title: e.target.value})}
              value={activeBubble && activeBubble.title}
            />
          </BubbleHeader>
        </Header>

        <BubbleDetails />

        <BubbleGrid
          isArranging={mode === Mode.arrange}
          onArrange={this.onArrange}
          arrangeSourceIndex={arrangeSourceIndex}
        />

        {savingNewArrangement &&
          <MaskAbsoluteFillParent show={savingNewArrangement}>
            <Spinnie show={savingNewArrangement} />
          </MaskAbsoluteFillParent>
        }
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
  onBubblesChanged(bubbles) {
    this.props.dispatch(setBubbles(bubbles))
  }

  @autobind
  openBubbleBuilder(shouldEditFocusedBubble) {
    let bubbleToEdit, index
    if (shouldEditFocusedBubble) {
      bubbleToEdit = this.state.focusedBubble
      index = this.props.bubbles.findIndex(b => b.id === bubbleToEdit.id)
    }
    this.setState({
      mode: Mode.buildBubble,
      arrangeSourceIndex: null,
    })
    this.bubbleBuilder.show(bubbleToEdit, index)
    this.closeBubble()
  }

  @autobind
  closeBubbleBuilder(bubbleId, newBubbles) {
    if (newBubbles) {
      this.props.dispatch(setBubbles(newBubbles))
    }
    this.setState({
      mode: Mode.showGrid,
    }, () => setTimeout(() => {
      bubbleId && this.openBubble(bubbleId)
    }, 250))
  }

  @autobind
  onBubbleOpened(focusedBubble) {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble opened',
      eventLabel: focusedBubble.id,
    })

    window.location.hash = '#start/bubble/' + focusedBubble.id
    this.setState({focusedBubble})
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
  }

  @autobind
  openBubble(bubbleId) {
    this.props.dispatch(setActiveBubble(bubbleId))
  }

  @autobind
  closeBubble() {
    this.props.dispatch(closeBubbleverse())
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
    const {bubbles} = this.props
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
      this.props.dispatch(setBubbles(bubbles))
      this.setState({
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
          bubble.size = window.innerWidth <= SCREEN_WIDTH_M? 90 : 170
        })
        resolve(latest)
      }).catch(reject)
    }).catch(reject)
  })

}

function getBubbleFromUrl(bubbles) {
  const {hash} = window.location
  const hashParts = hash.split('/')
  if (hashParts.length > 1 && hashParts[1] === 'bubble') {
    const bubbleId = hashParts[2]
    return bubbles.find(b => b.id === bubbleId)
  }
}
