import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, BuilderButton, BuilderInput,
} from './styled'

import autobind from 'autobind-decorator'

import {BubbleButtonActionList} from '../actions'

export class BubbleBuilderButtonTool extends React.Component {

  constructor(props) {
    super(props)
    this.actionIndex = -1

    const {actions = []} = props.nucleus
    this.state = {
      title: actions.length > 0? actions[0].text || '' : '',
      link: actions.length > 0? actions[0].props.url || '' : '',
    }
  }


  render() {
    const {title, link} = this.state
    return (
      <Root>
        <BuilderInput
          value={title}
          className='bubbleBuilderInputGrouped'
          placeholder='bubbly button title'
          onChange={this.onTitleChange}
          onFocus={this.setActionIndex}
          onKeyPress={this.onTitleKeyPress}
          onBlur={this.sendChanges}
        />
        <BuilderInput
          value={link}
          innerRef={r => this.linkRef = r}
          className='bubbleBuilderInputGrouped'
          placeholder='bubble button linky'
          onFocus={this.setActionIndex}
          onChange={this.onLinkChange}
          onKeyPress={this.onLinkKeyPress}
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
    const {nucleus, onChangeNucleus} = this.props
    const {actions = []} = nucleus
    const {actionIndex} = this
    const actionProps = {
      type: BubbleButtonActionList.OpenLink,
      text: this.state.title,
      props: {
        url: this.state.link,
      }
    }

    if (!actionProps.text || !actionProps.props.url) return

    if (actionIndex >= 0) {
      actions[actionIndex] = actionProps
    } else {
      actions.push(actionProps)
    }

    onChangeNucleus({
      ...this.props.nucleus,
      actions,
    })
  }

  @autobind
  onTitleChange({target: titleInput}) {
    this.setState({
      title: titleInput.value
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
      link: linkInput.value
    })
  }

  @autobind
  onLinkKeyPress({key, target}) {
    if (key === 'Enter') {
      target.blur()
    }
  }

}

export const BubbleBuilderJourneyTool = ({nucleus, onChangeNucleus}) => {

  const setId = ({target: nextBubbleNameInput}) => {
    onChangeNucleus({
      ...nucleus,
      nextBubbleId: nextBubbleNameInput.value,
    })
  }
  const verify = ({target: nextBubbleNameInput}) => {
    const nextBubbleId = nextBubbleNameInput.value
    if (nextBubbleId && bubbles.find(b => b.id === nextBubbleId) < 0) {
      return alert('ohhh noo, darling, be careful!\nthere\'s no bubble with that name.\n\nchoose one that exists already! xo')
    }
  }

  return (
    <Root>
      <BuilderInput
        value={nucleus.nextBubbleId || ''}
        placeholder='series? "next" bubbly wubbly name here'
        onChange={setId}
        onBlur={verify}
      />
    </Root>
  )
}

export const BubbleBuilderNameTool = ({nucleus, onChangeNucleus}) => {

  const onChange = ({key, target: nameInput}) => {
    if (bubbles[nameInput.value]) {
      return alert('that name is taken. :0\nget more creative!')
    }
    onChangeNucleus({
      ...nucleus,
      id: nameInput.value.replace(/\s/, '-'),
    })
  }

  return (
    <Root>
      <BuilderInput
        id='bubbleBuilderNameToolInput'
        value={nucleus.id || ''}
        placeholder='name your new bubbly wubbly!'
        onChange={onChange}
      />
    </Root>
  )
}

export function BubbleBuilderYouTubeTool({nucleus, onChangeNucleus}) {

  let linkValue = null
  if (nucleus.videoId) {
      linkValue = 'https://www.youtube.com/watch?v=' + nucleus.videoId
  }

  const onBlur = ({target: youtubeLinkInput}) => {
    const videoId = youtubeLinkInput.value.split('/').pop().split('=').pop()
    onChangeNucleus({
      ...nucleus,
      videoId: videoId.length > 0? videoId : undefined,
    })
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(e)
    }
  }

  return (
    <Root>
      <BuilderInput
        defaultValue={linkValue || ''}
        placeholder='youtube linky here'
        onKeyPress={onKeyPress}
        onBlur={onBlur}
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
