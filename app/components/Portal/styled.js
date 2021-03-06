import styled, {css} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE, EASE_SINE,
  SCREEN_WIDTH_M, SCREEN_WIDTH_MS, SCREEN_WIDTH_MMS, SCREEN_WIDTH_S,
  SCREEN_WIDTH_XXL
} from '../../global/constants'
import {
  Flex, H1, H2, FlexColumn, Boto, screen, ArticleText, AbsoluteFlexFillParent,
  AbsoluteFlex,
} from '../../global/styled'
import theme from '../../global/theme'
import {TransitionDuration} from '../Gaiaverse/constants'
import memoize from 'memoize-one'

const GifWidth = 960
const GifHeight = 540
const GifScaleCenter = .4
const TransitionOut = `all .5s ${EASE_OUT}`
const TransitionIn = `all .5s ${EASE_SINE}`
export const TextShadow = css`
  text-shadow: 0 0 1px ${theme.hopiDark},
               0 0 10px white,
               0 0 20px white,
               0 0 30px ${theme.hopi},
               0 0 40px ${theme.hopi};
`

export const Root = styled(AbsoluteFlexFillParent)`
  overflow: hidden;
  transition: ${TransitionOut};
  pointer-events: none;

  &.spot-top {
    display: block;
    z-index: 3;
    top: ${p => p.top}px;
    left: ${p => p.left}px;
    transform: rotate(-45deg);
    height: ${p => p.size}px;
    width: ${p => p.size}px;
    overflow: hidden;
  }
  &.spot-bottomLeft {
    transform-origin: right center;
    transform: translate(-50%, 0);
    z-index: 2;
  }
  &.spot-bottomRight {
    transform-origin: left center;
    transform: translate(50%, 0);
  }

  &.quark {
    transition: transform .5s, filter .5s, overflow .1s linear .2s;
    transition-timing-function: ${EASE_SINE};
    &.hidden {
      &.spot-bottomRight {
        transform: translate(100%, 0);
      }
      &.spot-bottomLeft {
        transform: translate(-100%, 0);
      }
      &.spotTopIsActive {
        &.spot-bottomLeft {
          transform: translate(-50%, 100%);
        }
        &.spot-bottomRight {
          transform: translate(50%, 100%);
        }
      }
    }
    &:not(.hidden) {
      &:not(.spot-top) {
        transform: none;
      }
      &.spot-top {
        overflow: visible;
      }
      &.scrolled {
        filter: blur(70px) brightness(.7);
        pointer-events: none;
      }
    }
  }
`

export const ContentRoot = styled(AbsoluteFlexFillParent)`
  transition: ${TransitionOut};

  &.spot-bottomLeft {
    transform: translate(25%, 0);
  }
  &.spot-bottomRight {
    transform: translate(-25%, 0);
  }
  &.spot-top {
    display: block;
    left: 0;
    bottom: 0;
    transform: rotate(45deg) translate(0, ${p => p.topOffset}px);

    &.hidden {
      transform: rotate(45deg) translate(0, -100%);
    }
  }
  &.quark:not(.hidden) {
    transition: ${TransitionIn};

    &.spot-top {
      transform: rotate(45deg) translate(0, 50%);
    }
    &:not(.spot-top) {
      transform: none;
    }
  }
`

export const GifRoot = styled(AbsoluteFlex)`
  pointer-events: all;
  cursor: pointer !important;
  transition: ${TransitionOut};
  bottom: 0;
  width: 100%;
  transform-origin: center top;

  &.quark.spot-top:not(.hidden) {
    transform: scale(2) translate(0, -25%);
    transition: ${TransitionIn};
  }

  .gif {
    width: 100%;
    position: relative;
    ${'' /* visibility: hidden; */}
  }

  ${screen.large`
    &:not(.quark) {
      .gift {
        transform: translate(${p => p.xOffsetImg}, ${p => p.yOffsetImg});
      }
    }
    &.quark:not(.spot-top) {
      .gift {
        transform: translate(-25%);
      }
    }
  `}

  .spot-top.gif {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    ${'' /* transform: translate(0, -${p => p.yOffset}px); */}
    transform-origin: right bottom;

    .gift {
      height: initial;
      width: 100%;

      ${screen.medium`
        height: 100%;
        width: initial;
      `}
    }
  }

  &.spot-top .gift {
    width: ${p => p.size}px;
  }
  &.spot-bottomLeft, &.spot-bottomRight {
    height: 100%;

    .gif {
      height: 100%;
    }
    .gift {
      height: ${p => p.height}px;
      width: ${p => p.width}px;
    }
  }
`

export const Title = styled(AbsoluteFlex)`
  pointer-events: all;
  right: 50%;
  transform: translate(50%, -50%);
  flex-wrap: wrap;
  color: white;
  text-transform: uppercase;
  font-size: 52px;
  letter-spacing: 1px;
  pointer-events: none;
  ${TextShadow}

  ${screen.medium`
    font-size: 24px;
  `}

  div {
    position: absolute;
    font-size: 130%;
    opacity: .3;
    letter-spacing: 2px;
    transform: translate(-10%, -20px);
    text-shadow: 0 0 10px white,
                 0 0 30px white,
                 0 0 50px ${theme.hopi},
                 0 0 70px ${theme.hopi};

    @keyframes titleFloat {
     100% {
       opacity: .5;
     }
    }
    animation-name: titleFloat;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  &.spot-bottomRight, &.spot-bottomLeft {
    top: 75%;
  }
  &.spot-top {
    bottom: 20%;
    transform: translate(50%, 0);

    ${screen.medsmall`
      bottom: 30%;
    `}
  }
`

const getTopFudgeImpl = memoize((screenWidth, screenHeight) => (
  -(screenWidth - screenHeight) / 3
))
export const getTopFudge = () => getTopFudgeImpl(window.innerWidth, window.innerHeight)
