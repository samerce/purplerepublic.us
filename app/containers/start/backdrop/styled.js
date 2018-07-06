import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S, SCREEN_WIDTH_M, SCREEN_WIDTH_L,
} from '../../../global/constants'
import {
  screen, AbsoluteFlexFillParent,
} from '../../../global/styled'

let CircleScale = 1.5
if (window.innerWidth <= SCREEN_WIDTH_S) {
  CircleScale = 2.6
} else if (window.innerWidth <= SCREEN_WIDTH_M) {
  CircleScale = 2.1
} else if (window.innerWidth <= SCREEN_WIDTH_L) {
  CircleScale = 1.7
}

injectGlobal`
  @keyframes shootingStar {
    0% {
      transform: translate(500%, 500%);
      opacity: 1;
    }

    95% {
      opacity: 0;
    }

    100% {
      transform: translate(-60%, -60%);
      opacity: 0;
    }
  }

  @keyframes showBackdrop {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(${CircleScale});
    }
  }
`

export const Root = AbsoluteFlexFillParent.extend`
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

export const Foreground = styled.img`
  position: absolute;
  top: -100px;
  width: 100%;
  z-index: 2;
  opacity: 0;
  pointer-events: none;

  &.show {
    opacity: .3;
    transition: all 10s ${EASE_OUT} 1s;
  }

  ${screen.medium`
    top: 0;
    height: 100%;
    width: initial;
  `}
`

export const Background = styled.div`
  height: ${window.innerWidth}px;
  width: ${window.innerWidth}px;
  border-radius: 100%;
  background: radial-gradient(circle at center, white 0, #E78D8F 10%, #B85A9F 35%, #8E3AA6 60%, #4C1994 100%);
  opacity: 0;
  transform: scale(0);
  z-index: 1;

  transition: all 4s ${EASE_OUT};
  animation-name: showBackdrop;
  animation-delay: .1s;
  animation-duration: 4s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_OUT};

  &:hover {
    transform: scale(1.3);
    transition-duration: 3s;

    ${screen.large`
      transform: scale(1.4);
    `}
    ${screen.medium`
      transform: scale(1.8);
    `}
    ${screen.small`
      transform: scale(2.2);
    `}
  }
`

export const ShootingStars = AbsoluteFlexFillParent.extend`
  z-index: 4;
  pointer-events: none;
`

export const StarRoot = AbsoluteFlexFillParent.extend`
  transform: rotate(-145deg);
`

export const StarWithTrail = styled.div`
  width: 200px;
  background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(255,255,255,0.4) 100%);
  animation-name: shootingStar;
  animation-iteration-count: infinite;
  animation-timing-function: ${EASE_IN_SINE};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(500%, 500%);
`

export const Star = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 100%;
  background: rgba(229, 238, 244, 1);
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, .8);
`
