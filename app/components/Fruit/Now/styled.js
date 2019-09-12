import styled from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../../global/constants'
import {
  Flex, AbsoluteFlexFillParent
} from '../../../global/styled'
import theme from '../../../global/theme'

export const Root = styled.div`
  color: ${lighten(.1, theme.hopiLight)};
  flex-direction: column;
  transition: all .5s ${EASE_OUT};
  font-size: 21px;
  line-height: 1.58;
  max-width: 780px;
  margin: 0 auto;
  padding: 20px 20px 100px;
  text-shadow: 0 0 10px ${alpha(.5, lighten(.2, theme.hopiLight))};

  .wordRolodex {
    display: inline-block;
    color: ${theme.hopiLight};
    transform: translate(8px, 8px);
  }
  .fear {
    display: inline;
    text-shadow: 0 0 15px ${theme.hopi};
    cursor: pointer;

    @keyframes show {
      100% {
        filter: none;
        transform: none;
        opacity: 1;
      }
    }

    .floater {
      visibility: hidden;
      box-shadow: ${theme.shadowVeryHeavy}, black 112px 92px 20px inset;
      border-radius: 100%;
      overflow: hidden;
      border: 1px solid ${theme.hopiLight};
      transform-origin: left bottom;
      filter: blur(20px);
      transform: scale(0);
      opacity: 0;
      transition: visibility .1s linear 1s,
        filter .5s ${EASE_OUT}, transform .5s ${EASE_OUT}, opacity .5s ${EASE_OUT};

      img {
        width: 200px;
      }
    }

    &:hover {
      .floater {
        visibility: visible;
        transition: none;
        animation-name: show;
        animation-fill-mode: both;
        animation-duration: .5s;
        animation-timing-function: ${EASE_OUT};
      }
    }
  }
`

export const FaerieRoot = styled(Flex)`
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

export const NamasteRoot = styled(AbsoluteFlexFillParent)`
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
