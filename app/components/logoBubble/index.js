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
  togglePastTimeline, toggleFutureTimeline
} from '../ThenNowWhen/actions'
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
  pastTimelineVisible: d.get('timeline').get('pastTimelineVisible'),
  futureTimelineVisible: d.get('timeline').get('futureTimelineVisible'),
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
    const {
      mode, pastTimelineVisible, futureTimelineVisible
    } = this.props
    const classes = cx({
      pastTimeline: pastTimelineVisible,
      futureTimeline: futureTimelineVisible,
    })
    return (
      <Root className={`logo-${mode} ${classes}`} onClick={this.toggleTimeline}>
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
  toggleTimeline() {
    const {dispatch, pastTimelineVisible, futureTimelineVisible} = this.props
    futureTimelineVisible && dispatch(toggleFutureTimeline())
    pastTimelineVisible && dispatch(togglePastTimeline())
  }

}

function getSvgStyle(rotate = -12, scale = 1) {
  return {
    fill: theme.shelly,
    transform: `rotate(${rotate}deg) translate(0, 5px) scale(${scale})`,
    height: 120,
  }
}
