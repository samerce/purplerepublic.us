import React from 'react';
import {
  Input,
} from './styled'

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

export default class SlackInput extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
    }
  }

  render() {
    const {placeholder, isRight} = this.props
    return (
      <Input
        className={isRight && 'right'}
        value={this.state.input}
        onChange={e => this.updateInput(e)}
        onKeyPress={e => this.onSendMessage(e)}
        placeholder={this.props.placeholder || 'What do you think?'} />
    )
  }


  updateInput(e) {
    this.setState({input: e.target.value})
  }

  onSendMessage(e) {
    if (e.which === 13) {
      this.setState({input: ''})

      fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text: this.state.input,
          channel: '#' + this.props.channel,
        })
      })
    }
  }

}
