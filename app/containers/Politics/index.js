import React from 'react';
import {Header, CatchLine} from '../../global/styled'
import {
  Root, Background, NowCircle, NowButtonRoot, NowText, ByLineRight,
  ByLine, BackgroundArea, ContentArea, Page, Separator,
  QuoteRoot, Quote, NowButtonMoverRoot, QuiltRoot, Shade,
} from './styled'
import Landing from './Landing'
import Awakening from './Awakening'
import Exploration from './Exploration'
import Transparent from './Transparent'
import Learning from './Learning'
import Defense from './Defense'
import {Motion, spring} from 'react-motion'

const moveConfig = {stiffness: 70, damping: 13}
const smooth = moveConfig
const clickAnimations = [
  {
    rotate: 0,
    translateX: 0,
    translateY: 0,
  },
  {
    rotate: spring(180, moveConfig),
    translateX: spring(10, moveConfig),
    translateY: spring(20, moveConfig),
  },
  {
    rotate: spring(0, moveConfig),
    translateX: spring(30, moveConfig),
    translateY: spring(25, moveConfig),
  },
  {
    rotate: spring(0, moveConfig),
    translateX: spring(-10, moveConfig),
    translateY: spring(-15, moveConfig),
  }
]

export default class Politics extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      appeared: false,
      circleScale: 0,
      showQuote: false,
      click: 0,
      quilted: false,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({appeared: true, circleScale: .1}))
    setTimeout(() => this.setState({circleScale: 1}), 4000)
    setTimeout(() => this.setState({showQuote: true}), 4000)
  }

  render() {
    const {appeared, circleScale, showQuote, click, quilted} = this.state
    const scaleConfig = circleScale === 1? {stiffness: 100, damping: 15} : {stiffness: 160, damping: 9}
    const animStyle = {
      x: spring(circleScale, scaleConfig),
      top: spring(circleScale === 1? -30 : -60, smooth),
      width: click === 3? spring(330) : 140,
      height: click === 3? spring(100) : 140,
      radius: click === 3? spring(10) : 100,
    }
    return (
      <Page>
        {click === 3 &&
          <QuiltRoot className={quilted && 'quilted'}>
            <Shade />
          </QuiltRoot>
        }
        <QuoteRoot className={showQuote && 'show'}>
          <Quote>
            <span id='a'>where </span><span id='b'>is </span><span id='c'>now?</span>
          </Quote>
        </QuoteRoot>
        <Motion style={clickAnimations[click]}>
          {({rotate, translateX, translateY}) => (
            <NowButtonMoverRoot
              className={'click' + click}
              onClick={() => this.onClick()}
              style={{
                pointerEvents: circleScale === 1? 'all' : 'none',
                transform: `rotate(${rotate}deg) translate(${translateX}%, ${translateY}%)`
              }}>
              <Motion style={animStyle}>
                {({x, top, width, height, radius, fontSize}) => (
                  <NowButtonRoot
                    className={`${appeared && 'appeared'}`}>
                    <NowText>
                      <NowCircle style={{
                        transform: `scale(${x})`,
                        top,
                        background: circleScale === 1? 'white' : 'black',
                        width: width + 'px',
                        height: height + 'px',
                        borderRadius: click < 3? radius + '%' : radius + 'px',
                      }}></NowCircle>
                      <span id='se'>se <span>🧀</span></span>
                      <span id='k'>k</span>
                      <span id='now'>now</span>
                      <span id='ledge'>ledge</span>
                      <div id='words'>is. you are. now what?</div>
                    </NowText>
                  </NowButtonRoot>
                )}
              </Motion>
            </NowButtonMoverRoot>
          )}
        </Motion>
      </Page>
    )
  }

  onClick() {
    if (this.state.click === 3) return
    this.setState({
      click: this.state.click + 1,
      quilted: this.state.click === 2
    })
  }
}
