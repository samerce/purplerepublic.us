import styled from 'styled-components'
import {
  ContentArea as aContentArea,
  Scribble as aScribble,
  BackgroundArea as aBackgroundArea
} from '../styled'

export const ContentArea = styled(aContentArea)`
  margin-top: 90px;
`

export const Scribble = styled(aScribble)`
  top: 6px;
  left: -49px;
  transform: rotateZ(-26deg);
  text-shadow: none;
`

export const BackgroundArea = styled(aBackgroundArea)`
  @media(max-width: 544px) {
    display: block;
    position: fixed;
    transform: translateY(-120px);
  }
`
