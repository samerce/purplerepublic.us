import React from 'react'

import {
  Root, Title, ImageButtonRoot, ImageButtonText,
} from './styled'

import {openInNewTab} from '../../../utils/nav'
import {SRC_URL, SCREEN_WIDTH_S} from '../../../global/constants'

const ButtonTargets = {
  tights: 'https://www.redbubble.com/people/purplerepublic/shop/top+selling+leggings',
  journals: 'https://www.redbubble.com/people/purplerepublic/shop/top+selling+hardcover-journals',
  prints: 'https://etsy.com/shop/purplerepublic'
}

export default class ShopArtHero extends React.PureComponent {

  render() {
    return (
      <Root shop>
        {this.renderImageButton(SRC_URL + 'commons/aura-hardcover-journal.png', 'journals')}
        {window.innerWidth > SCREEN_WIDTH_S &&
          this.renderImageButton(SRC_URL + 'commons/leggings-blue lagoon.png', 'tights')
        }
        {this.renderImageButton(SRC_URL + 'commons/print.png', 'prints')}
      </Root>
    )
  }

  renderImageButton(src, text) {
    return (
      <ImageButtonRoot onClick={() => openInNewTab(ButtonTargets[text])}>
        <img src={src} />
        <ImageButtonText>{text}</ImageButtonText>
      </ImageButtonRoot>
    )
  }

}
