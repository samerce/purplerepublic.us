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
  bottom: 0;
  height: ${RootHeight}px;
  width: 100%;
  z-index: 35;
`

const CelestialBodyRoot = Flex.extend`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const SunRoot = CelestialBodyRoot.extend`
  flex: 1 0 auto;
`

const CelestialBody = Flex.extend`
  position: absolute;
  top: -10px;
  left: 0;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
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

  .view-inTheDeep & {
    top: ${RootHeight}px;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    transition-delay: .1s;
    transition-duration: ${TransitionDuration}ms;
  }
`

export const RaysRoot = Flex.extend`

`

export const TimerRoot = Flex.extend`
  position: relative;
  z-index: 20;
  font-size: 32px;
  color: ${theme.hopi};
  opacity: 0;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};

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

export const EarthRoot = CelestialBodyRoot.extend`
  flex: 0 0 auto;
`
