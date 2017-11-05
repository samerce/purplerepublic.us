import React from 'react'
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
  Jiggle,
  Pocky, Chortle, Koki, WhenPart, TicketLink,
  Invitation, GetInvolved, PlayButtonRoot, PlayButton,
  PlayButtonHoverRoot, ShootingStars, Star, StarRoot, StarWithTrail,
  InfoRoot, InfoContentRoot, InfoIntroText, InfoIntroRoot, InfoDetailText,
  SocialRoot, SocialButtonsRoot, SocialEntryButtonRoot, SocialIcon,
} from './styled'
import {

} from '../../global/styled'
import SineWaves from 'sine-waves'
import {Motion, spring} from 'react-motion'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`
const getStarPos = () => `-${getRandInt(60) + 20}px`

export default class Happenings extends React.Component {

  constructor() {
    super()
    this.state = {
      collapsed: false,
      hovered: false,
    }
  }

  render() {
    const {collapsed, hovered} = this.state;
    const defaultSpring = {stiffness: 70, damping: 9}
    const scaleVal = collapsed? spring(0, {stiffness: 70, damping: 30}) : hovered? spring(.9,  defaultSpring) : spring(1, defaultSpring)
    const opacityVal = collapsed? spring(0, {stiffness: 70, damping: 60}) : 1
    return (
      <Root className={this.props.className}>
        <BackgroundRoot>
          <ShootingStars>
            <StarRoot style={{
              transform: 'rotate(0deg)',
            }}>
              <StarWithTrail style={{
                animationDelay: '3.5s',
                animationDuration: '.5s',
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

        <InfoRoot>
          <InfoContentRoot>
            <InfoIntroRoot>
              <i className='fa fa-info-circle' />
              <InfoIntroText>let's explore henry miller</InfoIntroText>
            </InfoIntroRoot>
            <InfoDetailText className='detail'>
              go on a journey with us. we all need a little bit more exploration in our lives. it's all a dream. anyway...
            </InfoDetailText>
          </InfoContentRoot>
        </InfoRoot>

        <SocialRoot>
          <SocialButtonsRoot>
            <SocialIcon className='fa fa-facebook-square i1' />
            <SocialIcon className='fa fa-twitter-square i2' />
            <SocialIcon className='fa fa-instagram i3' />
            <SocialIcon className='fa fa-medium i4' />
            <SocialIcon className='fa fa-youtube-square i5' />
            <SocialIcon className='fa fa-envelope-o i6' />
          </SocialButtonsRoot>

          <SocialEntryButtonRoot>
            <i className='fa fa-globe' />
          </SocialEntryButtonRoot>
        </SocialRoot>
      </Root>
    )
  }

  onLetsPlay() {
    this.setState({collapsed: true})
    setTimeout(() => {
      window.location = '#hello'
    }, 3000)
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
