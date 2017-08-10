import styled from 'styled-components'
import {
  Scribble as aScribble,
} from '../styled'

export const Scribble = styled(aScribble)`
  top: -7px;
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
