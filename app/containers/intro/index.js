import React from 'react'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'

import styled from 'styled-components'
import {
  BackgroundRoot,
  Root, TypingRoot, YouAre, Enough, Now, Sneaky, What,
  DualityRoot, Duality, Life, Is, Everything, Nothing, YouAreToo,
  DualityText, DualityImages, WelcomeRoot, Brand, Tagline, WelcomeBackdrop,
  SkipButtonRoot, SkipButton,
} from './styled'
import {cx} from '../../utils/style'

import {SRC_URL, SCREEN_WIDTH_S} from '../../global/constants'
import {makeEnum} from '../../utils/lang'
import dualityConfig from './dualityConfig'
import autobind from 'autobind-decorator'

const BASE_URL = SRC_URL + 'intro/'
const KEY_IS_REPEAT_VISITOR = 'purpleRepublic.intro.isRepeatVisitor'

const localStorage = window.localStorage
const isRepeatVisitor = localStorage.getItem(KEY_IS_REPEAT_VISITOR)

var ganjaConfigRaw = {
  1: 1000,
  2: 500,
  3: 500,
  4: 1500,
  5: 500,
  6: 1500,
}
const ganjaConfig = {}
// Object.keys(ganjaConfigRaw).forEach(key => {
//   ganjaConfig[require(`../../${key}.jpg`)] = ganjaConfigRaw[key]
// })
const dualityImages = Object.keys(ganjaConfig)
const dualityWords = Object.keys(dualityConfig)
let dualitySentinel = 1

const DUALITY_WORD_PADDING = 10
const EV_FUDGE = 150

const DURATION_YOU_ARE = 4500
const DURATION_ENOUGH = DURATION_YOU_ARE + 3500
const DURATION_NOW = DURATION_ENOUGH + 7500
const DURATION_WHAT = DURATION_NOW + 2500
const DURATION_GANJA = DURATION_WHAT + 4000
const DURATION_LIFE_EVERYTHING = DURATION_GANJA + 7000
const DURATION_LIFE_NOTHING = DURATION_LIFE_EVERYTHING + 2000
const DURATION_YOU_NOTHING = DURATION_LIFE_NOTHING + 2500
const DURATION_YOU_EVERYTHING = DURATION_YOU_NOTHING + 2000
const DURATION_DUALITY = DURATION_YOU_EVERYTHING +
  ((window.innerWidth <= SCREEN_WIDTH_S)? 13000 : 16000)
const DURATION_WELCOME = DURATION_DUALITY + 13000
const DURATION_EXIT = DURATION_WELCOME + 1000

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
  'welcome',
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
      }), DURATION_GANJA),
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
            left: this.getEverythingLeft(),
          }})
        }, 700)

        let advanceInterval = 800
        const advance = () => {
          this.advanceDuality()
          if (this.state.dualityIndex === dualitySentinel) {
            clearInterval(this.dualityInterval)

            dualitySentinel += dualitySentinel
            advanceInterval = Math.max(10, advanceInterval - 100)
            this.dualityInterval = setInterval(advance, advanceInterval)
          }
        }
        this.dualityInterval = setInterval(advance, advanceInterval)
      }, DURATION_YOU_EVERYTHING),
      setTimeout(() => this.setState({mode: Mode.welcome}), DURATION_DUALITY),
      setTimeout(() => this.setState({mode: Mode.exit}), DURATION_WELCOME),
      setTimeout(() => {
        localStorage.setItem(KEY_IS_REPEAT_VISITOR, 'true')
        window.location = '#start'
      }, DURATION_EXIT),
    )
  }

  getEverythingLeft() {
    if (window.innerWidth <= SCREEN_WIDTH_S) {
      return 15
    } else return 159
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {mode, everythingStyle, dualityIndex} = this.state;
    const ganjaIndex = Math.floor(Math.random() * (dualityImages.length-1))
    return (
      <Root className={'intro-' + mode}>
        <BackgroundRoot />

        <SkipButtonRoot onClick={this.skip}>
          <SkipButton>skip</SkipButton>
        </SkipButtonRoot>

        <TypingRoot>
          <YouAre>
            <Typist avgTypingDelay={110} className='intro-text'
               startDelay={700}>
              you are<Typist.Delay ms={500} />.
              <Typist.Backspace count={1} delay={1700} />
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
              now.<Typist.Backspace count={1} delay={5500} />
            </Typist>
          </Now>
        </TypingRoot>

        <TypingRoot>
          <What className='intro-text'>
              what?
          </What>
        </TypingRoot>

        <DualityRoot>
          <img src={BASE_URL + 'absurd-queens.gif'} />
          {/* <Duality style={{display: 'none'}}>
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
          </Duality> */}
        </DualityRoot>

        <DualityImages show={false}>
          <img src={dualityImages[ganjaIndex]} />
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

        <WelcomeRoot>
          <WelcomeBackdrop />
          <Brand>
            purple republic
          </Brand>
          <Tagline>isness with purpose</Tagline>
          <Tagline className='extra-tag'>performance. politics. play.</Tagline>
        </WelcomeRoot>

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
    const nextWord = (i !== dualityWords.length - 1) && dualityWords[i + 1]
    const styleFn = this[type + 'Style'] || this.yangStyle

    return (
      <DualityText
        key={word}
        className={'isness duality-half ' + type}
        style={styleFn(word, i, nextWord)}>
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
    let left = this.getDualityLeft()
    for (let i = 0; i < index; i++) {
      left += dualityWordElements[dualityWords[i]].clientWidth + DUALITY_WORD_PADDING
      if (left >= window.innerWidth - this.getRightEdgeFactor()) {
        numRows++
        left = DUALITY_WORD_PADDING
        top = numRows * this.getRowSpacing()
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

  getDualityLeft() {
    const {dualityWordElements} = this
    if (window.innerWidth <= SCREEN_WIDTH_S) {
        return dualityWordElements['everything'].clientWidth - 80
    } else return dualityWordElements['everything'].clientWidth - 80
  }

  getRowSpacing() {
    if (window.innerWidth <= SCREEN_WIDTH_S) {
      return 35
    } else return 70
  }

  getRightEdgeFactor() {
    if (window.innerWidth <= SCREEN_WIDTH_S) {
      return 100
    } else return 200
  }

  @autobind
  yingStyle(word, i, nextWord) {
    const ref = this.dualityWordElements[word]
    const nextWordRef = this.dualityWordElements[nextWord]
    if (!ref || !nextWordRef) return {}
    return {
      transform: `translateX(-${nextWordRef.clientWidth - 40}px)`
    }
  }

  yangStyle() {
    return {
      transform: `translateX(100px)`
    }
  }

  @autobind
  advanceDuality() {
    let {dualityIndex} = this.state
    if (dualityIndex === dualityWords.length + 2) {
      return clearInterval(this.dualityInterval)
    }
    this.setState({
      dualityIndex: dualityIndex + 1,
      // image: dualityConfig[dualityWords[dualityIndex]].image,
    })
  }

  @autobind
  skip() {
    window.location = '#start'
  }

  playDualityImageReel() {
    let duration = 0
    dualityImages.forEach(key => {
      duration += ganjaConfig[key]
      setTimeout(() => this.setState({[key]: false}), duration)
    })
  }

}
