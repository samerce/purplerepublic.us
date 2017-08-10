import React from 'react'
import styled from 'styled-components'
const Background = styled.div`
  background: no-repeat url('https://c1.staticflickr.com/3/2832/9197504129_9260d4ce90_b.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
`
export default class Reflection extends React.Component {
  render() {
    return (
      <Background />
    )
  }
}
