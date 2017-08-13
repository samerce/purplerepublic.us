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

//https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg
// https://c2.staticflickr.com/6/5281/5362578387_0cbb0eec1e_b.jpg
//https://c2.staticflickr.com/4/3280/2739530853_bc9ceb8920_b.jpg
//https://c2.staticflickr.com/8/7495/30072886495_ba295c6eef_b.jpg
//https://c2.staticflickr.com/8/7123/7663247816_4ef6c4d123_b.jpg
//https://c1.staticflickr.com/5/4159/33720595773_69a9f6a01c_b.jpg

export default class Reflection extends React.Component {
  render() {
    return (
      <Root className={`reflection-root ${this.props.className}`}
         style={{backgroundImage:
        'url("https://s3.amazonaws.com/purplerepublic/aurora.jpg")'
      }}>
        <ContentArea className='reflection-main'>
          <Header>listen to alan watts</Header>
          <SweetTalk className='reflect-quote'>
            <div>
              “what we need to match the science of human health is ‘hocma’—the science of the heart. . . the capacity to see. . . to feel. . . and then to act. . . as if the future depended on you. Believe me, it does.” -Bill Moyers
            </div>

            <iframe src="https://www.youtube.com/embed/MBRqu0YOH14" frameBorder="0" allowFullScreen></iframe>
          </SweetTalk>
        </ContentArea>
      </Root>
    )
  }
}
