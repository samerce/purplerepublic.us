import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent
} from './styled'

import autobind from 'autobind-decorator'

export default class BubbleDetails extends React.Component {

  constructor() {
    super()
    this.state = {
      actionClicked: false,
      isEditingNewAction: false,
    }
  }

  render() {
    const {
      className,
      subtitle,
      title,
      children,
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
        </ContentRoot>
      </Root>
    )
  }

  renderActions() {
    const {
      isEditingNewAction,
      shouldShowLinkInput,
      isLinkInputFocused
    } = this.state
    const {
      actions,
      editing,
    } = this.props

    return (
      <ActionsRoot>
        <Action onClick={this.close}>
          <div>close</div>
        </Action>
        {editing &&
          <Action className='addAction' onClick={this.addAction}>
            {isEditingNewAction?
              <input
                defaultValue='explore' type='text' /> :
              <i className='fa fa-plus' />
            }
            {isEditingNewAction &&
              <input
                className='linkInput'
                defaultValue='link goes here' type='text' />
            }
          </Action>
        }
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

  @autobind
  onClickAction(action) {
    action.onClick()
  }

  @autobind
  addAction() {
    this.setState({
      isEditingNewAction: true,
    })
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
