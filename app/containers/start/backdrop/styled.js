import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../../global/constants'

const aColor = '#498359'

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

  @keyframes makeTouchable {
    0% {
      pointer-events: none;
    }
    100% {
      pointer-events: all;
    }
  }
`

export const Root = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    top: 0;
    height: 100%;
    width: initial;
  }
`

export const Background = styled.div`
  height: ${window.innerWidth}px;
  width: ${window.innerWidth}px;
  border-radius: 100%;
  background: radial-gradient(circle at center, white 0, #E78D8F 10%, #B85A9F 35%, #8E3AA6 60%, #4C1994 100%);
  opacity: 0;
  transform: scale(0);
  z-index: 1;

  .start-intro &, .start-show &, .start-loadBubbles & {
    transition: all 4s ${EASE_OUT};
    transform: scale(1.5);
    opacity: 1;
    animation-name: makeTouchable;
    animation-duration: .1s;
    animation-fill-mode: both;
    animation-delay: 4s;

    @media (max-width: ${SCREEN_WIDTH_L_PX}) {
      transform: scale(1.7);
    }
    @media (max-width: ${SCREEN_WIDTH_M_PX}) {
      transform: scale(2.1);
    }
    @media (max-width: ${SCREEN_WIDTH_S_PX}) {
      transform: scale(2.6);
    }

    &:not(.collapsed):hover {
      transform: scale(1.3);
      transition-duration: 3s;

      @media (max-width: ${SCREEN_WIDTH_L_PX}) {
        transform: scale(1.4);
      }
      @media (max-width: ${SCREEN_WIDTH_M_PX}) {
        transform: scale(1.8);
      }
      @media (max-width: ${SCREEN_WIDTH_S_PX}) {
        transform: scale(2.2);
      }
    }
    &.collapsed {
      opacity: 0;
      transform: scale(3);
      transition: all 2s ${EASE_IN};
    }
  }
`

export const ShootingStars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
  pointer-events: none;
`

export const StarRoot = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
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
