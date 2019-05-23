import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../../global/constants'
import {Flex, TextInput} from '../../../global/styled'

const kBorderRadius = '10px'

export const Root = Flex.extend`
  z-index: 8;
  pointer-events: all;
  margin: 10px 0;
  flex: 0 0 auto;
  height: 40px;

  input {
    font-size: 18px;
  }
`

export const BuilderInputLink = TextInput.extend`
  border-left: 1px solid white;
`

export const BuilderButton = styled.div`
  border-radius: ${kBorderRadius};
  border: 1px solid white;
  opacity: .8;
  color: white;
  transition: all .3s ${EASE_OUT};
  user-select: none;
  text-align: center;
  cursor: pointer;
  display: flex;
  width: 100%;

  &:hover {
    opacity: 1;
  }

  ${'' /* &:active {
    background: white;
    color: ${aColor};
    transform: scale(.97);
  } */}
`
