import React from 'react'

import {
  Root, EntryButton, Background, CloseButton,
  ContentRoot, ShopRow, IconBubble, WordsRoot, ShopButton, ShopText,
} from './styled'

import {openInNewTab} from '../../utils/nav'
import withTransitions from '../hocs/withTransitions'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

@connect(d => ({
  isVisible: d.get('timeline').get('pastTimelineVisible')
}))
@withTransitions({prefix: 'shop'})
export default class Shop extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {isVisible, show, hide} = this.props
    if (nextProps.isVisible !== isVisible) {
      nextProps.isVisible? show() : hide()
    }
  }

  render() {
    const {show, hide, className} = this.props
    return (
      <Root className={className}>
        <ContentRoot>
          {ShopRows.map(this.renderShopRow)}
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  renderShopRow({iconId, buttonText, shopText, onClick, color}, i) {
    return (
      <ShopRow i={i} key={i}>
        <IconBubble i={i} color={color}>
          <i className={'fa fa-' + iconId} />
        </IconBubble>
        <WordsRoot>
          <ShopButton
            onClick={() => this.onClickShopRow(onClick, buttonText)}
            i={i} color={color}>
            {buttonText}
          </ShopButton>
          <ShopText i={i}>
            {shopText}
          </ShopText>
        </WordsRoot>
      </ShopRow>
    )
  }

  onClickShopRow(onClick, buttonText) {
    onClick()

    ga('send', 'event', {
      eventCategory: 'shop',
      eventAction: 'shop button clicked',
      eventLabel: buttonText,
    })
  }

}

var ShopRows = [
  {
    iconId: 'gift',
    buttonText: 'poetcards',
    shopText: 'don\'t let the written word die. get some of our original art poetcards and send some wit and love to your dearest.',
    onClick: () => window.location = '/#start/bubble/buy-poetcards',
    color: 'flik',
  },
  {
    iconId: 'book',
    buttonText: 'shirts, tights, journals & more!',
    shopText: 'browse our catalog on redbubble.com to buy shirts, tights, dresses, journals, phone cases, mugs, stickers, home decor and more!',
    onClick: () => openInNewTab(
      'https://www.redbubble.com/people/purplerepublic/shop/'
    ),
    color: 'myrtle',
  },
  {
    iconId: 'picture-o',
    buttonText: 'art prints',
    shopText: 'visit our etsy shop to grab our prints on the finest quality metallic paper. many sizes available.',
    onClick: () => openInNewTab(
      'https://etsy.com/shop/expressyourmess'
    ),
    color: 'shelly',
  },
  {
    iconId: 'money',
    buttonText: 'become a patron',
    shopText: 'get a monthly dose of incredible modern art by becoming a regular supporter of the art revolution on patreon.',
    onClick: () => openInNewTab(
      'https://www.patreon.com/expressyourmess'
    ),
    color: 'tweet',
  },
]
