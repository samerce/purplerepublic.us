import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'

const aColor = '#498359'
let CIRCLE_SIZE_SMALL = 60
let CIRCLE_SIZE_MEDIUM = 80
let CIRCLE_SIZE_LARGE = 150
let CIRCLE_SIZE_FOCUSED = CIRCLE_SIZE_SMALL

if (window.innerWidth <= SCREEN_WIDTH_M) {
  CIRCLE_SIZE_SMALL = 40
  CIRCLE_SIZE_MEDIUM = 60
  CIRCLE_SIZE_LARGE = 80
}

injectGlobal`
`

export const Root = styled.div`
  transition: all .3s ${EASE_OUT};
  display: inline-block;
  z-index: 8;
  pointer-events: all;
  cursor: pointer;

  .bubble-willEnter & {
    transform: translate(-1000px, -1000px);
    ${'' /* transform: scale(0); */}
    ${'' /* opacity: 0; */}
  }

  .bubble-enter & {
    transition: all .7s ${EASE_OUT} ${p => p.delay}s;
  }

  &.defocused:hover {
    transform: scale(.9);
    transition: all .5s ${EASE_OUT};
  }
`

const bubbleButtonStyle = `
  border: 1px solid white;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 2px 2px 20px rgba(0,0,0,.3);
  transition: all .7s ${EASE_OUT};

  width: ${CIRCLE_SIZE_LARGE}px;
  height: ${CIRCLE_SIZE_LARGE}px;

  .defocused &:hover {
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
    transition: all .5s ${EASE_OUT};
  }

  .defocused & {
    transition: all .7s ${EASE_OUT};
  }

  .focused &, .expanded & {
    width: ${CIRCLE_SIZE_FOCUSED}px;
    height: ${CIRCLE_SIZE_FOCUSED}px;
    box-shadow: none;
    transform: translateY(10px);
    cursor: default;
    transition: all .7s ${EASE_OUT};
  }
`
export const BubbleButtonImage = styled.div`
  ${bubbleButtonStyle}

  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
`

export const BubbleButtonSVG = styled.object`
  ${bubbleButtonStyle}

  pointer-events: none;
  width: 300px;
  height: 65px;
`
