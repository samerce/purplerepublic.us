import React from 'react'

import styled from 'styled-components'
import {
  Root, HelloThere, PickYourPath, PathOption, PathOptionButton,
} from './styled'
import {cx} from '../../utils/style'

import {SRC_URL, SCREEN_WIDTH_S} from '../../global/constants'
import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'
import autobind from 'autobind-decorator'

const BASE_URL = SRC_URL + 'intro/'

const DUALITY_WORD_PADDING = 10
const EV_FUDGE = 150

const DURATION_DISCLAIMER = 12000
const DURATION_YOU_ARE = DURATION_DISCLAIMER + 4500
const DURATION_ENOUGH = DURATION_YOU_ARE + 3500
const DURATION_NOW = DURATION_ENOUGH + 7500
const DURATION_WHAT = DURATION_NOW + 2500
const DURATION_GANJA = DURATION_WHAT + 3000
const DURATION_LIFE_EVERYTHING = DURATION_GANJA + 7000
const DURATION_LIFE_NOTHING = DURATION_LIFE_EVERYTHING + 2000
const DURATION_YOU_NOTHING = DURATION_LIFE_NOTHING + 2500
const DURATION_YOU_EVERYTHING = DURATION_YOU_NOTHING + 2000
const DURATION_DUALITY = DURATION_YOU_EVERYTHING +
  ((window.innerWidth <= SCREEN_WIDTH_S)? 17000 : 20000)
const DURATION_WELCOME = DURATION_DUALITY + 12000
const DURATION_EXIT = DURATION_WELCOME + 1000

const Mode = makeEnum([
  'willEnter',
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

  constructor(props) {
    super(props)

    this.timeouts = []
    this.state = {
      mode: Mode.willEnter,
    }
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(() => this.setState({mode: Mode.enter})),
    )
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {mode} = this.state
    return (
      <Root className={'intro-' + mode}>

        <HelloThere>
          <div className='offering'>
            reality is rough if you look at it head on.<br />
            here's a shred of something decent amidst the noise.<br />
            welcome to the glamour gutter.<br /><br />
            <strong>art. ideas.<br /> revolution. nonsense.</strong><br />
            <strong>love.</strong><br />
          </div>
        </HelloThere>

        <PickYourPath>
          <PathOption onClick={this.emailUs}>
            <PathOptionButton>talk to us</PathOptionButton>
          </PathOption>
          <PathOption onClick={this.letsGo}>
            <PathOptionButton >
              enter the vortex
            </PathOptionButton>
            {/* <MultiSelectPicker /> */}
          </PathOption>
          <PathOption onClick={this.shop}>
            <PathOptionButton>
              painting.<br />photography.<br /> shopping!
            </PathOptionButton>
          </PathOption>
        </PickYourPath>

      </Root>
    )
  }

  @autobind
  letsGo() {
    this.setState({mode: Mode.exit})
    this.timeouts.push(setTimeout(() => window.location = '#start', 1000))
  }

  @autobind
  shop() {
    openInNewTab('https://etsy.com/shop/purplerepublic')
  }

  @autobind
  emailUs() {
    openInNewTab('mailto:rise@purplerepublic.us')
  }

}
