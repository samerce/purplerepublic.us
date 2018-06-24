import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  CatchLine as aCatchLine,
  SweetTalk as aSweetTalk,
} from '../../global/styled'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'

const aColor = '#956C95'

const addJiggle = (duration = 7) => `
  animation: ${duration}s jiggle;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-timing-function: ${EASE};
`

injectGlobal`
  div.bubbleButton-nolaMarch {
    top: 40px;
    left: 10px;
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: hidden;
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
  transition: all 2s ${EASE};

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
    transition: .5s ${EASE} 1s;
  }

  .start-exit & {
    transform: translateY(100px);
    opacity: 0;
    transition: all 1.5s ${EASE};
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
  transition: all .5s ${EASE};
  z-index: 6;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    right: 10px;
  }

  .start-exit & {
    opacity: 0;
    transform: translateX(100px);
    transition: all 1.5s ${EASE};
  }

  &:hover {
    opacity: 1;
    transition: all .2s ${EASE_OUT};
    z-index: 25;

    .i1, .i2, .i3, .i4, .i5, .i6 {
      transform: none;
      transition-timing-function: ${EASE};
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
  z-index: 5;
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

  a {
    position: relative;
    .tooltip {
      position: absolute;
      height: 40px;
      line-height: 30px;
      vertical-align: middle;
      padding: 5px 10px;
      font-size: 12px;
      color: white;
      background: ${aColor};
      border-radius: 5px;
      box-shadow: 1px 1px 10px rgba(0,0,0,.3);
      opacity: 0;
      transform: translate(5px, -50%);
      transition: all .2s ${EASE_OUT};
      z-index: 7;
      right: 100%;
      top: 50%;
      pointer-events: none;
    }
    &:hover .tooltip {
      opacity: 1;
      transform: translateY(-50%);
      transition: .3s ${EASE} .4s;
    }
    &.i10 .tooltip {
      width: 131px;
    }
    &.i11 .tooltip {
      width: 125px;
    }
    &.i8 .tooltip {
      width: 80px;
    }
  }
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
  padding-right: 50px;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding: 0;
  }
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  flex: 0 0 ${p => p.size}px;
  height: ${p => p.size}px;

  &:first-child {
    visibility: hidden;
    pointer-events: none;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    height: ${p => p.size * (2/3)}px;
  }
`
