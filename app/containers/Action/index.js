import React from 'react'
import styled from 'styled-components'
import {
  Root,
  ContentArea,
  Header,
} from '../../global/styled'
import {

} from './styled'

export default class Action extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage: 'url("https://c1.staticflickr.com/5/4140/4936872846_99c3856bfb_b.jpg")'}}>
        <ContentArea className='action-main'>
          <Header>
            get involved!
          </Header>
        </ContentArea>
      </Root>
    )
  }
}
