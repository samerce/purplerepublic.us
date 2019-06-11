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
import theme from '../../global/theme'

export const Root = FlexColumn.extend`
  margin: 40px 0 0;
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

  .body {
    position: relative;
    margin: 0 5px;
    background: ${p => p.theme.flikLight};
    color: ${p => p.theme.flikDark};
  }

  @keyframes noticeme {
   0% {
     margin-left: 0;
   }
   100% {
    margin-left: 7px;
   }
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
  margin: 0 0 30px;

  i {
    position: absolute;
    top: -20px;
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
      width: 90px;
      height: 90px;
      font-size: 50px;
      transform: translate(-50%, -55px) rotate(-9deg);
    `}

    & > * {
      position: absolute;
      left: 100%;
      top: 0;
      border-radius: 40px;
      animation-name: noticeme;
      animation-duration: .5s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ${EASE_OUT};
    }

    .screech1 {
      width: 30px;
      height: 2px;
      transform: translate(0, 20px) rotate(-20deg);
      animation-delay: ${Math.random() * .2}s;
      background: ${theme.pramLight};
    }
    .screech2 {
      width: 40px;
      height: 2px;
      transform: translate(0, 40px) rotate(-2deg);
      animation-delay: ${Math.random() * .2}s;
      background: ${theme.tweetLight};
    }
    .screech3 {
      width: 30px;
      height: 2px;
      transform: translate(0, 60px) rotate(10deg);
      animation-delay: ${Math.random() * .2}s;
      background: ${theme.pramLight};
    }
  }
`

export const Button = BeggingButton.extend`
  transform: rotate(2deg);
  background: ${p => p.theme.myrtle};
  border-color: ${p => p.theme.myrtleLight};

  ${screen.mediumlarge`
    transform: translate(0, -30px) rotate(2deg);
  `}
`
