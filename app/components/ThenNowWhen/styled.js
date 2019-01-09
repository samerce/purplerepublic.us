import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, CloseButton as aCloseButton, screen,
  ExpandingBackground, ExpandingBackgroundSize,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 auto;
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
  padding: 75px 0 0;
  align-items: center;
  justify-content: center;
  transition: all .5s ${EASE_OUT};

  .timeline-show &, .timeline-enter & {
    z-index: 2;
  }

  ${screen.large`
    padding: 40px 0 0;
  `}

  ${screen.medsmall`
    flex-direction: column;
    padding: 120px 0 0;
  `}
`

const ButtonHeight = 80

export const Button = Boto.extend`
  position: relative;
  background: ${p => p.theme.main};
  border: 2px solid ${p => p.theme.veryLight};
  height: ${ButtonHeight}px;
  flex: 0 0 420px;
  font-size: 36px;
  line-height: ${ButtonHeight - 5}px;
  padding: 0;
  font-size: 28px;
  box-shadow: ${p => p.theme.shadowMedium};
  pointer-events: all;

  &.right {
    text-align: right;
  }

  &.left {
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

  ${screen.large`
    && {
      font-size: 18px;
      height: 50px;
      flex: 0 0 250px;

      &.right {
        margin-right: 20px;
      }
      &.left {
        margin-left: 20px;
      }
      i {
        padding: 0 10px;
        font-size: 24px;
        line-height: 77px;
      }
    }
  `}

  ${screen.medsmall`
    && {
      flex: 0 0 50px;
      width: 95%;
      max-width: 330px;
      margin: 0 0 5px !important;
      transform: none;
      align-items: center;

      span {
        flex: 0 0 auto;
      }

      &.right {
        flex-direction: row-reverse;
        text-align: left;
      }
    }
  `}

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

    ${screen.medsmall`
      && {
        transform: none;
      }
    `}
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
