import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, FlexColumn, Boto, AbsoluteFlex, screen, Form,
} from '../../global/styled'
import theme from '../../global/theme'

export const Root = FlexColumn.extend`
  padding: 20px 0 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${theme.veryDarkTransparent};
  position: relative;
  transform: translate(0, -10px);
  opacity: 0;
  align-items: center;

  &.settle, &.chill {
    transform: none;
    opacity: 1;
    transition: all 1s ${EASE_OUT} 1.1s;
  }

  .body {
    margin: 0 20px 40px;
    position: relative;
    background: ${theme.flikLight};
    color: ${theme.flikDark};

    i {
      position: absolute;
      border-radius: 100%;
      padding: 20px;
      font-size: 50px;
      transform: rotate(-15deg) translate(-50px,15px);
      bottom: 100%;
      left: 0;
      width: 90px;
      height: 90px;
      text-align: center;
      box-shadow: ${theme.shadowHeavy};
      color: ${theme.shellyLight};
      background: ${theme.shelly};
    }

    ${screen.medsmall`
      margin-top: 50px;

      i {
        left: 50%;
        transform: rotate(-15deg) translate(-50%, 5px);
      }
    `}
  }

  .mailingListForm {
    font-size: 24px;
    text-align: center;
    padding: 20px;

    ${screen.medium`
      flex: 0 0 auto;
      width: 100%;
    `}
  }
`
