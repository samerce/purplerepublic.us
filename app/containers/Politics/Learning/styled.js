import styled from 'styled-components'
import {
  Scribble as aScribble,
} from '../styled'

export const Scribble = styled(aScribble)`
  bottom: -2px;
  left: -38px;
  transform: rotateZ(20deg);
  text-shadow: none;
  font-size: 23px;

  @media(max-width: 544px) {
    font-size: 20px;
    transform: rotate(26deg);
    left: -28px;
    bottom: -8px;
  }
`
