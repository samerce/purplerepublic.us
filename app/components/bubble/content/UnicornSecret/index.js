import React from 'react'
import Checkout from '../../../Checkout'
import MailingListForm from '../../../MailingListForm'
import {ClickableImage, SectionHeader} from '../../../tinySpells'
import Video from '../../../Video'

import {
  Root, PickArtRoot, PoetcardsRoot, WhatRoot, MailingListRoot,
  ArtOptionsRoot, ArtOption, PickArtForm, Button,
  PoetcardPreviewRoot, ButtonGroup, SizeOptionsRoot, SizeOption,
  PriceInput, ShippingRoot, GetItText, TotalText, CheckoutWidget, PriceRoot,
  TotalRoot, CheckoutRoot, Itemization, ShippingPrice, ShippingByline,
  PlusSign, SeeButton, ArtTitle, ItemName, AffirmationRoot, GiftRoot, Gift, GiftContent,
  GiftImageRoot,
} from './styled'
import {
  Image, Body, H1, H2,
} from '../../../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {openInNewTab} from '../../../../utils/nav'
import {makeEnum} from '../../../../utils/lang'
import {pcUrl} from '../../../../utils/url'

import {
  SRC_URL, SCREEN_WIDTH_L, SCREEN_WIDTH_MS
} from '../../../../global/constants'

const Mode = makeEnum([
  'teasing',
  'offering',
  'closing',
  'thanking',
])
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
            and they come bearing gifts...
          </H2>

          {ArtOptions.map(this.renderGift)}

          <SectionHeader text='wanna take me home?' />
          <H1>let's be friends forever!</H1>
          <H2>
            pick your price below to have a gorgeous 11 x 14 metallic print of one of your new friends carried by stork straight to your door!
          </H2>

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
  renderGift(gift) {
    return (
      <GiftRoot key={gift.id}>
        <GiftImageRoot>
          <ClickableImage src={pcUrl(gift.id)} />
        </GiftImageRoot>
        <GiftContent>
          <Body>
            {gift.renderContent()}
          </Body>
          {gift.renderGift()}
          </GiftContent>
      </GiftRoot>
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

var ArtOptions = [
  {
    id: 'prance',
    title: 'sunrose the unicorn',
    cheeky: 'sunrose nuzzles you.',
    renderContent: () => (
      <p>
        <strong>meet sunrose.</strong><br/>
        she's a restless little unicorn. she dances wherever she is—the coffeeshop, the club, the bathroom... “there's no room for self-doubt when you let your body (and mind) be free!”<br/>
        <strong>enjoy this gift from the twerking unicorn.</strong>
      </p>
    ),
    renderGift: () => (
      <Gift width={getVideoWidth()}>
        <Video id='BdHK_r9RXTc' width={getVideoWidth} />
      </Gift>
    ),
  },
  {
    id: 'train hoppin charlie',
    title: 'charlie the hippie',
    cheeky: 'charlie gives you a wink.',
    renderContent: () => (
      <p>
        <strong>meet charlie.</strong><br/>
        he spends life hopping trains in europe and when i met him he said to me, “look, if they catch you, you just get off, explore the town, and hop on the next one.”<br/>
        <strong>enjoy this gift from the train-hoppin' hippie.</strong>
      </p>
    ),
    renderGift: () => (
      <Gift width={getVideoWidth()}>
        <Video id='a1eXSvl5rn8' width={getVideoWidth} />
      </Gift>
    ),
  },
  {
    id: 'the flight home',
    title: 'sol the bird',
    cheeky: 'sol lands on your head.',
    renderContent: () => (
      <p>
        <strong>meet sol.</strong><br/>
        she is a bit of an odd bird. always BKAWK!ing and causing a scene. she loves to shake things up and keep things fresh. there's no conforming here!<br/>
        <strong>enjoy this gift from the most unique bird.</strong>
      </p>
    ),
    renderGift: () => (
      <Gift width={getVideoWidth()}>
        <Video id='-DO_GgchYPA' width={getVideoWidth} />
      </Gift>
    ),
  },
]

function getVideoWidth() {
  if (window.innerWidth <= SCREEN_WIDTH_MS) {
    return 300
  } else if (window.innerWidth <= SCREEN_WIDTH_L) {
    return 400
  } else return 600
}
