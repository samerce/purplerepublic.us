import React from 'react'
import {findDOMNode} from 'react-dom'

import BubbleButton from './bubbleButton'
import BubbleDetails from './bubbleDetails'
import BubbleRelated from './bubbleRelated'

import {cx} from '../../utils/style'
import {
  Root,
} from './styled'
import {ImageBubbleButton} from './bubbleButton/styled'

import {makeEnum} from '../../utils/lang'
import autobind from 'autobind-decorator'
import {makeJiggler} from '../../global-styles'

const Mode = makeEnum([
  'willEnter',
  'enter',
  'defocused',
  'willFocus',
  'focused',
  'editing',
  'willDefocus',
  'expanded',
])

const DURATION_WILL_ENTER = 1800
const DURATION_ENTER = DURATION_WILL_ENTER + 700

export default class Bubble extends React.PureComponent {

  constructor(props) {
    super(props)
    this.timers = []
    this.animationName = makeJiggler()
    this.state = {
      mode: Mode.willEnter,
      bubbleRect: this.getNewBubbleRect(),
      originalBubbleRect: {},
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

  edit() {
    this.setState({
      mode: Mode.editing,
      bubbleRect: {
        top: 0,
        left: 0,
      },
    })
  }

  componentDidMount() {
    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter}), DURATION_WILL_ENTER),
      setTimeout(() => this.setState({mode: Mode.defocused}), DURATION_ENTER)
    )
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  @autobind
  publish() {
    const {publish} = this.bubbleComponentRef
    if (publish) return publish()
    else return new Promise(resolve => resolve())
  }

  render() {
    const {mode, bubbleRect} = this.state
    const {isFullscreen, unsavedImageUrl, nucleus, onNext, onEdit} = this.props
    const isEditing = mode === Mode.editing
    const isFocused = mode === Mode.focused

    const {
      id,
      size,
      Component: BubbleComponent,
    } = nucleus
    const {renderButtonContent} = BubbleComponent

    return (
      <Root
        ref={r => this.root = r}
        style={isFullscreen?
          bubbleRect :
          {animationName: this.animationName, ...bubbleRect}}
        className={'bubble-' + mode + ' bubbleButton-' + id}>
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
    if (mode === Mode.focused) return
    const {mode, bubbleRect} = this.state
    requestAnimationFrame(this.setWillFocusState)
    setTimeout(() => requestAnimationFrame(this.focusIt))
  }

  @autobind
  setWillFocusState() {
    const boundingRect = findDOMNode(this.root).getBoundingClientRect()
    const {size} = this.props.nucleus

    this.setState({
      mode: Mode.willFocus,
      bubbleRect: {
        top: boundingRect.top,
        left: boundingRect.left - (window.innerWidth / 2) + (size / 2),
      },
    })
  }

  @autobind
  focusIt() {
    this.props.onOpen && this.props.onOpen()
    this.setState({
      mode: Mode.focused,
      bubbleRect: {
        top: 0,
        left: 0,
      },
      originalBubbleRect: this.state.bubbleRect,
    })
  }

  @autobind
  defocusIt() {
    if (this.state.mode === Mode.editing) return

    this.props.onClose && this.props.onClose()

    const {bubbleComponentRef} = this
    bubbleComponentRef && bubbleComponentRef.onClose &&
      bubbleComponentRef.onClose()

    requestAnimationFrame(this.setWillDefocusState)
    requestAnimationFrame(() => setTimeout(this.setDefocusedState, 700))
  }

  @autobind
  setWillDefocusState() {
    this.setState({
      mode: Mode.willDefocus,
      bubbleRect: this.state.originalBubbleRect,
    })
  }

  @autobind
  setDefocusedState() {
    this.setState({
      mode: Mode.defocused,
      bubbleRect: this.getNewBubbleRect(),
    })
  }

  getNewBubbleRect() {
    return {
      top: Math.round(Math.random() * 20) + 50,
      left: 10,//Math.round(Math.random() * 40) + 10,
    }
  }

}
