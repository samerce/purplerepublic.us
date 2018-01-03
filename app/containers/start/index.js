import React from 'react'
import Typist from 'react-typist'

import styled from 'styled-components'
import {
  BackgroundRoot,
  Background,
  Root,
  CatchLine,
  SweetTalk,
  HookEm,
  WooEm,
  ShakeEm,
  When,
  Bounce,
  Jiggle, IntroMask,
  Pocky, Chortle, Koki, WhenPart, TicketLink,
  Invitation, GetInvolved, PlayButtonRoot, PlayButton,
  PlayButtonHoverRoot, ShootingStars, Star, StarRoot, StarWithTrail,
  InfoRoot, InfoContentRoot, InfoIntroText, InfoIntroRoot, InfoDetailText,
  SocialRoot, SocialButtonsRoot, SocialEntryButtonRoot, SocialIcon,
} from './styled'
import {

} from '../../global/styled'
import {cx} from '../../utils/style'

import SineWaves from 'sine-waves'
import {Motion, spring} from 'react-motion'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`
const getStarPos = () => `-${getRandInt(60) + 20}px`

const SHOW_INTRO_KEY = 'purpleRepublic_start_showIntro'
const INTRO_DURATION = 45000
const END_INTRO_DURATION = INTRO_DURATION + 2000

const localStore = window.localStorage

export default class Start extends React.Component {

  constructor() {
    super()

    const showIntro = localStore.getItem(SHOW_INTRO_KEY) !== '0'
    this.timeouts = []
    this.state = {
      collapsed: false,
      hovered: false,
      startIntro: showIntro,
      endIntro: !showIntro,
    }
  }

  componentDidMount() {
    this.timeouts.push(
      setTimeout(() => this.setState({startIntro: false}), INTRO_DURATION),
      setTimeout(() => this.setState({endIntro: true}), END_INTRO_DURATION),
    )
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const {collapsed, hovered, startIntro, endIntro} = this.state;
    const defaultSpring = {stiffness: 70, damping: 9}
    const scaleVal = collapsed? spring(0, {stiffness: 70, damping: 30}) : hovered? spring(.9,  defaultSpring) : spring(1, defaultSpring)
    const opacityVal = collapsed? spring(0, {stiffness: 70, damping: 60}) : 1
    return (
      <Root className={collapsed && 'start-exit'}>
        <BackgroundRoot>
          <ShootingStars>
            <StarRoot style={{
              transform: 'rotate(0deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '3.5s',
                animationDuration: '2.5s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(145deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '2s',
                animationDuration: '1.5s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(105deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '5s',
                animationDuration: '2.5s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(25deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '8.5s',
                animationDuration: '2s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(85deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '9.5s',
                animationDuration: '3s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(195deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '7.5s',
                animationDuration: '1s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(5deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '5s',
                animationDuration: '3.5s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-15deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '2.5s',
                animationDuration: '2s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(67deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '.5s',
                animationDuration: '2.5s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-87deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '3.5s',
                animationDuration: '1.7s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-130deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '4s',
                animationDuration: '2.7s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-190deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '3s',
                animationDuration: '2.2s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-110deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '6.7s',
                animationDuration: '1.4s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-168deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '8.4s',
                animationDuration: '3.2s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
            <StarRoot style={{
              transform: 'rotate(-45deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '4.5s',
                animationDuration: '2s',
              }}>
                <Star />
              </StarWithTrail>
            </StarRoot>
          </ShootingStars>
          <Background className={collapsed && 'collapsed'} />
        </BackgroundRoot>

        <PlayButtonRoot>
          <Motion style={{scale: scaleVal, opacity: opacityVal}}>
            {({scale, opacity}) => (
              <PlayButtonHoverRoot
                onClick={() => this.onLetsPlay()}
                onMouseEnter={() => this.setState({hovered: true})}
                onMouseLeave={() => this.setState({hovered: false})}
                className={collapsed && 'collapsed'}
                style={collapsed? {} : {transform: `scale(${scale})`}}>
                <PlayButton>
                  <span>let's</span><span>play!</span>
                </PlayButton>
              </PlayButtonHoverRoot>
            )}
          </Motion>
        </PlayButtonRoot>

        <InfoRoot className={cx({startIntro, endIntro})}>
          <InfoContentRoot>
            <InfoIntroRoot>
              <i className='fa fa-info-circle' />
              <InfoIntroText>108 grains</InfoIntroText>
            </InfoIntroRoot>
            <InfoDetailText className='detail'>
              {startIntro  &&
                <Typist
                  avgTypingDelay={60}
                  stdTypingDelay={50}
                  startDelay={1000}
                  cursor={{
                    show: false,
                    blink: true,
                    hideWhenDone: true,
                    hideWhenDoneDelay: 0,
                  }}>
                  oh, hello there.<br />
                  tickled you stopped by!<br /><br />

                  welcome to 2018. we're glad you made it.<br />
                  have you made your resolution yet? <br />
                  (do you usually break it? because we do.)<br /><br />

                  so we're trying something different. 108 grains. a way to hold ourselves accountable to live the good life. a one-hundred-eight day interactive dance through art & ideas. a chance to express over survive.<br /> do you have the resolve?<br /><br />

                  you'll emerge on april 19th a more magical, smart, creative believer in life! share with your friends. come back daily.<br /><br />

                  you are perfect. now and always.<br />
                  namaste and wahooey!<br />
                  -grain & tofu
                  </Typist>
                }
                {!startIntro &&
                  <div>
                    a one-hundred-eight day interactive dance through art & ideas.<br />a chance to express over survive.<br /> do you have the resolve?
                  </div>
                }
            </InfoDetailText>
          </InfoContentRoot>
        </InfoRoot>

        <SocialRoot onClick={() => this.setState({showSocial: !this.state.showSocial})} className={this.state.showSocial && 'show'}>
          <SocialButtonsRoot>
            <a href='https://www.facebook.com/purplerepublic.us' target='_blank'>
              <SocialIcon className='fa fa-facebook-square i1' />
            </a>
            <a href='https://www.twitter.com/1purplerepublic' target='_blank'>
              <SocialIcon className='fa fa-twitter-square i2' />
            </a>
            <a href='https://www.instagram.com/purple.republic' target='_blank'>
              <SocialIcon className='fa fa-instagram i3' />
            </a>
            <a href='https://www.medium.com/the-purple-republic' target='_blank'>
              <SocialIcon className='fa fa-medium i6' />
            </a>
            <a href='https://www.youtube.com/channel/UCHDkvhWZKjA6lnX1vcGvGPw' target='_blank'>
              <SocialIcon className='fa fa-youtube-square i5' />
            </a>
            <a href='mailto:rise@purplerepublic.us' target='_blank'>
              <SocialIcon className='fa fa-envelope-o i4' />
            </a>
          </SocialButtonsRoot>

          <SocialEntryButtonRoot>
            <i className='fa fa-globe' />
          </SocialEntryButtonRoot>
        </SocialRoot>

        <IntroMask className={cx({startIntro})} />
      </Root>
    )
  }

  onLetsPlay() {
    this.setState({collapsed: true})
    this.timeouts.push(
      setTimeout(() => window.location = '#hello', 3000)
    )
    localStore.setItem(SHOW_INTRO_KEY, '0')
  }

  getSineWave(id, rotate) {
    new SineWaves({
      el: document.getElementById(id),

      speed: 1.5,

      width: function() {
        return 900;
      },

      height: function() {
        return 80;
      },

      rotate: rotate? 200 : 120,

      ease: 'SineInOut',

      wavesWidth: '70%',

      waves: [
        {
          timeModifier: 6,
          lineWidth: 6,
          amplitude: -15,
          wavelength: 25,
          segmentLength: 5
        },
      ],

      // Called on window resize
      resizeEvent: function() {
        var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0,"rgba(23, 210, 168, 0.2)");
        gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1,"rgba(23, 210, 168, 0.2)");

        var index = -1;
        var length = this.waves.length;
    	  while(++index < length){
          this.waves[index].strokeStyle = gradient;
        }

        // Clean Up
        index = void 0;
        length = void 0;
        gradient = void 0;
      }
    });
  }
}
