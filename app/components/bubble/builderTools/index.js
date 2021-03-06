import React from 'react'

import {
  Root, BuilderButton, BuilderInputLink
} from './styled'
import {TextInput} from '../../../global/styled'

import autobind from 'autobind-decorator'
import {BubbleButtonActionList} from '../config'

const onKeyPress = ({key, target}) => (key === 'Enter') && target.blur()

export class BubbleBuilderButtonTool extends React.PureComponent {

  constructor(props) {
    super(props)
    this.actionIndex = -1
    this.state = {
      action: this.getActionState(props),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({action: this.getActionState(this.props)})
    }
  }

  getActionState(props) {
    const {actions = []} = props.nucleus
    return {
      type: BubbleButtonActionList.OpenLink,
      text: actions.length > 0? actions[0].text || '' : '',
      props: actions.length > 0? {...actions[0].props} : {},
    }
  }

  render() {
    const {text, props} = this.state.action
    return (
      <Root>
        <TextInput
          value={text}
          placeholder='action title'
          onChange={this.onTitleChange}
          onKeyPress={this.onTitleKeyPress}
          onBlur={this.sendChanges}
        />
        <BuilderInputLink
          value={props.url}
          innerRef={r => this.linkRef = r}
          placeholder='action link'
          onChange={this.onLinkChange}
          onKeyPress={onKeyPress}
          onBlur={this.sendChanges}
        />
      </Root>
    )
  }

  @autobind
  setActionIndex() {
    const {actions} = this.props.nucleus
    if (!actions) return

    this.actionIndex = actions.findIndex(
      a => a.text === this.state.title
    )
  }

  @autobind
  sendChanges() {
    const {action} = this.state
    const {nucleus, onChangeNucleus} = this.props
    const {actions = []} = nucleus

    if (!action.text || !action.text.length) return

    if (actions.length) {
      actions[0] = action
    } else {
      actions.push(action)
    }

    onChangeNucleus({actions})
  }

  @autobind
  onTitleChange({target}) {
    const text = target.value
    if (!text || !text.trim().length) {
      return
    }
    this.setState({
      action: {
        ...this.state.action,
        text,
      }
    })
  }

  @autobind
  onTitleKeyPress({key}) {
    if (key === 'Enter') {
      this.linkRef.focus()
    }
  }

  @autobind
  onLinkChange({target}) {
    const url = target.value
    if (!url || !url.trim().length) {
      return
    }
    this.setState({
      action: {
        ...this.state.action,
        props: {url},
      }
    })
  }

}

export const BubbleBuilderJourneyTool = ({
  nucleus,
  onChangeNucleus,
  verifyBubbleIdExists,
}) => {

  const setId = ({target: nextBubbleNameInput}) => {
    onChangeNucleus({
      ...nucleus,
      nextBubbleId: nextBubbleNameInput.value,
    })
  }
  const verify = ({target: nextBubbleNameInput}) => {
    const nextBubbleId = nextBubbleNameInput.value
    if (nextBubbleId && !verifyBubbleIdExists(nextBubbleId)) {
      nextBubbleNameInput.value = ''
      nextBubbleNameInput.focus()
      return alert('ohhh noo, darling, be careful!\nthere\'s no bubble with that name.\n\nchoose one that exists already! xo')
    }
  }

  return (
    <Root>
      <TextInput
        value={nucleus.nextBubbleId || ''}
        placeholder='next bubble'
        onChange={setId}
        onKeyPress={onKeyPress}
        onBlur={verify}
      />
    </Root>
  )
}

export const BubbleBuilderNameTool = ({
  nucleus,
  onChangeNucleus,
  verifyBubbleIdExists,
}) => {
  const onChange = ({key, target: nameInput}) => {
    if (nucleus.existingIndex >= 0) {
      return alert(
        "you can't change the name of an existing bubble.\nsorry, love :("
      )
    }

    const newBubbleId = nameInput.value.replace(/\s/, '-')
    if (verifyBubbleIdExists(newBubbleId)) {
      nameInput.focus()
      alert('that name is taken. :0\nget more creative!')
      return
    }

    onChangeNucleus({
      ...nucleus,
      id: newBubbleId,
    })
  }

  return (
    <Root>
      <TextInput
        id='bubbleBuilderNameToolInput'
        value={nucleus.id || ''}
        placeholder='url'
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Root>
  )
}

export class BubbleBuilderSocialMediaTool extends React.Component {

  render() {
    return (
      <Root>
        <BuilderButton>
          share on these networks...
        </BuilderButton>
      </Root>
    )
  }

}
