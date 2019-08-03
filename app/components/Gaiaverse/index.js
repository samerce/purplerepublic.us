import React from 'react'
import Portal from '../Portal'

import {
  Root,
} from './styled'

import {connect} from 'react-redux'

@connect(d => ({
  mode: d.get('gaiaverse').get('mode'),
}))
export default class Gaiaverse extends React.PureComponent {

  render() {
    const {mode} = this.props
    return (
      <Root className={'mode-' + mode}>
        <Portal spot='top' />
        <Portal spot='center' />
        <Portal spot='bottomLeft' />
        <Portal spot='bottomRight' />
        {/* <img src='./river.png' className='anim' /> */}
      </Root>
    )
  }

}
