import React from 'react'
import BubbleButton from '../bubbleButton'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot,
} from './styled'

import autobind from 'autobind-decorator'

export default class BubbleBuilderButton extends React.Component {

  render() {
    const {onClick} = this.props
    return (
      <BubbleButton onClick={onClick} className='bubbleBuilderButton'>
        <div>
          <i className='fa fa-plus' />
        </div>
      </BubbleButton>
    )
  }

}
