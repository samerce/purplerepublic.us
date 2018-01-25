import React from 'react'
import Typist from 'react-typist'

import styled from 'styled-components'
import {
  BackgroundRoot,
  Root, TypingRoot, YouAre, Enough, Now, Sneaky, What,
  DualityRoot, Duality, Life, Is, Everything, Nothing, YouAreToo,
  DualityText, DualityImages,
} from './styled'
import {cx} from '../../utils/style'
import {makeEnum} from '../../utils/lang'
import 'react-typist/dist/Typist.css'
import dualityConfig from './dualityConfig'
import autobind from 'autobind-decorator'

var ganjaConfigRaw = {
  1: 1000,
  2: 500,
  3: 500,
  4: 1500,
  5: 500,
  6: 1500,
}
const ganjaConfig = {}
Object.keys(ganjaConfigRaw).forEach(key => {
  ganjaConfig[require(`../../${key}.jpg`)] = ganjaConfigRaw[key]
})
const dualityImages = Object.keys(ganjaConfig)
const dualityWords = Object.keys(dualityConfig)
let dualitySentinel = 1

const DUALITY_WORD_PADDING = 10
const EV_FUDGE = 150

const DURATION_YOU_ARE = 1//4500
const DURATION_ENOUGH = 1//DURATION_YOU_ARE + 5000
const DURATION_NOW = 1//DURATION_ENOUGH + 8000
const DURATION_WHAT = 1//DURATION_NOW + 4000
const DURATION_DUALITY = 1//DURATION_WHAT + 2000
const DURATION_LIFE_EVERYTHING = 1//DURATION_DUALITY + 7000
const DURATION_LIFE_NOTHING = 1//DURATION_LIFE_EVERYTHING + 2000
const DURATION_YOU_NOTHING = 1//DURATION_LIFE_NOTHING + 2000
const DURATION_YOU_EVERYTHING = 1//DURATION_YOU_NOTHING + 2000
const DURATION_EXIT = DURATION_DUALITY + 700

const Mode = makeEnum([
  'enter',
  'youAre',
  'enough',
  'now',
  'what',
  'ganja',
  'lifeEverything',
  'lifeNothing',
  'youNothing',
  'youEverything',
  'duality',
  'exit',
])

export default class Intro extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.numRows = 0
    this.dualityWordElements = {}
    this.state = {
      mode: Mode.enter,
      dualityIndex: -1000,
      everythingStyle: {},
      ...ganjaConfig,
    }
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(() => this.setState({mode: Mode.youAre})),
      setTimeout(() => this.setState({mode: Mode.enough}), DURATION_YOU_ARE),
      setTimeout(() => this.setState({mode: Mode.now}), DURATION_ENOUGH),
      setTimeout(() => this.setState({mode: Mode.what}), DURATION_NOW),
      setTimeout(() => {
        this.setState({mode: Mode.ganja})
        this.playDualityImageReel()
      }, DURATION_WHAT),
      setTimeout(() => this.setState({
        mode: Mode.lifeEverything
      }), DURATION_DUALITY),
      setTimeout(() => this.setState({
        mode: Mode.lifeNothing
      }), DURATION_LIFE_EVERYTHING),
      setTimeout(() => this.setState({
        mode: Mode.youNothing
      }), DURATION_LIFE_NOTHING),
      setTimeout(() => this.setState({
        mode: Mode.youEverything
      }), DURATION_YOU_NOTHING),
      setTimeout(() => {
        this.setState({mode: Mode.duality, dualityIndex: 0})
        setTimeout(() => {
          const style = this.stackedStyle('everything');
          this.setState({everythingStyle: {
            ...style,
            left: style.left - 160,
          }})
        }, 500)

        let advanceInterval = 1000
        const advance = () => {
          this.advanceDuality()
          if (this.state.dualityIndex === dualitySentinel) {
            clearInterval(this.dualityInterval)

            dualitySentinel += dualitySentinel
            advanceInterval -= 100
            this.dualityInterval = setInterval(advance, advanceInterval)
          }
        }
        this.dualityInterval = setInterval(advance, advanceInterval)
      }, DURATION_YOU_EVERYTHING),
      // setTimeout(() => this.setState({mode: Mode.exit}), DURATION_LIFE_NOTHING),
      // setTimeout(() => window.location = '#start', DURATION_EXIT),
    )
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {mode, everythingStyle} = this.state;
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

        <DualityImages show={this.state.image}>
          <img src={dualityImages[3]} />
        </DualityImages>

        <TypingRoot>
          <Life>
            <Is className='isness'>
              <div className='intro-text'>life is</div>
            </Is>
            <Everything className='isness' style={everythingStyle}>
              <div className='intro-text'
                ref={r => this.dualityWordElements['everything'] = r}>
                everything
                <Typist avgTypingDelay={0} cursor={{show: false}} className='inb'>
                  .
                  <Typist.Backspace delay={DURATION_YOU_EVERYTHING} count={1} />
                  <span>&nbsp;is</span>
                </Typist></div>
            </Everything>
            <Nothing className='isness'>
              <div className='intro-text'>nothing.</div>
            </Nothing>
            <YouAreToo className='isness'>
              <div className='intro-text'>you are</div>
            </YouAreToo>
          </Life>
        </TypingRoot>

        {dualityWords.map((word, i) => this.renderHalf(word, i))}

      </Root>
    )
  }

  renderHalf(word, i) {
    const {dualityIndex} = this.state
    const type = cx({
      ying: i === dualityIndex - 1,
      yang: i === dualityIndex,
      stacked: i < dualityIndex - 1,
    })
    const styleFn = this[type + 'Style']

    return (
      <DualityText
        key={word}
        className={'isness duality-half ' + type}
        style={styleFn && styleFn(word, i)}>
        <div
          className='intro-text'
          ref={r => this.dualityWordElements[word] = r}>
          {word}<span>&nbsp;is</span>
        </div>
      </DualityText>
    )
  }

  @autobind
  stackedStyle(word, index) {
    const {dualityWordElements} = this
    const ref = dualityWordElements[word]
    if (!ref) return {}

    let numRows = 0
    let top = DUALITY_WORD_PADDING
    let left = dualityWordElements['everything'].clientWidth - 90
    for (let i = 0; i < index; i++) {
      left += dualityWordElements[dualityWords[i]].clientWidth + DUALITY_WORD_PADDING
      if (left >= window.innerWidth - 200) {
        numRows++
        left = DUALITY_WORD_PADDING
        top = numRows * 70
      }
    }

    const style = {
      top,
      left,
      tranform: 'none',
      height: ref.clientHeight,
      width: ref.clientWidth,
    }
    return style
  }

  @autobind
  yingStyle(word) {
    const ref = this.dualityWordElements[word]
    if (!ref) return {}
    return {
      transform: `translateX(-${ref.clientWidth - 10}px)`
    }
  }

  yangStyle() {
    return {
      transform: `translateX(150px)`
    }
  }

  @autobind
  advanceDuality() {
    let {dualityIndex} = this.state
    if (dualityIndex === dualityWords.length + 1) {
      return clearInterval(this.dualityInterval)
    }
    this.setState({
      dualityIndex: dualityIndex + 1,
      image: dualityConfig[dualityWords[dualityIndex]].image,
    })
  }

  playDualityImageReel() {
    let duration = 0
    dualityImages.forEach(key => {
      duration += ganjaConfig[key]
      setTimeout(() => this.setState({[key]: false}), duration)
    })
  }

}
