import styled, {css} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE, EASE_SINE} from '../../global/constants'
import {
  Flex, AbsoluteFlex, AbsoluteFlexFillParent, screen,
} from '../../global/styled'
import theme from '../../global/theme'
import {TransitionDuration} from '../Gaiaverse/constants'

const RootHeight = 60
const TransitionOut = `transition: all .5s ${EASE_OUT};`
const TransitionIn = `transition: all .5s ${EASE_SINE};`
export const Root = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 650;
  pointer-events: none;
  ${TransitionOut}

  #universeBackdropCanvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &.quark {
    ${TransitionIn}
    &.anchor-bottomLeft {
      transform: translate(50%, 50%) scale(.8);
    }
    &.anchor-bottomRight {
      transform: translate(-50%, 50%) scale(.8);
    }
    &.anchor-top {
      transform: translate(0, calc(-50% - 30px)) scale(.8);
    }
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
  cursor: pointer;
  ${TransitionOut}

  &.triangle {
    transition-delay: .2s;
  }
  &.cosmos {
    transform: scale(30);
    ${TransitionIn}
  }
  &.quark, &.intro {
    transform: scale(0);
    pointer-events: none;
    ${TransitionIn}
  }
`

export const CosmosSkin = styled(Flex)`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center bottom,
    #4771a3 0%, #77779d 40%, #FF7519 75%, #FFE460 85%, #fdefb0 95%
  );
  border-radius: 100%;
  box-shadow: 0 0 10px #fdefb0, 0 0 20px #FFE460, 0 0 40px ${alpha(.3, '#152232')};
  ${'' /* filter: saturate(200%) hue-rotate(0); */}
  pointer-events: all;
  transform: none;

  @keyframes ooze {
    100% {
      transform: scale(1.1) rotate(180deg);
    }
  }

  ${'' /* animation-name: ooze; */}
  animation-duration: 5s;
  animation-timing-function: ${EASE_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &.cosmos {
    animation-duration: 5s;
  }
`

const CelestialBodyEnter = css`
  opacity: 1;
  transform: translate(-50%, -50%);
  transition-duration: 1s;
`
const CelestialBodyRoot = styled(AbsoluteFlex)`
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.5);
  cursor: pointer;
  pointer-events: all;
  opacity: 0;
  ${TransitionOut}

  &.cosmos {
    ${CelestialBodyEnter}
    transition-delay: .2s;
  }
`
const CelestialBody = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transition: all 1s ${EASE_OUT};
`

export const SunRoot = styled(CelestialBodyRoot)`
  z-index: 10;
  width: ${p => p.size}px;
  height: ${p => p.size}px;

  &.cosmos {
    transform: translate(
      ${p => -(p.size / 2) + 54}px,
      ${p => -(p.screenHeight / 2) + 108}px
    );
  }
  &.triangle.sun {
    ${CelestialBodyEnter}
  }
  &.quark.sun {
    ${CelestialBodyEnter}
  }
  ${screen.medsmall`
    .sunTimer {
      font-size: 20px;
    }
  `}
`

export const Sun = styled(CelestialBody)`
  background: radial-gradient(
    circle at center, white 20%, #fbf3ce 100%
  );
  box-shadow:
    0 0 10px #fbf3ce,
    0 0 40px #FFE460,
    0 0 50px #FFE460,
    0 0 70px #FF7519,
    0 0 80px #FF7519,
    0 0 90px #FF7519
  ;
`

export const Triangle = styled(AbsoluteFlex)`
  border-bottom: 130px solid ${alpha(.9, '#f79115')};
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  transform: translate(0, -10px);
  pointer-events: none;
`

export const TimerRoot = styled(Flex)`
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

export const CloseText = styled(AbsoluteFlex)`
  top: 0;
  left: 0;
  font-family: alice;
  font-size: 24px;
  color: ${theme.hopi};
  opacity: 0;
  pointer-events: none;
  ${TransitionOut}
  transition-property: opacity;

  &.quark {
    opacity: 1;
    ${TransitionIn}
    transition-delay: .3s;
    transition-property: opacity;

    &.anchor-bottomLeft {
      transform: translate(
        ${p => p.parentSize * .17}px,
        ${p => p.parentSize * .21}px
      );
    }
    &.anchor-bottomRight {
      transform: translate(
        ${p => p.parentSize * .60}px,
        ${p => p.parentSize * .22}px
      );
    }
    &.anchor-top {
      transform: translate(
        ${p => (p.parentSize * .5) - 30}px,
        ${p => p.parentSize * .73}px
      );
    }
  }
`

const MoonSize = 15
export const MoonRoot = styled(CelestialBodyRoot)`
  flex: 0 0 auto;
  width: 40vmin;
  height: 40vmin;
  max-width: 200px;
  max-height: 200px;

  ${screen.medsmall`
    max-width: 100px;
    max-height: 100px;
  `}

  &.cosmos {
    transform: translate(
      ${p => -(p.screenWidth / 2) + ((p.screenWidth / 2) * .2)}px,
      -54px
    );
  }
  &.triangle.moon {
    ${CelestialBodyEnter}
  }

  .moonTimer {
    font-size: 22px;
    color: #b7cff9;
    text-shadow: 0 0 #357dfb, 1px 1px 2px #b7cff9;

    ${screen.medsmall`
      font-size: 18px;
    `}
  }
`

export const Moon = styled(CelestialBody)`
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center, #e6eaf1 20%, #D4D9E2 100%
  );
  box-shadow:
    0 0 10px #eaedf4,
    0 0 40px #D4D9E2,
    0 0 60px #6FCAEA
  ;
`

export const EyeRoot = styled(CelestialBodyRoot)`
  .cosmos & {
    transform: translate(
      ${p => (p.screenWidth / 8) - 27}px,
      108px
    );
  }
  &.triangle.thirdeye {
    ${CelestialBodyEnter}
  }
`

export const Eye = styled.i`
  color: white;
  font-size: 140px;
  text-shadow:
    0 0 10px #f7faf6,
    0 0 30px #cefabf,
    0 0 50px #95f773,
    0 0 60px #95f773
  ;
  ${screen.medsmall`
    font-size: 108px;
  `}
`

const HuhSize = 54
export const HuhRoot = styled(CelestialBodyRoot)`
  &.cosmos {
    transform: translate(-50%, ${p => (p.screenHeight / 2) - HuhSize - 40}px);
  }
`

export const Huh = styled(Flex)`
  color: white;
  font-size: ${HuhSize}px;
  font-family: milonga;
  text-shadow:
    0 0 10px #fcfaeb,
    0 0 30px #fbf3b9,
    0 0 40px #fae868,
    0 0 60px #fae868
  ;
`
