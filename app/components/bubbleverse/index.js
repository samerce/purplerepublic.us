import React from 'react'
import BubbleGrid from '../bubbleGrid'
import BubbleDetails from '../bubble/bubbleDetails'
import Spinnie from '../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, CloseButton, Background, Header,
  BubbleHeader, Title, Subtitle, Dimension, DimensionPicker, DimensionChoice,
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
  closeBubbleverse, setBubbles, setActiveBubble, updateBuilderNucleus, openBubbleverse,
} from './actions'

import {SCREEN_WIDTH_M} from '../../global/constants'
import {DimensionTypes} from './config'

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
      isDimensionPickerOpen: false,
      backgroundStyle: getBackgroundStyle(),
      subtitle: null,
      title: null,
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

    if (this.props.isBubbleBuilderOpen && !nextProps.isBubbleBuilderOpen) {
      this.setState({
        title: null,
        subtitle: null,
      })
    }
  }

  @autobind
  startUrlWatcher() {
    this.urlWatcher = setInterval(() => {
      const {bubbles, isBubbleBuilderOpen} = this.props
      if (isBubbleBuilderOpen) return

      const {focusedBubble} = this
      const bubbleFromUrl = getBubbleFromUrl(bubbles)
      if (bubbleFromUrl && (!focusedBubble || bubbleFromUrl.id !== focusedBubble.id)) {
        this.openBubble(bubbleFromUrl)
      }
      if (!bubbleFromUrl && focusedBubble) {
        this.closeBubble()
      }
      if (!bubbleFromUrl && !focusedBubble && window.location.hash.includes('bubble')) {
        window.location = '#start'
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
      backgroundStyle, isDimensionPickerOpen,
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

        <Header className={isPoetcardCheckoutOpen && 'hidden'}>
          <Dimension onClick={this.onClickDimensionHeader}>
            {dimension}
            {isBubbleBuilderOpen &&
              <DimensionPicker className={isDimensionPickerOpen && 'open'}>
                {Object.keys(DimensionTypes).map(d => (
                  <DimensionChoice key={d} onClick={() => this.onClickDimensionChoice(d)}>
                    {d}
                  </DimensionChoice>
                ))}
              </DimensionPicker>
            }
          </Dimension>
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
        <BubbleGrid />
      </Root>
    )
  }

  @autobind
  onClickDimensionHeader() {
    this.setState({isDimensionPickerOpen: !this.state.isDimensionPickerOpen})
  }

  @autobind
  onClickDimensionChoice(d) {
    this.props.dispatch(openBubbleverse(d))
    this.setState({isDimensionPickerOpen: false})
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
          if (bubble.id === 'buy-poetcards') {
            bubble.type = 'poetcards'
            bubble.buttonType = 'poetcards'
          }
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
    let bubbleId = hashParts[2]
    if (bubbleId === 'buy-postcards') {
      bubbleId = 'buy-poetcards'
    }
    return bubbles.find(b => b.id === bubbleId)
  }
}
