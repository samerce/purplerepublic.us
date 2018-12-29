import React from 'react'

import {
  Root,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

export default class LatestBoard extends React.Component {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>latest</div>
        </SectionHeader>
      </Root>
    )
  }

}
