import React from 'react'
import styled from 'styled-components'
import {
  Root,
  ContentArea,
  Header,
  SweetTalk,
} from '../../global/styled'
import {

} from './styled'

//https://cdn.pixabay.com/photo/2015/10/24/11/09/highspeed-photography-1004250_1280.jpg
//https://cdn.pixabay.com/photo/2017/08/01/13/46/fire-2565561_1280.jpg
//https://cdn.pixabay.com/photo/2017/06/09/18/55/long-exposure-2387965_1280.jpg
//https://cdn.pixabay.com/photo/2017/05/04/19/08/steel-wool-2284869_1280.jpg

export default class Movement extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
        'url("https://cdn.pixabay.com/photo/2017/05/04/19/08/steel-wool-2284869_1280.jpg")'
      }}>
        <ContentArea className='movement-main'>
          <Header>
            isness in motion
          </Header>
        </ContentArea>
      </Root>
    )
  }
}
