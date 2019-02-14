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

export const Blurb = BlurbText.extend`
  flex: 0 0 auto;
  max-width: 740px;
  opacity: 1;
  transform: none;
  text-align: justify;
  position: relative;

  ${screen.medium`
    width: 95%;
  `}

  i {
    position: absolute;
    font-size: 50px;
    right: 80px;
    top: -60px;
    width: 80px;
    height: 80px;
    transform: rotate(-4deg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.veryDark};
    background: ${p => p.theme.veryLight};
    border-radius: 100%;
  }
`

export const Button = BeggingButton.extend`
  transform: translate(40px, -30px) rotate(2deg);
  background: ${p => p.theme.shelly};
  border-color: ${p => p.theme.shellyLight};

  ${screen.medsmall`
    transform: translate(0, -30px) rotate(2deg);
  `}
`

export const Title = Flex.extend`
  font-size: 16px;
  font-family: playfair display;
  color: ${p => p.theme.veryDark};
  text-transform: uppercase;
  margin: 0 0 10px;
  background: ${p => p.theme.veryLight};
  padding: 5px 15px;
  border: 1px solid ${p => p.theme.veryDark};
  border-radius: 10px;

  position: absolute;
  top: -20px;
  left: 20px;
  align-items: center;

  i {
    font-size: 22px;
    color: ${p => p.theme.veryDark};
    flex: 0 0 auto;
    padding: 0 10px 0 0;
  }
`
