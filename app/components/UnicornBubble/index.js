import React from 'react'
import Checkout from '../Checkout'
import MailingListForm from '../MailingListForm'

import {
  Root, PickArtRoot, PoetcardsRoot, WhatRoot, MailingListRoot,
  ArtOptionsRoot, ArtOption, H1, H2, Body, PickArtForm, Button,
  PoetcardPreviewRoot, ButtonGroup, Image, SizeOptionsRoot, SizeOption,
  PriceInput, ShippingRoot, GetItText, TotalText, GetItButton, PriceRoot,
  TotalRoot, CheckoutRoot, Itemization, ShippingPrice, ShippingByline,
  PlusSign,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {openInNewTab} from '../../utils/nav'
import {makeEnum} from '../../utils/lang'
import {
  togglePastTimeline, toggleFutureTimeline
} from '../ThenNowWhen/actions'

import {SRC_URL} from '../../global/constants'

const Mode = makeEnum([
  'waiting',
  'offering',
  'closing',
  'thanking',
])
const ArtOptions = [
  {
    id: 'prance',
  },
  {
    id: 'train hoppin charlie',
  },
  {
    id: 'the flight home',
  },
]
const SizeOptions = ['4 x 6 postcard', '5 x 7', '8 x 10', '11 x 14', '16 x 20']
const pcsrc = id => SRC_URL + 'poetcards/' + id + '.jpg'
const ShippingTotal = 5

@connect(d => ({}))
export default class UnicornBubble extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      mode: Mode.waiting,
      total: ShippingTotal,
      pickYourPrice: undefined,
      item: 'unicorn',
    }
  }

  render() {
    const {mode} = this.state
    return (
      <Root>
        <PickArtRoot>
          <H1>
            a unicorn, a hippie & a bird landed on your roof!
          </H1>
          <H2>
            their powers have combined to offer you a chance to help save the world with art.
            will you take it?
          </H2>

          <ArtOptionsRoot>
            {ArtOptions.map(this.renderArtOption)}
          </ArtOptionsRoot>

          <Body>
            <p>wapow!</p>
            <p>the spell is cast!</p>
            <p>what you get: one 16 x 20 metallic print of any of the pieces above at any price you want!</p>
          </Body>

          <PickArtForm>
            {/* <SizeOptionsRoot>
              {SizeOptions.map(this.renderSizeOption)}
            </SizeOptionsRoot> */}

            <TotalRoot className={'checkout-' + mode}>
              <Itemization>
                <ShippingRoot>
                  <ShippingPrice>${ShippingTotal}</ShippingPrice>
                  <ShippingByline>shipping</ShippingByline>
                  <PlusSign className='fa fa-plus' />
                </ShippingRoot>
                <PriceRoot>
                  <PriceInput
                    onChange={this.onChangePrice}
                    innerRef={r => this.priceInput = r}
                    placeholder={'pick your price!'}
                    value={this.state.pickYourPrice}
                  />
                </PriceRoot>
              </Itemization>
              <GetItButton onClick={this.onClickGetIt}>
                <TotalText>${this.state.total}</TotalText>
                <GetItText>
                  {mode === Mode.offering && 'get it now!'}
                  {mode === Mode.closing && 'enter your deets'}
                  {mode === Mode.thanking && 'thank you! ❤️'}
                </GetItText>
                <CheckoutRoot>
                  <Checkout
                    order={makeOrder(this.state)}
                    onSuccess={this.onOrderSuccess}
                    onError={this.onOrderError}
                  />
                </CheckoutRoot>
              </GetItButton>
            </TotalRoot>
          </PickArtForm>
        </PickArtRoot>

        <PoetcardsRoot>
          <SectionHeader>
            <hr />
            <div>poetcards</div>
          </SectionHeader>
          <H1>like the poetcard you got?</H1>
          <H2>we have over 50 designs!</H2>
          <PoetcardPreviewRoot>
            <ClickableImage src={pcsrc('sunrise folly')} />
            <ClickableImage src={pcsrc('be your own therapy')} />
            <ClickableImage src={pcsrc('ice cream poop')} />
          </PoetcardPreviewRoot>
          <Button onClick={this.openPoetcardsBubble}>wow, show me more!</Button>
        </PoetcardsRoot>

        <WhatRoot>
          <SectionHeader>
            <hr />
            <div>what is this?</div>
          </SectionHeader>
          <H1>this is the love revolution</H1>
          <H2>help us save the world with art!</H2>
          <Body>
            <p>
              express your mess is a nonprofit organization working to make <i>art</i> the reason we all wake up in the morning. art is love and it's time to move towards a heart-forward society. unrestrained competition is hindering the very reason we chose to create civilization in the first place—to live in harmony with each other.
            </p>
          </Body>
          <ButtonGroup>
            <Button onClick={this.openExplore}>see how we make change</Button>
            <Button onClick={this.openShop}>shop with us</Button>
            <Button onClick={this.openEmailTab}>contact us</Button>
          </ButtonGroup>
        </WhatRoot>

        <MailingListRoot>
          <SectionHeader>
            <hr />
            <div>join us!</div>
          </SectionHeader>
          <H1>join our mailing list</H1>
          <H2>monthly updates on our mission + opportunities for you to get involved!</H2>
          <MailingListForm />
        </MailingListRoot>
      </Root>
    )
  }

  @autobind
  renderArtOption({id, title}) {
    return (
      <ArtOption key={id}>
        <ClickableImage src={pcsrc(id)} />
        <div>{title}</div>
      </ArtOption>
    )
  }

  @autobind
  renderSizeOption(size) {
    return <SizeOption>{size}</SizeOption>
  }

  @autobind
  onChangePrice() {
    const price = this.priceInput.value.replace(/[^0-9]*/g, '')
    const total = price? +price + ShippingTotal : ShippingTotal

    let {mode} = this.state
    if (mode !== Mode.closing) {
      mode = price.length? Mode.offering : Mode.waiting
    }

    const pyp = price.length?
      '$' + +price.toLocaleString([], {currency: 'USD'}) : ''
    this.setState({
      mode,
      total: total.toLocaleString([], {currency: 'USD'}),
      pickYourPrice: pyp,
    })
  }

  @autobind
  onClickGetIt() {
    const {mode} = this.state
    if (mode === Mode.closing || mode === Mode.thanking) return
    this.setState({mode: Mode.closing})
  }

  @autobind
  onOrderSuccess() {
    this.setState({mode: Mode.thanking})
  }

  @autobind
  onOrderError() {
    alert("\
      oH nO! :(\n\
      there was a problem processing your paypal payment.\n\
      you were not charged.\n\n\
      please try again!\
    ")
  }

  @autobind
  openPoetcardsBubble() {
    window.location = '#start/bubble/buy-poetcards'
  }

  @autobind
  openExplore() {
    window.location = '#start'
    this.props.dispatch(toggleFutureTimeline())
  }

  @autobind
  openShop() {
    window.location = '#start'
    this.props.dispatch(togglePastTimeline())
  }

  @autobind
  openEmailTab() {
    openInNewTab('mailto:whynot@expressyourmess.com')
  }

}

function makeOrder(details) {
  const itemPrice = details.total - ShippingTotal
  return {
    total: details.total,
    subtotal: itemPrice,
    shippingTotal: ShippingTotal,
    description: 'pick your price faerie offering!',
    items: [
      {
        name: details.item + ' 16 x 20 metallic print',
        description: 'a gorgeous, shiny new print of original artwork',
        price: itemPrice,
        quantity: 1,
        sku: details.item,
      },
    ],
  }
}

function ClickableImage(props) {
  const onClick = () => openInNewTab(props.src)
  return <Image src={props.src} onClick={onClick} />
}
