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
  screen, Flex, Boto, FlexColumn, BlurbText, WidgetRoot, BeggingButton,
} from '../../global/styled'

export const Root = WidgetRoot.extend`
  flex: 0 0 100%;
`

export const Row = Flex.extend`
  width: 100%;
  justify-content: center;
  align-items: center;

  i {
    position: absolute;
    top: 10px;
    left: -110px;
    flex: 0 0 110px;
    width: 110px;
    height: 110px;
    font-size: 80px;
    color: ${p => p.theme.veryDark};
    transform: translate(30px, -55px) rotate(-9deg);
    background: ${p => p.theme.veryLight};
    border: 1px solid ${p => p.theme.veryDark};
    box-shadow: ${p => p.theme.shadowMedium};
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`

export const Blurb = BlurbText.extend`
  flex: 1 0 100px;
  max-width: 740px;
  opacity: 1;
  transform: none;
  margin: 0;
  position: relative;

  div {
    height: 100%;
    width: 100%;
  }
`

export const Button = BeggingButton.extend`
  transform: translate(300px, -40px) rotate(2deg);
`
