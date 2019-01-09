import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlex, screen,
} from '../../global/styled'

export const Root = Flex.extend`
  flex-direction: column;
  width: 100%;
`

export const TimelineRowRoot = Flex.extend`
  position: relative;
  height: 200px;
  flex: 1 0 100%;

  &.right {
    border-left: 2px solid ${p => p.theme.veryLight};
    margin-left: 50%;
    transform: translate(-2px, 0);
  }
  &.left {
    border-right: 2px solid ${p => p.theme.veryLight};
    margin-right: 50%;
    justify-content: flex-end;
  }
  &.fadeIntoNothing {
    border: none;
    width: 2px;
    padding: 0;
    margin-left: 50%;
    transform: translate(-2px, 0);
    background: linear-gradient(
      to bottom,
      ${p => p.theme.veryLight} 0%,
      transparent 100%
    )
  }

  ${screen.medium`
    && {
      margin: 0 0 20px;
      border: none;
      transform: none;
    }
  `}
`

export const TimelineDot = Flex.extend`
  border-radius: 100%;
  background: ${p => p.theme.veryLight};
  width: 10px;
  height: 10px;
  position: absolute;
  transform: translate(-50%, 0);
  box-shadow: 2px 2px 30px rgba(0,0,0,.5);
  z-index: 2;

  .right & {
    margin-left: -1px;
    left: 0;
  }
  .left & {
    margin-right: -11px;
    right: 0;
  }

  ${screen.medium`
    && {
      left: 50%;
      right: initial;
      transform: translate(-50%, 0);
      top: -4px;
    }
  `}
`

export const TimelineArrow = styled.i`
  font-size: 28px;
  color: white;
  width: 20px;
  height: 30px;
  text-align: center;
  position: absolute;
  top: -10px;
  color: ${p => p.theme.veryLight};
  text-shadow: ${p => p.theme.shadowMedium};

  .right & {
    left: 10px;
  }
  .left & {
    right: 10px;
  }

  ${screen.medium`
    display: none;
  `}
`

export const RowContentRoot = Flex.extend`
  border-radius: 10px;
  max-width: 740px;
  background: ${p => p.theme.main};
  border: 2px solid ${p => p.theme.veryLight};
  width: 80%;
  margin-top: -10px;
  flex-direction: column;
  padding: 10px 20px;
  color: white;
  box-shadow: ${p => p.theme.shadowHeavy};
  position: relative;
  z-index: 1;

  .right & {
    margin-left: 40px;
  }
  .left & {
    margin-right: 40px;
  }
  &.special {
    background: ${p => p.theme.veryDark};
  }

  ${screen.medium`
    && {
      width: 95%;
      padding: 15px;
      margin: 0 auto;
    }
  `}
`

export const TimelineTitle = Flex.extend`
  font-family: playfair display;
  text-transform: uppercase;
  font-size: 20px;

  .left & {
    align-self: flex-end;
  }

  ${screen.medium`
    && {
      font-size: 18px;
      align-self: center;
    }
  `}
`

export const TimelineSubtitle = Flex.extend`
  color: ${p => p.theme.veryLight};
  font-size: 18px;

  .left & {
    align-self: flex-end;
  }

  ${screen.medium`
    && {
      font-size: 16px;
      align-self: center;
    }
  `}
`

export const IntroBlurb = Flex.extend`
  max-width: 740px;
  color: ${p => p.theme.veryLight};
  font-size: 22px;
  background: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowMedium};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  padding: 20px;
  margin: 0 0 50px;
  position: relative;
  z-index: 3;

  ${screen.medium`
    max-width: 95%;
    font-size: 18px;
    padding: 15px;
  `}
`

export const TimelineLine = AbsoluteFlex.extend`
  width: 1px;
  height: 60px;
  background: ${p => p.theme.veryLight};
  top: 0;
  left: 50%;
  transform: translate(-1px, -100%);
  display: none;

  ${screen.medium`
    display: flex;
  `}
`
