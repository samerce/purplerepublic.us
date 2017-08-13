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
//https://s3.amazonaws.com/purplerepublic/steel-wool.jpg
//https://cdn.pixabay.com/photo/2016/12/31/21/24/light-graffiti-1943762_1280.jpg
//https://cdn.pixabay.com/photo/2016/11/29/09/09/abstract-1868624_1280.jpg
//https://cdn.pixabay.com/photo/2016/11/05/18/40/startrails-1800916_1280.jpg

export default class Movement extends React.Component {
  render() {
    return (
      <Root className={`movement-root ${this.props.className}`}
         style={{backgroundImage:
        'url("https://s3.amazonaws.com/purplerepublic/motion-blur.jpg")'
      }}>
        <ContentArea className='movement-main'>
          <Header className='movement-header'>
            isness in motion
          </Header>

          <SweetTalk className='movement-blurb'>
            <div>
              momentum in the body builds it in the mind. energy in the mind creates new realities. fresh perspectives offer inspiration and joy. embracing movement reveals the secrets of taking full advantage of the tool of our existence. even a rock moves if you get close enough.
            </div>
          </SweetTalk>
        </ContentArea>
      </Root>
    )
  }
}
