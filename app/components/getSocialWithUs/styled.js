import styled, {injectGlobal, keyframes} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'

const reveal = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: none;
  }
`

const aColor = '#498359'

export const Root = styled.div`
  position: absolute;
  bottom: 0;
  right: 15px;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 6;
  pointer-events: none;
  animation-name: ${reveal};
  animation-duration: 1s;
  animation-delay: 5s;
  animation-timing-function: ${EASE_OUT};
  animation-fill-mode: both;

  @media(max-width: ${SCREEN_WIDTH_S_PX}) {
    right: 10px;
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
  pointer-events: all;
  flex: 0 0 auto;
  cursor: pointer;
  opacity: .5;

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
      height: 35px;
      line-height: 25px;
      vertical-align: middle;
      padding: 5px 10px;
      font-size: 14px;
      font-family: annie use your telescope;
      color: white;
      background: ${p => p.theme.main};
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
      width: 110px;
    }
    &.i8 .tooltip {
      width: 80px;
    }
  }
`
