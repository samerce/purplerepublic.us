import React from 'react'
import styled from 'styled-components'
const Background = styled.div`
  background: no-repeat url('https://c1.staticflickr.com/5/4140/4936872846_99c3856bfb_b.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
`
export default class Action extends React.Component {
  render() {
    return (
      <Background />
    )
  }
}
