import React from 'react'
import Spinnie from '../../spinnie'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent, JourneyButtonRoot, BubbleName, BubbleDeleteButton,
  BubbleEditButton, BubbleOptions,
} from './styled'

import {canShowEditingTools} from '../../../utils/nav'

import autobind from 'autobind-decorator'

import {BubbleButtonActions} from '../actions'

export default class BubbleDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      actionClicked: false,
      isDeleting: false,
      title: props.title,
      subtitle: props.subtitle,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subtitle: nextProps.subtitle,
      title: nextProps.title,
    })
  }

  render() {
    const {title, subtitle} = this.state
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
            <BubbleOptions style={{
              marginTop: nextBubbleId? 100 : 20,
            }}>
              <BubbleName onClick={this.copyBubbleName}>
                <span>name: </span>{this.props.id}
              </BubbleName>
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

BubbleDetails.defaultProps = {
  actions: [],
}
