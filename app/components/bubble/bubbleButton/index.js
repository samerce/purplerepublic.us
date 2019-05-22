import React from 'react'
import {findDOMNode} from 'react-dom'

import {
  Root, Icon, ImageBubbleButton, Title,
} from './styled'

import {makeEnum} from '../../../utils/lang'
import {getButtonImageUrl} from '../../../utils/bubbleverse'
import _ from 'lodash'
import fastdom from 'fastdom'
import autobind from 'autobind-decorator'

import {SCREEN_WIDTH_M} from '../../../global/constants'

import resizable from '../../hocs/resizable'
import {connect} from 'react-redux'

const ScaleFocused = window.innerWidth <= SCREEN_WIDTH_M? .5 : .25
const xCenter = window.innerWidth / 2
const yCenter = window.innerHeight / 2

const TypeToIcon = {
  video: 'youtube-play',
  writing: 'book',
  gallery: 'camera-retro',
  words: 'book',
}

const Mode = makeEnum([
  'willEnter',
  'enter',
  'defocused',
  'willFocus',
  'focused',
  'editing',
  'willDefocus',
])

const DURATION_WILL_ENTER = 1800
const DURATION_ENTER = DURATION_WILL_ENTER + 700
const getBubbleSize = () => window.innerWidth <= SCREEN_WIDTH_M? 60 : 90

@connect(d => ({
  activeBubble: d.get('bubbleverse').get('activeBubble'),
}))
@resizable()
export default class BubbleButton extends React.Component {

  constructor(props) {
    super(props)
    this.delay = (Math.random() * .5) + .2
    this.timers = []
    this.styles = {}
    this.state = {
      mode: Mode.defocused,
      size: getBubbleSize(),
    }
  }

  onResize() {
    this.setState({size: getBubbleSize()})
  }

  componentDidMount() {
    this.timers.push(
      setTimeout(() => {
        if (this.props.editing) {
          this.setState({mode: Mode.editing})
        }
      }, DURATION_ENTER + 700),
    )
  }

  componentWillReceiveProps(nextProps) {
    const {activeBubble, nucleus, isBubbleBuilderOpen} = this.props
    const {activeBubble: nextActiveBubble} = nextProps
    if (nextActiveBubble) {
      if (nextActiveBubble.id === nucleus.id) {
        this.focusIt()
      } else {
        this.defocusIt()
      }
    } else if (activeBubble && activeBubble.id === nucleus.id) {
      this.defocusIt()
    }
    if (nextProps.isBubbleBuilderOpen && !isBubbleBuilderOpen) {
      this.setState({mode: Mode.willEnter})
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  render() {
    const {
      mode, size,
    } = this.state
    const {
      className, imageUrl, nucleus,
    } = this.props
    const {
      id, title, type,
      ButtonComponent,
    } = nucleus

    return (
      <Root
        ref={r => this.ref = r}
        className={className + ' bubble-' + mode}
        style={this.styles[mode] || {}}
        delay={this.delay}>

        {ButtonComponent?
          <ButtonComponent
            size={size}
            nucleus={nucleus}
            onClick={this.onClick} />
        :
        <ImageBubbleButton
          size={size}
          onClick={this.onClick}
          src={imageUrl || getButtonImageUrl(id)}>
            <Icon className={'fa fa-' + TypeToIcon[type]} />
            <Title><div>{title}</div></Title>
          </ImageBubbleButton>
        }
      </Root>
    )
  }

  @autobind
  onClick() {
    const {nucleus, disabled} = this.props
    if (disabled) return
    requestAnimationFrame(() => window.location = '#start/bubble/' + nucleus.id)
  }

  focusIt() {
    this.setState({
      mode: Mode.focused,
    })
  }

  defocusIt() {
    if (this.state.mode === Mode.editing) return

    const {bubbleComponentRef} = this
    bubbleComponentRef && bubbleComponentRef.onClose &&
      bubbleComponentRef.onClose()

    requestAnimationFrame(this.setWillDefocusState)
    requestAnimationFrame(() => setTimeout(this.setDefocusedState, 400))
  }

  @autobind
  setWillDefocusState() {
    this.setState({
      mode: Mode.willDefocus,
    })
  }

  @autobind
  setDefocusedState() {
    this.setState({
      mode: Mode.defocused,
    })
  }

}

function getWillEnterStyle(rect) {
  const xTranslate = xCenter - rect.left - (rect.width / 2)
  const yTranslate = yCenter - rect.top - (rect.height / 2)
  return {
    transform: `
      translate(${xTranslate}px, ${yTranslate}px) scale(0)
    `,
  }
}

function getWillFocusStyle(rect) {
  return {
    top: rect.top,
    left: rect.left,
  }
}

function getFocusedStyle(size, willFocusStyle) {
  const {left, top} = willFocusStyle
  const topFudge = window.innerWidth <= SCREEN_WIDTH_M? 10 : 70
  return {
    ...willFocusStyle,
    transform: `translate(
      ${-left + (window.innerWidth / 2) - (size / 2)}px,
      ${-top - topFudge}px
    ) scale(${ScaleFocused})`,
  }
}
