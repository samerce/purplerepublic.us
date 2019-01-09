import React from 'react'

import {
  Root, EntryButton, Background, CloseButton,
  ContentRoot, ShopRow, IconBubble, WordsRoot, ShopButton, ShopText,
} from './styled'

import {openInNewTab} from '../../utils/nav'
import withTransitions from '../hocs/withTransitions'

@withTransitions({prefix: 'shop'})
export default class Shop extends React.Component {

  render() {
    const {show, hide, className} = this.props
    return (
      <Root className={className}>
        <Background />
        <EntryButton onClick={() => show()}>
          <i className='fa fa-shopping-bag' />
          <span>shop</span>
        </EntryButton>
        <CloseButton onClick={() => hide()}>
          <i className='fa fa-close' />
        </CloseButton>

        <ContentRoot>
          {ShopRows.map(this.renderShopRow)}
        </ContentRoot>
      </Root>
    )
  }

  renderShopRow({iconId, buttonText, shopText, onClick}, i) {
    return (
      <ShopRow i={i} key={i}>
        <IconBubble i={i}>
          <i className={'fa fa-' + iconId} />
        </IconBubble>
        <WordsRoot>
          <ShopButton onClick={onClick} i={i}>
            {buttonText}
          </ShopButton>
          <ShopText i={i}>
            {shopText}
          </ShopText>
        </WordsRoot>
      </ShopRow>
    )
  }

}

var ShopRows = [
  {
    iconId: 'gift',
    buttonText: 'poetcards',
    shopText: 'don\'t let the written word die. get some of our original art poetcards and send some wit and love to your dearest.',
    onClick: () => window.location = '/#start/bubble/buy-poetcards'
  },
  {
    iconId: 'book',
    buttonText: 'shirts, tights, journals & more!',
    shopText: 'browse our catalog on redbubble.com to buy shirts, tights, dresses, journals, phone cases, mugs, stickers, home decor and more!',
    onClick: () => openInNewTab(
      'https://www.redbubble.com/people/purplerepublic/shop/'
    )
  },
  {
    iconId: 'picture-o',
    buttonText: 'art prints',
    shopText: 'visit our etsy shop to grab our prints on the finest quality metallic paper. many sizes available.',
    onClick: () => openInNewTab(
      'https://etsy.com/shop/expressyourmess'
    )
  },
  {
    iconId: 'money',
    buttonText: 'become a patron',
    shopText: 'get a monthly dose of incredible modern art by becoming a regular supporter of the art revolution on patreon.',
    onClick: () => openInNewTab(
      'https://www.patreon.com/expressyourmess'
    )
  },
]
