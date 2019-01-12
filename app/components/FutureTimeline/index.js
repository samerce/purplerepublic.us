import React from 'react'
import Timeline from '../Timeline'

import {
  Root,
} from './styled'
import {
  IntroBlurb,
} from '../Timeline/styled'

import withTransitions from '../hocs/withTransitions'
import {connect} from 'react-redux'

@connect(d => ({
  isVisible: d.get('timeline').get('futureTimelineVisible')
}))
@withTransitions({prefix: 'futureTimeline'})
export default class FutureTimeline extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {isVisible, show, hide} = this.props
    if (nextProps.isVisible !== isVisible) {
      nextProps.isVisible? show() : hide()
    }
  }

  render() {
    return (
      <Root className={this.props.className}>
        <IntroBlurb>
          the future is education. lucidpath is building its first university in new orleans. and you can be a ground-floor investor. find out more about the plans below.
        </IntroBlurb>

        <Timeline items={TimelineItems} />
      </Root>
    )
  }

}

var TimelineItems = [
  {
    title: 'first book',
    subtitle: 'the paradigm is published'
  },
  {
    title: 'feature film',
    subtitle: 'the journey til now'
  },
  {
    title: 'purle probe',
    subtitle: 'monthly magazine'
  },
  {
    title: 'coffee shop & political hub',
    subtitle: 'mindspace'
  },
  {
    title: 'wet toe lp',
    subtitle: 'debut album'
  },
  {
    title: 'book tour & traveling show',
    subtitle: 'immersive theatre to synthesize it all'
  },
  {
    title: 'purple party',
    subtitle: 'political organization without boundaries',
  },
]
