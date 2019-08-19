import React from 'react'

import {
  Root, SunRoot, Sun, RaysRoot, TimerRoot, MoonRoot, Moon,
  EarthRoot, CloseText,
} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import {Mode as View} from '../Gaiaverse/reducer'

@connect(d => ({
  view: d.get('gaiaverse').get('mode'),
}))
@resizable()
export default class AstrologicalToggle extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      styles: getStyles(),
    }
  }

  onResize() {
    const styles = getStyles()
    if (styles.sun.size === this.state.styles.sun.size &&
        styles.moon.size === this.state.styles.moon.size) {
      return
    }
    this.setState({
      styles,
    })
  }

  render() {
    const {styles, time} = this.state
    const {view} = this.props
    return (
      <Root className={'view-' + view}>
        <SunRoot onClick={this.onClickSun}>
          <Sun {...styles.sun} />
          <RaysRoot>

          </RaysRoot>
          <Timer />
          <CloseText>close</CloseText>
        </SunRoot>

        <MoonRoot>
          <Moon {...styles.moon} />
        </MoonRoot>

        <EarthRoot>

        </EarthRoot>
      </Root>
    )
  }

  @autobind
  onClickSun() {
    if (this.props.view === View.inTheDeep) {
      this.exitPortalDive()
    }
  }

  exitPortalDive() {
    window.location = window.location.hash.replace('/quark', '')
  }

}

function getStyles() {
  return {
    sun: {
      size: window.innerWidth,
    },
    moon: {
      size: window.innerWidth,
    },
  }
}

class Timer extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      time: '105:54:27',
      seconds: 27,
    }
  }

  componentDidMount() {
    setInterval(() => {
      let {seconds} = this.state
      seconds--
      this.setState({
        time: '105:54:' + (-1 * (seconds % 27)),
        seconds,
      })
    }, 1000)
  }

  render() {
    return <TimerRoot>{this.state.time}</TimerRoot>
  }

}
