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
  position: relative;
  flex: 0 0 100%;
  overflow: auto;
`

export const GratitudeText = Flex.extend`
  align-items: center;
  font-size: 20px;
  text-align: center;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  line-height: 24px;
  text-shadow: 1px 1px rgba(0,0,0,.5);
  flex: 0 0 100%;
  padding: 10px 50px 10px 15px;
  justify-content: center;
  height: 100%;

  .timedBlurb-enter &, .timedBlurb-show & {
    opacity: 1;
  }
  .timedBlurb-exit &, .timedBlurb-willExit & {
    opacity: 0;
  }
  .scrollable & {
    overflow: auto;
    div {
      height: 100%;
      padding: 5px 0;
    }
  }
  .leftSide & {
    padding: 10px 15px 10px 50px;
  }

  ${screen.mediumlarge`
    && {
      padding: 10px;
    }
  `}

  ${screen.medium`
    font-size: 18px;
    line-height: 20px;
  `}
  ${screen.small`
    font-size: 16px;
    line-height: 18px;
  `}
`

export const Timer = AbsoluteFlex.extend`
  bottom: 0;
  height: 2px;
  width: 100%;
  background: ${p => p.theme.veryLight};
  transform-origin: right center;

  .leftSide & {
    transform-origin: left center;
  }

  .timedBlurb-show &, .timedBlurb-enter & {
    transform: scaleX(0);
    transition: all ${p => p.duration}ms linear;
  }
  .timedBlurb-exit &, .timedBlurb-willExit & {
    transition: all .1s ${EASE_OUT};
  }
`
