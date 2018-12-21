import React from 'react'

import {cx} from '../../utils/style'
import {
  Root,
} from './styled'

export default class LatestBoard extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show
  }

  render() {
    const {text, show, className} = this.props
    const classes = cx({
      show,
      [className]: true,
    })
    return (
      <Root className={classes}>
        <i className='fa fa-superpowers' />
        {text && <span>&nbsp; {text}</span>}
      </Root>
    )
  }

}
