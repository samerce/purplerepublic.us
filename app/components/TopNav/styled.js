import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, CloseButton as aCloseButton, screen,
  ExpandingBackground, ExpandingBackgroundSize, CloseButtonActiveStyles,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 auto;
  transition-property: right left transform;
  position: relative;
  z-index: 6;
  pointer-events: none;

  &.topNav-enter, &.topNav-show {
    pointer-events: all;
  }
`

export const ButtonRoot = Flex.extend`
  flex: 1 0 auto;
  padding: 75px 0 0;
  align-items: center;
  justify-content: center;
  transition: all .5s ${EASE_OUT};

  .topNav-show &, .topNav-enter & {
    z-index: 2;
  }

  ${screen.large`
    padding: 40px 0 0;
  `}

  ${screen.small`
    padding: 120px 10px 0;
  `}
`

const ButtonHeight = 80

export const Button = Boto.extend`
  position: relative;
  background: ${p => p.theme.tweet};
  height: ${ButtonHeight}px;
  flex: 0 0 350px;
  font-size: 36px;
  line-height: ${ButtonHeight - 5}px;
  padding: 0;
  font-size: 28px;
  box-shadow: ${p => p.theme.shadowHeavy};
  pointer-events: all;
  border-color: ${p => p.theme.tweetLight};
  transform: scale(0, 1);

  .settle & {
    transition: all 1s ${EASE_OUT} .5s;
    transform: none;
  }

  .chill & {
    transform: none;
  }

  &.right {
    transform-origin: left center;
    text-align: right;
    i {
      line-height: 80px;
    }
  }

  &.left {
    transform-origin: right center;
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
    line-height: inherit;
    padding: 0 20px;
    vertical-align: middle;
    z-index: 1;
  }

  ${screen.large`
    && {
      font-size: 18px;
      height: 50px;
      flex: 1;
      max-width: 250px;

      &.right {
        margin-right: 20px;
      }
      &.left {
        margin-left: 20px;
      }
      i {
        padding: 0 15px;
        font-size: 24px;
        line-height: 77px;
      }
    }
  `}

  ${screen.small`
    && {
      flex: 1;
      max-width: 230px;
      align-items: center;

      span {
        flex: 0 0 auto;
      }

      &.left, &.right {
        margin: 0 5px;
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

  .topNav-exit &, .topNav-willExit & {
    transition-delay: .3s;
  }
  .topNav-exit &, .topNav-hide & {
    z-index: 3;
  }
`

export const Background = ExpandingBackground.extend`
  top: ${(-ExpandingBackgroundSize / 2) + 120}px;
  left: 0;
  z-index: 1;

  .topNav-show &, .topNav-enter &, .topNav-willExit & {
    transform: scale(3);
    opacity: 1;
    transition: all 2s ${EASE_OUT};
  }
  .topNav-exit & {
    transition-delay: .2s;
    transition-duration: .5s;
  }
`

export const CloseButton = aCloseButton.extend`
  z-index: 8;

  .topNav-show &, .topNav-enter & {
    ${CloseButtonActiveStyles}
    transition-delay: .2s;
  }

  ${screen.medsmall`
    bottom: 0;
    top: unset;
    width: 100%;
    border-radius: 0;
    left: 0;
  `}
`
