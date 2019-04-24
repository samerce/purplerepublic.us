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

export const Root = Flex.extend`
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
    color: ${p => p.theme.myrtle};
    transform: translate(30px, -55px) rotate(-9deg);
    background: ${p => p.theme.myrtleLight};
    border: 1px solid ${p => p.theme.myrtle};
    box-shadow: ${p => p.theme.shadowMedium};
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    ${screen.mediumlarge`
      left: 50%;
      transform: translate(-50%, -100px) rotate(-9deg);
    `}
  }
`

export const Blurb = BlurbText.extend`
  flex: 1 0 100px;
  max-width: 820px;
  opacity: 1;
  transform: none;
  margin: 0;
  position: relative;
  text-align: left;
  padding: 20px 40px;

  div {
    height: 100%;
    width: 100%;
  }

  ${screen.medium`
    padding: 20px;
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
