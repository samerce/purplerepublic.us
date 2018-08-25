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
import {HeroBubbleConfig} from '../config'

import {SCREEN_WIDTH_M} from '../../../global/constants'

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
      setTimeout(() => {
        this.configureStyles()
        if (this.props.editing) {
          this.setState({mode: Mode.editing})
        }
      }, DURATION_ENTER + 700),
    )
  }

  @autobind
  configureStyles() {
    fastdom.measure(() => {
      const rect = this.rootNode.getBoundingClientRect()
      const {styles} = this

      styles.willFocus = getWillFocusStyle(rect)
      styles.willDefocus = styles.willFocus
      styles.focused = getFocusedStyle(this.props.nucleus.size, styles.willFocus)

      if (!styles.willEnter) {
        styles.willEnter = getWillEnterStyle(rect)
        this.forceUpdate()
      }
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
      ButtonComponent,
    } = nucleus
    const heroConfig = HeroBubbleConfig[id]
    const Hero = heroConfig && heroConfig.Component

    return (
      <Root
        ref={r => this.ref = r}
        className={'bubble-' + mode}
        style={this.styles[mode] || {}}
        delay={this.delay}>

        {Hero && <Hero config={heroConfig} />}

        {ButtonComponent?
          <ButtonComponent
            nucleus={nucleus}
            onClick={this.onClick}
            heroConfig={heroConfig} />
          :
          <ImageBubbleButton
            onClick={this.onClick}
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
