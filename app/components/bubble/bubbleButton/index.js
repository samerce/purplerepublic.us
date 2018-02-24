import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot,
} from './styled'
import {SRC_URL} from '../../../global/constants'

const background = SRC_URL + 'intro/inky.jpg'

export default class BubbleButton extends React.Component {

  render() {
    const {onClick, imageSrc, className} = this.props
    return (
      <Root
        className={className}
        onClick={onClick}>
        <ContentRoot background={background}>

        </ContentRoot>
      </Root>
    )
  }

}
