import styled from 'styled-components'
import {
  Root as aRoot,
  Scribble as aScribble,
} from '../styled'

export const Root = styled(aRoot)`
  margin-top: -80px;
  padding: 170px 0 20px;

  @media(max-width: 670px) {
    margin-top: -120px;
    padding: 250px 0 50px;
  }
`

export const Scribble = styled(aScribble)`
  top: 6px;
  left: -49px;
  transform: rotateZ(-26deg);
  text-shadow: none;
`
