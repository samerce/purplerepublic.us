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
  screen, Flex, Boto, FlexColumn, WidgetRoot, BeggingButton,
} from '../../global/styled'

export const ImageHeight = 300

export const Root = WidgetRoot.extend`
`

export const Image = Flex.extend`
  position: absolute;
  width: 300px;
  flex: 0 0 ${ImageHeight}px;
  height: ${p => p.height}px;
  border: 3px solid white;
  border-bottom-width: 32px;
  padding: 0 0 32px;
  box-shadow: ${p => p.theme.shadowHeavy};
  background: url('${p => p.src}');
  background-size: cover;
  transform: rotate(-8deg) translate(30px, 0);
  z-index: 2;
  transition: all .5s ${EASE_OUT};
`

export const CaptionRoot = Flex.extend`
  margin: 0 0 0 300px;
  background: ${p => p.theme.veryDark};
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  flex: 0 0 370px;
  max-height: 150px;
  transition: all .5s ${EASE_OUT};
  box-shadow:
    inset 2px 2px 20px rgba(0,0,0,.3),
    inset -2px -2px 20px rgba(0,0,0,.3);;
  color: ${p => p.theme.veryLight};
  overflow: hidden;

  i {
    position: absolute;
    font-size: 60px;
    left: 620px;
    top: -60px;
    width: 80px;
    height: 80px;
    padding: 2px 0 0 2px;
    transform: rotate(9deg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.veryDark};
    background: ${p => p.theme.veryLight};
    border-radius: 100%;
  }
`

export const Button = BeggingButton.extend`
  transform: translate(200px, 0) rotate(3deg);
`

export const Row = Flex.extend`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`
