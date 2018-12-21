import React from 'react'
import Bubbleverse from '../bubbleverse'

import {cx} from '../../utils/style'
import {
  Root,
} from './styled'

export default class StackGrid extends React.Component {

  render() {
    return (
      <Root>
        <Bubbleverse />
      </Root>
    )
  }

}
