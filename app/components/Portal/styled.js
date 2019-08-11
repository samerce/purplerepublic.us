import styled, {injectGlobal, css} from 'styled-components'
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
  pointer-events: all;
  cursor: pointer !important;

  .gif {
    position: relative;
    visibility: hidden;
  }
  .gif.still {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: visible;
  }

  .spot-top &, .spot-bottomLeft &, .spot-bottomRight & {
    &:hover {
      .gif {
        visibility: visible;
      }
      .gif.still {
        visibility: hidden;
      }
    }

    .gif img {
      transform: translate(${p => p.xOffsetImg}, ${p => p.yOffsetImg});
    }
  }

  .spot-top & {
    position: absolute;
    left: 0;
    top: ${p => p.top}px;
    transform: rotate(-45deg);
    height: ${p => p.size}px;
    width: ${p => p.size}px;
    overflow: hidden;
    justify-content: center;

    .gif {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      transform: rotate(-45deg) translate(50%, -${p => p.yOffset}px);
      transform-origin: right bottom;

      ${screen.large`
        transform: rotate(-45deg) translate(50%, 0);
      `}

      img {
        height: initial;
        width: 100%;
      }
    }
  }
  .spot-center & {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;

    @keyframes ham {
      80% {
        transform: translate(-50%, -50%);
      }
      85% {
        transform: translate(-50%, -50%) scale(1.2) rotate(-5deg);
      }
      95% {
        transform: translate(-50%, -50%) scale(1.2) rotate(4deg);
      }
      100% {
        transform: translate(-50%, -50%) scale(1.3) rotate(-2deg);
      }
      ${'' /* 100% {
        transform: translate(-50%, -50%);
      } */}
    }

    .mode-seduction & {
      animation-name: ham;
      animation-duration: 10s;
      animation-timing-function: ${EASE};
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    .gif {
      width: ${p => p.gifWidth}px;
      max-width: ${GifWidth}px;
      transition: all .5s ${EASE_OUT};
      visibility: visible;
      transform-origin: center top;

      .mask {
        top: ${p => p.maskTop}px;
        left: ${p => p.maskLeft}px;
        width: ${p => p.maskWidth}px;
        height: ${p => p.maskHeight}px;
        transition: all ${TransitionDuration}ms ${EASE_OUT};
      }

      &.still {
        visibility: hidden;
      }
    }
    .mode-inTheDeep & {
      top: 85px;
      left: 50%;
      transform: translate(-50%, 0);
      transition-duration: ${TransitionDuration}ms;

      .gif {
        transform: scale(1.3);
        transition-duration: ${TransitionDuration}ms;
      }
    }
  }
  .spot-bottomLeft &, .spot-bottomRight & {
    height: 100%;

    .gif {
      height: 100%;
    }
    img {
      height: ${p => p.height}px;
      width: ${p => p.width}px;
    }
  }

  .mode-inTheDeep :not(.spot-center) & {
    visibility: hidden;
  }

  ${'' /* .mode-inTheDeep .spot-center &,
  .mode-willSeduce .spot-center & {
    transform: scale(.6) translate(0, 50%);
    bottom: 20px;
  } */}
`

const ColorInTheDeep = alpha(.2, lighten(.1, theme.hopiLight))
const HeaderInTheDeep = css`
  font-size: 72px;
  pointer-events: none;
  background: ${ColorInTheDeep};
  border-color: transparent;
  text-shadow: 1px 1px ${lighten(.2, theme.hopiLight)};
  padding: 0px 90px 0 60px;
`
export const Button = Boto.extend`
  position: absolute;
  pointer-events: all;

  &.title {
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    flex-wrap: wrap;

    .spot-bottomLeft &, .spot-bottomRight & {
      top: 75%;
    }
    .spot-top & {
      top: 20%;
      transform: translate(50%, 0);
    }
    .spot-center & {
      font-size: 32px;
    }

    .mode-willDive .spot-center &,
    .mode-willSeduce .spot-center & {
      display: flex;
      pointer-events: none;
    }
    .mode-inTheDeep .spot-center & {
      display: flex;
      top: 158px; /* calc */
      right: -50px;
      transform: none;
      transition-duration: ${TransitionDuration}ms;
      ${HeaderInTheDeep}
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

  ${screen.medium`
    font-size: 14px;

    .spot-center &.title {
      font-size: 22px;
      .mode-inTheDeep & {
        top: 90px;
        font-size: 42px;
      }
    }
  `}
  ${screen.medsmall`
    .mode-inTheDeep .spot-center &.title {
      top: 60px;
      font-size: 28px;
    }
  `}

  @keyframes seduce {
    60% {
      filter: contrast(200%) brightness(100%) saturate(100%);
    }
    80% {
      filter: brightness(300%) saturate(100%) contrast(100%);
    }
    100% {
      filter: saturate(400%) brightness(100%) contrast(100%);
    }
  }

  .mode-seduction & {
    ${'' /* animation-name: seduce;
    animation-duration: 5s;
    animation-timing-function: ${EASE_OUT};
    animation-iteration-count: infinite;
    animation-delay: ${p => p.delay || 0}s; */}
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
  flex-direction: column;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};
  font-size: 21px;
  line-height: 1.58;
  max-width: 780px;
  margin: 0 auto;
  padding: ${p => p.paddingTop + 40}px 15px 100px;
  text-shadow: 0 0 10px ${alpha(.5, lighten(.2, theme.hopiLight))};

  .mode-inTheDeep .spot-center &, .mode-willDive .spot-center & {
    visibility: visible;
  }
  .mode-inTheDeep .spot-center & {
    opacity: 1;
    transform: none;
    transition-delay: .5s;
  }

  .wordRolodex {
    display: inline-block;
    color: ${theme.hopiLight};
    transform: translate(8px, 8px);
  }
  .fear {
    display: inline;
    text-shadow: 0 0 15px ${theme.hopi};
    cursor: pointer;
    
    .floater {
      visibility: hidden;
      img {
        width: 200px;
      }
    }

    &:hover {
      .floater {
        visibility: visible;
      }
    }
  }
`

export const ChallengeRoot = Boto.extend`
  ${HeaderInTheDeep}
  font-family: alice;
  align-self: flex-end;
  pointer-events: none;
  margin-top: 80px;
`

export function getTopFudge() {
  const {innerWidth: screenWidth} = window
  return (screenWidth <= SCREEN_WIDTH_MMS)? 270 :
    (screenWidth <= SCREEN_WIDTH_MS)? 162 :
    (screenWidth <= SCREEN_WIDTH_M)? 54 :
    0
}
