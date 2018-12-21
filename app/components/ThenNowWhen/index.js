import React from 'react'

import {cx} from '../../utils/style'
import {
  Root, Button, Shop
} from './styled'

export default class ThenNowWhen extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show
  }

  render() {
    return (
      <Root>
        <Button className='left'>
          <i className='fa fa-history' />
          <span>where we've been</span>
        </Button>

        <Shop>
          <i className='fa fa-shopping-bag' />
          <span>shop</span>
        </Shop>

        <Button className='right'>
          <span>where we're going</span>
          <i className='fa fa-grav' />
        </Button>
      </Root>
    )
  }

}
