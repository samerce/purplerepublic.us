import React from 'react'
import Spinnie from '../../spinnie'

import {
  Root, ContentRoot, Title, ActionsRoot, Action, Subtitle, JourneyButtonRoot, BubbleNameButton, BubbleEditButton, BubbleDeleteButton,
  BubbleOptions,
} from './styled'
import {Description} from '../bubbleItems/styled'

import {canShowEditingTools} from '../../../utils/nav'

import autobind from 'autobind-decorator'

import {BubbleButtonActions} from '../actions'

export default class BubbleDetails extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      actionClicked: false,
      isDeleting: false,
      title: props.title,
      subtitle: props.subtitle,
      bubbleOptionsStyle: getBubbleOptionsStyle(props.nextBubbleId),
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {}

    if (this.props.title !== nextProps.title) {
      newState.title = nextProps.title
    }
    if (this.props.subtitle !== nextProps.title) {
      newState.subtitle = nextProps.subtitle
    }
    if (this.props.nextBubbleId !== nextProps.nextBubbleId) {
      newState.bubbleOptionsStyle = getBubbleOptionsStyle(nextProps.nextBubbleId)
    }

    Object.keys(newState).length > 0 && this.setState(newState)
  }

  render() {
    const {title, subtitle, bubbleOptionsStyle} = this.state
    const {
      className,
      children,
      nextBubbleId,
      editing,
    } = this.props

    return (
      <Root className={className}>
        <ContentRoot>
          <Subtitle
            onBlur={e => this.props.onEditingChange({subtitle: e.target.value})}
            onKeyPress={this.onInputKeyPress}
            onChange={e => this.setState({subtitle: e.target.value})}
            value={subtitle}
          />
          <Title
            onBlur={e => this.props.onEditingChange({title: e.target.value})}
            onKeyPress={this.onInputKeyPress}
            onChange={e => this.setState({title: e.target.value})}
            value={title}
          />
          <hr />

          {children}

          {this.renderActions()}

          {nextBubbleId && this.renderJourneyButton()}

          {canShowEditingTools() && !editing &&
            <BubbleOptions style={bubbleOptionsStyle}>
              <BubbleNameButton onClick={this.copyBubbleName}>
                {this.props.id}
              </BubbleNameButton>
              <BubbleEditButton onClick={this.props.onEdit}>
                edit bubble
              </BubbleEditButton>
              <BubbleDeleteButton onClick={this.deleteBubble}>
                <div hidden={this.state.isDeleting}>delete bubble</div>
                <Spinnie show={this.state.isDeleting} />
              </BubbleDeleteButton>
            </BubbleOptions>
          }
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  deleteBubble() {
    if (!confirm(
      'the bubble will be gone forever!\n\n click OK to destroy it. D:'
    )) return
    if (this.state.isDeleting) return

    this.setState({isDeleting: true})
    fetch('/bubbles.delete', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bubbleId: this.props.id,
      }),
    }).then(() => window.location.reload())
  }

  renderActions() {
    const {
      actions,
    } = this.props

    return (
      <ActionsRoot>
        <Action onClick={this.close}>
          <div>close</div>
        </Action>
        {actions.length > 1 &&
          <Action
            className={actions[1].className}
            onClick={() => this.onClickAction(actions[1])}>
            <div>{actions[1].text}</div>
          </Action>
        }
        {actions.length > 0 && !this.state.actionClicked &&
          <Action
            className={actions[0].className}
            onClick={() => this.onClickAction(actions[0])}>
            <div>{actions[0].text || 'explore'}</div>
          </Action>
        }
      </ActionsRoot>
    )
  }

  renderJourneyButton() {
    return (
      <JourneyButtonRoot onClick={this.onClickJourneyButton}>
        <div>continue journey...</div>
        <i className='fa fa-caret-right' />
      </JourneyButtonRoot>
    )
  }

  @autobind
  onClickAction(action) {
    BubbleButtonActions[action.type](action.props)
  }

  @autobind
  onClickJourneyButton() {
    const {editing, onNext, nextBubbleId} = this.props
    if (!this.editing) onNext(nextBubbleId)
  }

  @autobind
  close() {
    this.props.onClose()
  }

  @autobind
  onInputKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

}

function getBubbleOptionsStyle(nextBubbleId) {
  return {
    marginTop: nextBubbleId? 100 : 20,
  }
}

BubbleDetails.defaultProps = {
  actions: [],
}
