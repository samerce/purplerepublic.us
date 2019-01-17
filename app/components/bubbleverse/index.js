import React from 'react'
import {findDOMNode} from 'react-dom'
import BubbleGrid from '../bubbleGrid'
import {
  BubbleArrangeButton,
} from '../bubble/bubbleBuilderButton'
import BubbleDetails from '../bubble/bubbleDetails'
import Spinnie from '../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, BubbleEditingButtonsRoot, CloseButton, Background, Header,
  BubbleHeader, Title, Subtitle, Dimension,
} from './styled'
import {
  MaskAbsoluteFillParent, ExpandingBackgroundSize,
} from '../../global/styled'

import withTransitions from '../hocs/withTransitions'
import resizable from '../hocs/resizable'

import {getButtonImageUrl, getFacebookUrl} from '../../utils/bubbleverse'
import {makeEnum} from '../../utils/lang'
import {canShowEditingTools} from '../../utils/nav'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {
  closeBubbleverse, setBubbles, setActiveBubble, updateBuilderNucleus,
} from './actions'

import {SCREEN_WIDTH_M} from '../../global/constants'
import {
  BubbleComponents, BubbleType, BubbleButtonComponents
} from '../bubble/config'

const HalfBackgroundWidth = -(ExpandingBackgroundSize / 2)
const HalfBackgroundHeight = -(ExpandingBackgroundSize / 2)
const Mode = makeEnum([
  'visible',
  'arrange',
])

const getBackgroundStyle = () => ({
  top: -(ExpandingBackgroundSize - window.innerHeight) / 2,
  left: window.innerWidth <= SCREEN_WIDTH_M? -(ExpandingBackgroundSize / 4) + 20 : 0,
})

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  bubbles: d.get('bubbleverse').get('bubbles'),
  mouseLocation: d.get('bubbleverse').get('mouseLocation'),
  isPoetcardCheckoutOpen: d.get('bubbles').get('isPoetcardCheckoutOpen'),
  isBubbleBuilderOpen: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
@withTransitions({prefix: 'bubbleverse'})
@resizable()
export default class Bubbleverse extends React.PureComponent {

  constructor(props) {
    super(props)
    fetchBubbles().then(bubbles => {
      props.dispatch(setBubbles(bubbles))
    })

    this.timeouts = []
    this.state = {
      mode: Mode.visible,
      arrangeSourceIndex: null,
      savingNewArrangement: false,
      backgroundStyle: getBackgroundStyle(),
    }
  }

  onResize() {
    this.setState({
      backgroundStyle: getBackgroundStyle(),
    })
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
      const {bubbles, isBubbleBuilderOpen} = this.props
      const {focusedBubble} = this
      const bubbleFromUrl = getBubbleFromUrl(bubbles)
      if (bubbleFromUrl && (!focusedBubble || bubbleFromUrl.id !== focusedBubble.id)) {
        this.openBubble(bubbleFromUrl)
      }
      if (!bubbleFromUrl && focusedBubble && !isBubbleBuilderOpen) {
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
      mode, savingNewArrangement, arrangeSourceIndex,
      backgroundStyle,
    } = this.state
    const {
      dimension, activeBubble, className, isPoetcardCheckoutOpen,
      isBubbleBuilderOpen
    } = this.props
    const bubbleImageUrl = activeBubble && getButtonImageUrl(activeBubble.id)
    const isCloseHidden = isPoetcardCheckoutOpen || isBubbleBuilderOpen
    return (
      <Root className={`bubbleverse-${mode} ${className}`}>
        {activeBubble &&
          <Helmet>
            <meta property='og:type' content='article' />
            <meta property='og:title' content={activeBubble.title} />
            <meta property='og:image' content={bubbleImageUrl} />
            <meta property='og:image:secure_url' content={bubbleImageUrl} />
            <meta property='og:url' content={getFacebookUrl(activeBubble.id)} />
            <meta property='og:description' content={activeBubble.subtitle} />
          </Helmet>
        }
        <Background style={backgroundStyle} />

        <CloseButton
          className={isCloseHidden && 'hidden'}
          onClick={this.onClickClose}>
          <i className='fa fa-close' />
        </CloseButton>

        {/* {canShowEditingTools() && mode !== Mode.buildBubble &&
          <BubbleEditingButtonsRoot>
            <BubbleArrangeButton
          isArranging={mode === Mode.arrange}
          onClick={this.toggleArrangeMode} />
          </BubbleEditingButtonsRoot>
        } */}

        <Header className={isPoetcardCheckoutOpen && 'hidden'}>
          <Dimension>{dimension}</Dimension>
          <BubbleHeader>
            <Subtitle
              editing={isBubbleBuilderOpen}
              onBlur={e => this.onEditingChange({subtitle: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({subtitle: e.target.value})}
              value={this.state.subtitle || (activeBubble && activeBubble.subtitle) || ''}
            />
            <Title
              editing={isBubbleBuilderOpen}
              onBlur={e => this.onEditingChange({title: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({title: e.target.value})}
              value={this.state.title || (activeBubble && activeBubble.title) || ''}
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
  onInputKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

  @autobind
  onEditingChange(nucleus) {
    this.props.dispatch(updateBuilderNucleus(nucleus))
  }

  @autobind
  onClickClose() {
    this.props.dispatch(closeBubbleverse())
  }

  @autobind
  toggleArrangeMode() {
    this.setState({
      mode: (this.state.mode === Mode.arrange)? Mode.visible : Mode.arrange,
      arrangeSourceIndex: null,
    })
  }

  @autobind
  onBubbleOpened(focusedBubble) {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble opened',
      eventLabel: focusedBubble.id,
    })

    // const backgroundStyle = {}
    // const {mouseLocation} = this.props
    // if (mouseLocation) {
    //   backgroundStyle.left = HalfBackgroundWidth + mouseLocation.x
    //   backgroundStyle.top = HalfBackgroundHeight + mouseLocation.y
    //   console.log(backgroundStyle, HalfBackgroundWidth, HalfBackgroundHeight, mouseLocation)
    // }

    window.location.hash = '#start/bubble/' + focusedBubble.id
    this.focusedBubble = focusedBubble
    // this.setState({
    //   backgroundStyle,
    // })
  }

  @autobind
  onBubbleClosed() {
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble closed',
      eventLabel: this.focusedBubble.id,
    })

    window.location.hash = '#start'
    this.focusedBubble = null
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
        bubbles.forEach(bubble => {
          if (bubble.id === 'shopArt') {
            bubble.type = 'words'
          }
          if (bubble.id === 'buy-poetcards' || bubble.id === 'buy-postcards') {
            bubble.type = 'poetcards'
            bubble.buttonType = 'poetcards'
          }
          if (bubble.buttonType) {
            bubble.ButtonComponent = BubbleButtonComponents[bubble.buttonType]
          }
          bubble.Component = BubbleComponents[bubble.type]
          bubble.size = window.innerWidth <= SCREEN_WIDTH_M? 90 : 160
        })
        resolve(bubbles)
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
