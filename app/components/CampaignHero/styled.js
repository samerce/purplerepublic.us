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
  screen, Flex, Boto, FlexColumn, BlurbText, BeggingButton,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  flex: 0 0 100%;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 0 60px;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
  transform: translate(0, -10px);
  opacity: 0;

  &.settle, &.chill {
    transform: none;
    opacity: 1;
    transition: all 1s ${EASE_OUT} .8s;
  }
`

export const ContentRoot = FlexColumn.extend`
  padding: 0 15px;
  width: 100%;
  justify-content: center;
  align-items: center;

  ${screen.medium`
    margin: 60px 0 0;
  `}
`

export const Button = BeggingButton.extend`
  transform: rotate(2deg);
  background: ${p => p.theme.myrtle};
  border-color: ${p => p.theme.myrtleLight};

  ${screen.mediumlarge`
    transform: translate(0, -30px) rotate(2deg);
  `}
`
