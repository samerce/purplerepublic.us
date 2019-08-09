import React from 'react'

import {
  Root, SunRoot, Sun, RaysRoot, TimerRoot, MoonRoot, Moon,
  EarthRoot,
} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'

@connect(d => ({
  view: d.get('gaiaverse').get('mode'),
}))
@resizable()
export default class AstrologicalToggle extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      styles: getStyles(),
      time: '105:54:27',
      seconds: 27,
    }
  }

  onResize() {
    this.setState({
      styles: getStyles(),
    })
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
    const {styles, time} = this.state
    const {view} = this.props
    return (
      <Root className={'view-' + view}>
        <SunRoot>
          <Sun {...styles.sun} />
          <RaysRoot>

          </RaysRoot>
          <TimerRoot>{time}</TimerRoot>
        </SunRoot>

        <MoonRoot>
          <Moon {...styles.moon} />
        </MoonRoot>

        <EarthRoot>

        </EarthRoot>
      </Root>
    )
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
