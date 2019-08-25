import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent
} from '../../global/styled'
import theme from '../../global/theme'

export const Root = styled.div`
  color: white;
  flex-direction: column;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};
  font-size: 21px;
  line-height: 1.58;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 15px 100px;
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

export const FaerieRoot = Flex.extend`
  position: fixed;
  text-shadow: 0 0 10px ${theme.hopiLight}, 0 0 40px rgba(0,0,0,.5);
  top: 50%;
  left: 35px;
  font-size: 28px;
  transform: scale(0) translate(-200px, -80px);
  transform-origin: left center;
  pointer-events: none;
  transition: all 1s ${EASE_OUT} .5s;
  opacity: 0;

  @keyframes ping {
    100% {
      filter: hue-rotate(-15deg);
      transform: scale(1.02);
    }
  }

  &.ping {
    transform: scale(1);
    opacity: 1;
    animation-name: ping;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes comein {
    100% {
      transform: none;
    }
  }

  filter: blur(20px);
  &.show {
    transform: none;
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 0;
    filter: none;
  }

  animation-duration: 1s;
  animation-timing-function: ${EASE_OUT};
  animation-iteration-count: 1;
  animation-delay: 1s;
  animation-fill-mode: both;
`

export const NamasteRoot = AbsoluteFlexFillParent.extend`
  position: fixed;
  align-items: center;
  pointer-events: none;
  img {
    height: 100%;
    transform: translate(-15%, 0);
  }

  visibility: hidden;
  filter: blur(20px);
  opacity: 0;
  transition: all 1s ${EASE_OUT};
  &.show {
    visibility: visible;
    filter: none;
    opacity: 1;
  }
`
