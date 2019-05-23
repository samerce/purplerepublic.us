import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, FlexColumn, TextInput, screen, Body,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  width: 100%;
`

export const Button = Boto.extend`
  max-width: 400px;
  flex: 1;
  margin: 0 10px;

  ${screen.medium`
    max-width: unset;
    margin: 8px 20px;
    flex: 100%;
  `}
`

export const ButtonGroup = Flex.extend`
  justify-content: space-around;
  width: 100%;
  max-width: 780px;
  margin: 20px 0;
  flex-wrap: wrap;

  ${screen.medium`
    padding: 0;
  `}
`

export const PickArtRoot = FlexColumn.extend`
  align-items: center;
  margin: 20px 0 40px;

`

export const ArtOptionsRoot = Flex.extend`
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  flex-wrap: wrap;

  ${screen.medium`
    padding: 0 20px;
  `}
`

export const ArtOption = styled.div`
  flex: 0 0 25%;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    border: 5px solid transparent;
    transition: all .3s ${EASE_OUT};
  }

  &.selected img {
    border-color: ${p => p.theme.semiWhite};
  }

  ${screen.medium`
    flex: 100%;

    &:nth-child(1) {
      order: 1;
    }
  `}
`

export const ArtTitle = Flex.extend`
  text-align: center;
  color: ${p => p.theme.daliDark};
  background: ${p => p.theme.daliLight};
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.daliDark};
  margin: 10px 50px 0;
  justify-content: center;

  ${screen.large`
    margin: 10px 30px 0;
  `}
  ${screen.medium`
    margin: 10px 50px 0;
  `}
`

export const SeeButton = Boto.extend`
  max-width: 200px;
  margin: 10px auto 20px;

  ${screen.medium`
    max-width: 150px;
    font-size: 18px;
  `}

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
  border: 1px solid ${p => p.theme.veryDark};
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

export const ItemName = Body.extend`
  margin: 0;
  align-items: center;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 5px 0;
  border: 0;
  box-shadow: none;
`

export const ShippingRoot = FlexColumn.extend`
  flex: 1;
  color: ${p => p.theme.veryDark};
  font-size: 28px;
  font-family: alice;
  background: ${p => p.theme.veryLight};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  align-items: center;
  position: relative;
  padding: 20px 0 10px;
`

export const ShippingPrice = Flex.extend`
  color: white;
  line-height: 28px;
`

export const ShippingByline = Flex.extend`
  font-size: 16px;
  color: ${p => p.theme.veryDark};
`

export const PlusSign = styled.i`
  width: 30px;
  height: 30px;
  line-height: 28px;
  font-size: 16px;
  color: white;
  background: ${p => p.theme.flikLight};
  border-radius: 100%;
  border: 1px solid ${p => p.theme.flik};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const PriceRoot = FlexColumn.extend`
  flex: 1;
  position: relative;
`

export const PriceInput = TextInput.extend`
  flex: 1;
  margin: 0;
  width: 100%;
  padding: 20px 0;
  font-size: 28px;

  .checkout-thanking & {
    pointer-events: none;
  }
`

export const CheckoutWidget = Boto.extend`
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
  background: ${p => p.theme.tweet};
  border-color: ${p => p.theme.tweetLight};

  .checkout-offering &, .checkout-closing &, .checkout-thanking & {
    opacity: 1;
    transform: translate(0, -12px);
    flex: 0 0 180px;
  }

  .checkout-closing &, .checkout-closing &:hover {
    background: ${p => p.theme.veryDark};
    border-color: ${p => p.theme.veryLight};
    width: 150%;
    color: ${p => p.theme.veryLight};
    padding: 22px 0 20px;
    cursor: default;
    flex: 0 0 613px;

    ${screen.medium`
      width: ${window.innerWidth - 100}px;
      flex: 0 0 636px;
    `}
  }
  .checkout-thanking & {
    background: ${p => p.theme.veryLight};
    color: ${p => p.theme.veryDark};
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
  color: white;
  border: 2px solid ${p => p.theme.flikLight};
  border-radius: 100%;
  transition: all .3s ${EASE_OUT};
  flex: 0 0 90px;
  width: 90px;
  margin: 5px 0;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.flik};
  font-size: 28px;

  ${CheckoutWidget}:hover &, .checkout-closing & {
    background: ${p => p.theme.flikLight};
    border-color: ${p => p.theme.flik};
    color: white;
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

  .checkout-closing & {
    color: ${p => p.theme.veryLight};
    font-size: 28px;
  }
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

export const PoetcardsRoot = FlexColumn.extend`
  align-items: center;
  margin: 0 0 40px;

`

export const PoetcardPreviewRoot = Flex.extend`
  align-items: center;
  justify-content: space-around;
  margin: 0 0 20px;
  flex-wrap: wrap;

  img {
    max-width: 30%;

    ${screen.medium`
      max-width: 90%;
      margin: 10px 0;
    `}
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
