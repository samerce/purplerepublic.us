import React from 'react'
import PastTimeline from '../PastTimeline'

import {cx} from '../../utils/style'
import {
  Root, Button, Background, ButtonRoot, CloseButton,
} from './styled'

import {
  togglePastTimeline, toggleFutureTimeline
} from './actions'

import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import withTransitions from '../hocs/withTransitions'

@connect(d => ({
  pastTimelineVisible: d.get('timeline').get('pastTimelineVisible'),
  futureTimelineVisible: d.get('timeline').get('futureTimelineVisible'),
}))
@withTransitions({prefix: 'timeline'})
export default class ThenNowWhen extends React.Component {

  render() {
    const {pastTimelineVisible, futureTimelineVisible, className} = this.props
    const timelineClasses = cx({
      pastTimeline: pastTimelineVisible,
      futureTimeline: futureTimelineVisible,
    })
    return (
      <Root className={`${className} ${timelineClasses}`}>
        <Background />
        <CloseButton onClick={this.closeTimeline}>
          <i className='fa fa-close' />
        </CloseButton>

        <ButtonRoot>
          <Button className='left past' onClick={this.togglePast}>
            <i className='fa fa-history' />
            <span>where we've been</span>
          </Button>

          <Button className='right future' onClick={this.toggleFuture}>
            <span>where we're going</span>
            <i className='fa fa-grav' />
          </Button>
        </ButtonRoot>

        <PastTimeline />
      </Root>
    )
  }

  @autobind
  closeTimeline() {
    const {pastTimelineVisible, futureTimelineVisible} = this.props
    if (pastTimelineVisible) {
      this.togglePast()
    } else if (futureTimelineVisible) {
      this.toggleFuture()
    }
  }

  @autobind
  togglePast() {
    const {pastTimelineVisible, dispatch, show, hide} = this.props
    dispatch(togglePastTimeline())
    pastTimelineVisible? hide() : show()
  }

  @autobind
  toggleFuture() {
    const {futureTimelineVisible, dispatch, show, hide} = this.props
    dispatch(toggleFutureTimeline())
    futureTimelineVisible? hide() : show()
  }

}
