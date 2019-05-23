import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, FlexColumn, screen, Body as aBody, TextInput as aTextInput,
  Form,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.veryDarkTransparent};
  padding: 0 0 40px 0;
  transform: translate(0, -10px);
  opacity: 0;

  &.settle, &.chill {
    transform: none;
    opacity: 1;
    transition: all 1s ${EASE_OUT} .9s;
  }
`

export const ImageGroup = Flex.extend`
  align-items: center;
  justify-content: space-around;
  margin: 30px 0;
  flex-wrap: wrap;

   & > * {
     max-width: 40%;
   }

   ${screen.medsmall`
     flex-direction: column;
     margin: 0 0 15px;

     & > * {
       margin: 15px 0;
       max-width: 90%;
     }
   `}
`

export const Body = aBody.extend`
  font-size: 24px;
  text-align: center;
  align-items: center;
  z-index: 1;
  background: ${p => p.theme.myrtleLight};
  color: ${p => p.theme.myrtleDark};

  ${screen.medium`
    margin: 10px 20px 0;
    flex: 0 0 100%;
    font-size: 22px;
  `}
`

export const SecretCodeForm = Form.extend`
  font-size: 24px;
  text-align: center;
  align-items: center;
  padding-top: 10px;
  transform: translate(0, -10px);
  margin: 0 0 15px;

  p {
    margin-bottom: 10px;
  }
`

export const Button = Boto.extend`
  background: ${p => p.theme.flik};
  border-color: ${p => p.theme.flikLight};
  width: 80%;
  max-width: 270px;
  font-size: 26px;
  margin: 0 0 20px;
`

export const TextInput = aTextInput.extend`
  margin: 0 0 20px;
`
