import React from 'react'

import styled from 'styled-components'
const Background = styled.div`
  background: no-repeat url('https://c2.staticflickr.com/4/3085/3157855996_093e35a377_b.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
`

export default class Movement extends React.Component {
  render() {
    return (
      <Background />
    )
  }
}
