import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, CloseButton as aCloseButton, screen,
  ExpandingBackground, ExpandingBackgroundSize,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 auto;
  height: 230px;
  transition-property: right left transform;
  position: relative;
  z-index: 6;
  pointer-events: none;

  &.timeline-enter, &.timeline-show {
    pointer-events: all;
  }
`

export const ButtonRoot = Flex.extend`
  flex: 1 0 auto;
  align-items: center;
  height: 100%;
  justify-content: center;
  transition: all .5s ${EASE_OUT};

  .timeline-show &, .timeline-enter & {
    z-index: 2;
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
  pointer-events: all;

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

  @media(max-width: 1200px) {
    transform: scale(.8);
    &.right {
      margin-left: 55px;
    }
    &.left {
      margin-right: 55px;
    }
  }

  &.active {
    z-index: 3;
    background: ${p => p.theme.veryLight};
    color: ${p => p.theme.slightlyDark};
    border-color: ${p => p.theme.slightlyDark};
    pointer-events: none;

    &.left {
      transform: scale(1.1) translate(-10px, 0);
    }
    &.right {
      transform: scale(1.1) translate(10px, 0);
    }

    @media(max-width: 1200px) {
      &.left {
        transform: scale(.9) translate(-10px, 0);
      }
      &.right {
        transform: scale(.9) translate(10px, 0);
      }
    }
  }

  .timeline-exit &, .timeline-willExit & {
    transition-delay: .3s;
  }
  .timeline-exit &, .timeline-hide & {
    z-index: 3;
  }
`

export const Background = ExpandingBackground.extend`
  top: ${(-ExpandingBackgroundSize / 2) + 120}px;
  left: 0;

  .timeline-show &, .timeline-enter &, .timeline-willExit & {
    transform: scale(3);
    opacity: 1;
    transition: all 2s ${EASE_OUT};
  }
  .timeline-exit & {
    opacity: 0;
    transition-delay: .2s;
    transition-duration: 1s;
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
  right: 15px;

  .timeline-show &, .timeline-enter & {
    opacity: 1;
    transform: none;
    transition-duration: .5s;
    transition-delay: .2s;
  }
`
