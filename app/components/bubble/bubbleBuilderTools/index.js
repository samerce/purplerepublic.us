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
      props: {
        url: actions.length > 0? actions[0].props.url || '' : '',
      }
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
    const {actionIndex} = this

    // if (!actionProps.text || !actionProps.props.url) return
    //
    // if (actionIndex >= 0) {
    //   actions[actionIndex] = actionProps
    // } else {
    //   actions.push(actionProps)
    // }

    if (actions.length) {
      actions[0] = action
    } else {
      actions.push(action)
    }

    onChangeNucleus({
      ...nucleus,
      actions,
    })
  }

  @autobind
  onTitleChange({target: titleInput}) {
    this.setState({
      action: {
        ...this.state.action,
        text: titleInput.value,
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
  onLinkChange({target: linkInput}) {
    this.setState({
      action: {
        ...this.state.action,
        props: {
          url: linkInput.value,
        }
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
  isExistingBubble,
  verifyBubbleIdExists,
}) => {
  const onChange = ({key, target: nameInput}) => {
    if (isExistingBubble) {
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

export class BubbleBuilderYouTubeTool extends React.PureComponent {

  constructor(props) {
    super(props)
    const {nucleus} = props
    this.state = {
      link: (nucleus && nucleus.videoId)? this.getLinkValue(nucleus) : ''
    }
  }

  getLinkValue({videoId}) {
    return 'https://www.youtube.com/watch?v=' + videoId
  }

  render() {
    const {link} = this.state
    return (
      <Root>
        <TextInput
          value={link}
          placeholder='youtube link'
          onChange={e => this.setState({link: e.target.value})}
          onKeyPress={onKeyPress}
          onBlur={this.onBlur}
        />
      </Root>
    )
  }

  @autobind
  onBlur({target: linkInput}) {
    const videoId = linkInput.value.split('/').pop().split('=').pop()
    this.props.onChangeNucleus({
      ...this.props.nucleus,
      videoId: videoId.length > 0? videoId : undefined,
    })
  }

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
