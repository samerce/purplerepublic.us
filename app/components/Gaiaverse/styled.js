import styled from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE, EASE_SINE, SCREEN_WIDTH_XXXL
} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent, AbsoluteFlex, screen,
} from '../../global/styled'
import {TransitionDuration} from './constants'
import {SRC_URL} from '../../global/constants'
import theme from '../../global/theme'
import memoize from 'memoize-one'

const TransitionOut = `transition: all .5s ${EASE_OUT};`
const TransitionIn = `transition: all .5s ${EASE_SINE};`
export const Root = styled(Flex)`
  width: 100%;
  height: 100%;
  flex: 1 0 auto;
  background: ${theme.gradientSunset};
`

export const Backdrop = styled(AbsoluteFlexFillParent)`
  background: url("${SRC_URL + 'commons/constellation.jpg'}");
  opacity: 0;
  z-index: 30;
  pointer-events: none;
  visibility: hidden;
  transform: scale(.7);
  transition: all 1s ${EASE_OUT};
  border-radius: 100%;
`

const getBorderHeight = memoize((p) => Math.sqrt(
  Math.pow((p.screenHeight / 2), 2) + Math.pow((p.screenWidth / 2), 2)
) - (p.top / 2))
export const BordersRoot = styled(AbsoluteFlexFillParent)`
  ${TransitionOut}
  pointer-events: none;
  z-index: 20;
  transform: translate(0, ${p => p.top}px);

  &.quark {
    opacity: 0;
    {TransitionIn}
  }
  &.triangle {
    transition-delay: .2s;
  }

  .border {
    position: absolute;
    img {
      animation-name: hueShift;
      animation-duration: .7s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    width: 10px;
    height: ${p => p.screenHeight * .6}px;
    box-shadow: 0 0 10px #FFE460;
    border: 1px solid ${alpha(.4, '#FFE460')};
    background: radial-gradient(circle at 50% 100%, #FF7519 0%, #FFE460 40%, #fbf3ce 85%);

    @keyframes ooze {
      50% {
        filter: saturate(400%) hue-rotate(360deg);
        box-shadow: 0 0 20px #FFE460, 0 0 30px #e7a8b1, 0 0 40px #b998b3,
                    0 0 50px #77779d, 0 0 60px #4771a3;
      }
    }

    ${'' /* animation-name: ooze; */}
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .borderBottom {
    height: 50%;
    bottom: ${p => p.top}px;
    left: 50%;
    transform: translate(-50%, 0);
    background: radial-gradient(circle at 50% 100%, #fbf3ce 0%, #FFE460 40%, #FF7519 85%);
  }
  .borderLeft, .borderRight {
    position: absolute;
    top: 0;
    display: block;
    z-index: 2;
    height: ${getBorderHeight}px;

    @media (min-width: ${SCREEN_WIDTH_XXXL}px) {
      height: ${p => getBorderHeight(p) - (p.screenHeight / 8)}px;
    }

    img {
      animation-delay: .05s;
    }
  }
  .borderLeft {
    left: 0;
    transform-origin: left top;
    transform: rotate(-45deg) translate(0, -10px);
  }
  .borderRight {
    right: 0;
    transform-origin: right top;
    transform: rotate(45deg) translate(0, -10px);
  }
`
