import React from 'react'
import BubbleButton from './bubbleButton'
import BubbleDetails from './bubbleDetails'
import BubbleRelated from './bubbleRelated'

import {cx} from '../../utils/style'
import {
  Root,
} from './styled'

import {makeEnum} from '../../utils/lang'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'willEnter',
  'enter',
  'defocused',
  'focused',
  'expanded',
])

export default class Bubble extends React.Component {

  constructor() {
    super()
    this.timers = []
    this.state = {
      mode: Mode.willEnter,
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
    const {mode} = this.state
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

    // HACK
    if (actions && !actions[0].onClick) actions[0].onClick = this.expand

    return (
      <Root className={'bubble-' + mode + ' ' + className}>
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
    if (this.state.focused) {
      this.defocusIt()
    } else {
      this.focusIt()
    }
  }

  focusIt() {
    this.props.onClick()
    this.setState({mode: Mode.focused})
  }

  @autobind
  defocusIt() {
    this.props.onClose()
    this.props.nucleus.onClose && this.props.nucleus.onClose()
    this.setState({mode: Mode.defocused})
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

}
