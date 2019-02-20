import React from 'react'

import {ImageBubbleButton, Icon} from './styled'
import {connect} from 'react-redux'

@connect(d => ({
  activeGratitude: d.get('patreonBubble').get('activeGratitude')
}))
export default class PatreonBubbleButton extends React.PureComponent {

  render() {
    const {onClick, nucleus, activeGratitude, heroConfig, size} = this.props
    return (
      <ImageBubbleButton
        onClick={onClick}
        size={size}
        src={heroConfig.gratitude[activeGratitude].image.src}>
        <Icon className={'fa fa-gratipay'} />
      </ImageBubbleButton>
    )
  }

}
