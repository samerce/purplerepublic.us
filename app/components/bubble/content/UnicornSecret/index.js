import React from 'react'
import Checkout from '../../../Checkout'
import MailingListForm from '../../../MailingListForm'
import {ClickableImage, SectionHeader} from '../../../tinySpells'

import {
  Root, PickArtRoot, PoetcardsRoot, WhatRoot, MailingListRoot,
  ArtOptionsRoot, ArtOption, PickArtForm, Button,
  PoetcardPreviewRoot, ButtonGroup, SizeOptionsRoot, SizeOption,
  PriceInput, ShippingRoot, GetItText, TotalText, CheckoutWidget, PriceRoot,
  TotalRoot, CheckoutRoot, Itemization, ShippingPrice, ShippingByline,
  PlusSign, SeeButton, ArtTitle, ItemName, AffirmationRoot,
} from './styled'
import {
  Image, Body, H1, H2,
} from '../../../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {openInNewTab} from '../../../../utils/nav'
import {makeEnum} from '../../../../utils/lang'
import {pcUrl} from '../../../../utils/url'

import {SRC_URL} from '../../../../global/constants'

const Mode = makeEnum([
  'teasing',
  'offering',
  'closing',
  'thanking',
])
const ArtOptions = [
  {
    id: 'prance',
    title: 'sunrose the unicorn',
    cheeky: 'sunrose nuzzles you.',
  },
  {
    id: 'train hoppin charlie',
    title: 'charlie the hippie',
    cheeky: 'charlie gives you a wink.',
  },
  {
    id: 'the flight home',
    title: 'sol the bird',
    cheeky: 'sol lands on your head.',
  },
]
const SizeOptions = ['4 x 6 postcard', '5 x 7', '8 x 10', '11 x 14', '16 x 20']
const ShippingTotal = 5
const SecretCodeUrl = SRC_URL + 'secretCodePages/'

@connect(d => ({}))
export default class UnicornSecret extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      mode: Mode.teasing,
      total: ShippingTotal,
      pickYourPrice: undefined,
      pickedArt: ArtOptions[1],
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({mounted: true}), 1000)
  }

  render() {
    const {mode, total, pickYourPrice, pickedArt, mounted} = this.state
    return (
      <Root>
        <AffirmationRoot className={mounted && 'show'}>
          <Image src={SecretCodeUrl + 'you.png'} className='you basic' />
          <Image src={SecretCodeUrl + 'are.png'} className='are basic' />
          <Image src={SecretCodeUrl + 'awesome.png'} className='awesome basic' />
        </AffirmationRoot>

        <PickArtRoot>
          <SectionHeader text='oh look!' />
          <H1>
            a unicorn, a hippie & a bird landed on your roof!
          </H1>
          <H2>
            they have pooled their power to offer you a chance to help save the world with art.
            <br />will you take it?
          </H2>

          <Body>
            <p>
              the narcissism of this motley crew is absolutely spectacular: their gift to you is a print of one of their mugs at whatever price you want. <strong>pick one</strong> of these beautiful creatures then <strong>pick your price</strong> to have a gorgeous <strong>11 x 14 metallic print</strong> carried by stork straight to your door!
            </p>
          </Body>

          <ArtOptionsRoot>
            {ArtOptions.map(this.renderArtOption)}
          </ArtOptionsRoot>

          <PickArtForm>
            {/* <SizeOptionsRoot>
              {SizeOptions.map(this.renderSizeOption)}
            </SizeOptionsRoot> */}

            <TotalRoot className={'checkout-' + mode}>
              <Itemization>
                <ItemName>
                  {pickedArt.title}
                </ItemName>
                <PriceRoot>
                  <PriceInput
                    onChange={this.onChangePrice}
                    innerRef={r => this.priceInput = r}
                    placeholder={'pick your price!'}
                    value={pickYourPrice}
                  />
                </PriceRoot>
                <ShippingRoot>
                  <ShippingPrice>${ShippingTotal}</ShippingPrice>
                  <ShippingByline>shipping</ShippingByline>
                  <PlusSign className='fa fa-plus' />
                </ShippingRoot>
              </Itemization>
              <CheckoutWidget onClick={this.onClickGetIt}>
                <TotalText>${total}</TotalText>
                <GetItText>
                  {mode === Mode.offering && 'buy it now!'}
                  {mode === Mode.closing && 'enter your deets'}
                  {mode === Mode.thanking &&
                    <div>
                      ❤️ | thank you!<br/>
                      💋 | {pickedArt.cheeky}<br/>
                      💌 | check your email for details.<br/>
                      🙏 | namaste, fellow creature.
                    </div>
                  }
                </GetItText>
                <CheckoutRoot>
                  <Checkout
                    order={makeOrder(this.state)}
                    onSuccess={this.onOrderSuccess}
                    onError={this.onOrderError}
                  />
                </CheckoutRoot>
              </CheckoutWidget>
            </TotalRoot>
          </PickArtForm>
        </PickArtRoot>

        <PoetcardsRoot>
          <SectionHeader text='poetcards' />
          <H1>like the poetcard you got?</H1>
          <H2>we have over 50 designs!</H2>
          <PoetcardPreviewRoot>
            <ClickableImage src={pcUrl('sunrise folly')} />
            <ClickableImage src={pcUrl('be your own therapy')} />
            <ClickableImage src={pcUrl('ice cream poop')} />
          </PoetcardPreviewRoot>
          <Button onClick={this.openPoetcardsBubble}>wow, show me more!</Button>
        </PoetcardsRoot>

        <WhatRoot>
          <SectionHeader text='what is this?' />
          <H1>this is the love revolution</H1>
          <H2>help us save the world with art!</H2>
          <Body>
            <p>
              express your mess is a not-for-profit network working to make <i>art</i> the reason we all wake up in the morning. art is the practice of loving life and it's time to move towards a heart-forward society. unrestrained competition is hindering the very reason we chose to create civilization in the first place—to live in harmony with each other—to enjoy living!
            </p>
          </Body>
          <ButtonGroup>
            <Button onClick={this.openExplore}>explore our work</Button>
            <Button onClick={this.openShop}>shop with us</Button>
            <Button onClick={this.openEmailTab}>contact us</Button>
          </ButtonGroup>
          <H1>browse our art!</H1>
          <Body className='browseArtBody'>
            <p>
              click through the bubbles at the bottom of the screen to explore all the art we've created over the past few years: from writing, to photoshoots, to videos, to music, and more!
            </p>
          </Body>
        </WhatRoot>

        <MailingListRoot>
          <SectionHeader text='join us!' />
          <H1>join our mailing list</H1>
          <H2>monthly updates on our mission + opportunities for you to get involved!</H2>
          <MailingListForm />
        </MailingListRoot>
      </Root>
    )
  }

  @autobind
  renderArtOption(art) {
    const selected = art.id === this.state.pickedArt.id
    return (
      <ArtOption
        key={art.id}
        className={selected && 'selected'}>
        <Image
          src={pcUrl(art.id)}
          onClick={() => this.onClickArtOption(art)}
        />
        <ArtTitle onClick={() => this.onClickArtOption(art)}>
          {art.title}
        </ArtTitle>
        <SeeButton onClick={() => openInNewTab(pcUrl(art.id))}>
          see bigger
        </SeeButton>
      </ArtOption>
    )
  }

  @autobind
  renderSizeOption(size) {
    return <SizeOption>{size}</SizeOption>
  }

  @autobind
  onClickArtOption(art) {
    this.setState({pickedArt: art})

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'art option clicked',
    })
  }

  @autobind
  onChangePrice() {
    const price = this.priceInput.value.replace(/[^0-9]*/g, '')
    const total = price? +price + ShippingTotal : ShippingTotal

    let {mode} = this.state
    if (mode !== Mode.closing) {
      mode = price.length? Mode.offering : Mode.teasing
    }

    this.setState({
      mode,
      total: total.toLocaleString([], {currency: 'USD'}),
      pickYourPrice: price.length?
        '$' + +price.toLocaleString([], {currency: 'USD'}) : '',
    })

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'price changed',
    })
  }

  @autobind
  onClickGetIt() {
    const {mode} = this.state
    if (mode === Mode.closing || mode === Mode.thanking) return
    this.setState({mode: Mode.closing})

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'buy button clicked',
    })
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

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'poetcards button clicked',
    })
  }

  @autobind
  openExplore() {
    window.location = '#start/explore'

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'explore clicked',
    })
  }

  @autobind
  openShop() {
    window.location = '#start/shop'

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'shop clicked',
    })
  }

  @autobind
  openEmailTab() {
    openInNewTab('mailto:whynot@expressyourmess.com')

    ga('send', 'event', {
      eventCategory: 'unicorn code page',
      eventAction: 'email clicked',
    })
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
        name: details.pickedArt.title + ' — 11 x 14 metallic print',
        description: 'a gorgeous, shiny new print of original artwork',
        price: itemPrice,
        quantity: 1,
        sku: details.pickedArt.id,
      },
    ],
  }
}
