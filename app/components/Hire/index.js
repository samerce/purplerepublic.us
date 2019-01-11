import React from 'react'

import {
  Root, EntryButton, Background, CloseButton, ContentRoot,
} from './styled'

import withTransitions from '../hocs/withTransitions'

@withTransitions({prefix: 'hire'})
export default class Hire extends React.Component {

  render() {
    const {show, hide, className} = this.props
    return (
      <Root className={className}>
        <Background leftCorner />
        <EntryButton onClick={() => show()}>
          <i className='fa fa-coffee' />
          <span>hire us</span>
        </EntryButton>
        <CloseButton onClick={() => hide()}>
          <i className='fa fa-close' />
        </CloseButton>

        <ContentRoot>
        </ContentRoot>
      </Root>
    )
  }

}
