import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, screen
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

export const Blurb = styled.div`
  flex: 1 0 auto;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${p => alpha(.2, p.theme.veryDark)};
  box-shadow: ${p => p.theme.shadowMedium};
  border: 1px solid ${p => p.theme.veryLight};
  color: ${p => p.theme.veryLight};
  font-size: 24px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: -3px;
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
