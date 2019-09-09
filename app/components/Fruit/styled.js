import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE, EASE_SINE} from '../../global/constants'
import {
  AbsoluteFlexFillParent,
} from '../../global/styled'

export const Root = AbsoluteFlexFillParent.extend`
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
