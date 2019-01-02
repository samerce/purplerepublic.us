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
  screen, AbsoluteFlex, Flex, Boto, FlexColumn, BlurbText, BeggingButton,
} from '../../global/styled'

export const Blurb = BlurbText.extend`
  opacity: 1;
  transform: none;
  margin: 0;
  height: auto;
  display: initial;
  flex: 0 0 400px;
  padding: 20px 15px;
  padding-left: 40px;

  span.bold {
    display: inline;
    font-weight: 800;
  }

  i {
    position: absolute;
    font-size: 50px;
    top: -35px;
    left: 190px;
    padding: 3px 0 0 1px;
    transform: rotate(3deg);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.veryDark};
    background: ${p => p.theme.veryLight};
    border-radius: 100%;
  }
`

export const Image = Flex.extend`
  background: url('${p => p.src}');
  height: 240px;
  flex: 0 0 240px;
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowHeavy};
  background-size: cover;
  background-position-x: -10px;
  transform: translate(30px, 0);
`

export const Row = Flex.extend`
  align-items: center;
  width: 100%;
  position: relative;
`

export const Button = BeggingButton.extend`
  transform: translate(240px, -85px) rotate(-2deg);
`

export const Title = Flex.extend`
  position: absolute;
  width: 100%;
  text-align: center;
  font-family: playfair display;
  font-size: 20px;
  color: ${p => p.theme.veryLight};
  text-transform: uppercase;
  top: 39px;
  padding: 0 0 0 270px;
`
