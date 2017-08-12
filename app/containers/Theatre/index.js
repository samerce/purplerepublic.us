import React from 'react'
import styled from 'styled-components'
import {
  CatchLine,
  SweetTalk,
  Root,
  ContentArea,
} from '../../global/styled'
import {
  Pitch,
} from './styled'

export default class Theatre extends React.Component {
  render() {
    return (
      <Root className='theatre-root' style={{backgroundImage:
         'url("https://s3.amazonaws.com/purplerepublic/people-shadows.jpg")'
       }}>
       <ContentArea className='theatre-main'>
         <CatchLine>
           from performance art to president
         </CatchLine>
         <SweetTalk style={{margin: '10px 0'}}>
           a politically-charged absurdist meditation on ideas — on hope, fear, war, education, addiction, god, love, loss, and what it means to be alive today.
         </SweetTalk>
         <SweetTalk className='theatre-tagline'>
           . . . bernie sanders ripped the bandaid, donald trump is the seventy-one cent rubbing alcohol, the purple party is the salve to heal our collective wounds.
         </SweetTalk>

         <Pitch>
           in this all-new, original production by purple republic, we follow the absurd primary campaigns and private lives of three longshot senate candidates vying for the official nod and nomination from the up-and-coming purple party in the 2018 election
         </Pitch>
       </ContentArea>
      </Root>
    )
  }
}
