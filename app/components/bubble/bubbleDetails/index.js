import React from 'react'
import Spinnie from '../../spinnie'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent, JourneyButtonRoot, BubbleName, BubbleDeleteButton,
} from './styled'

import {canShowEditingTools} from '../../../utils/nav'

import autobind from 'autobind-decorator'

import {BubbleButtonActions} from '../actions'

export default class BubbleDetails extends React.Component {

  constructor() {
    super()
    this.state = {
      actionClicked: false,
      isDeleting: false,
    }
  }

  render() {
    const {
      className,
      subtitle,
      title,
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
            defaultValue={subtitle}
          />
          <Title
            onBlur={e => this.props.onEditingChange({title: e.target.value})}
            onKeyPress={this.onInputKeyPress}
            defaultValue={title}
          />
          <hr />

          {children}

          {this.renderActions()}

          {nextBubbleId && this.renderJourneyButton()}

          {canShowEditingTools() && !editing &&
            <div>
              <BubbleName onClick={this.copyBubbleName}>
                <strong>bubble name: </strong>{this.props.id}
              </BubbleName>
              <BubbleDeleteButton onClick={this.deleteBubble}>
                <div hidden={this.state.isDeleting}>delete bubble</div>
                <Spinnie show={this.state.isDeleting} />
              </BubbleDeleteButton>
            </div>
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
    const {onNext, nextBubbleId} = this.props
    return (
      <JourneyButtonRoot onClick={() => {
        this.close()
        setTimeout(() => onNext(nextBubbleId), 500)
      }}>
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
