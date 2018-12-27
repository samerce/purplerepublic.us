import React from 'react'
import Timeline from '../Timeline'

import {
  Root, IntroBlurb,
} from './styled'

import withTransitions from '../hocs/withTransitions'
import {connect} from 'react-redux'

@connect(d => ({
  isVisible: d.get('timeline').get('pastTimelineVisible')
}))
@withTransitions({prefix: 'pastTimeline', willEnterDuration: 5})
export default class PastTimeline extends React.Component {

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
          it all started one existential day. ricky herbert broke down and made a deal with universe: "if i surrender, promise you'll take care of me." fifty countries later, he started lampshade, the brick-and-mortar manifestation of years of self-discovery and experience with the world's humans. follow us from our latest project, poetcards, back to the beginning of lampshade...
        </IntroBlurb>

        <Timeline items={TimelineItems} />
      </Root>
    )
  }

}

var TimelineItems = [
  {
    title: 'cookies for cambodia',
    subtitle: 'a nonprofit aiding the impoverished',
  },
  {
    title: 'obama for america (ofa)',
    subtitle: 'san francisco chapter 2008',
  },
  {
    title: 'world exploration',
    subtitle: 'over 50 countries'
  },
  {
    title: 'lampshade',
    subtitle: 'pick-your-price coffee shop, bookstore, performance venue, and more'
  },
  {
    title: 'heidelberg',
    subtitle: 'the launch of the political belly'
  },
  {
    title: 'golden lantern',
    subtitle: 'honing the inner drag queen'
  },
  {
    title: 'unrig conference',
    subtitle: 'spreading the love in the political world'
  },
  {
    title: 'trailer trekkin',
    subtitle: 'sm(art) goes on the road'
  },
  {
    title: 'express your mess',
    subtitle: 'experiments in art installation'
  },
  {
    title: 'remodel mikey',
    subtitle: 'rebirth of an angel'
  }
]
