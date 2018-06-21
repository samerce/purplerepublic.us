import React from 'react'
import {findDOMNode} from 'react-dom'

import BubbleButton from './bubbleButton'
import BubbleDetails from './bubbleDetails'
import BubbleRelated from './bubbleRelated'
import {BubbleButtonImage} from './bubbleButton/styled'

import {cx} from '../../utils/style'
import {
  Root,
} from './styled'

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

const DURATION_WILL_ENTER = 700
const DURATION_ENTER = DURATION_WILL_ENTER + 700

export default class Bubble extends React.Component {

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
  click() {
    this.onClickBubble()
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

  render() {
    const {mode, bubbleRect} = this.state
    const {isFullscreen, nucleus} = this.props
    const {
      className,
      size = 'medium',
      Component: BubbleComponent,
    } = nucleus
    const {renderButtonContent} = BubbleComponent

    return (
      <Root
        ref={r => this.root = r}
        style={isFullscreen?
          bubbleRect :
          {animationName: this.animationName, ...bubbleRect}}
        className={'bubble-' + mode + ' ' + className}>
        <BubbleButton
          onClick={this.onClickBubble}
          className={mode + ' ' + size}>
          {renderButtonContent?
            renderButtonContent() :
            <BubbleButtonImage
              src={BubbleComponent.getButtonImageUrl(nucleus)}
            />
          }
        </BubbleButton>
        <BubbleDetails
          {...nucleus}
          className={mode}
          onClose={this.defocusIt}
          editing={mode === Mode.editing}>
            <BubbleComponent
              {...nucleus}
              editing={mode === Mode.editing}
              focused={mode === Mode.focused}
            />
          </BubbleDetails>
        <BubbleRelated />
      </Root>
    )
  }

  @autobind
  onClickBubble() {
    const {mode, bubbleRect} = this.state
    if (mode === Mode.focused) {
      this.defocusIt()
    } else {
      requestAnimationFrame(this.setWillFocusState)
      requestAnimationFrame(() => setTimeout(this.focusIt))
    }
  }

  @autobind
  setWillFocusState() {
    const boundingRect = findDOMNode(this.root).getBoundingClientRect()
    const {size: sizeName} = this.props.nucleus
    const size = (sizeName === 'medium')? 210 : (sizeName === 'xlarge')? 310 : 160

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
    this.props.nucleus.onClose && this.props.nucleus.onClose()

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
