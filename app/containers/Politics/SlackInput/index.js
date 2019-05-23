import React from 'react';
import {
  Input,
} from './styled'

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

export default class SlackInput extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      input: '',
      isSending: false,
      justSent: false,
    }
  }

  post(value) {
    const input = document.getElementById(this.getElementId())
    this.sendToSlack(input, value)
  }

  render() {
    const {placeholder, isRight, className = ''} = this.props
    const {input, isSending, justSent} = this.state
    const placeholderText = isSending? 'sending your thoughts...' :
      justSent? 'got it! anything else? :)' : placeholder || 'what do you think?'
    return (
      <Input
        id={this.getElementId()}
        className={`${className} ${isRight && 'right'} ${isSending && 'sending'} ${justSent && 'justSent'}`}
        value={input}
        onChange={e => this.onChange(e)}
        onKeyPress={e => this.onKeyPress(e)}
        placeholder={placeholderText} />
    )
  }

  onChange(e) {
    if (this.state.isSending) return
    this.setState({input: e.target.value})
  }

  onKeyPress(e) {
    const {isSending, justSent, input} = this.state

    if (isSending) return
    if (justSent) this.setState({justSent: false})

    if (input.trim().length > 0 && e.which === 13) {
      this.sendToSlack(e.target, e.target.value)
    }
  }

  sendToSlack(target, value) {
    target.blur()
    this.setState({input: '', isSending: true})

    fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        text: value,
        channel: '#' + this.props.channel,
      })
    }).then(() => {
      setTimeout(() => {
        target.focus()
        this.setState({isSending: false, justSent: true})
      }, 1000)
      setTimeout(() => this.setState({justSent: false}), 4000)
    })
  }

  getElementId() {
    const {id, channel} = this.props
    return id || channel + 'SlackInput'
  }

}
