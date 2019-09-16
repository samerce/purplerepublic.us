import styled, {css} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE, EASE_SINE,
  SCREEN_WIDTH_M, SCREEN_WIDTH_MS, SCREEN_WIDTH_MMS, SCREEN_WIDTH_S,
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
const TextShadow = css`
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
    transition: ${TransitionIn};
    &.hidden {
      &.spot-bottomRight {
        transform: translate(100%, 0);
      }
      &.spot-bottomLeft {
        transform: translate(-100%, 0);
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

  &.quark.spot-top:not(.hidden) {
    transform: scale(2);
    transition: ${TransitionIn};
  }

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

  &:hover, &.quark:not(.hidden):not(.scrolled) {
    .gif {
      visibility: visible;
    }
    .gif.still {
      visibility: hidden;
    }
  }

  img {
    transform: translate(${p => p.xOffsetImg}, ${p => p.yOffsetImg});
  }

  .spot-top.gif {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    ${'' /* transform: translate(0, -${p => p.yOffset}px); */}
    transform-origin: right bottom;

    ${screen.large`
    `}

    img {
      height: initial;
      width: 100%;

      ${screen.medium`
        height: 100%;
        width: initial;
      `}
    }
  }

  &.spot-top img {
    width: ${p => p.size}px;
  }
  &.spot-bottomLeft, &.spot-bottomRight {
    height: 100%;

    .gif {
      height: 100%;
    }
    img {
      height: ${p => p.height}px;
      width: ${p => p.width}px;
    }
  }
`

export const Title = styled(AbsoluteFlex)`
  position: absolute;
  pointer-events: all;
  right: 50%;
  transform: translate(50%, -50%);
  flex-wrap: wrap;
  background: none;
  color: white;
  border: none;
  box-shadow: none;
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

    div {
      transform: translate(0, -20px);
    }
  }
  &.spot-bottomLeft div {
    transform: translate(-20px, -20px);
  }
  &.spot-bottomRight div {
    transform: translate(20px, -20px);
  }
`

export const ScrollTempt = styled.i`
  position: absolute;
  bottom: 20px;
  color: white;
  font-size: 54px;
  left: 50%;
  opacity: 0;
  filter: blur(10px);
  transform: scale(.98) translate(-50%, 0);
  transition: all .5s ${EASE_OUT};
  ${TextShadow}

  &.quark {
    opacity: 1;
    filter: none;
    transform: translate(-50%, 0);
    transition: all 1s ${EASE_SINE};

    @keyframes teaseDown {
      100% {
        transform: translate(-50%, 10px) scale(1.01);
      }
    }
    animation-name: teaseDown;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`

export const getTopFudge = memoize((screenWidth) => {
  return (screenWidth <= SCREEN_WIDTH_MMS)? 170 :
    (screenWidth <= SCREEN_WIDTH_MS)? 162 :
    (screenWidth <= SCREEN_WIDTH_M)? 54 :
    0
})
