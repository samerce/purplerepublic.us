import React from 'react'
import Typist from 'react-typist'

import styled from 'styled-components'
import {
  BackgroundRoot,
  Root, TypingRoot, YouAre, Enough, Now, Sneaky, What,
  DualityRoot, Duality,
} from './styled'
import {cx} from '../../utils/style'
import {makeEnum} from '../../utils/lang'
import 'react-typist/dist/Typist.css'

var dualityConfigRaw = {
  1: 1000,
  2: 500,
  3: 500,
  4: 1500,
  5: 500,
  6: 1500,
}
const dualityConfig = {}
Object.keys(dualityConfigRaw).forEach(key => {
  dualityConfig[require(`../../${key}.jpg`)] = dualityConfigRaw[key]
})
const dualityImages = Object.keys(dualityConfig)

const DURATION_YOU_ARE = 4500
const DURATION_ENOUGH = DURATION_YOU_ARE + 5000
const DURATION_NOW = DURATION_ENOUGH + 8000
const DURATION_WHAT = DURATION_NOW + 4000
const DURATION_DUALITY = DURATION_WHAT + 20000
const DURATION_EXIT = DURATION_DUALITY + 700

const Mode = makeEnum([
  'enter',
  'youAre',
  'enough',
  'now',
  'what',
  'duality',
  'exit',
])

export default class Intro extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.state = {
      mode: Mode.enter,
      ...dualityConfig,
    }
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(() => this.setState({mode: Mode.youAre})),
      setTimeout(() => this.setState({mode: Mode.enough}), DURATION_YOU_ARE),
      setTimeout(() => this.setState({mode: Mode.now}), DURATION_ENOUGH),
      setTimeout(() => this.setState({mode: Mode.what}), DURATION_NOW),
      setTimeout(() => {
        this.setState({mode: Mode.duality})
        this.playDualityImageReel()
      }, DURATION_WHAT),
      setTimeout(() => this.setState({mode: Mode.exit}), DURATION_DUALITY),
      setTimeout(() => window.location = '#start', DURATION_EXIT),
    )
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {mode} = this.state;
    return (
      <Root className={'intro-' + mode}>
        <BackgroundRoot />

        <TypingRoot>
          <YouAre>
            <Typist avgTypingDelay={110} className='intro-text'
               startDelay={700}>
              you are<Typist.Delay ms={1000} />.
              <Typist.Backspace count={1} delay={1300} />
            </Typist>
          </YouAre>
        </TypingRoot>

        <TypingRoot>
          <Enough>
            <Typist avgTypingDelay={120} className='intro-text'
              startDelay={DURATION_YOU_ARE + 700}>
              enough.
            </Typist>
          </Enough>
        </TypingRoot>

        <TypingRoot>
          <Now>
            <Sneaky>
              (the time is)
            </Sneaky>
            <Typist avgTypingDelay={110} className='intro-text'
              startDelay={DURATION_ENOUGH + 1000}>
              now.<Typist.Backspace count={1} delay={6000} />
            </Typist>
          </Now>
        </TypingRoot>

        <TypingRoot>
          <What className='intro-text'>
              what?
          </What>
        </TypingRoot>

        <DualityRoot style={{display: 'none'}}>
          <Duality>
            {dualityImages.map((key, i) => (
              <img
                key={key}
                src={key}
                style={{
                  position: 'absolute',
                  left: 0,
                  zIndex: dualityImages.length - i,
                  opacity: +this.state[key]
                }} />
            ))}
          </Duality>
        </DualityRoot>

      </Root>
    )
  }

  playDualityImageReel() {
    let duration = 0
    dualityImages.forEach(key => {
      duration += dualityConfig[key]
      setTimeout(() => this.setState({[key]: false}), duration)
    })
  }

}
