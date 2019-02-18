import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../../global/constants'
import {
  screen,
  ArticleText, Flex, FlexColumn, Boto, TextInput, AbsoluteFlex,
} from '../../../global/styled'
import theme from '../../../global/theme'

injectGlobal`

  .gallerySelectPill.gallerySelectPill {
    position: relative;
    transform: none;
    top: 0;
    left: 0;
  }
  #lightboxBackdrop button span {
      color: white;
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

  .words-editor-toolbar {
    color: ${theme.slightlyDark};
    border: 1px solid ${theme.veryLight};
    background: ${theme.main};
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 30px;
    left: 10px;
    width: 140px;
    top: 200px;
    justify-content: center;
    border-radius: 10px;
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transition: all .5s ${EASE_OUT};

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
  .words-editor-textarea {
    color: white;
    min-width: 360px;
  }
  .rdw-option-wrapper, .rdw-dropdown-wrapper {
    border: 1px solid ${theme.slightlyDark};
    color: black;
    border-radius: 5px;
  }
  .rdw-dropdown-selectedtext {
    color: black;
  }
  .rdw-text-align-dropdown {
    margin-bottom: 5px;
  }
  div.galleryWriting, div.videoWriting {
    padding: 0;
  }

  .poetcards-slack {
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }
  .price-sheet {
    width: 65%;
    max-width: 440px;
    align-self: center;
    margin-bottom: 15px;

    ${screen.medium`
      width: 100%;
    `}
  }
`

export const BubbleComponentRoot = FlexColumn.extend`
  overflow-y: scroll;
  height: 100%;
  position: relative;
  flex: 0 0 100%;
  align-items: center;
  padding: 20px 0 0;

  &.wordsRoot {
    padding: 0;
  }

  #ReactGridGallery {
    height: 100%;
    width: 100%;
  }
`

export const VideoRoot = BubbleComponentRoot.extend`
  text-align: center;
  overflow-y: scroll;
  align-items: center;
`

export const VideoWrapper = Flex.extend`
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  overflow: hidden;
`

export const Description = ArticleText.extend`
  padding: 0 20px;
  font-size: 21px;
  overflow-y: scroll;
  max-width: 780px;

  ${screen.medium`
    padding: 0;
    font-size: 18px;
  `}
`

export const EditPhotosRoot = FlexColumn.extend`
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 90px;
  right: 10px;

  .gallerySelectPill {
    height: 50px;

    .selectOption {
      font-size: 20px;
    }
  }
`

export const Button = Boto.extend`
  font-size: 22px;
  padding: 15px 20px 10px;
  transform: translate(0, -10px);
`

export const DeleteButton = Button.extend`
  opacity: ${p => p.disabled? .5 : 1};
  pointer-events: ${p => p.disabled? 'none' : 'all'};
`

export const Hint = Button.extend`
  font-size: 18px;
  color: ${p => p.theme.veryLight};
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  pointer-events: none;
`

export const CaptionInput = TextInput.extend`
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 6;
  height: 40px;
  width: 80%;
  text-align: left;
  padding: 5px 10px 5px 20px;
  font-size: 20px;
  background: rgba(0,0,0,.5);
`

const PoetCardHeight = 400
export const QuantityInput = styled(TextInput).attrs({
  type: 'number',
  placeholder: 0,
  min: 0,
})`
  height: 100%;
  width: 100%;
  font-size: 56px;
  border-top: 1px solid ${p => p.theme.veryLight};
  border-right: 1px solid ${p => p.theme.veryLight};

  ${screen.medium`
    font-size: 26px;
  `}
`

export const PoetCardRow = Flex.extend`
  position: relative;
  width: 100%;
  flex: 0 0 auto;
  justify-content: center;

  &.front {
    input {
      pointer-events: none;
      font-size: 34px;

      ${screen.medium`
        font-size: 22px;
      `}
    }
  }
`

export const ImageRoot = styled.div`
  flex: 0 0 560px;
  cursor: pointer;
  border: 1px solid ${p => p.theme.veryLight};
  img {
    width: 100%;
  }

  ${screen.medium`
    flex: 0 0 70%;
  `}
`

export const QuantityRoot = styled.div`
  flex: 0 0 180px;

  ${screen.medium`
    flex: 0 0 30%;
    border-right: 1px solid ${p => p.theme.veryLight};
  `}
`

export const PoetCardTotal = AbsoluteFlex.extend`
  height: 60px;
  color: white;
  font-size: 38px;
  background: ${p => p.theme.main};
  position: fixed;
  bottom: 217px;
  width: 100%;
  justify-content: center;
  border-top: 1px solid ${p => p.theme.veryLight};
  z-index: 102;
  font-family: annie use your telescope;
  transition: all .4s ${EASE_OUT};
  font-family: alice;

  ${screen.medium`
    width: 100%;
    bottom: 147px;
    font-size: 30px;
    line-height: 58px;
  `}

  .poetcards-checkoutInfo &, .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    bottom: ${window.innerHeight - 160}px;
    border-color: transparent;
    border-radius: 10px;
    box-shadow: ${p => p.theme.shadowMedium};
    color: ${p => p.theme.veryLight};
    border: 1px solid ${p => p.theme.veryLight};
    width: 104%;

    i {
      opacity: 0;
    }
  }

  i {
    font-size: 28px;
    color: white;
    position: absolute;
    right: 10px;
    padding: 16px 0;
    transition: all .3s ${EASE_OUT};
  }
`

export const Intro = Flex.extend`
  color: white;
  padding: 10px 0;
  font-size: 22px;
  flex: 0 0 auto;
  max-width: 740px;

  ${screen.medium`
    font-size: 18px;
  `}
`
export const Checkout = FlexColumn.extend`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 ${(window.innerWidth - 740) / 2}px;
  overflow: scroll;
  background: ${p => alpha(.1, p.theme.veryDark)};
  z-index: 100;
  transform: translateY(2000px);
  opacity: 0;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};

  .poetcards-checkoutInfo &, .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    transform: none;
    opacity: 1;
    pointer-events: all;
  }

  ${screen.medium`
    padding: 20px 15px;
  `}
`

export const CheckoutTitle = Flex.extend`
  font-size: 40px;
  font-family: playfair display;
  text-transform: uppercase;
  color: ${p => p.theme.veryLight};
  flex: 0 0 auto;
  background: inherit;
  width: 100%;
  padding: 20px 0 0;
  justify-content: center;
  align-self: center;

  opacity: 0;
  transition: all .3s ${EASE_OUT};
  .poetcards-checkoutInfo &, .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    opacity: 1;
    transition-delay: .2s;
  }
`

export const CustomerInfo = Flex.extend`
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 20px 20px;
  border-radius: 10px;
  background: ${p => p.theme.main};
  box-shadow: ${p => p.theme.shadowMedium};
  flex: 0 0 auto;
  border: 1px solid ${p => p.theme.veryLight};
  margin: 100px 0 0;
`

export const CustomerInfoTitle = Flex.extend`
  font-size: 28px;
  color: white;
  flex: 0 0 100%;
  justify-content: center;
  transition: all .5s ${EASE_OUT};
  font-family: playfair display;
  height: 80px;

  .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    height: 1px;
    overflow: hidden;
  }
`

const InfoInput = TextInput.extend`
  .poetcards-checkoutThanks & {
    border-color: transparent;
    pointer-events: none;
  }

  ${screen.medium`
    flex: 0 0 100%;
  `}
`

export const Name = InfoInput.extend`
  flex: 0 0 50%;
`

export const Email = InfoInput.extend`
  flex: 0 0 50%;
`

export const Address = InfoInput.extend`
  flex: 0 0 100%;
`

export const PaymentInstructions = FlexColumn.extend`
  width: 100%;
  flex: 0 0 0;
  overflow: scroll;
  transition: all .5s ${EASE_OUT};
  transform: translate(0, -10px);
  opacity: 0;

  .poetcards-checkoutPayment & {
    flex: 0 0 auto;
    transform: none;
    opacity: 1;
  }
`

export const InstructionRow = Flex.extend`
  position: relative;
  width: 100%;
  padding: 10px 0 10px 80px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${p => alpha(.5, p.theme.veryLight)};
  flex: 0 0 auto;
`

export const InstructionNumber = AbsoluteFlex.extend`
  font-size: 98px;
  top: 0;
  left: 0;
  color: white;
  font-family: life savers;
`

export const Instructions = Flex.extend`
  font-size: 28px;
  color: white;
`

export const InstructionEmphasis = Boto.extend`
  flex: 0 0 100%;
  position: relative;

  button {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    cursor: pointer;

    .justCopied & {
      pointer-events: none;
    }
  }
  &.orderNumber {
    pointer-events: none;
    border-width: 1px;
    background: ${p => p.theme.main};
    box-shadow: ${p => p.theme.shadowMedium};
  }
`

export const CopiedMsg = AbsoluteFlex.extend`
  font-size: 18px;
  right: 10px;
  top: -50px;
  color: white;
  height: 100%;
  align-items: center;
  font-family: life savers;
  transition: all .3s ${EASE_OUT};
  transform: translateY(5px);
  opacity: 0;
  pointer-events: none;

  .justCopied & {
    opacity: 1;
    transform: none;
  }
`

export const ActionButtons = Flex.extend`
  margin-top: 20px;
  justify-content: space-between;
  flex: 0 0 60px;

  ${screen.medium`
    flex: 0 0 50px;
  `}
`

const Action = Boto.extend`
  flex: 0 0 49%;
  padding: 10px 0;
  transition: all .3s ${EASE_OUT};

  ${screen.medium`
    font-size: 24px;
  `}
`

export const ContinueAction = Action.extend`
  .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    flex: 0 0 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
`

export const ExitAction = Action.extend`
  .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    flex-grow: 1;
  }
`

export const ThanksRoot = AbsoluteFlex.extend`
  justify-content: space-between;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(2000px);
  pointer-events: none;

`

export const ThanksMsg = Flex.extend`
  flex: 0 0 0;
  opacity: 0;
  transition: all .5s ${EASE_OUT};
  color: white;
  font-size: 32px;
  text-align: center;
  display: block;
  margin-top: 20px;
  overflow: hidden;

  .poetcards-checkoutThanks & {
    flex: 0 0 auto;
    opacity: 1;
  }
`
