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
import {
  Flex, AbsoluteFlex, screen,
} from '../../global/styled'

const reveal = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: none;
  }
`

const aColor = '#498359'

export const Root = AbsoluteFlex.extend`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  z-index: 6;
  justify-content: center;
  transition: all 1s ${EASE_OUT};

  &.hidden, &.birth, &.splash {
    transform: translate(0, 120%);
  }

  &.settle {
    transform: none;
    transition: all 1s ${EASE_OUT} 1s;
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

export const SocialButton = styled.a`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
`

export const SocialIcon = styled.i`
  font-size: 30px;
  color: white;
  text-align: center;
  padding: 10px;

  ${screen.medsmall`
    font-size: 30px;
    padding: 10px 15px;
  `}
  ${screen.small`
    padding: 12px;
  `}

  &.i1 {
  }
  &.i2 {
  }
  &.i3 {
  }
  &.i4 {
  }
  &.i5 {
  }
  &.i6 {
  }
  &.i9 {
    padding-top: 12px;

    ${screen.medsmall`
      font-size: 30px;
    `}
  }
`

export const SocialButtonsRoot = Flex.extend`
  z-index: 5;
  flex: 0 0 100%;
  cursor: pointer;
  justify-content: center;
  align-self: center;
  background: ${p => p.theme.linearGradient(p.theme.slightlyLight)};
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  ${'' /* border-top: 1px solid ${p => p.theme.veryLight}; */}
  padding: 5px 10px;
  flex: 0 0 100%;

  ${screen.medium`
    width: 100%;
    border-radius: 0;
  `}

  &:hover {
    opacity: 1;
    transition: all .3s ${EASE_OUT};
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
      font-size: 18px;
      font-family: annie use your telescope;
      color: white;
      background: ${p => p.theme.main};
      border-radius: 5px;
      box-shadow: ${p => p.theme.shadowHeavy};
      opacity: 0;
      transform: translate(-50%, 5px);
      transition: all .2s ${EASE_OUT};
      z-index: 7;
      left: 50%;
      bottom: 103%;
      pointer-events: none;
      border: 1px solid ${p => p.theme.veryLight};
    }
    &:hover .tooltip {
      opacity: 1;
      transform: translate(-50%, 0);
      transition: .3s ${EASE_OUT} .4s;
    }
    &.i10 .tooltip {
      width: 131px;
    }
    &.i11 .tooltip {
      width: 140px;
    }
    &.i8 .tooltip {
      width: 80px;
    }
  }
`
