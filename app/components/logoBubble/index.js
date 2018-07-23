import React from 'react'
import {Motion, spring} from 'react-motion'
import {
  Root, CircleRoot, CircleBill, CirclePaul, CircleSami, LogoTextRoot,
} from './styled'
import LogoSvg from './logoSvg'

import {makeEnum} from '../../utils/lang'

const Mode = makeEnum([
  'born',
  'intro',
  'breatheIn',
  'breatheOut',
  'hangin',
])
const DURATION_INTRO = 200
const DURATION_BREATHE_IN = DURATION_INTRO + 3000
const DURATION_HANGIN = DURATION_BREATHE_IN + 1500

const DefaultTextStyle = {rotate: 0, scale: 0}
const RotateConfig = {stiffness: 60, damping: 7}
const ScaleConfig = {stiffness: 40, damping: 25}

export default class LogoBubble extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: Mode.born,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({mode: Mode.intro}), DURATION_INTRO)
    setTimeout(() => this.setState({mode: Mode.breatheIn}), DURATION_BREATHE_IN)
    setTimeout(() => this.setState({mode: Mode.hangin}), DURATION_HANGIN)
  }

  shouldComponentUpdate() {
    return this.props.mode !== Mode.hangin
  }

  render() {
    const {mode} = this.state
    return (
      <Root className={'logo-' + mode}>
        <CircleRoot>
          <CircleBill />
          <CirclePaul />
          <CircleSami />
        </CircleRoot>

        <Motion
          defaultStyle={DefaultTextStyle}
          style={{
            rotate: spring(700, RotateConfig),
            scale: spring(1.5, ScaleConfig),
          }}>
            {m =>
              <LogoTextRoot>
                <LogoSvg
                    style={{
                      transform: `rotate(${m.rotate}deg) scale(${m.scale})`
                    }}
                    className='bubbleButton-logo-svg' />
              </LogoTextRoot>
            }
        </Motion>
      </Root>
    )
  }

}
