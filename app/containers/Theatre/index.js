import React from 'react'
import styled from 'styled-components'
import {CatchLine} from '../../global/styled'

const Background = styled.div`
  background: no-repeat url('https://c1.staticflickr.com/3/2565/4096382636_7e7d9d5545_o.png');
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
export default class Theatre extends React.Component {
  render() {
    return (
      <div>
        <Background />
        <CatchLine style={{margin: '20px'}}>
          a chat with little bird
        </CatchLine>
      </div>
    )
  }
}
