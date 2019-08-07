import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_M, SCREEN_WIDTH_MS, SCREEN_WIDTH_MMS, SCREEN_WIDTH_S,
} from '../../global/constants'
import {
  Flex, H1, H2, FlexColumn, Boto, screen, ArticleText,
} from '../../global/styled'
import theme from '../../global/theme'
import {TransitionDuration} from '../Gaiaverse/constants'

const GifWidth = 960
const GifHeight = 540
const GifScaleCenter = .4

export const Root = Flex.extend`
  overflow: hidden;
  position: relative;
  flex: 0 0 50%;
  transition: transform 1s, filter ${TransitionDuration}ms;
  transition-timing-function: ${EASE_OUT};
  pointer-events: none;

  &.spot-center {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    .mode-inTheDeep & {
      pointer-events: all;
    }
  }
  &.spot-top {
    justify-content: center;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }
  &.spot-bottomLeft {
    transform-origin: right center;
  }
  &.spot-bottomRight {
    transform-origin: left center;
  }

  ${'' /* .mode-willChangePortal & {
    filter: blur(30px) invert(100%) saturate(100%);
    transition: filter ${TransitionDuration}ms ${EASE_OUT};
  } */}

  ${'' /* .mode-willDive &, .mode-inTheDeep &, .mode-willSeduce & {
    &.spot-top {
      transform: scale(0);
    }
    &.spot-bottomLeft {
      transform: scale(0);
    }
    &.spot-bottomRight {
      transform: scale(0);
    }
  }
  .mode-inTheDeep & {
    &:not(.spot-center) {
      display: none;
    }
  } */}
`

export const GifRoot = Flex.extend`
  position: absolute;
  transition: all .5s ${EASE_OUT};

  .spot-top & {
    position: absolute;
    left: 0;
    top: ${p => p.top}px;
    transform: rotate(-45deg);
    height: ${p => p.height}px;
    width: 100%;
    overflow: hidden;
    justify-content: center;

    .gif {
      transform: rotate(-45deg) translate(50%, -${p => p.yOffset}px);
      transform-origin: right bottom;

      ${screen.large`
        transform: rotate(-45deg) translate(50%, 0);
      `}

      img {
        position: relative;
        transform: translate(-50%, 0);
        left: 50%;
      }
    }
  }
  .spot-center & {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    justify-content: center;

    .gif {
      width: ${p => p.width}px;
      max-width: ${GifWidth}px;
      transition: all .5s ${EASE_OUT};
    }
    .mode-inTheDeep & {
      top: 15px;
      left: 0;
      transform: none;

      .gif {
        width: 70%;
      }
    }
  }
  .spot-bottomLeft &, .spot-bottomRight & {
    height: 100%;

    .gif {
      height: 100%;
    }
    img {
      width: unset;
    }
  }
  .spot-bottomRight & .gif {
    position: relative;
    left: -25%;
  }

  .mode-inTheDeep :not(.spot-center) & {
    display: none;
  }

  ${'' /* .mode-inTheDeep .spot-center &,
  .mode-willSeduce .spot-center & {
    transform: scale(.6) translate(0, 50%);
    bottom: 20px;
  } */}
`

const ColorInTheDeep = alpha(.1, theme.semiWhite)
export const Button = Boto.extend`
  position: absolute;
  pointer-events: all;

  &.title {
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);

    .spot-bottomLeft &, .spot-bottomRight & {
      top: 75%;
    }
    .spot-top & {
      top: 20%;
      transform: translate(50%, 0);
    }
    .spot-center & {
      font-size: 42px;
    }

    .mode-willDive .spot-center &,
    .mode-willSeduce .spot-center & {
      display: flex;
      pointer-events: none;
    }
    .mode-inTheDeep .spot-center & {
      display: flex;
      font-size: 72px;
      top: 158px; /* calc */
      right: -50px;
      transform: none;

      pointer-events: none;
      transition-duration: .5s;
      background: ${ColorInTheDeep};
      border-color: transparent;
      text-shadow: 1px 1px ${lighten(.2, theme.semiWhite)};
      padding: 0px 90px 0 60px;
    }
  }

  &.close {
    position: fixed;
    left: -50px;
    bottom: -100px;
    padding: 20px 30px 20px 50px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    @keyframes reveal {
      100% {
        bottom: -10px;
        left: -40px;
      }
    }

    .mode-willDive .spot-center & {
      display: flex;
    }
    .mode-inTheDeep .spot-center & {
      display: flex;
      animation: reveal .5s ${EASE_OUT};
      animation-fill-mode: forwards;
      animation-delay: .5s;
    }
  }
`

export const TemptationRoot = FlexColumn.extend`
  align-self: center;
  text-align: center;
  width: 100%;
  align-items: center;

  display: none;
  .spot-center & {
    ${'' /* display: flex; */}
  }
`

export const Title = H1.extend`
  font-size: 108px;
  width: 100%;
`

export const InTheDeepRoot = ArticleText.extend`
  display: none;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};
  font-size: 21px;
  line-height: 1.58;
  max-width: 780px;
  margin: 0 auto;
  padding: ${p => p.paddingTop + 40}px 15px 100px;

  .mode-inTheDeep .spot-center &, .mode-willDive .spot-center & {
    display: flex;
  }
  .mode-inTheDeep .spot-center & {
    opacity: 1;
    transform: none;
    transition-delay: .5s;
  }
`

export function getTopFudge() {
  const {innerWidth: screenWidth} = window
  return (screenWidth <= SCREEN_WIDTH_MMS)? 270 :
    (screenWidth <= SCREEN_WIDTH_MS)? 162 :
    (screenWidth <= SCREEN_WIDTH_M)? 54 :
    0
}
