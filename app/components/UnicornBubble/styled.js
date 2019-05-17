import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, FlexColumn, TextInput,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  width: 100%;
`

export const PickArtRoot = FlexColumn.extend`
  align-items: center;
  margin: 20px 0 40px;

`

export const PickArtForm = FlexColumn.extend`
  flex-wrap: wrap;
  align-items: center;
`

export const ArtOptionsRoot = Flex.extend`
  justify-content: space-around;
  width: 100%;
  margin: 20px 0 40px;
`

export const ArtOption = styled.div`
  flex: 0 0 30%;
  img {
    width: 100%;
  }
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

export const TotalRoot = FlexColumn.extend`
  width: 250px;
`

export const PriceRoot = Flex.extend`
  margin: 10px 0;

  span {
    font-size: 22px;
    color: ${p => p.theme.semiWhite};
    flex: 0 0 auto;
    padding-left: 16px;
    font-family: alice;
  }
`

export const PriceInput = TextInput.extend.attrs({type: 'number'})`
  flex: 1;
  padding-left: 0;
  text-align: left;
  margin: 0 0 0 5px;
  width: 100%;
`

export const ShippingLine = Flex.extend`
  margin: 0 0 10px;
  color: ${p => p.theme.veryLight};
  font-size: 22px;
  font-family: alice;
`

export const GetItButton = Boto.extend`
  position: relative;
  flex: 0 0 60px;
  width: 100%;
  padding: 0;
  margin: 0 0 15px;

  .checkingOut & {
    background: ${p => p.theme.veryDark};
    pointer-events: none;
  }
`

export const TotalText = Flex.extend`
  font-size: 24px;
  color: ${p => p.theme.semiWhite};
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: -1px;
  border: 2px solid ${p => p.theme.veryLight};
  border-radius: 13px;
  padding: 10px 15px;
  transition: all .3s ${EASE_OUT};

  ${GetItButton}:hover & {
    background: ${p => p.theme.slightlyDark}
    border-color: ${p => p.theme.semiWhite};
  }
  .checkingOut & {
    background: ${p => p.theme.veryDark};
  }
`

export const GetItText = Flex.extend`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 45px;
  transition: right .3s ${EASE_OUT};

  .checkingOut & {
    right: 25px;
  }
`

export const CheckoutRoot = FlexColumn.extend`
  flex: 0 0 0;
  overflow: hidden;
  transition: all .5s ${EASE_OUT};

  .checkingOut & {
    flex: 0 0 372px;
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
  ${'' /* text-transform: uppercase; */}
  font-family: great vibes;
`

export const H2 = Flex.extend`
  font-size: 24px;
  color: ${p => p.theme.veryLight};
  margin: 0 0 15px;
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
`

export const ButtonGroup = Flex.extend`
  justify-content: space-around;
  width: 100%;
  margin: 20px 0 0;
  padding: 0 100px;
  flex-wrap: wrap;
`
