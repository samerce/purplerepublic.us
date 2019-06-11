import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, screen, Body,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 100%;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  margin: 40px 0 0;
  transform: translate(0, -10px);
  opacity: 0;

  &.settle, &.chill {
    transform: none;
    opacity: 1;
    transition: all 1s ${EASE_OUT} .6s;
  }
`

export const Title  = Flex.extend`
  font-size: 32px;
  color: white;
  font-family: "playfair display";
  text-transform: uppercase;
  padding: 0 0 0 10px;
`

export const Blurb = Body.extend`
  flex: 1 0 auto;
  margin-top: -10px;
  padding: 20px 40px 10px;
  font-size: 24px;
  max-width: 1080px;
  text-align: center;

  ${screen.large`
    max-width: 85%;
  `}
  ${screen.medium`
    max-width: 90%;
  `}
  ${screen.medsmall`
    font-size: 20px;
  `}

  .love {
    font-family: life savers;
    font-weight: bold;
  }
  .breathe {
    font-family: great vibes;
    font-size: 26px;
  }
  .welcome {
    font-family: annie use your telescope;
    text-transform: uppercase;
  }
`

export const VideoRoot = Flex.extend`
  flex: 1 0 auto;
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowVeryHeavy};
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`
