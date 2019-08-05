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
        <img src='plain.png' className='border borderLeft' />
        <img src='plain.png' className='border borderRight' />
        <Portal spot='center' />
        <Portal spot='bottomLeft' />
        <img src='plain.png' className='border borderBottom' />
        <Portal spot='bottomRight' />
        {/* <img src='./river.png' className='anim' /> */}
      </Root>
    )
  }

}
