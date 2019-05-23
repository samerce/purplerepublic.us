import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'
import {
  BubbleButton, InlineBlock, screen, AbsoluteFlex, Flex,
} from '../../../global/styled'

export const Root = InlineBlock.extend`
  transition: transform .7s ${EASE_OUT};
  z-index: 8;
  pointer-events: ${p => p.disabled? 'none' : 'all'};
  cursor: pointer;
  position: relative;

  &&.builder {
    pointer-events: all;
  }

  &.bubble-focused {
    transition-duration: .8s;
    pointer-events: none;
  }

  &.bubble-editing {
    position: absolute;
    pointer-events: none;
    transform: scale(.5);
  }

  &.bubble-willFocus, &.bubble-willDefocus {
  }

  &.bubble-willEnter {
    transition: none;
    transform: scale(0);
    pointer-events: none;
  }

  &.bubble-enter {
    transition: all 1s ${EASE_OUT};
  }

  .bubbleShopText {
    transition: all .01s linear .2s;
    pointer-events: none;
    font-family: annie use your telescope;
    font-size: 62px;
    text-align: center;
    position: absolute;
    width: 100%;
    color: white;
    top: 0;
    user-select: none;
    text-shadow: 1px 1px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    .focused & {
      transition-delay: 0s;
      opacity: 0;
    }

    span {
      font-size: 22px;
    }

    .poetcardText {
      font-size: 40px;
    }

    .shopText {
      line-height: 40px;
    }
    .bubble-willFocus &, .bubble-focused &, .bubble-willDefocus & {
      opacity: 0;
      transition: none;
    }
    ${screen.medium`
      font-size: 36px;
      .shopText {
        line-height: 16px;
      }
      .poetcardText {
        font-size: 22px;
      }
      span {
        display: none;
      }
    `}
  }
`

export const ImageBubbleButton = BubbleButton.extend`
  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border-width: 2px;
  width: ${p => p.size}px;
  height: ${p => p.size}px;

  .active & {
    border: 1px solid ${p => p.theme.slightlyDark};
    box-shadow:
      inset 2px 2px 20px ${p => alpha(.5, p.theme.veryDark)},
      inset -2px -2px 20px ${p => alpha(.5, p.theme.veryDark)};
    cursor: default;
    pointer-events: none;
  }

  &:hover, &:active {
    transform: none;
    box-shadow: none;
  }

  ${Root}:hover & {
    transform: scale(1.1);
    box-shadow: ${p => p.theme.shadowHeavy};
  }
  ${Root}:active & {
    transform: scale(.9);
    box-shadow: ${p => p.theme.shadowLight};
  }
`

export const Title = AbsoluteFlex.extend`
  justify-content: center;
  align-items: center;
  pointer-events: none;
  font-size: 12px;
  background: ${p => alpha(.5, p.theme.veryDark)};
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 15px 5px;
  font-family: alice;
  transition-property: opacity, transform;
  transition-duration: .2s;
  transition-timing-function: ${EASE_OUT};
  transform: scale(1.05);
  opacity: 0;
  user-select: none;
  line-height: 16px;

  ${Root}:hover & {
    opacity: 1;
    transform: none;
  }

  .bubble-focused &, .bubble-editing &, .builder & {
    visibility: hidden;
  }

  ${screen.medium`
    display: none;
  `}

`

export const BubbleButtonBuilderRoot = Flex.extend`
  justify-content: center;
  align-items: center;

  input {
    visibility: hidden;
    position: absolute;
  }
  i.prompt {
    color: white;
    position: absolute;
    z-index: 9;
    font-size: 80px;
  }
`
