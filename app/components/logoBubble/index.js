import React from 'react'
import {Motion, spring} from 'react-motion'
import {
  Root, CircleRoot, CircleBill, CirclePaul, CircleSami, LogoTextRoot,
} from './styled'
import LogoSvg from './logoSvg'

import {SRC_URL} from '../../global/constants'
import {makeEnum} from '../../utils/lang'

const Mode = makeEnum([
  'born',
  'intro',
  'preBreathe',
  'breatheIn',
  'breatheOut',
  'hangin',
])
const DURATION_INTRO = 200
const DURATION_BREATHE_IN = DURATION_INTRO + 3000
const DURATION_HANGIN = DURATION_BREATHE_IN + 1500

export default class LogoBubble extends React.Component {

  constructor() {
    super()
    this.state = {
      mode: Mode.born,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({mode: Mode.intro}), DURATION_INTRO)
    setTimeout(() => this.setState({mode: Mode.breatheIn}), DURATION_BREATHE_IN)
    setTimeout(() => this.setState({mode: Mode.hangin}), DURATION_HANGIN)
  }

  render() {
    const {mode} = this.state
    const {rotate, textScale, textX, textY} = this.getStyles()
    const textConfig = mode === {stiffness: 40, damping: 25}

    return (
      <Root className={'logo-' + mode}>
        <CircleRoot>
          <CircleBill />
          <CirclePaul />
          <CircleSami />
        </CircleRoot>

        <Motion defaultStyle={{rotate: 0, scale: 0, textX: 0, textY: 0}}
          style={{
            rotate: spring(rotate, {stiffness: 60, damping: 7}),
            scale: spring(textScale, textConfig),
            textX: spring(textX, {stiffness: 40, damping: 25}),
            textY: spring(textY, {stiffness: 40, damping: 25}),
          }}>
            {m =>
              <LogoTextRoot>
                <LogoSvg
                    style={{
                      transform: `rotate(${m.rotate}deg) scale(${m.scale}) translate(${m.textX}px, ${m.textY}px)`
                    }}
                    className='bubbleButton-logo-svg' />
              </LogoTextRoot>
            }
        </Motion>
      </Root>
    )
  }

  getStyles() {
    // const {mode} = this.state
    // if (mode === Mode.intro) {
      return {
        textScale: 1.3,
        scale: 2,
        rotate: 700,
        breatheInScale: 2,
        x: 0,
        y: 0,
        textX: 0,
        textY: 0,
      }
    // } else if (mode === Mode.preBreathe || mode === Mode.hangin) {
    //   return {
    //     textScale: .6,
    //     scale: 2,
    //     rotate: 700,
    //     breatheInScale: 2,
    //     x: -((window.innerWidth / 2)),
    //     y: -((window.innerHeight / 2)),
    //     textX: 0,
    //     textY: 0,
    //   }
    // } else if (mode === Mode.breatheIn) {
    //   return {
    //     textScale: 0,
    //     scale: 0,
    //     breatheInScale: 0,
    //     rotate: 700,
    //     x: -((window.innerWidth / 2)),
    //     y: -((window.innerHeight / 2)),
    //     textX: 0,
    //     textY: 0,
    //   }
    // } else if (mode === Mode.breatheOut) {
    //   return {
    //     textScale: .6,
    //     scale: 2,
    //     breatheInScale: 2,
    //     rotate: 700,
    //     x: -((window.innerWidth / 2)),
    //     y: -((window.innerHeight / 2)),
    //     textX: 0,
    //     textY: 0,
    //   }
    // } else return {
    //   textScale: 0,
    //   scale: 0,
    //   rotate: 0,
    //   breatheInScale: 0,
    //   x: 0,
    //   y: 0,
    //   textX: 0,
    //   textY: 0,
    // }
  }
}
