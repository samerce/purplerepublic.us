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
          nomaya is a non-profit organization built to bring us into the future of consciousness. an impulse to let the dark coexist with the light. a vision of a world free from the binds of binary. here's how we do it.
          <br />
          <span style={{fontStyle: 'italic'}}>
            the timeline is just a pretty graphic. everything is simultaneous.
          </span>
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
    render: () => 'programs across the country to send brigades of wildly costumed, effervescent folk out into the streets to spread joy and knowledge. from drag faeries who pick up trash to vaudeville mimes who offer gazing meditation to absurd pop-up street theatre on climate change. plus social media firestorm to get people to write poetcards to each other and change the conversation on politics and philosophy and life.',
  },
  {
    title: 'art installs',
    subtitle: 'mind-bending installations across the globe',
    render: () => 'massive constructions across the nation that make you think about the meaninglessness of existence, while inspiring you to create your own meaning. expansive industrial spaces are remade into an enchanting instagrammable atmosphere, while inviting you to take your art beyond phone photography: paint, record video, sing, play instruments, write, dance, meditate, juggle, improv. these will be entry points to the vast mystery that unfolds online and subsequently in the communities that host them. the first phase includes:',
  },
  {
    title: 'transformation nation',
    subtitle: 'a gale force wind sweeping the 50 states',
    render: () => 'teams across the nation seek out those in need and in want of transformation—a radical redirect to an existence effervescent. a rebirth opportunity to reignite belief in the self. from business remodels a la kitchen nightmares, to life coaching a la queer eye, to community and government reforms aimed at turning the whole country into frisco.',
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
    subtitle: 'monthly magazine & tv station',
    render: () => 'vigilante journalism powered by minorities. an antidote to fake news: our own reality, built on locked eyes and steady hearts.',
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
