import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex
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
`

export const TimelineDot = Flex.extend`
  border-radius: 100%;
  background: ${p => p.theme.veryLight};
  width: 10px;
  height: 10px;
  position: absolute;
  transform: translate(-50%, 0);
  box-shadow: 2px 2px 30px rgba(0,0,0,.5);

  .right & {
    margin-left: -1px;
    left: 0;
  }
  .left & {
    margin-right: -11px;
    right: 0;
  }
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

  .right & {
    margin-left: 40px;
  }
  .left & {
    margin-right: 40px;
  }
`

export const TimelineTitle = Flex.extend`
  font-family: playfair display;
  text-transform: uppercase;
  font-size: 20px;
`

export const TimelineSubtitle = Flex.extend`
  color: ${p => p.theme.veryLight};
  font-size: 18px;

`
