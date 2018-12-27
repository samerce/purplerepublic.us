import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, CloseButton as aCloseButton,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 auto;
  height: 230px;
  transition-property: right left transform;
  position: relative;

  &.timeline-enter, &.timeline-show {
    z-index: 6;
  }
`

export const ButtonRoot = Flex.extend`
  flex: 1 0 auto;
  align-items: center;
  height: 100%;
  justify-content: center;
  transition: all .5s ${EASE_OUT};

  .pastTimeline.timeline-show &, .pastTimeline.timeline-enter & {
    z-index: 2;
    right: 90px;
    position: relative;
    transform: translate(50%, 0);
    pointer-events: none;
  }
  .futureTimeline.timeline-show &, .futureTimeline.timeline-enter & {
    z-index: 2;
    left: 100px;
    position: relative;
    transform: translate(-50%, 0);
    pointer-events: none;
  }
`

const ButtonHeight = 80

export const Button = Boto.extend`
  position: relative;
  background: ${p => p.theme.main};
  border: 2px solid ${p => p.theme.veryLight};
  height: ${ButtonHeight}px;
  flex: 1 0 auto;
  max-width: 330px;
  font-size: 36px;
  line-height: ${ButtonHeight - 5}px;
  padding: 0;
  font-size: 28px;
  box-shadow: ${p => p.theme.shadowMedium};

  &.right {
    margin-left: 85px;
    text-align: right;
  }

  &.left {
    margin-right: 85px;
    text-align: left;
  }

  span {
    flex: 1 0 auto;
    padding: 0 5px;
    z-index: 1;
  }

  i {
    height: ${ButtonHeight}px;
    font-size: 32px;
    line-height: 80px;
    padding: 0 15px;
    vertical-align: middle;
    z-index: 1;
  }

  &.past {
    .pastTimeline.timeline-show &, .pastTimeline.timeline-enter & {
      z-index: 3;
      background: ${p => p.theme.veryLight};
      color: ${p => p.theme.slightlyDark};
      border-color: ${p => p.theme.slightlyDark};
    }
    .pastTimeline.timeline-exit &, .pastTimeline-timeline-hide & {
      z-index: 3;
    }
    .futureTimeline.timeline-show &, .futureTimeline.timeline-enter & {
      opacity: 0;
      pointer-events: none;
      transition: all .3s ${EASE_OUT};
    }
  }

  &.future {
    .futureTimeline.timeline-show &, .futureTimeline.timeline-enter & {
      z-index: 3;
      background: ${p => p.theme.veryLight};
      color: ${p => p.theme.slightlyDark};
      border-color: ${p => p.theme.slightlyDark};
    }
    .pastTimeline.timeline-show &, .pastTimeline.timeline-enter & {
      opacity: 0;
      pointer-events: none;
      transition: all .1s ${EASE_OUT};
    }
  }
`

const CircleSize = Math.max(window.innerWidth, window.innerHeight)
export const Background = AbsoluteFlex.extend`
  background: radial-gradient(
    circle at center,
    ${p => p.theme.slightlyDark} 0%,
    ${p => p.theme.veryDark} 50%,
    ${p => p.theme.veryDark} 100%
  );
  box-shadow: ${p => p.theme.shadowMedium};
  pointer-events: none;
  position: fixed;
  height: ${CircleSize}px;
  width: ${CircleSize}px;
  z-index: 2;
  top: ${(-CircleSize / 2) + 120}px;
  left: 0;
  border: 2px solid ${p => p.theme.veryLight};
  border-radius: 100%;
  transform: scale(0);
  transition: all .5s ${EASE_OUT};
  opacity: 0;

  .timeline-show &, .timeline-enter & {
    transform: scale(2);
    opacity: 1;
    transition: all 1s ${EASE_OUT};
  }
`

export const CloseButton = aCloseButton.extend`
  position: fixed;
  top: 15px;
  transition: all .3s ${EASE_OUT};
  transition-property: opacity, transform;
  opacity: 0;
  transform: scale(0);
  z-index: 8;

  .pastTimeline.timeline-show &, .pastTimeline.timeline-enter & {
    left: 15px;
    opacity: 1;
    transform: none;
    transition-duration: .5s;
    transition-delay: .2s;
  }
  .futureTimeline.timeline-show &, .futureTimeline.timeline-enter & {
    right: 15px;
    opacity: 1;
    transform: none;
    transition-duration: .5s;
    transition-delay: .2s;
  }
`
