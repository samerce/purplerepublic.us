import styled, {injectGlobal} from 'styled-components'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {EASE_OUT, EASE_IN, EASE_IN_OUT_SINE} from '../../global/constants'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`

injectGlobal`
  @keyframes jiggle {
    0% {
      transform: translate(${getRand(17)}, ${getRand(13)}) rotate(-20deg);
    }

    25% {
      transform: translate(${getRand(-15)}, ${getRand(-11)}) rotate(-20deg);
    }

    50% {
      transform: translate(${getRand(12)}, ${getRand(17)}) rotate(-20deg);
    }

    75% {
      transform: translate(${getRand(-19)}, ${getRand(12)}) rotate(-20deg);
    }

    100% {
      transform: translate(${getRand(14)}, ${getRand(-17)}) rotate(-20deg);
    }
  }

  @keyframes shootingStar {
    0% {
      transform: translate(500%, 500%);
      opacity: 1;
    }

    95% {
      opacity: 0;
    }

    100% {
      transform: translate(-60%, -60%);
      opacity: 0;
    }
  }

  #waves {
    position: absolute;
    z-index: 2;
    top: 230px;
    right: 80px;
  }
  #waves1 {
    position: absolute;
    z-index: 2;
    top: 180px;
    left: 80px;
  }
  #waves2 {
    position: absolute;
    z-index: 2;
    bottom: 220px;
    left: 80px;
    transform: rotate(180deg);
  }
  #waves3 {
    position: absolute;
    z-index: 2;
    bottom: 170px;
    right: 80px;
    transform: rotate(180deg);
  }

  .pupil-circle {
    border-radius: 100%;
    width: 10px;
    height: 10px;
    background: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const BackgroundRoot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Background = styled.div`
  height: ${window.innerWidth}px;
  width: ${window.innerWidth}px;
  border-radius: 100%;
  background: radial-gradient(circle at center, #00659D 0, #00ABBC 10%, #E2C58B 35%, #E47C82 60%, #AD5B7B 100%);
  transition: all 4s ${EASE_OUT};
  transform: scale(1.5);

  &:not(.collapsed):hover {
    transform: scale(1.2);
    transition-duration: 3s;
  }
  &.collapsed {
    opacity: 0;
    transform: scale(3);
    transition: all 2s ${EASE_IN};
  }
`

export const ShootingStars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
`

export const StarRoot = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  transform: rotate(-145deg);
`

export const StarWithTrail = styled.div`
  width: 200px;
  background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(255,255,255,0.4) 100%);
  animation-name: shootingStar;
  animation-iteration-count: infinite;
  animation-timing-function: ${EASE_IN};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(500%, 500%);
`

export const Star = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 100%;
  background: rgba(229, 238, 244, 1);
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, .8);

`

export const PlayButtonRoot = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const PlayButton = styled.div`
  display: flex;
  height: 400px;
  width: 400px;
  color: white;
  font-family: life savers;
  border-radius: 100%;
  flex-direction: column;
  font-size: 90px;
  justify-content: center;
  text-align: center;
  background: rgba(172, 90, 122, 0.4);
  ${'' /* background: radial-gradient(circle at center, #AD5B7B 0%, rgba(87, 5, 76, 1) 50%, rgba(249, 208, 243, 1) 60%, rgba(249, 208, 243, 1) 70%, rgba(87, 5, 76, 1) 100%); */}
  animation: 7s jiggle;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-timing-function: ${EASE_IN};
  z-index: 3;
  transition: all 1.5s ${EASE_IN}, background .3s ${EASE_IN};
  ${'' /* border: 1px solid #AD5B7B; */}
  box-shadow: 0px 0px 20px rgba(0,0,0,.4);
  text-shadow: 1px 1px rgba(87, 5, 76, .2);

  &:hover {
    background: rgba(172, 90, 122, 0.6);
    transition: background 1s ${EASE_OUT};
    box-shadow: 0 0 10px rgba(0,0,0,.5);
  }

  span {
    flex: 0 0 auto;
    transition: all 1s ${EASE_IN};

    &:first-child {
      line-height: 70px;
    }
  }
`

export const PlayButtonHoverRoot = styled.div`
  height: 400px;
  width: 400px;
  z-index: 4;

  &.collapsed {
    opacity: 0;
    transform: scale(0);
    transition: all 1.5s ${EASE_IN};

    span {
      transform: rotate(-30deg);
      opacity: 0;

      &:first-child {
        transform: rotate(30deg);
      }
    }
  }
`

export const InfoRoot = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const InfoContentRoot = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  flex-direction: column;
  border-radius: 3px;
  transition: all .5s ${EASE_OUT};
  padding: 10px;
  transform: translateY(70px);

  &:hover {
    background: rgba(255, 255, 255, .1);
    transform: none;
    transition: all .5s ${EASE_IN_OUT_SINE};

    .detail {
      opacity: 1;
      transition: all .5s ${EASE_IN_OUT_SINE};
    }
  }

  & > * {
    flex: 0 0 auto;
  }
  i {
    font-size: 22px;
    width: 30px;
    height: 25px;
    color: white;
    vertical-align: middle;
    line-height: 34px;
  }
`

export const InfoIntroRoot = styled.div`
  display: flex;
  justify-content: center;
`

export const InfoText = styled.div`

`

export const InfoIntroText = styled(InfoText)`
  font-size: 26px;
  color: white;
  font-family: life savers;
`

export const InfoDetailText = styled(InfoText)`
  font-size: 22px;
  color: white;
  opacity: 0;
  text-align: center;
  transition: all .5s ${EASE_OUT};
`

export const SocialRoot = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 50px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    padding: 300px 10px 10px;
    i.fa {
      opacity: 1;
      transform: none;
      transition-timing-function: ${EASE_IN_OUT_SINE};
      transition: opacity .1s, transform .3s;

      &.i1 {
        bottom: 50px;
        ${'' /* left: 0; */}
        ${'' /* transition-delay: .3s; */}
      }
      &.i2 {
        bottom: 90px;
        ${'' /* left: 5px; */}
        ${'' /* transition-delay: .25s; */}
      }
      &.i3 {
        bottom: 130px;
        ${'' /* left: 10px; */}
        ${'' /* transition-delay: .2s; */}
      }
      &.i4 {
        bottom: 170px;
        ${'' /* left: 15px; */}
        ${'' /* transition-delay: .15s; */}
      }
      &.i5 {
        bottom: 210px;
        ${'' /* left: 20px; */}
        ${'' /* transition-delay: .1s; */}
      }
      &.i6 {
        bottom: 250px;
        ${'' /* left: 25px; */}
        ${'' /* transition-delay: .05s; */}
      }
    }
  }
`

export const SocialIcon = styled.i`
  font-size: 38px;
  color: white;
  position: absolute;
  bottom: 0;
  opacity: 0;
  transition: opacity .3s, transform .4s;
  transition-timing-function: ${EASE_OUT};
  width: 30px;
  text-align: center;

  &.i1 {
    bottom: 50px;
    ${'' /* left: 0; */}
    transform: translateY(50px) scale(.1);
  }
  &.i2 {
    bottom: 90px;
    ${'' /* left: 5px; */}
    transform: translateY(90px) scale(.1);
  }
  &.i3 {
    bottom: 130px;
    ${'' /* left: 10px; */}
    transform: translateY(130px) scale(.1);
  }
  &.i4 {
    bottom: 170px;
    ${'' /* left: 15px; */}
    transform: translateY(170px) scale(.1);
  }
  &.i5 {
    bottom: 210px;
    ${'' /* left: 20px; */}
    transform: translateY(210px) scale(.1);
  }
  &.i6 {
    bottom: 250px;
    ${'' /* left: 25px; */}
    transform: translateY(250px) scale(.1);
  }
`

export const SocialButtonsRoot = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 4;
`

export const SocialEntryButtonRoot = styled.div`
  display: flex;
  justify-content: center;
  z-index: 5;
  position: relative;

  & > * {
    flex: 0 0 auto;
  }

  i {
    font-size: 32px;
    color: white;
    width: 30px;
    height: 30px;
  }

`

export const SocialEntryButtonContentRoot = styled.div`

`

export const SocialRoots = styled.div`

`



export const Invitation = styled.div`

`

export const GetInvolved = styled.div`

`

export const CatchLine = styled(aCatchLine)`
  text-align: left;
  margin-left: 30px;
  margin-top: 0;
`

export const SweetTalk = styled(aSweetTalk)`
  text-align: left;
  margin: -10px 0 20px 30px;
  font-size: 30px;

  &.blurb-area {
    max-width: 670px;
    margin: 40px auto 0;
    font-size: 22px;
    text-align: center;

    .blurb {
      position: fixed;
    }

    @media(max-width: 960px) {
      margin: 20px auto;
      .blurb {
        position: relative;
      }
    }
  }
`

export const WhenPart = styled.a`
  flex: 1 0 auto;
  padding: 10px 0 10px 60px;
  text-decoration: none;
  &:hover {
    background: rgba(102, 15, 89, .75);
  }
  &:active {
    background: rgba(102, 15, 89, .95);
  }
  .link {
    text-decoration: underline;
  }

  @media(max-width: 544px) {
    padding-left: 30px;
  }
`

export const TicketLink = styled.a`
  color: rgba(255, 210, 249, 1);
  font-size: 26px;
  flex: 1 0 auto;
  text-align: center;
  vertical-align: middle;
  line-height: 54px;
  border-left: 1px solid rgba(255, 210, 249, .7);
  text-decoration: none;
  background: rgba(102, 15, 89, 0.35);
  padding: 10px 0 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  @media(max-width: 530px) {
    padding-left: 30px;
    border: none;
    text-align: left;
    border-radius: 0;
  }
  &:hover {
    background: rgba(102, 15, 89, 0.55);
  }
  &:active {
    background: rgba(102, 15, 89, 0.85);
  }
`

export const When = styled(SweetTalk)`
  font-size: 24px;
  margin: 5px 0 40px;
  background: none;
  line-height: 28px;
  background: rgba(102, 15, 89, .5);
  border-radius: 10px;
  max-width: 580px;
  transform: translateX(-30px);
  display: flex;
  justify-content: center;
  padding-right: 0;

  a {
    color: rgba(255, 210, 249, 1);
  }
  @media(max-width: 530px) {
    flex-direction: column;
    transform: none;
    border-radius: 0;
    padding-left: 0;
  }
`

const Text = styled.div`
  font-size: 20px;
  ${'' /* text-shadow: 1px 1px rgba(250, 166, 238, 0.5); */}
  color: rgba(102, 15, 89, 1);
  margin-left: -15px;
  max-width: 620px;
  position: relative;
  z-index: 3;
  border-radius: 10px;
  padding: 5px 10px 5px 40px;
`

const SpecialText = `
  border-top: 2px solid rgba(245, 212, 241, .5);
  text-shadow: 1px 1px rgba(89, 12, 80, 0.44);
  background: rgba(164, 84, 154, 0.4);
  padding-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: rgba(255, 210, 249, 1);
`

export const HookEm = styled(Text)`
  font-size: 34px;
  font-family: caveat;
  background: rgba(94, 83, 163, 0.6);
  transform: rotate(-3deg);
  color: rgba(247, 219, 244, 1);

  div.sub {
    font-size: 26px;
    color: rgba(124, 21, 111, 1);
    &:last-child {
      color: rgba(74, 10, 66, 1);
    }
  }
`

export const WooEm = styled(Text)`
  font-size: 26px;
  font-family: reenie beanie;
  transform: rotateZ(-1deg);
  color: rgba(97, 27, 88, 1);
  background: rgba(217, 111, 203, 0.7);
  margin-top: 30px;
`

export const Bounce = styled(Text)`
  font-family: annie use your telescope;
  font-size: 32px;
  margin-top: 35px;
  color: rgba(247, 219, 244, 1);
  background: rgba(164, 84, 154, 0.5);
  transform: rotateZ(3deg);
  max-width: 500px;
`

export const ShakeEm = styled(Text)`
  font-size: 28px;
  font-family: caveat;
  transform: rotateZ(1deg);
  margin-top: 20px;
  color: rgba(247, 219, 244, 1);/*rgba(74, 10, 66, 1);*/
  background: rgba(94, 83, 163, 0.6);
  max-width: 330px;
`

export const Jiggle = styled(Text)`
  font-family: annie use your telescope;
  font-size: 22px;
  transform: rotateZ(-2deg);
  margin-top: 25px;
  color: rgba(74, 10, 66, 1);
  background: rgba(83,153,163, .6);
  max-width: 590px;

  div.sub {
    color: rgba(124, 21, 111, 1);
  }
  div.tres {
    color: rgba(247, 219, 244, 1);
  }
  div.quat {
    color: rgba(255, 255, 255, 1);
  }
`

export const Pocky = styled(Text)`
  font-family: caveat;
  font-size: 26px;
  margin: 35px 0 25px -10px;
  color: rgba(97, 27, 88, 1);
  background: rgba(217, 111, 203, 0.7);
  transform: rotateZ(-1deg);
`

export const Chortle = styled(Text)`
  font-family: annie use your telescope;
  font-size: 28px;
  transform: rotateZ(-3deg);
  color: rgba(255, 210, 249, 1);
  margin-top: 20px;
`

export const Koki = styled(Text)`
  font-family: love ya like a sister;
  font-size: 20px;
  margin-top: 15px;
  color: rgba(255, 210, 249, 1);
`
