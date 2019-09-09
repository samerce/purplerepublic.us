import styled, {injectGlobal, css} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE, EASE_SINE} from '../../global/constants'
import {
  Flex, AbsoluteFlex, AbsoluteFlexFillParent
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
  z-index: 650;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};

  #universeBackdropCanvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &.quark {
    &.anchor-bottomLeft {
      transform: translate(50%, -50%);
    }
    &.anchor-bottomRight {
      transform: translate(-50%, -50%);
    }
    &.anchor-top {
      transform: translate(0, calc(50% + 30px)) scale(.8);
      margin: 0 0 -30px;
    }
    transition: all .5s ${EASE_SINE};
  }
`

const CosmosSize = 100
export const CosmosRoot = styled.div`
  position: fixed;
  top: 100%;
  left: 50%;
  margin: -${CosmosSize / 2}px 0 0 -${CosmosSize / 2}px;
  width: ${CosmosSize}px;
  height: ${CosmosSize}px;
  transition: all .5s ${EASE_OUT};
  cursor: pointer;

  &.cosmos {
    transform: scale(30);
    top: 50%;
    transition-duration: 1s;
    transition-timing-function: ${EASE_SINE};
  }
  &.quark {
    transform: scale(0);
    filter: blur(10px);
    pointer-events: none;
  }
`

export const CosmosSkin = Flex.extend`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center,
    #4771a3 0%, #77779d 20%, #b998b3 45%, #e7a8b1 65%, #fdefb0 90%
  );
  border-radius: 100%;
  box-shadow: 0 0 10px #fdefb0, 0 0 20px #e7a8b1, 0 0 30px #b998b3,
              0 0 40px #77779d, 0 0 50px #4771a3;
  filter: saturate(200%) hue-rotate(0);
  pointer-events: all;

  @keyframes ooze {
    50% {
      filter: saturate(400%) hue-rotate(360deg);
      box-shadow: 0 0 20px #fdefb0, 0 0 30px #e7a8b1, 0 0 40px #b998b3,
                  0 0 50px #77779d, 0 0 60px #4771a3;
      transform: scale(1.1);
    }
  }

  animation-name: ooze;
  animation-duration: 5s;
  animation-timing-function: ${EASE_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &.cosmos {
    animation-duration: 5s;
  }
`

const CelestialBodyTriangleEnter = css`
  opacity: 1;
  filter: none;
  transform: translate(-50%, -50%);
  transition-duration: 1s;
`
const CelestialBodyRoot = Flex.extend`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 50vmin;
  width: 50vmin;
  max-width: 300px;
  max-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.5);
  cursor: pointer;
  pointer-events: all;
  transition: all .7s ${EASE_OUT};
  opacity: 0;
  filter: blur(10px);

  .cosmos & {
    ${CelestialBodyTriangleEnter}
    transition-delay: .2s;
  }
  .triangle & {
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

export const SunRoot = CelestialBodyRoot.extend`
  z-index: 10;

  .cosmos & {
    top: 20%;
    left: 60%;
  }
  .triangle.sun & {
    ${CelestialBodyTriangleEnter}
  }
  .quark.sun & {
    ${CelestialBodyTriangleEnter}
  }
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

  &.cosmos, &.triangle {
    @keyframes pulse {
      100% {
        box-shadow:
          0 0 20px #fbf3ce,
          0 0 30px #fbf3ce,
          0 0 40px #fbf3ce,
          0 0 50px #FFE460,
          0 0 60px #FFE460,
          0 0 70px #FFE460,
          0 0 80px #FFE460,
          0 0 90px #FF7519,
          0 0 100px #FF7519,
          0 0 110px #FF7519,
          0 0 120px #FF7519,
          0 0 130px #FF7519
        ;
      }
    }
    animation-name: pulse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ${EASE_SINE};
  }

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

export const Triangle = AbsoluteFlex.extend`
  border-bottom: 130px solid ${alpha(.9, '#f79115')};
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  transform: translate(0, -10px);
  pointer-events: none;
`

export const TimerRoot = Flex.extend`
  position: relative;
  z-index: 20;
  font-size: 36px;
  opacity: 0;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};
  font-family: nova mono;
  color: #f9eeb7;
  text-shadow: 0 0 #f79115, 1px 1px 5px #fbd416, 0 0 10px #f78800;

  &.cosmos, &.triangle {
    opacity: 1;
    transition-timing-function: ${EASE_IN};
  }
  &.quark {
    opacity: 0;
  }
`

export const CloseText = Flex.extend`
  font-family: alice;
  font-size: 24px;
  color: ${theme.hopi};
  opacity: 0;
  position: absolute;
  top: 0;
  pointer-events: none;
  transition: opacity 1s ${EASE_OUT};

  &.quark {
    opacity: 1;
    transition-timing-function: ${EASE_SINE};
    transition-delay: .3s;

    &.anchor-bottomLeft {
      top: calc(60% + 5px);
      left: 40px;
    }
    &.anchor-bottomRight {
      top: calc(60% + 5px);
      right: 40px;
    }
    &.anchor-top {
      top: 30px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`

const MoonSize = 15
export const MoonRoot = CelestialBodyRoot.extend`
  flex: 0 0 auto;
  width: 40vmin;
  height: 40vmin;
  max-width: 200px;
  max-height: 200px;

  .cosmos & {
    left: 36%;
    top: 54%;
  }
  .triangle.moon & {
    ${CelestialBodyTriangleEnter}
  }

  .moonTimer {
    font-size: 22px;
    color: #b7cff9;
    text-shadow: 0 0 #357dfb, 1px 1px 2px #b7cff9;
  }
`

export const Moon = CelestialBody.extend`
  width: 100%;
  height: 100%;
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
`

export const EyeRoot = CelestialBodyRoot.extend`
  .cosmos & {
    left: 66%;
    top: 62%;
  }
  .triangle.thirdeye & {
    ${CelestialBodyTriangleEnter}
  }
`

export const Eye = styled.i`
  color: white;
  font-size: 30vw;
  text-shadow:
    0 0 10px #f7faf6,
    0 0 20px #f7faf6,
    0 0 30px #cefabf,
    0 0 40px #cefabf,
    0 0 50px #cefabf,
    0 0 60px #95f773,
    0 0 70px #95f773,
    0 0 80px #95f773,
    0 0 90px #95f773
  ;
`

export const HuhRoot = CelestialBodyRoot.extend`
  .cosmos & {
    left: 50%;
    top: 90%;
  }
`

export const Huh = Flex.extend`
  color: white;
  font-size: 10vw;
  font-family: milonga;
  text-shadow:
    0 0 10px #fcfaeb,
    0 0 20px #fcfaeb,
    0 0 30px #fbf3b9,
    0 0 40px #fbf3b9,
    0 0 50px #fbf3b9,
    0 0 60px #fae868,
    0 0 70px #fae868,
    0 0 80px #fae868,
    0 0 90px #fae868
  ;
`
