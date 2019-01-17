import React from 'react'
import PastTimeline from '../PastTimeline'
import FutureTimeline from '../FutureTimeline'

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
@withTransitions({prefix: 'timeline', exitDuration: 1000})
export default class ThenNowWhen extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {pastTimelineVisible, futureTimelineVisible, show, hide} = this.props
    if (nextProps.pastTimelineVisible !== pastTimelineVisible) {
      if (pastTimelineVisible) {
        if (!nextProps.futureTimelineVisible) {
          hide()
        }
      } else show()
    }
    if (nextProps.futureTimelineVisible !== futureTimelineVisible) {
      if (futureTimelineVisible) {
        if (!nextProps.pastTimelineVisible) {
          hide()
        }
      } else show()
    }
  }

  render() {
    const {pastTimelineVisible, futureTimelineVisible, className} = this.props
    const leftClasses = cx({
      active: pastTimelineVisible,
    })
    const rightClasses = cx({
      active: futureTimelineVisible,
    })
    return (
      <Root className={className}>
        <Background />
        <CloseButton onClick={this.closeTimeline}>
          <i className='fa fa-close' />
        </CloseButton>

        <ButtonRoot>
          <Button className={'left ' + leftClasses} onClick={this.togglePast}>
            <i className='fa fa-history' />
            <span>where we've been</span>
          </Button>

          <Button className={'right ' + rightClasses} onClick={this.toggleFuture}>
            <span>where we're going</span>
            <i className='fa fa-grav' />
          </Button>
        </ButtonRoot>

        <PastTimeline />
        <FutureTimeline />
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
    const {pastTimelineVisible, futureTimelineVisible, dispatch, show, hide} = this.props
    if (futureTimelineVisible) this.toggleFuture()
    dispatch(togglePastTimeline())
  }

  @autobind
  toggleFuture() {
    const {futureTimelineVisible, pastTimelineVisible, dispatch, show, hide} = this.props
    if (pastTimelineVisible) this.togglePast()
    dispatch(toggleFutureTimeline())
  }

}
