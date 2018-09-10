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
  .image-gallery {
    width: 100%;
    height: 100%;
  }
  .image-gallery-content, .image-gallery-swipe,
  .image-gallery-slides {
    height: 100%;
  }
  .image-gallery-slide {
    text-align: center;
  }
  .image-gallery-image {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fullscreen {
    .image-gallery-slide-wrapper {
      height: 100%;
    }
    .image-gallery-slide.image-gallery-slide {
      height: 100%;
      width: 100%;
      text-align: center;

      &.preferHeight img {
        height: 100%;
        width: auto;
      }

      &.preferWidth img {
        width: 100%;
        height: auto;
      }

      ${screen.medium`
        .image-gallery-image {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img {
          width: 100%;
          height: auto;
        }
      `}
    }
  }
  .image-gallery-left-nav, .image-gallery-right-nav {
    height: 100%;
  }
  button.image-gallery-fullscreen-button {
    z-index: 5;
    visibility: hidden;
  }
  .image-gallery-description {
    font-family: annie use your telescope;
    font-size: 20px;

    ${screen.medium`
      font-size: 22px !important;
      transition: all .3s ${EASE_OUT};

      .fullscreen & {
        font-size: 24px !important;
      }
    `}
  }
  button.image-gallery-fullscreen-button::before {
    font-size: 1.7em;
    padding: 10px;
  }
  div.image-gallery-index {
    padding: 5px 10px;
    font-size: 12px;
  }

  .words-editor-toolbar {
    color: ${theme.slightlyDark};
    border: 1px solid ${theme.veryLight};
    background: ${theme.main};
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 30px;
    right: 80px;
    width: 140px;
    top: 200px;
    justify-content: center;
    border-radius: 10px;
    position: fixed;
  }
  .words-editor-textarea {
    color: white;
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
  .galleryWriting, .videoWriting {
    overflow-y: hidden;
    flex: 1 0 auto;
  }

  .poetcards-slack {
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }
  .price-sheet {
    width: 65%;
    align-self: center;
    margin-bottom: 15px;
  }
`

export const BubbleComponentRoot = FlexColumn.extend`
  overflow-y: scroll;
  width: 100%;
  position: relative;
`

export const VideoRoot = BubbleComponentRoot.extend`
  text-align: center;
  overflow-y: scroll;
`

export const Description = ArticleText.extend`
  padding: 0 20px;
  font-size: 21px;
  overflow-y: scroll;
`

export const EditPhotosRoot = FlexColumn.extend`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: fixed;
  top: 10px;
  right: 20px;
`

export const Hint = styled.div`
  font-size: 18px;
  margin: 15px;
  color: ${p => p.theme.veryLight};
`

export const Button = Boto.extend`
  margin: 20px;
  font-size: 24px;
  border: 1px solid ${p => p.theme.veryLight};
`

export const DeleteButton = Button.extend`
  opacity: ${p => p.disabled? .5 : 1};
  pointer-events: ${p => p.disabled? 'none' : 'all'};
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
`

export const PoetCardRow = Flex.extend`
  position: relative;
  width: 100%;
  flex: 0 0 auto;

  &.front {
    input {
      pointer-events: none;
      font-size: 34px;
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
`

export const QuantityRoot = styled.div`
  flex: 0 0 180px;
`

export const PoetCardTotal = AbsoluteFlex.extend`
  height: 60px;
  color: white;
  font-size: 38px;
  background: ${p => p.theme.main};
  position: fixed;
  bottom: 60px;
  width: 740px;
  justify-content: center;
  border-top: 1px solid ${p => p.theme.veryLight};
  z-index: 102;
  font-family: annie use your telescope;
  transition: all .4s ${EASE_OUT};

  @media(max-width: 740px) {
    width: 100%;
  }

  .poetcards-checkoutInfo &, .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    bottom: ${window.innerHeight - 160}px;
    border-color: transparent;
    border-radius: 10px;
    box-shadow: ${p => p.theme.shadowMedium};
  }
`

export const Intro = Flex.extend`
  color: white;
  padding: 10px 20px;
  font-size: 22px;
  flex: 0 0 auto;
`

export const Checkout = FlexColumn.extend`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 20px ${(window.innerWidth - 740) / 2}px;
  margin: 0 auto;
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
`

export const CheckoutTitle = Flex.extend`
  font-size: 48px;
  font-family: life savers;
  color: white;
  text-align: center;
  margin-bottom: 85px;
  align-self: center;
  flex: 0 0 auto;
  position: fixed;
  top: 20px;
`

export const CustomerInfo = Flex.extend`
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background: ${p => p.theme.main};
  box-shadow: ${p => p.theme.shadowMedium};
  flex: 0 0 auto;
  margin-top: 160px;
`

export const CustomerInfoTitle = Flex.extend`
  font-size: 28px;
  color: white;
  flex: 0 0 100%;
  justify-content: center;
  transition: all .5s ${EASE_OUT};
  font-family: life savers;

  .poetcards-checkoutPayment &, .poetcards-checkoutThanks & {
    height: 0;
    overflow: hidden;
  }
`

const InfoInput = TextInput.extend`
  .poetcards-checkoutThanks & {
    border-color: transparent;
    pointer-events: none;
  }
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

  .poetcards-checkoutPayment & {
    flex: 0 0 auto;
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
  border: 1px solid ${p => p.theme.veryLight};
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
    border: 0;
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
`

const Action = Boto.extend`
  flex: 0 0 49%;
  padding: 10px 0;
  transition: all .3s ${EASE_OUT};
  border: 1px solid ${p => p.theme.veryLight};
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
