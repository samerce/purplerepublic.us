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


        <PickYourPath>
          <PathOption onClick={this.redbubble}>
            <PathOptionButton >
              art to wear
            </PathOptionButton>
            {/* <MultiSelectPicker /> */}
          </PathOption>
          <PathOption onClick={this.shop} className='pathWithBorder'>
            <PathOptionButton>
              art to hang
            </PathOptionButton>
          </PathOption>

          <PathOption onClick={this.letsGo} className='pathMiddle'>
            <PathOptionButton>
              explore our world
            </PathOptionButton>
            {/* <MultiSelectPicker /> */}
          </PathOption>

          <PathOption onClick={this.emailUs}>
            <PathOptionButton>email</PathOptionButton>
          </PathOption>
          <PathOption onClick={this.instagramUs} className='pathWithBorder'>
            <PathOptionButton>instagram</PathOptionButton>
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

  @autobind
  redbubble() {
    openInNewTab('https://www.redbubble.com/people/purplerepublic/collections/837980-isness')
  }

  @autobind
  instagramUs() {
    openInNewTab('https://www.instagram.com/expressyourmess')
  }

}
