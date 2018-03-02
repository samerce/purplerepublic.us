import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {
  EASE_OUT, EASE_IN, EASE_IN_OUT_SINE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'

const addJiggle = (duration = 7) => `
  animation: ${duration}s jiggle;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-timing-function: ${EASE_IN_OUT_SINE};
`

injectGlobal`
  div.bubbleButton-logo {
    z-index: 7;
    top: 20px;
    left: 0;
    border-radius: 100%;
    transition: all .3s ${EASE_OUT};
    opacity: 0;
    transform: scale(0);

    .start-show & {
      opacity: 1;
      transform: none;
      transition: all 1s ${EASE_OUT} 1.5s;
    }
  }
  object.bubbleButton-logo-svg {
    width: 90%;
    transform: rotate(-20deg);
    overflow: visible;
    box-shadow: none;
    border: none;

    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      width: 60%;
    }
  }

  div.bubbleButton-nolaMarch {
    top: 40px;
    left: 10px;
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

  @keyframes makeTouchable {
    0% {
      pointer-events: none;
    }
    100% {
      pointer-events: all;
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
  position: fixed;
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

export const Foreground = styled.img`
  position: absolute;
  top: -100px;
  width: 100%;
  z-index: 2;
  opacity: 0;
  pointer-events: none;

  &.show {
    opacity: .3;
    transition: all 10s ${EASE_OUT} 1s;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    top: 0;
    height: 100%;
    width: initial;
  }
`

export const Background = styled.div`
  height: ${window.innerWidth}px;
  width: ${window.innerWidth}px;
  border-radius: 100%;
  background: radial-gradient(circle at center, #00659D 0, #00ABBC 10%, #E2C58B 35%, #E47C82 60%, #AD5B7B 100%);
  opacity: 0;
  transform: scale(0);
  z-index: 1;

  .start-show & {
    transition: all 4s ${EASE_OUT};
    transform: scale(1.5);
    opacity: 1;
    animation-name: makeTouchable;
    animation-duration: .1s;
    animation-fill-mode: both;
    animation-delay: 4s;

    @media (max-width: ${SCREEN_WIDTH_L_PX}) {
      transform: scale(1.7);
    }
    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      transform: scale(2.1);
    }
    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: scale(2.6);
    }

    &:not(.collapsed):hover {
      transform: scale(1.3);
      transition-duration: 3s;

      @media (max-width: ${SCREEN_WIDTH_L_PX}) {
        transform: scale(1.4);
      }
      @media (max-width: ${SCREEN_WIDTH_M_PX}) {
        transform: scale(1.8);
      }
      @media (max-width: ${SCREEN_WIDTH_S_PX}) {
        transform: scale(2.2);
      }
    }
    &.collapsed {
      opacity: 0;
      transform: scale(3);
      transition: all 2s ${EASE_IN};
    }
  }
`

export const ShootingStars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
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
  opacity: 0;
  transform: scale(0);

  .start-show & {
    opacity: 1;
    transform: none;
    transition: all .5s ${EASE_OUT} 1s;
  }
`

export const PlayButton = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: white;
  font-family: life savers;
  border-radius: 100%;
  flex-direction: column;
  font-size: 90px;
  justify-content: center;
  text-align: center;
  background: rgba(172, 90, 122, .9);
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
  user-select: none;

  &:hover {
    background: rgba(172, 90, 122, 1);
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

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 38px;

    span:first-child {
      line-height: 38px;
    }
  }
`

export const PlayButtonHoverRoot = styled.div`
  height: 400px;
  width: 400px;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    height: 150px;
    width: 150px;
  }

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

export const IntroMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 14;
  pointer-events: none;
  opacity: 0;
  transition: all 2s ${EASE_IN_OUT_SINE};

  ${'' /* &.startIntro {
    opacity: .75;
    pointer-events: all;
  } */}
`

export const InfoRoot = styled.div`
  z-index: 4;
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 2s ${EASE_OUT};
  transform: translateY(100px);
  opacity: 0;

  .start-show & {
    transform: none;
    opacity: 1;
    transition: .5s ${EASE_IN_OUT_SINE} 1s;
  }

  .start-exit & {
    transform: translateY(100px);
    opacity: 0;
    transition: all 1.5s ${EASE_IN_OUT_SINE};
  }

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    bottom: 0;
  }
  ${'' /* &.startIntro {
    bottom: 40%;
    display: none;
  }
  &.endIntro {
    pointer-events: all;
    opacity: 1;
    display: none;
  } */}
`

export const InfoContentRoot = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  flex-direction: column;
  border-radius: 3px;
  transition: all .3s ${EASE_OUT};
  padding: 15px;
  transform: translateY(120px);
  color: white;

  &:hover, &.infoHover, .startIntro & {
    background: rgba(255, 255, 255, .1);
    transform: none;
    transition: background .5s, color .2s, transform .5s;
    transition-timing-function: ${EASE_OUT};

    .detail {
      opacity: 1;
      transition: all .2s ${EASE_OUT};
    }

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      background: white;
      color: black;
    }
  }

  & > * {
    flex: 0 0 auto;
  }
  i {
    font-size: 22px;
    width: 30px;
    height: 25px;
    vertical-align: middle;

    .startIntro & {
      opacity: 0;
      width: 1px;
    }
  }
`

export const InfoIntroRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  user-select: none;
`

export const InfoText = styled.div`

`

export const InfoIntroText = styled(InfoText)`
  font-size: 26px;
  font-family: annie use your telescope;

  .startIntro & {
    font-size: 40px;
  }

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 22px;
  }
`

export const InfoDetailText = styled(InfoText)`
  font-size: 18px;
  opacity: 0;
  text-align: center;
  font-family: quattrocento;
`

export const SocialRoot = styled.div`
  position: absolute;
  bottom: 0;
  right: 15px;
  top: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: .5;
  transition: all .5s ${EASE_IN_OUT_SINE};
  z-index: 7;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    right: 10px;
  }

  .start-exit & {
    opacity: 0;
    transform: translateX(100px);
    transition: all 1.5s ${EASE_IN_OUT_SINE};
  }

  &:hover {
    opacity: 1;
    transition: all .2s ${EASE_OUT};
    .i1, .i2, .i3, .i4, .i5, .i6 {
      transform: none;
      transition-timing-function: ${EASE_IN_OUT_SINE};
      transition: opacity .1s, transform .3s;
    }
  }

  a {
    transition: all .5s ${EASE_OUT};

    &:hover {
      transform: scale(1.1);
      transition: transform .5s ${EASE_OUT};
    }
    &:active {
      transform: scale(.9);
      transition: transform .1s ${EASE_OUT};
    }
  }
`

export const SocialIcon = styled.i`
  font-size: 40px;
  color: white;
  width: 50px;
  text-align: center;
  padding: 10px;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    font-size: 30px;
  }

  &.i1 {
  }
  &.i2 {
  }
  &.i3 {
  }
  &.i4 {
    font-size: 34px;
    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      font-size: 24px;
    }
  }
  &.i5 {
    font-size: 40px;
    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
     font-size: 30px;
    }
  }
  &.i6 {
    font-size: 30px;
    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      font-size: 22px;
    }
  }
`

export const SocialButtonsRoot = styled.div`
  z-index: 7;
  display: flex;
  flex-direction: column;

  #document svg {
    cursor: pointer;
  }

  object {
    width: 100%;
    height: 100%;
    cursor: pointer;
    pointer-events: none;
  }
  .i8 {
    margin: 10px 0 10px 4px;
    width: 42px;
    height: 42px;

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      width: 28px;
      height: 28px;
      margin-left: 10px;
    }
  }
  .i10 {
    width: 35px;
    height: 35px;
    margin: 10px 0 10px 9px;

    @media(max-width: ${SCREEN_WIDTH_S_PX}) {
      width: 26px;
      height: 26px;
      margin-left: 13px;
    }
  }
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
    font-size: 38px;
    color: ${alpha(.2, 'white')};
    width: 36px;
    height: 36px;
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

export const BubbleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
`

const ITEM_SIZE = 200
export const BubbleGridItem = styled.div`
  flex: 0 0 ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  position: relative;
  ${'' /* transition: all 1s ${EASE_OUT}; */}

  &.focused {
    flex: 0 0 100%;
    z-index: 20;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    height: 130px;
  }

`
