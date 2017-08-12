import styled from 'styled-components'
import {
  Scribble as aScribble,
  ContentArea as aContentArea,
} from '../styled'

export const Scribble = styled(aScribble)`
  top: -3px;
  left: -10px;
  transform: rotateZ(-10deg);
  text-shadow: none;
  font-size: 23px;
`

Scribble.arrow = styled(Scribble)`
  top: 12px;
  left: 26px;
  transform: rotateZ(-7deg);
`
