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
          the future is education. nomaya is building its first university in new orleans. and you can be a ground-floor investor. find out more about the plans below.
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
    title: 'book tour & traveling show',
    subtitle: 'immersive theatre to synthesize it all'
  },
  {
    title: 'manifesting the minority',
    subtitle: 'a leadership program for the underdogs',
    render: () => 'taking to the streets to empower queers, people of color, youth, and disenfranchised to run for office and take positions of power.',
  },
  {
    title: 'faerie brigade',
    subtitle: 'mashing silly & smart to bring happy art to the people',
    render: () => 'programs across the country to send brigades of wildly costumed, effervescent folk out into the streets to spread joy and knowledge. from drag faeries who pick up trash to vaudeville mimes who offer gazing meditation. plus social media firestorm to get people to write poetcards to each other and change the conversation on politics and philosophy and life.',
  },
  {
    title: 'art installs',
    subtitle: 'mind-bending installations across the globe',
    render: () => 'massive constructions across the nation that make you think about the meaninglessness of existence, while inspiring you to create your own meaning. these will be entry points to the vast mystery that unfolds online and subsequently in the communities that host them. the first phase includes:',
  },
  {
    title: 'film series',
    subtitle: 'an endlessly unfolding journey',
    render: () => 'several episodic reality shows following the many facets of nomaya. from the faerie brigade to manifesting minorities to the art installs and traveling show.',
  },
  {
    title: 'immortality — the play',
    subtitle: 'the paradigm writ for the stage',
    render: () => 'a queer, exhilarating ride through the mind of non-duality. a platform for the political party and process of the future. an endlessly evolving scene for a collective conversation. basically, the book tour goes broadway.',
  },
  {
    title: 'purple probe',
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
    title: 'purple party',
    subtitle: 'political organization without boundaries',
  },
  {
    title: 'sandcastle university',
    subtitle: 'the culminating force',
    render: () => 'a bold take on education. a montessori school mixed with a trade school mixed with an improv theatre troupe and a traveling circus. ',
  },
]
