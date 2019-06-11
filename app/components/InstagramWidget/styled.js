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
  height: 380px;
  flex: 1 0 620px;

  ${screen.mediumlarge`
    margin: 280px 0 0;
    padding-bottom: 60px;
  `}
  ${screen.medsmall`
    max-width: 95%;
  `}
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

  ${screen.mediumlarge`
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -20px) rotate(-8deg);
  `}
`

export const Gap = Flex.extend`
  flex: 0 0 300px;
  ${screen.medium`
    display: none;
  `}
`

export const CaptionRoot = Flex.extend`
  background: ${p => p.theme.veryDark};
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  flex: 1;
  max-width: 740px
  max-height: 150px;
  transition: all .5s ${EASE_OUT};
  box-shadow:
    inset 2px 2px 20px rgba(0,0,0,.3),
    inset -2px -2px 20px rgba(0,0,0,.3);
  color: ${p => p.theme.veryLight};
  overflow: hidden;

  ${screen.mediumlarge`
    margin: 0 auto;
    flex: 1;
  `}

  i {
    position: absolute;
    font-size: 60px;
    left: 570px;
    top: -70px;
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

    ${screen.mediumlarge`
      left: 30px;
      top: -70px;
      z-index: 3;
    `}
  }
`

export const Button = BeggingButton.extend`
  transform: translate(200px, 0) rotate(3deg);
  background: ${p => p.theme.shelly};
  border-color: ${p => p.theme.shellyLight};

  ${screen.mediumlarge`
    transform: rotate(3deg);
  `}
`

export const Row = Flex.extend`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`
