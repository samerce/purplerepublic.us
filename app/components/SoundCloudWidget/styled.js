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
  screen, Flex, Boto, FlexColumn, BeggingButton, WidgetRoot
} from '../../global/styled'

export const Root = WidgetRoot.extend`
  padding: 0 10px 40px;
  ${screen.large`
    padding: 0 60px 80px 10px;
  `}
  ${screen.medsmall`
    padding: 0 20px 80px;
  `}
`

export const EmbedRoot = Flex.extend`
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowHeavy};
  margin: 0 0 15px;
  transform: rotate(3deg);
  padding: 5px;
  background: ${p => p.theme.veryDark};
  width: 100%;
  max-width: 740px;

  i {
    position: absolute;
    font-size: 50px;
    right: -50px;
    top: -60px;
    width: 80px;
    height: 80px;
    transform: rotate(-16deg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.veryDark};
    background: ${p => p.theme.veryLight};
    border-radius: 100%;

    ${screen.medium`
      right: 30%;
      top: -70px;
    `}
  }
`

export const Button = BeggingButton.extend`
  transform: translate(-80px, -20px) rotate(-1deg);
  background: ${p => p.theme.shelly};
  border-color: ${p => p.theme.shellyLight};

  ${screen.medium`
    transform: rotate(-1deg);
  `}
`
