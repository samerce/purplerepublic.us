import React from 'react'
import {findDOMNode} from 'react-dom'
import {Helmet} from 'react-helmet-prepend'

import BubbleButton from './bubbleButton'
import BubbleDetails from './bubbleDetails'
import BubbleRelated from './bubbleRelated'

import {
  Root,
} from './styled'
import {ImageBubbleButton} from './bubbleButton/styled'

import {makeEnum} from '../../utils/lang'
import {getButtonImageUrl} from '../../utils/bubbleverse'
import autobind from 'autobind-decorator'
import {makeJiggler} from '../../global-styles'
import _ from 'lodash'
import fastdom from 'fastdom'
import {SCREEN_WIDTH_M} from '../../global/constants'

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
const ShouldUpdateKeys = [
  'isFullscreen', 'unsavedImageUrl', 'nucleus', 'onNext', 'onEdit', 'editing',
]

export default class Bubble extends React.PureComponent {

  constructor(props) {
    super(props)
    this.timers = []
    this.jiggler = makeJiggler()
    this.defocusedStyle = this.getNewRootStyle()
    this.state = {
      mode: Mode.willEnter,
      rootStyle: this.defocusedStyle,
    }
  }

  @autobind
  open() {
    this.onClickBubble()
  }

  @autobind
  close() {
    this.defocusIt()
  }

  @autobind
  edit() {
    this.setState({
      mode: Mode.editing,
      rootStyle: {
        top: 0,
        left: 0,
      },
    }, () => {
      const {edit} = this.bubbleComponentRef
      edit && edit()
    })
  }

  @autobind
  publish() {
    if (this.bubbleComponentRef) {
      const {publish} = this.bubbleComponentRef
      if (publish) return publish()
    }
    return new Promise(resolve => resolve())
  }

  componentDidMount() {
    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter}), DURATION_WILL_ENTER),
      setTimeout(() => this.setState({mode: Mode.defocused}), DURATION_ENTER)
    )

    this.rootNode = findDOMNode(this.root)
    this.configureStyles()
    document.getElementById('bubbleGrid').addEventListener(
      'scroll',
      _.throttle(this.configureStyles, 300)
    )
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false
    ShouldUpdateKeys.forEach(
      key => shouldUpdate = shouldUpdate || nextProps[key] !== this.props[key]
    )
    return shouldUpdate || this.state !== nextState
  }

  @autobind
  configureStyles() {
    fastdom.measure(() => {
      const boundingRect = this.rootNode.getBoundingClientRect()
      let {size} = this.props.nucleus
      if (window.innerWidth <= SCREEN_WIDTH_M) {
        size = (3/5) * size
      }

      this.willFocusStyle = {
        top: boundingRect.top - window.scrollY,
        left: boundingRect.left + (-window.innerWidth / 2)  + (size / 2),
      }
      this.focusedStyle = {
        ...this.willFocusStyle,
        transform: `translate(
          ${-this.willFocusStyle.left}px,
          ${-this.willFocusStyle.top}px
        )`
      }
    })
  }

  render() {
    const {mode, rootStyle} = this.state
    const {isFullscreen, unsavedImageUrl, nucleus, onNext, onEdit} = this.props
    const isEditing = mode === Mode.editing
    const isFocused = mode === Mode.focused

    const {
      id,
      size,
      title,
      description,
      Component: BubbleComponent,
    } = nucleus
    const {renderButtonContent} = BubbleComponent

    return (
      <Root
        ref={r => this.root = r}
        style={rootStyle}
        jiggler={this.jiggler}
        isFullscreen={isFullscreen}
        className={'bubble-' + mode + ' bubbleButton-' + id}>

        {isFocused &&
          <Helmet>
            <meta property='og:type' content='article' />
            <meta property='og:title' content={title} />
            <meta property='og:image' content={getButtonImageUrl(id)} />
            <meta property='og:url' content={getFacebookUrl(id)} />
          </Helmet>
        }

        <BubbleButton
          {...nucleus}
          className={mode}
          unsavedImageUrl={unsavedImageUrl}
          onClick={this.onClickBubble}>
          {renderButtonContent? renderButtonContent(nucleus) : undefined}
        </BubbleButton>
        <BubbleDetails
          {...nucleus}
          className={mode}
          onNext={onNext}
          onEdit={onEdit}
          onClose={this.defocusIt}
          editing={isEditing}>
            <BubbleComponent
              {...nucleus}
              editing={isEditing}
              focused={isFocused}
              ref={r => this.bubbleComponentRef = r}
            />
        </BubbleDetails>
        {/* <BubbleRelated /> */}
      </Root>
    )
  }

  @autobind
  onClickBubble() {
    if (this.state.mode === Mode.focused) return
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble opened',
      eventLabel: this.props.nucleus.id,
    })

    requestAnimationFrame(this.setWillFocusState)
    setTimeout(() => requestAnimationFrame(this.focusIt))
  }

  @autobind
  setWillFocusState() {
    this.setState({
      mode: Mode.willFocus,
      rootStyle: this.willFocusStyle,
    })
  }

  @autobind
  focusIt() {
    this.props.onOpen && this.props.onOpen()
    this.setState({
      mode: Mode.focused,
      rootStyle: this.focusedStyle,
    })
  }

  @autobind
  defocusIt() {
    if (this.state.mode === Mode.editing) return
    ga('send', 'event', {
      eventCategory: 'bubbles',
      eventAction: 'bubble closed',
      eventLabel: this.props.nucleus.id,
    })

    this.props.onClose && this.props.onClose()

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
      rootStyle: this.willFocusStyle,
    })
  }

  @autobind
  setDefocusedState() {
    this.setState({
      mode: Mode.defocused,
      rootStyle: this.defocusedStyle,
    })
  }

  getNewRootStyle() {
    return {
      top: Math.round(Math.random() * 20) + 15,
      left: 0,//Math.round(Math.random() * 40) + 10,
    }
  }

}

function getFacebookUrl(bubble) {
  return window.location.origin + '/?bubble=' + bubble + '&_escaped_fragment_=start'
}
