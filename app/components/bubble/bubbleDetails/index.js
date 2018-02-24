import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot, Title, Description, ActionsRoot, Action, Subtitle, ExpandedContent
} from './styled'

import autobind from 'autobind-decorator'

export default class BubbleDetails extends React.Component {

  render() {
    let {actions, onClose, className} = this.props
    return (
      <Root className={className}>
        <ContentRoot>
          <Subtitle>our next event</Subtitle>
          <Title>they'll tell the story of tonight</Title>
          <hr />
          <Description>
            a drag queen's rise to senate! drag. music. poetry. food. drink. art. dialogue. dance. democracy!<br />
            get your tickets today!<br />
            <strong>cafe istanbul — march 29th — 6pm</strong>
          </Description>
          <ExpandedContent>
            <EventBriteCheckout />
          </ExpandedContent>
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

var EventBriteCheckout = () => (
  <div id="eventbrite-widget-container-43379695838" className='event-brite-checkout'></div>
)
