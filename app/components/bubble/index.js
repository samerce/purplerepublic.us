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

  componentDidMount() {
    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter})),
      setTimeout(() => this.setState({mode: Mode.defocused}), 2700)
    )
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  @autobind
  click() {
    this.onClickBubble()
  }

  render() {
    const {mode} = this.state
    return (
      <Root className={'bubble-' + mode}>
        <BubbleButton
          className={mode}
          onClick={this.onClickBubble} />
        <BubbleDetails
          className={mode}
          onClose={this.defocus}
          actions={[
            {text: 'get tickets!', onClick: this.expand}
          ]} />
        <BubbleRelated />
      </Root>
    )
  }

  @autobind
  onClickBubble() {
    this.setState({mode: Mode.focused})
  }

  @autobind
  defocus() {
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
