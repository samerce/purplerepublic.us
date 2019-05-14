import React from 'react'

import {
  Root, PickArtRoot, PoetcardsRoot, WhatRoot, MailingListRoot,
  ArtOptionsRoot, ArtOption, H1, H2, Body, PickArtForm, Button,
  PoetcardPreviewRoot, ButtonGroup, Image, SizeOptionsRoot, SizeOption,
  PriceInput, ShippingLine, GetItText, TotalText, GetItButton, PriceRoot,
  TotalRoot,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {openInNewTab} from '../../utils/nav'

import {SRC_URL} from '../../global/constants'

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

export default class UnicornBubble extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      total: 0,
    }
  }

  render() {
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
            <p>choose any creature above for any price you want!</p>
          </Body>

          <PickArtForm>
            <SizeOptionsRoot>
              {SizeOptions.map(this.renderSizeOption)}
            </SizeOptionsRoot>

            <TotalRoot>
              <PriceRoot>
                <span>$</span>
                <PriceInput
                  onChange={this.onChangePrice}
                  innerRef={r => this.priceInput = r}
                  placeholder={'pick your price!'}
                />
              </PriceRoot>
              <ShippingLine><div>+ $5 shipping</div></ShippingLine>
              <GetItButton>
                <TotalText>${this.state.total}</TotalText>
                <GetItText>get it now!</GetItText>
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
            <Image src={pcsrc('sunrise folly')} />
            <Image src={pcsrc('be your own therapy')} />
            <Image src={pcsrc('ice cream poop')} />
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
              express your mess is a nonprofit organization working to make <i>art</i> the reason we all wake up in the morning. art is love and it's time to move towards a heart-forward society. unrestrained competition is hindering the very reason we chose to create civilization in the first place—to live peacefully and harmoniously with each other.
            </p>
          </Body>
          <ButtonGroup>
            <Button>see how we make change</Button>
            <Button>shop with us</Button>
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

        </MailingListRoot>
      </Root>
    )
  }

  @autobind
  renderArtOption({id, title}) {
    return (
      <ArtOption key={id}>
        <Image src={pcsrc(id)} />
        <div>{title}</div>
      </ArtOption>
    )
  }

  @autobind
  renderSizeOption(size) {
    return <SizeOption>{size}</SizeOption>
  }

  @autobind
  openPoetcardsBubble() {
    window.location = '#start/bubble/buy-poetcards'
  }

  @autobind
  openEmailTab() {
    openInNewTab('mailto:whynot@expressyourmess.com')
  }

  @autobind
  onChangePrice() {
    const price = this.priceInput.value
    const total = price? +price + 5 : 0
    this.setState({total: total})
  }

}
