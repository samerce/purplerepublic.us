import styled, {injectGlobal, keyframes, css} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon, Flex, Boto,
} from '../../global/styled'

const fullscreenGrid = keyframes`
  0% {
    height: ${window.innerHeight * .2}px;
  }
  100% {
    height: 100%;
  }
`

export const Root = Flex.extend`
  pointer-events: all;
  z-index: 7;
  flex: 0 0 217px;
  position: relative;
  padding: 0 0 40px;
  box-shadow: -3px -3px 30px ${p => alpha(.5, p.theme.veryDark)};
  width: 100%;
  align-items: center;

  &.showAll {
    position: absolute;
    bottom: 0;
    background-attachment: fixed;
    animation: ${fullscreenGrid};
    animation-duration: .5s;
    animation-timing-function: ${EASE_OUT};
    animation-fill-mode: both;
    background: ${p => p.theme.gradientVeryDark};
  }

  &, &&.hidden {
    transform: translate(0, 10px);
    opacity: 0;
    pointer-events: none;
    transition: opacity .1s, transform .5s;
    transition-timing-function: ${EASE_OUT};
    visibility: hidden;
  }
  .bubbleverse-willEnter & {
    visibility: visible;
    transition: none;
  }
  .bubbleverse-show &, .bubbleverse-enter & {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition-delay: .2s;
    transition-duration: 1s;
    visibility: visible;
  }

  ${screen.medium`
    flex: 0 0 147px;
  `}
`

export const ScrollContainer = Flex.extend`
  overflow-x: scroll;
  flex: 1;
  align-items: flex-start;
  transition: all .3s ${EASE_OUT};
  border-top: 1px solid ${p => p.theme.veryLight};
  padding: 0 0 6px;

  .showAll & {
    flex-wrap: wrap;
    border: none;
    padding: 0 15px;
  }
`

export const BubbleGridItem = Flex.extend`
  position: relative;
  pointer-events: none;
  height: ${p => p.size + 10}px;
  flex: 0 0 ${p => p.size + 10}px;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  transition: all .5s ${EASE_OUT};
  border-bottom-right-radius: 80px;
  border-bottom-left-radius: 80px;

  &.active {
    background: ${p => p.theme.veryLight};
    ${'' /* box-shadow:
      0 0 10px ${p => p.theme.veryLight},
      0 0 10px ${p => p.theme.veryLight}; */}

  }

  .showAll &, .showAll &.active {
    border-radius: 100%;
    margin: 5px;
  }

  &.gapItem {
    flex: 0 0 10px;

    .showAll & {
      flex: 0 0 0;
      margin: 0;
    }
  }

  ${p => p.heroConfig && `
    flex: 0 0 ${p.heroConfig.width}px;
    justify-content: ${p.heroConfig.leftSide? 'flex-end' : 'initial'};
  `}
`

export const ArrangeButton = AbsoluteFlex.extend`
  top: 50px;
  left: 10px;
  align-items: center;
  justify-content: center;
  animation-name: fastBlink;
  animation-duration: 1s;
  animation-timing-function: ${EASE_OUT};
  animation-iteration-count: infinite;
  animation-play-state: paused;
  visibility: hidden;
  z-index: 25;
  height: 100%;
  width: 100%;
  cursor: pointer;
  pointer-events: all;

  .bubbleverse-arrange & {
    visibility: visible;
    animation-play-state: running;
  }
`

export const ArrangeIcon = Icon.extend`
  font-size: 30px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 100%;
  background: ${p => p.theme.main};
  transition: all .5s ${EASE_OUT};

  ${ArrangeButton}:hover & {
    background: white;
    color: ${p => p.theme.main};
  }
`

export const ShowAllButton = Boto.extend`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${p => p.theme.slightlyDark} 100%
  );
  align-items: center;
  justify-content: center;
  font-size: 22px;
  z-index: 10;
  border-radius: 0;
  transform-origin: center bottom;
  border: none;

  &:hover {
    box-shadow: ${p => p.theme.shadowHeavy};
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${p => p.theme.slightlyDark} 100%
    );
    color: ${p => p.theme.veryLight};
    transform: scale(1.2);
  }
`
