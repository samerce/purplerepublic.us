import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {Flex} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 100%;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`

export const Title  = Flex.extend`
  font-size: 32px;
  color: white;
  font-family: "playfair display";
  text-transform: uppercase;
  padding: 0 0 0 10px;
`

export const Blurb = Flex.extend`
  flex: 1 0 auto;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${p => alpha(.5, p.theme.veryDark)};
  box-shadow: ${p => p.theme.shadowMedium};
  border: 1px solid ${p => p.theme.veryLight};
  color: ${p => p.theme.veryLight};
  font-size: 26px;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding: 0 40px;
  margin-top: -3px;
`

export const VideoRoot = Flex.extend`
  flex: 1 0 auto;
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowHeavy};
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

`
