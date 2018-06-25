import React from 'react'

import styled from 'styled-components'
import {
  Root, HelloThere, PickYourPath, PathOption, PathOptionButton,
} from './styled'
import {cx} from '../../utils/style'

import {SRC_URL, SCREEN_WIDTH_M} from '../../global/constants'
import {makeEnum} from '../../utils/lang'
import {openInNewTab} from '../../utils/nav'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'willEnter',
  'enter',
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
              {window.innerWidth <= SCREEN_WIDTH_M?
                <div>painting. photography. shopping!</div> :
                <div>painting.<br />photography.<br />shopping!</div>
              }
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
