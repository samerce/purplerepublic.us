import React from 'react'

import {
  Root, WordBubble,
} from './styled'

import autobind from 'autobind-decorator'
import {makeEnum} from '../../utils/lang'

const View = makeEnum([
  'show',
  'hide',
])

export default class TalkingBubbles extends React.PureComponent {

  constructor(props) {
    super()
    this.state = {
      view: props.show? View.show : View.hide,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      this.setState({view: View.show})
    } else if (!nextProps.show && this.props.show) {
      this.setState({view: View.hide})
    }
  }

  render() {
    const {view} = this.state
    const {phrase, className} = this.props
    return (
      <Root className={(className || '') + ' view-' + view}>
        {phrase.split(' ').map((word, i) => (
          <WordBubble key={word + i} index={i}>
            {word}
          </WordBubble>
        ))}
      </Root>
    )
  }

}
