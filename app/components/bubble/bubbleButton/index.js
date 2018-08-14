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

const ScaleFocused = window.innerWidth <= SCREEN_WIDTH_M? .5 : .25
const xCenter = window.innerWidth / 2
const yCenter = window.innerHeight / 2

const TypeToIcon = {
  video: 'film',
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

export default class BubbleButton extends React.Component {

  constructor(props) {
    super(props)
    this.delay = (Math.random() * .5) + .2
    this.timers = []
    this.styles = {}
    this.state = {
      mode: Mode.willEnter,
    }
  }

  componentDidMount() {
    this.rootNode = findDOMNode(this.ref)
    const bubbleGrid = document.getElementById('bubbleGrid')
    bubbleGrid.addEventListener(
      'scroll',
      _.throttle(this.configureStyles, 300)
    )
    this.configureStyles()

    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter}), DURATION_WILL_ENTER),
      setTimeout(() => this.setState({mode: Mode.defocused}), DURATION_ENTER),
      setTimeout(this.configureStyles, DURATION_ENTER + 700),
    )

    if (this.props.editing) {
      setTimeout(() => this.setState({mode: Mode.editing}), DURATION_ENTER + 700)
    }
  }

  @autobind
  configureStyles() {
    fastdom.measure(() => {
      const rect = this.rootNode.getBoundingClientRect()
      const {styles} = this

      if (!styles.willEnter) {
        styles.willEnter = getWillEnterStyle(rect)
        this.forceUpdate()
      }
      styles.willFocus = getWillFocusStyle(rect, styles.willFocus)
      styles.willDefocus = styles.willFocus
      styles.focused = getFocusedStyle(this.props.nucleus.size, styles.willFocus)
    })
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  render() {
    const {mode} = this.state
    const {
      className, unsavedImageUrl, nucleus,
    } = this.props
    const {
      id, size, title, type,
      Component: BubbleComponent,
    } = nucleus
    const {renderButtonContent} = BubbleComponent

    return (
      <Root
        ref={r => this.ref = r}
        className={'bubble-' + mode}
        style={this.styles[mode] || {}}
        delay={this.delay}
        onClick={this.onClick}>
        {renderButtonContent? renderButtonContent(nucleus) :
          <ImageBubbleButton
            src={unsavedImageUrl || getButtonImageUrl(id)}
            size={size}>
            <Icon className={'fa fa-' + TypeToIcon[type]} />
            <Title><div>{title}</div></Title>
          </ImageBubbleButton>
        }
      </Root>
    )
  }

  @autobind
  onClick() {
    if (this.state.mode === Mode.focused) return
    requestAnimationFrame(this.setWillFocusState)
    setTimeout(() => requestAnimationFrame(this.focusIt))
  }

  @autobind
  setWillFocusState() {
    this.setState({
      mode: Mode.willFocus,
    })
  }

  @autobind
  focusIt() {
    this.setState({
      mode: Mode.focused,
    })
    this.props.onClick()
  }

  @autobind
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

function getWillFocusStyle(rect, cache = {}) {
  return {
    top: rect.top,
    left: rect.left,
  }
}

function getFocusedStyle(size, willFocusStyle) {
  const {left, top} = willFocusStyle
  return {
    ...willFocusStyle,
    transform: `translate(
      ${-left + (window.innerWidth / 2) - (size / 2)}px,
      ${-top - 70}px
    ) scale(${ScaleFocused})`,
  }
}
