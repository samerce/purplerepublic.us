import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent, JourneyButtonRoot, BubbleName,
} from './styled'

import {canShowEditingTools} from '../../../utils/nav'

import autobind from 'autobind-decorator'

import {BubbleButtonActions} from '../actions'

export default class BubbleDetails extends React.Component {

  constructor() {
    super()
    this.state = {
      actionClicked: false,
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
            <BubbleName><strong>bubble name:</strong> {this.props.id}</BubbleName>
          }
        </ContentRoot>

      </Root>
    )
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
