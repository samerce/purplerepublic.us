import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, FlexColumn, TextInput, screen,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  width: 100%;
`

export const PickArtRoot = FlexColumn.extend`
  align-items: center;
  margin: 20px 0 40px;

`

export const ArtOptionsRoot = Flex.extend`
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
`

export const ArtOption = styled.div`
  flex: 0 0 25%;
  align-items: center;

  img {
    width: 100%;
    border: 5px solid transparent;
    transition: all .3s ${EASE_OUT};
  }

  &.selected img {
    border-color: ${p => p.theme.semiWhite};
  }
`

export const SeeButton = Boto.extend`
  max-width: 200px;
  margin: 15px auto;

  ${'' /* .selected &, .selected &:hover {
    background: ${p => p.theme.veryLight};
    color: ${p => p.theme.veryDark};
    border-color: ${p => p.theme.veryDark};
    cursor: default;
  } */}
`

export const SizeOptionsRoot = Flex.extend`
  width: 100%;
  margin: 20px 0;
  flex-wrap: wrap;
`

export const SizeOption = Boto.extend`
  flex: 1 0 auto;
  max-width: 300px;
  margin: 0 10px;
`

export const PickArtForm = FlexColumn.extend`
  flex-wrap: wrap;
  align-items: center;
  margin: 20px 0 0;
`

export const TotalRoot = FlexColumn.extend`
  width: 250px;
`

export const Itemization = FlexColumn.extend`
  margin: 10px 0 0;
  z-index: 2;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.veryLight};
  background: ${p => p.theme.main};
  box-shadow: ${p => p.theme.shadowVeryHeavy};

  span {
    font-size: 22px;
    color: ${p => p.theme.semiWhite};
    flex: 0 0 auto;
    padding-left: 16px;
    font-family: alice;
  }

  .checkout-thanking & {
    flex: 0 0 0;
    overflow: hidden;
    opacity: 0;
    transition: all .3s ${EASE_OUT};
  }
`

export const ShippingRoot = FlexColumn.extend`
  flex: 1;
  color: ${p => p.theme.veryLight};
  font-size: 28px;
  font-family: alice;
  background: ${p => p.theme.veryDark};
  border-bottom: 1px solid ${p => p.theme.veryLight};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
`

export const ShippingPrice = Flex.extend`
  color: ${p => p.theme.semiWhite};
`

export const ShippingByline = Flex.extend`
  font-size: 16px;
  color: ${p => p.theme.veryLight};
`

export const PlusSign = styled.i`
  width: 30px;
  height: 30px;
  line-height: 28px;
  font-size: 16px;
  color: ${p => p.theme.veryDark};
  background: ${p => p.theme.veryLight};
  border-radius: 100%;
  border: 1px solid ${p => p.theme.veryDark};
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const PriceRoot = FlexColumn.extend`
  flex: 1;
`

export const PriceInput = TextInput.extend`
  flex: 1;
  margin: 0;
  width: 100%;
  padding: 20px 0 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 28px;
  color: ${p => p.theme.semiWhite};

  .checkout-thanking & {
    pointer-events: none;
  }
`

export const GetItButton = Boto.extend`
  position: relative;
  flex: 0 0 0;
  flex-direction: column;
  align-items: center;
  padding: 22px 0 0;
  width: 80%;
  align-self: center;
  transform: translate(0, -100%);
  font-size: 24px;
  opacity: 0;
  z-index: 1;
  box-shadow: ${p => p.theme.shadowHeavy};

  .checkout-offering &, .checkout-closing &, .checkout-thanking & {
    opacity: 1;
    transform: translate(0, -12px);
    flex: 0 0 180px;
  }

  .checkout-closing &, .checkout-closing &:hover {
    background: ${p => p.theme.veryDark};
    width: 150%;
    color: ${p => p.theme.veryLight};
    border-color: ${p => p.theme.veryLight};
    padding: 22px 0 20px;
    cursor: default;
    flex: 0 0 603px;

    ${screen.medium`
      width: ${window.innerWidth - 100}px;
      flex: 0 0 626px;
    `}
  }
  .checkout-thanking & {
    background: ${p => p.theme.veryDark};
    pointer-events: none;
    flex: 0 0 159px;
    padding: 20px 20px 15px;
    width: 395px;
    text-align: left;

    ${screen.medium`
      width: ${window.innerWidth - 100}px;
      font-size: 18px;
      flex: 0 0 125px;
    `}
  }
`

export const TotalText = Flex.extend`
  color: ${p => p.theme.semiWhite};
  border: 2px solid ${p => p.theme.semiWhite};
  border-radius: 100%;
  transition: all .3s ${EASE_OUT};
  flex: 0 0 90px;
  width: 90px;
  margin: 5px 0;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.slightlyDark};
  font-size: 28px;

  ${GetItButton}:hover &, .checkout-closing & {
    background: ${p => p.theme.main};
    border-color: ${p => p.theme.semiWhite};
    color: ${p => p.theme.semiWhite};
  }
  .checkout-thanking & {
    flex: 0 0 0;
    overflow: hidden;
    margin: 0;
    opacity: 0;
  }
`

export const GetItText = Flex.extend`
  transition: right .3s ${EASE_OUT};
  flex: 1;
`

export const CheckoutRoot = FlexColumn.extend`
  flex: 0 0 0;
  overflow: hidden;
  transition: all .5s ${EASE_OUT};
  width: 100%;
  align-self: center;
  opacity: 0;
  margin: 10px 0 0;

  .checkout-closing & {
    flex: 1;
    opacity: 1;

    #paypalButtons {
      padding: 0 20px;
    }
  }
`

export const Image = styled.img`
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadowHeavy};
  border: 1px solid ${p => alpha(.5, p.theme.veryLight)};
  cursor: pointer;
  transition: all .2s ${EASE_OUT};

  &:hover {
    transform: scale(1.03);
    box-shadow: ${p => p.theme.shadowVeryHeavy};
    transition: all .5s ${EASE_OUT};
  }
  &:active {
    transform: scale(.99);
    box-shadow: ${p => p.theme.shadowMedium};
    transition: all .5s ${EASE_OUT};
  }
`

export const PoetcardsRoot = FlexColumn.extend`
  align-items: center;
  margin: 0 0 40px;

`

export const PoetcardPreviewRoot = Flex.extend`
  align-items: center;
  justify-content: space-around;
  margin: 0 0 20px;

  img {
    max-width: 30%;
  }
`

export const WhatRoot = FlexColumn.extend`
  align-items: center;
  margin: 0 0 40px;

`

export const MailingListRoot = FlexColumn.extend`
  align-items: center;
  margin: 0 0 40px;

`

export const H1 = Flex.extend`
  font-size: 48px;
  color: ${p => p.theme.semiWhite};
  font-family: great vibes;
  text-align: center;

  ${screen.medium`
    font-size: 36px;
    padding: 5px;
  `}
`

export const H2 = Flex.extend`
  font-size: 24px;
  color: ${p => p.theme.veryLight};
  margin: 0 0 15px;
  text-align: center;

  ${screen.medium`
    font-size: 19px;
  `}
`

export const Body = FlexColumn.extend`
  font-size: 20px;
  color: ${p => p.theme.slightlyDark};
  background: ${p => p.theme.veryLight};
  border-radius: 10px;
  border: 1px solid ${p => p.theme.slightlyDark};
  padding: 0 20px;
  max-width: 780px;
  box-shadow: ${p => p.theme.shadowMedium};
`

export const Button = Boto.extend`
  max-width: 400px;
  flex: 1;
  margin: 0 10px;

  ${screen.medium`
    max-width: unset;
    margin: 8px 0;
    flex: 100%;
  `}
`

export const ButtonGroup = Flex.extend`
  justify-content: space-around;
  width: 100%;
  margin: 20px 0 0;
  padding: 0 100px;
  flex-wrap: wrap;

  ${screen.medium`
    padding: 0;
  `}
`
