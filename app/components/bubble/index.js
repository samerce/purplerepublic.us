import React from 'react'
import {findDOMNode} from 'react-dom'

import BubbleButton from './bubbleButton'
import BubbleDetails from './bubbleDetails'
import BubbleRelated from './bubbleRelated'

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
  'willDefocus',
  'expanded',
])

export default class Bubble extends React.Component {

  constructor() {
    super()
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

  componentDidMount() {
    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter})),
      setTimeout(() => this.setState({mode: Mode.defocused}), 700)
    )
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    const {mode, bubbleRect} = this.state
    const {
      renderButtonContent,
      renderExpandedContent,
      renderDescription,
      actions,
      title,
      subtitle,
      className,
      size = 'medium',
    } = this.props.nucleus
    const {isFullscreen} = this.props

    // HACK
    if (actions && !actions[0].onClick) actions[0].onClick = this.expand

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
          {renderButtonContent()}
        </BubbleButton>
        <BubbleDetails
          className={mode}
          onClose={this.defocusIt}
          subtitle={subtitle}
          title={title}
          renderDescription={renderDescription}
          renderExpandedContent={renderExpandedContent}
          actions={actions} />
        <BubbleRelated />
      </Root>
    )
  }

  @autobind
  onClickBubble() {
    const {focused, bubbleRect} = this.state
    if (focused) {
      this.defocusIt()
    } else {
      const boundingRect = findDOMNode(this.root).getBoundingClientRect()
      console.log(boundingRect)
      this.setState({
        mode: Mode.willFocus,
        bubbleRect: {
          top: boundingRect.top,
          left: boundingRect.left - (window.innerWidth / 2) + 100,
        },
      })
      setTimeout(() => this.focusIt())
    }
  }

  focusIt() {
    this.props.onClick()
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
    this.props.onClose()
    this.props.nucleus.onClose && this.props.nucleus.onClose()
    this.setState({
      mode: Mode.willDefocus,
      bubbleRect: this.state.originalBubbleRect,
    })
    setTimeout(() => {
      this.setState({
        mode: Mode.defocused,
        bubbleRect: this.getNewBubbleRect(),
      })
    }, 700)
  }

  @autobind
  expand() {
    this.setState({mode: Mode.expanded})
  }

  @autobind
  shouldShowDetails() {
    const {mode} = this.state
    return mode === Mode.focused || mode === Mode.expanded
  }

  getNewBubbleRect() {
    return {
      top: 50,//Math.round(Math.random() * 50) + 25,
      left: 10,//Math.round(Math.random() * 20) + 10,
    }
  }

}
