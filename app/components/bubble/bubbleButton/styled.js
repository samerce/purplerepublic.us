import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'

const aColor = '#956C95'
let CIRCLE_SIZE_SMALL = 60
let CIRCLE_SIZE_MEDIUM = 80
let CIRCLE_SIZE_LARGE = 150
let CIRCLE_SIZE_FOCUSED = CIRCLE_SIZE_SMALL

if (window.innerWidth <= SCREEN_WIDTH_M) {
  CIRCLE_SIZE_SMALL = 40
  CIRCLE_SIZE_MEDIUM = 60
  CIRCLE_SIZE_LARGE = 80
}

export const Root = styled.div`
  transition: all .5s ${EASE_OUT};
  display: inline-block;
  z-index: 8;
  pointer-events: ${p => p.disabled? 'none' : 'all'};
  cursor: pointer;

  .bubble-willEnter & {
    transition: none;
  }

  .bubble-enter & {
    transition: all 1s ${EASE_OUT} ${p => p.delay}s;
  }

  &.defocused:hover {
    transform: scale(.9);
  }
`

export const BubbleButtonImage = styled.div`
  border: 1px solid white;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 2px 2px 20px rgba(0,0,0,.3);
  transition: all .7s ${EASE_OUT};

  width: ${p => p.size}px;
  height: ${p => p.size}px;

  .defocused &:hover {
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
    transition: all .5s ${EASE_OUT};
  }

  .defocused & {
    transition: all .7s ${EASE_OUT};
  }

  .focused &, .expanded &, .editing & {
    width: ${CIRCLE_SIZE_FOCUSED}px;
    height: ${CIRCLE_SIZE_FOCUSED}px;
    box-shadow: none;
    transform: translateY(10px);
    cursor: default;
    transition: all .7s ${EASE_OUT};
  }

  @media(max-width: SCREEN_WIDTH_M_PX) {
    width: ${p => p.size * (2/3)}px;
    height: ${p => p.size * (2/3)}px;
  }

  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
`

export const BubbleButtonSVG = styled.object`
  pointer-events: none;
  width: 300px;
  height: 65px;
`

export const BubbleIcon = styled.div`
  display: ${p => p.editingButton? 'none' : 'flex'};
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -48px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};

  i {
    font-size: 32px;
    color: white;
    opacity: .5;
  }

  .focused &, .editing & {
    opacity: 0;
    transition: all .3s ${EASE_OUT};
  }
`
