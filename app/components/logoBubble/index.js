import React from 'react'
import {Motion, spring} from 'react-motion'
import {
  Root, CircleRoot, CircleBill, CirclePaul, CircleSami, LogoTextRoot, Name,
} from './styled'
import LogoSvg from './logoSvg'

import {cx} from '../../utils/style'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {
  IntroMode as Mode, setIntroMode
} from '../../global/reducers/intro'

import theme from '../../global/theme'

const DELAY_SPLASH = 200
const DELAY_SETTLE = DELAY_SPLASH + 3000
const DELAY_CHILL = DELAY_SETTLE + 200
const DefaultTextStyle = {rotate: 0, scale: 0}
const RotateConfig = {stiffness: 60, damping: 7}
const ScaleConfig = {stiffness: 40, damping: 25}

@connect(d => ({
  isShopOpen: d.get('topNav').get('isShopOpen'),
  isExploreOpen: d.get('topNav').get('isExploreOpen'),
  mode: d.get('intro').get('mode'),
}))
export default class LogoBubble extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props
    setTimeout(() => dispatch(setIntroMode(Mode.splash)), DELAY_SPLASH)
    setTimeout(() => dispatch(setIntroMode(Mode.settle)), DELAY_SETTLE)
    setTimeout(() => dispatch(setIntroMode(Mode.chill)), DELAY_CHILL)
  }

  shouldComponentUpdate() {
    return this.props.mode !== Mode.hangin
  }

  render() {
    const {mode} = this.props
    return (
      <Root className={`logo-${mode}`} onClick={this.goHome}>
        <CircleRoot>
          <CircleBill />
          <CirclePaul />
          <CircleSami />
        </CircleRoot>

        <Motion
          defaultStyle={DefaultTextStyle}
          style={{
            rotate: spring(700, RotateConfig),
            scale: spring(1, ScaleConfig),
          }}>
          {m =>
            <LogoTextRoot>
              <LogoSvg style={getSvgStyle(m.rotate, m.scale)} />
            </LogoTextRoot>
            }
        </Motion>
      </Root>
    )
  }

  @autobind
  goHome() {
    window.location = '#start'
  }

}

function getSvgStyle(rotate = -12, scale = 1) {
  return {
    fill: theme.shelly,
    transform: `rotate(${rotate}deg) translate(0, 5px) scale(${scale})`,
    height: 120,
  }
}
