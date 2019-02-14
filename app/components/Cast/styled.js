import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, FlexColumn, Boto, AbsoluteFlex, screen,
} from '../../global/styled'

export const Root = Flex.extend`
  padding: 20px 0 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
`

export const ContentRoot = Flex.extend`
  flex-wrap: wrap;
  padding: 0 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const QuarkRoot = FlexColumn.extend`
  flex: 0 0 50%;
  align-items: center;
  justify-content: center;

  ${screen.medsmall`
    margin: 10px 0;
    flex: 0 0 100%;
  `}
`

export const BubbleImage = Boto.extend`
  background: url('${p => p.src}');
  background-size: cover;
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryLight};
  width: 300px;
  height: 300px;
  box-shadow: ${p => p.theme.shadowVeryHeavy};

  &:hover {
    background: url('${p => p.src}');
    background-size: cover;
    transform: scale(1.05);
    border-color: ${p => p.theme.veryLight};
  }

  ${screen.medium`
    width: 250px;
    height: 250px;
  `}
`

export const QuarkName = Flex.extend`
  margin: 10px 0 0;
  font-size: 28px;
  color: white;

  ${screen.medium`
    font-size: 26px;
  `}
`

export const QuarkTitle = Flex.extend`
  font-size: 20px;
  color: ${p => p.theme.veryLight};
  text-transform: uppercase;
  font-family: playfair display;

  ${screen.medium`
    font-size: 18px;
  `}
`
