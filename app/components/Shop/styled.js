import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  AbsoluteFlexFillParent, AbsoluteFlex, Flex, Boto, CloseButton as aCloseButton, ExpandingBackground,
} from '../../global/styled'

export const Root = AbsoluteFlexFillParent.extend`
  z-index: 6;
  pointer-events: none;
  justify-content: center;
  overflow: hidden;

  &.shop-show, &.shop-enter, &.shop-willExit, &.shop-exit {
    overflow: initial;
    z-index: 9;
    pointer-events: all;
  }
`

const CornerButton = Boto.extend`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  padding: 100px 115px 0 0;
  border-radius: 100%;
  width: 300px;
  height: 300px;
  border: 2px solid ${p => p.theme.veryLight};
  font-size: 42px;
  flex-direction: column;
  font-size: 34px;
  transition-duration: .5s;
`

export const EntryButton = CornerButton.extend`
  pointer-events: all;
  box-shadow: ${p => p.theme.shadowMedium};
  z-index: 3;

  i {
    height: 60px;
    position: relative;
    top: 25px;
    transition: top, height;
    transition-duration: .5s;
  }

  .shop-show &, .shop-enter & {
    top: 15px;
    right: 50%;
    transform: translate(50%, 0) rotate(360deg);
    padding: 0;
    width: 150px;
    height: 150px;
    pointer-events: none;
    background: ${p => p.theme.veryLight};
    border-color: ${p => p.theme.slightlyDark};
    color: ${p => p.theme.slightlyDark};

    i {
      top: 0;
      height: 35px;
      transition: top, height;
    }
  }
`

export const Background = ExpandingBackground.extend`
  top: 0;
  right: 0;
  transform: translate(50%, -50%) scale(0);
  transition-duration: .5s;
  pointer-events: none;

  .shop-willEnter &, .shop-willExit &, .shop-exit & {
    position: fixed;
    opacity: 0;
  }
  .shop-show &, .shop-enter & {
    position: fixed;
    transform: translate(50%, -50%) scale(3);
    opacity: 1;
    transition: all 1s ${EASE_OUT};
  }
`

export const CloseButton = aCloseButton.extend`
  position: fixed;
  top: 15px;
  right: 15px;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  z-index: 4;

  .shop-enter & {
    transition-delay: .3s;
  }
  .shop-show &, .shop-enter & {
    transform: none;
    opacity: 1;
    pointer-events: all;
  }
`

export const ContentRoot = Flex.extend`
  position: relative;
  max-width: 740px;
  flex: 1 0 auto;
  flex-direction: column;
  pointer-events: none;
  z-index: 4;
  justify-content: flex-start;
  margin: 480px 0 50px;

  .shop-show & {
    pointer-events: all;
  }
`

export const ShopRow = Flex.extend`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  ${'' /* opacity: 0;
  transform: scale(1.1);
  transition: all .3s ${EASE_OUT};

  .shop-show & {
    opacity: 1;
    transform: none;
    transition-duration: .5s;
    transition-delay: ${p => (p.index * .1) + .1}s;
  } */}
`

const RowShowDelay = .1

export const IconBubble = Flex.extend`
  flex: 0 0 200px;
  height: 200px;
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryLight};
  background: ${p => p.theme.veryDark};
  box-shadow: ${p => p.theme.shadowHeavy};
  z-index: 2;
  justify-content: center;
  align-items: center;

  i {
    font-size: 40px;
    color: ${p => p.theme.veryLight};
  }

  opacity: 0;
  transform: scale(0);
  transition: all .5s ${EASE_OUT};
  .shop-enter & {
    transform: none;
    opacity: 1;
    transition-delay: ${p => p.i * .1 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }
`

export const WordsRoot = Flex.extend`
  flex-direction: column;
  align-items: center;
  margin: 60px 0 0 -15px;
`

export const ShopButton = Boto.extend`
  flex: 0 0 80px;
  width: 100%;
  border: 2px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowMedium};
  z-index: 1;

  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  .shop-enter & {
    transform: none;
    opacity: 1;
    transition-delay: ${p => (p.i * .1) + .1 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }
`

export const ShopText = Flex.extend`
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowMedium};
  background: ${p => p.theme.veryDark};
  color: ${p => p.theme.veryLight};
  text-align: center;
  width: 85%;
  margin-top: -10px;
  font-size: 20px;
  font-family: im fell dw pica;
  padding: 20px;

  transform: scaleY(0);
  transform-origin: center top;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  .shop-enter & {
    opacity: 1;
    transform: none;
    transition-delay: ${p => p.i * .1 + .2 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }
`
