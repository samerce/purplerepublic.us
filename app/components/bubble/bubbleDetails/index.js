import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent
} from './styled'

import autobind from 'autobind-decorator'

export default class BubbleDetails extends React.Component {

  render() {
    const {
      actions,
      onClose,
      className,
      renderDescription,
      renderExpandedContent,
      subtitle,
      title,
    } = this.props
    return (
      <Root className={className}>
        <ContentRoot>
          <Subtitle>{subtitle}</Subtitle>
          <Title>{title}</Title>
          <hr />
          <Description>
            {renderDescription()}
          </Description>
          {renderExpandedContent && 
            <ExpandedContent>
              {renderExpandedContent()}
            </ExpandedContent>
          }
          <ActionsRoot>
            <Action onClick={onClose}>
              <div>close</div>
            </Action>
            {actions.length > 1 &&
              <Action
                className={actions[1].className}
                onClick={() => this.onClickAction(actions[1])}>
                <div>{actions[1].text}</div>
              </Action>
            }
            {actions.length > 0 &&
              <Action
                className={actions[0].className}
                onClick={() => this.onClickAction(actions[0])}>
                <div>{actions[0].text || 'explore'}</div>
              </Action>
            }
          </ActionsRoot>
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  onClickAction(action) {
    action.onClick()
  }

}

BubbleDetails.defaultProps = {
  actions: [],
}
