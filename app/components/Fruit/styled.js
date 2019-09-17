import styled from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE, EASE_SINE} from '../../global/constants'
import {
  AbsoluteFlexFillParent,
} from '../../global/styled'
import {TextShadow} from '../Portal/styled'

export const Root = styled(AbsoluteFlexFillParent)`
  display: block;
  z-index: 500;
  overflow-y: scroll;
  overflow-x: hidden;
  align-self: flex-start;
  z-index: 500;
  pointer-events: none;
  visibility: hidden;
  transform: scale(.95);
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  padding: 100vh 0 0;

  &.quark {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: .5s;
    pointer-events: all;
    transition: all 1s ${EASE_SINE};
  }
`

export const ScrollTempt = styled.i`
  position: fixed;
  z-index: 600;
  bottom: 20px;
  color: white;
  font-size: 54px;
  left: 50%;
  opacity: 0;
  filter: blur(10px);
  transform: scale(.98) translate(-50%, 0);
  transition: all .5s ${EASE_OUT};
  pointer-events: none;
  cursor: pointer;
  ${TextShadow}

  &.quark:not(.scrolled) {
    opacity: 1;
    filter: none;
    transform: translate(-50%, 0);
    transition: all 1s ${EASE_SINE};
    pointer-events: all;

    @keyframes teaseDown {
      100% {
        transform: translate(-50%, 10px) scale(1.01);
      }
    }
    animation-name: teaseDown;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`
