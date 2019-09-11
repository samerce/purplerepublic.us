import React from 'react'
import WordRolodex from '../../WordRolodex'
import FloatingMousePal from '../../FloatingMousePal/index.coffee'
import TalkingBubbles from '../../TalkingBubbles'

import {
  Root, FaerieRoot, NamasteRoot,
} from './styled'

import {connect} from 'react-redux'
import resizable from '../../hocs/resizable'
import laganja from '../../hocs/laganja'

import {SRC_URL} from '../../../global/constants'
import {View} from '../../../containers/start/reducer.coffee'

GIF_ROOT_URL = SRC_URL + 'portals/gifs/'

export default connect((d) =>
  view: d.get('start').get('view'),
) laganja() resizable() class Portal extends React.PureComponent

  constructor: (props) ->
    super(props)
    @laganja = props.laganja
    @state =
      showFaerie: false,
      # styles: getStyles(props),

  onResize: =>
    # this.setState({styles: getStyles(this.props)})

  componentDidUpdate: (prevProps) =>
    if prevProps.view is View.quark and @props.view isnt View.quark
      @laganja.stop()
    else if prevProps.view isnt View.quark and @props.view is View.quark
      @startLaganja()

  startLaganja: () =>
    @laganja.start (lg) =>
      # lg.timer(3000, () => this.setState({showFaerie: true}))
      # lg.timer(13000, () => this.setState({showFaerie: false}))
      lg.scrollListener (scroll) =>
        @setState
          showFaerie: scroll > 800 && scroll < 1000
      lg.scrollListener (scroll) =>
        @setState
          showNamaste: scroll > 1840

  render: =>
    {showFaerie, showNamaste} = @state
    <Root className={@props.className}>
      <NamasteRoot className={'show' if showNamaste}>
        <img src={GIF_ROOT_URL + 'namastehehe.gif'} />
      </NamasteRoot>
      <FaerieRoot className={'show' if showFaerie}>
        🧚<TalkingBubbles delay={1} show={showFaerie} phrase="you are here now!" />
      ‍</FaerieRoot>
      this is the place. this is the time. now.<br/>
      this life is for you.<br/>
      to tinker away your blinks.<br/>
      toy with your knobs.<br/>
      nothing else matters.
      <WordRolodex
        className='wordRolodex'
        words={['not money.', 'not memories.', 'not lovers.', 'not children.', 'not health.', 'not trump.']}
      /><br/>
      ditch the need to be rich and behold what riches present themselves before you.<br/>
      exiting the world of acquisitions requires acquiring freedom, which doesn't cost and costs everything.<br/>
      purposely seek out things of low monetary value; spirit lives there.<br/>
      legacy and possession are fear's sentiment; weaponry to keep you in shackles.<br/>
      life is movement. settle and you're dead.<br/>
      vacuous thought loops and a pulse don't signify aliveness.<br/>
      all great things come from freedom. including freedom. freedom begets freedom.<br/>
      all change is birthed in freedom.<br/>
      fear or freedom. that's it.<br/><br/>

      <div className='fear'>
        <FloatingMousePal className='floater' offsets={{top: -120}}>
          <img src={GIF_ROOT_URL + 'alyssa.gif'} />
        </FloatingMousePal>
        fear, fear, fear, fear, fear, fear, fear.
      </div> is the only enemy.<br/>
      root it out.<br/>
      then you, too, can make freaky as fuck drama with your few moments on this planet.<br/>
      the only other choice is fearfully regurgitating pre-chewed food into other sleeping mouths.<br/>
      all is cleared away when one is self-freed to be a person over a persona.<br/>
      isness over a walking, talking societal prognosis.<br/>
      benevolence reigns supreme in consciousness.<br/>
      it is only in sleeping ignorance can the binary exist.<br/>
      waking up frees the soul to be.<br/><br/>

      there are only two types of people... those who have set down their ego/fear and experienced a psychedelic trip.... and those who have not.<br/>
      there’s no enemy to fight so take some acid.<br/>
      exit the world of pre-chewed food. <br/>
      most heroes die mortified over their unraveled work.<br/>
      george washington died mortally wounded in his depression... realizing all his human work did and can do nothing to save his fellow man.<br/>
      the binary of heroes and villains / good and evil / richness and poverty ... is a mindset to break free from.<br/>
      to see with god's eyes/i.e. to have experienced the true nature of our collective reality... to know what is possible ...<br/>
      even on an earth full of incurable evil. . .<br/>
      helps to sit with it: there is no enemy to fight. . . except the fear locked in life itself. . .<br/>
      freedom comes with a specific melancholy. namely the knowledge that earth isn't ours to save.<br/>
      & that life is for two reasons: free the soul and enjoy playing conscious witness to triangulating spacetime.<br/>
      there are only two ways reality materializes: exploitation of fear or enjoyment of freed expression.<br/>
      i choose the conscious baptism of expansion. and am daily becoming freer and freer as a result.<br/>
      benevolent coexistence, boys.<br/>
      conveying beauty. being beauty. witnessing beauty.<br/>
      in conclusion - all business schools should be immediately closed down for spiritual renovations.<br/>
    </Root>
