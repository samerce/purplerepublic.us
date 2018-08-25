import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../global/constants'
import {
  screen, AbsoluteFlex, Flex, Boto, AbsoluteFlexFillParent,
} from '../../global/styled'


export const GratitudeWheelRoot = Flex.extend`
  flex: 0 0 70%;
  width: 100%;
  position: relative;
  margin-left: -3px;
`

export const GratitudeWheel = AbsoluteFlexFillParent.extend`
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`

export const GratitudeText = Flex.extend`
  align-items: center;
  font-size: 20px;
  color: white;
  text-align: center;
  transform: translateX(100px);
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  line-height: 24px;
  text-shadow: 1px 1px rgba(0,0,0,.5);
  flex: 0 0 100%;
  padding: 10px 50px 10px 15px;
  justify-content: center;
  height: 100%;

  .active & {
    transform: none;
    opacity: 1;
  }
  .scrollable & {
    overflow: auto;
    div {
      height: 100%;
      padding-top: 5px;
    }
  }
  .leftSide & {
    padding: 10px 15px 10px 50px;
  }

  ${screen.medium`
    font-size: 14px;
    line-height: 18px;
    padding-right: 25px;

    .leftSide & {
      padding: 5px 10px 5px 25px;
    }
  `}
  ${screen.small`
    font-size: 12px;
    line-height: 16px;
  `}
`

export const Timer = AbsoluteFlex.extend`
  bottom: 0;
  height: 2px;
  width: 100%;
  background: ${p => p.theme.veryLight};
  transform-origin: left center;

  .active & {
    transform: scaleX(0);
    transition: all ${p => p.duration}ms linear;
  }
`
