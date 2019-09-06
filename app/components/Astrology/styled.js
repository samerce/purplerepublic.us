import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex,
} from '../../global/styled'
import theme from '../../global/theme'
import {TransitionDuration} from '../Gaiaverse/constants'

const RootHeight = 60
export const Root = Flex.extend`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 35;
  pointer-events: none;

  #universeBackdropCanvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const CelestialBodyRoot = Flex.extend`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 25vmin;
  width: 25vmin;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  pointer-events: all;
`

export const SunRoot = CelestialBodyRoot.extend`
  .view-seduction & {
    @keyframes pulse {
      100% {
        filter: hue-rotate(-25deg);
        transform: scale(1.05);
      }
    }

    ${'' /* animation-name: pulse;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate; */}
  }
`

const CelestialBody = Flex.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transition: all 1s ${EASE_OUT};
`

export const Sun = CelestialBody.extend`
  background: radial-gradient(
    circle at center, white 20%, #fbf3ce 100%
  );
  box-shadow:
    0 0 10px #fbf3ce,
    0 0 20px #fbf3ce,
    0 0 30px #fbf3ce,
    0 0 40px #FFE460,
    0 0 50px #FFE460,
    0 0 60px #FFE460,
    0 0 70px #FFE460,
    0 0 80px #FF7519,
    0 0 90px #FF7519,
    0 0 100px #FF7519,
    0 0 110px #FF7519,
    0 0 120px #FF7519
  ;

  ${'' /* .view-inTheDeep & {
    top: ${RootHeight}px;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    transition-delay: .1s;
    transition-duration: ${TransitionDuration}ms;
    cursor: pointer;
  } */}
`

export const RaysRoot = Flex.extend`

`

export const TimerRoot = Flex.extend`
  position: relative;
  z-index: 20;
  font-size: 36px;
  color: #fae789;
  opacity: 0;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};
  font-family: nova mono;
  text-shadow: 0 0 #f79115, 1px 1px 2px #fbd416;

  .view-seduction & {
    opacity: 1;
    transition-timing-function: ${EASE_IN};
  }
`

export const CloseText = Flex.extend`
  font-family: alice;
  font-size: 24px;
  color: ${theme.hopi};
  opacity: 0;
  position: absolute;
  top: 5px;
  left: 15px;
  transition: all 1s ${EASE_OUT};
  pointer-events: none;

  .view-inTheDeep & {
    opacity: 1;
    transition-timing-function: ${EASE_IN};
  }
`

export const MoonRoot = CelestialBodyRoot.extend`
  flex: 0 0 auto;
`

export const Moon = CelestialBody.extend`
  top: -50px;
  left: -${window.innerWidth}px;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle at center, #e6eaf1 20%, #D4D9E2 100%
  );
  box-shadow:
    0 0 10px #eaedf4,
    0 0 20px #e6eaf1,
    0 0 30px #e6eaf1,
    0 0 40px #D4D9E2,
    0 0 50px #D4D9E2,
    0 0 60px #D4D9E2,
    0 0 70px #6FCAEA,
    0 0 80px #6FCAEA,
    0 0 90px #6FCAEA
  ;
  transform: scale(.5);
  transform-origin: left center;

  .view-inTheDeep & {
    opacity: 0;
    pointer-events: none;
  }
`

export const EyeRoot = CelestialBodyRoot.extend`
  flex: 0 0 auto;
`
