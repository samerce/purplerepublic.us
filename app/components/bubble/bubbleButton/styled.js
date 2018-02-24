import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE_IN_OUT_SINE,
  SCREEN_WIDTH_M_PX,
} from '../../../global/constants'

const aColor = '#498359'
const CIRCLE_SIZE = 150
const CIRCLE_SIZE_SMALL = 80
const CIRCLE_SIZE_MOBILE = 80

injectGlobal`
`

export const Root = styled.div`
  transition: all .3s ${EASE_OUT};
  display: inline-block;
  z-index: 8;
  pointer-events: all;

  .bubble-willEnter & {
    transform: scale(0);
    opacity: 0;
  }

  .bubble-enter & {
    transition: all .7s ${EASE_OUT} 2s;
  }

  &.defocused:hover {
    transform: scale(.9);
    transition: all .5s ${EASE_OUT};
  }
`

export const ContentRoot = styled.div`
  border: 1px solid white;
  border-radius: 100%;
  background-image: url('${p => p.background}');
  background-position: center;
  overflow: hidden;
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(0,0,0,.3);
  transition: all .3s ${EASE_OUT};

  .defocused &:hover {
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
    transition: all .5s ${EASE_OUT};
  }

  .defocused & {
    transition: all .7s ${EASE_OUT};
  }

  .focused &, .expanded & {
    width: ${CIRCLE_SIZE_SMALL}px;
    height: ${CIRCLE_SIZE_SMALL}px;
    box-shadow: none;
    transform: translateY(10px);
    cursor: default;
    transition: all .7s ${EASE_OUT};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    width: ${CIRCLE_SIZE_MOBILE}px;
    height: ${CIRCLE_SIZE_MOBILE}px;
  }
`
