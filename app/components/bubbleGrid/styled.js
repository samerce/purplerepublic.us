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
  transition: all 1s ${EASE_OUT};
  z-index: 3;
  flex: 0 0 auto;
  position: relative;
  padding: 0 0 40px;

  ${p => p.hidden? `
    opacity: 0;
    pointer-events: none;
  ` : ''}

  &.showAll {
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: center;
    background-attachment: fixed;
    z-index: 4;
    animation: ${fullscreenGrid};
    animation-duration: .5s;
    animation-timing-function: ${EASE_OUT};
    animation-fill-mode: both;
    background: ${p => p.theme.gradientVeryDark};
    box-shadow: ${p => p.theme.shadowHeavy};
  }
`

export const ScrollContainer = Flex.extend`
  overflow-x: scroll;
  flex: 1;
  align-content: flex-start;
  align-items: flex-start;
  transition: all .3s ${EASE_OUT};

  .showAll & {
    flex-wrap: wrap;
  }
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  height: ${p => p.size}px;
  flex: 0 0 ${p => p.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${p => p.theme.veryLight};
  padding: 0 5px;
  transition: all .3s ${EASE_OUT};

  &.active {
    border: 1px solid ${p => p.theme.veryLight};
    border-top: none;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  .showAll &, .showAll &.active {
    border: none;
  }

  &.gapItem {
    flex: 0 0 10px;
  }

  ${p => p.heroConfig && `
    flex: 0 0 ${p.heroConfig.width}px;
    justify-content: ${p.heroConfig.leftSide? 'flex-end' : 'initial'};
  `}

  ${p => p.hidden && `
    flex: 0 0 0;
    overflow: hidden;
    opacity: 0;
    padding: 0;
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
    ${p => p.theme.veryDark} 40%,
    ${p => p.theme.veryDark} 100%
  );
  align-items: center;
  justify-content: center;
  font-size: 22px;
  z-index: 10;
  border-radius: 0;
  transform-origin: center bottom;

  &:hover {
    border-left: 1px solid ${p => p.theme.veryDark};
    box-shadow: ${p => p.theme.shadowHeavy};
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${p => p.theme.veryDark} 40%,
      ${p => p.theme.veryDark} 100%
    );
    color: ${p => p.theme.veryLight};
    transform: scale(1.2);
  }
`
